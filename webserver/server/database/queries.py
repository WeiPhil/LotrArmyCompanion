import json
from functools import reduce
from sqlalchemy import and_, or_

from server.run import db
from .models import *

from collections import OrderedDict

unit_characteristic_fields = ['move', 'fight', 'shoot', 'strength',
                              'defence', 'attacks', 'wounds', 'courage', 'might', 'will', 'faith']

unit_fields_no_characteristics = [
    'faction_id', 'unit_id', 'name', 'points', 'description', 'mount_id', 'image_path']

session = db.session


def createCompanyUnit():
    db.create_all()

    companyName = 'The Golden Robbers'
    unitName = 'moria_goblin_warrior'
    unitRank = 'warrior'
    pseudoName = 'TestUnit10'
    additionalEquipement = ['shield', 'spear']

    unit_id = session.query(Unit.unit_id).filter(
        Unit.name == unitName).one()[0]
    company_id = session.query(Company.company_id).filter(
        Company.name == companyName).one()[0]

    unit_base_points = session.query(Unit.points).filter(
        Unit.name == unitName).one()[0]

    base_equipement_ids_points = session.query(UnitHasEquipement.equipement_id, UnitHasEquipement.points).filter(
        UnitHasEquipement.unit_id == unit_id
    ).filter(UnitHasEquipement.points == 0).all()

    additional_equipement_ids_points = None
    if(unitRank == 'warrior'):
        additional_equipement_ids_points = session.query(Equipement.equipement_id, Equipement.low_cost).filter(
            or_(Equipement.name == e for e in additionalEquipement)).all()
    else:
        additional_equipement_ids_points = session.query(Equipement.equipement_id, Equipement.high_cost).filter(
            or_(Equipement.name == e for e in additionalEquipement)).all()

    equipements = base_equipement_ids_points + additional_equipement_ids_points

    equipement_cost = 0
    for (_, points) in equipements:
        equipement_cost += points

    unit_total_cost = unit_base_points+equipement_cost
    #  add new unit with total cost in points of equipement
    newCompanyUnit = CompanyUnit(unit_id=unit_id, company_id=company_id, pseudo_name=pseudoName,
                                 company_unit_rank=unitRank, effective_points=unit_total_cost)

    db.session.add(newCompanyUnit)
    db.session.commit()

    # add equipements to has_equipements
    company_unit_id = session.query(CompanyUnit.company_unit_id).filter(
        CompanyUnit.pseudo_name == pseudoName).one()[0]

    for (equipement_id, _) in equipements:
        unit_has_new_equipement = CompanyUnitHasEquipement(
            company_unit_id=company_unit_id, equipement_id=equipement_id)
        db.session.add(unit_has_new_equipement)

    db.session.commit()

    # add special_rules to has_special_rules
    special_rule_ids = session.query(UnitHasSpecialRule.special_rule_id).filter(
        UnitHasSpecialRule.unit_id == unit_id
    ).all()

    for special_rule_id in special_rule_ids:
        unit_has_new_special_rule = CompanyUnitHasSpecialRule(
            company_unit_id=company_unit_id, special_rule_id=special_rule_id)
        db.session.add(unit_has_new_special_rule)

    db.session.commit()

    # Update company
    company = session.query(Company).filter(Company.name == companyName).one()
    company.rating += unit_total_cost
    company.effective_rating += unit_total_cost
    db.session.commit()

    return str(session.query(CompanyUnit).filter(CompanyUnit.pseudo_name == pseudoName).one())


def getAllEquipements():
    equipements = session.query(Equipement).all()
    equipements = json.loads(str(equipements))
    order = ["equipement_id", "name", "description", "low_cost",
             "high_cost", "is_extra", "altering_effect_id"]

    equipements_obj = {}
    for equipement in equipements:
        equipement_name = equipement['name']
        equipement = OrderedDict(sorted(equipement.items(),
                                        key=lambda i: order.index(i[0])))
        if(equipement['altering_effect_id'] != None):
            altering_effect = session.query(AlteringEffect).filter(
                AlteringEffect.altering_effect_id == equipement['altering_effect_id']).one()

            altering_effect_obj = json.loads(str(altering_effect))
            altering_effect_obj.pop('altering_effect_id', None)
            equipement['altering_effect'] = altering_effect_obj

        specialRule_query = session.query(SpecialRule.name).select_from(
            db.join(SpecialRule, EquipementHasSpecialRule, isouter=True).join(Equipement, isouter=True))

        specialRule_list = specialRule_query.filter(
            Equipement.name == equipement_name).all()
        specialRule_list = AlchemyEncoder().encode(specialRule_list)
        specialRule_list = json.loads(specialRule_list)

        specialRule_list = reduce(
            lambda x, y: x+y, specialRule_list) if specialRule_list != [] else []
        equipement['special_rules'] = specialRule_list

        equipements_obj[equipement_name] = equipement

    return equipements_obj


def getAllSpecialRules():
    specialRules = session.query(SpecialRule).all()
    specialRules = json.loads(str(specialRules))
    order = ["special_rule_id", "name", "type", "origin", "description"]

    specialRules_obj = {}
    for specialRule in specialRules:
        specialRule_name = specialRule['name']

        specialRules_obj[specialRule_name] = OrderedDict(sorted(specialRule.items(),
                                                                key=lambda i: order.index(i[0])))

    return specialRules_obj


def getAllArmies():
    faction_names_query = session.query(Faction.name).all()

    faction_names = [u for u, in faction_names_query]
    armies = []
    for faction_name in faction_names:
        armies.append((faction_name, getUnits(faction_name)))

    return armies


def getUnits(factionName):
    faction_id = session.query(Faction.faction_id).filter(
        Faction.name == factionName)

    units_name_query = session.query(Unit.name).filter(
        Unit.faction_id == faction_id).all()

    whole_faction = {}
    # untuple the result
    units_name = [u for u, in units_name_query]
    for unit_name in units_name:
        whole_faction[unit_name] = getUnit(unit_name)

    return whole_faction


def getCharacteristics(unitName):
    unit = session.query(Unit).filter(Unit.name == unitName).one()

    characteristics = AlchemyEncoder(
        list=unit_characteristic_fields, ordered=True).encode(unit)

    return json.loads(characteristics)


def getUnitEquipement(unitName, optional=False):
    equipement_query = session.query(Equipement.name).select_from(
        db.join(Equipement, UnitHasEquipement, isouter=True).join(Unit, isouter=True))

    if(not optional):
        base_equipement = equipement_query.filter(
            and_(Unit.name == unitName, UnitHasEquipement.points == 0)).all()
        base_equipement_list = AlchemyEncoder().encode(base_equipement)
        base_equipement_list = json.loads(base_equipement_list)
        base_equipement_list = reduce(
            lambda x, y: x+y, base_equipement_list) if base_equipement_list != [] else []
        return base_equipement_list
    else:
        optional_equipement = equipement_query.filter(
            and_(Unit.name == unitName, UnitHasEquipement.points != 0)).all()
        optional_equipement_list = AlchemyEncoder().encode(optional_equipement)
        optional_equipement_list = json.loads(optional_equipement_list)
        optional_equipement_list = reduce(
            lambda x, y: x+y, optional_equipement_list) if optional_equipement_list != [] else []
        return optional_equipement_list


def getKeywords(unitName):
    keyword_query = session.query(Keyword.name).select_from(
        db.join(Keyword, UnitHasKeyword, isouter=True).join(Unit, isouter=True))

    keyword_list = keyword_query.filter(Unit.name == unitName).all()
    keyword_list = AlchemyEncoder().encode(keyword_list)
    keyword_list = json.loads(keyword_list)
    keyword_list = reduce(
        lambda x, y: x+y, keyword_list) if keyword_list != [] else []
    return keyword_list


def getMagicalPowers(unitName):
    magicalPower_query = session.query(MagicalPower.name).select_from(
        db.join(MagicalPower, UnitHasMagicalPower, isouter=True).join(Unit, isouter=True))

    magicalPower_list = magicalPower_query.filter(Unit.name == unitName).all()
    magicalPower_list = AlchemyEncoder().encode(magicalPower_list)
    magicalPower_list = json.loads(magicalPower_list)
    magicalPower_list = reduce(
        lambda x, y: x+y, magicalPower_list) if magicalPower_list != [] else []
    return magicalPower_list


def getSpecialRules(unitName):
    specialRule_query = session.query(SpecialRule).select_from(
        db.join(SpecialRule, UnitHasSpecialRule, isouter=True).join(Unit, isouter=True))

    specialRule_list = specialRule_query.filter(Unit.name == unitName).all()
    specialRule_list = AlchemyEncoder(
        list=['name', 'origin']).encode(specialRule_list)
    specialRule_list = json.loads(specialRule_list)
    # specialRule_list = reduce(
    #     lambda x, y: x+y, specialRule_list) if specialRule_list != [] else []
    return specialRule_list


def getUnit(unitName):

    unit = session.query(Unit).filter(Unit.name == unitName).one()

    unit = json.loads(AlchemyEncoder(
        list=unit_fields_no_characteristics, ordered=True).encode(unit))

    unit['characteristics'] = getCharacteristics(unitName)

    equipement_query = session.query(Equipement.name).select_from(
        db.join(Equipement, UnitHasEquipement, isouter=True).join(Unit, isouter=True))

    unit['base_wargear'] = getUnitEquipement(unitName)
    unit['optional_wargear'] = getUnitEquipement(unitName, optional=True)
    unit['keywords'] = getKeywords(unitName)
    unit['magical_powers'] = getMagicalPowers(unitName)
    unit['special_rules'] = getSpecialRules(unitName)

    return unit
