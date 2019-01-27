import json
from functools import reduce
from sqlalchemy import and_, or_, exc

from server.run import db
from .models import *

from collections import OrderedDict

unit_characteristic_fields = ['move', 'fight', 'shoot', 'strength',
                              'defence', 'attacks', 'wounds', 'courage', 'might', 'will', 'fate']

unit_fields_no_characteristics = [
    'faction_id', 'unit_id', 'name', 'points', 'description', 'mount_id', 'image_path']

company_unit_fields_no_characteristics = [
    'unit_id', 'company_id', 'company_unit_name', 'company_unit_rank', 'experience', 'effective_points', 'can_promote', 'notes', 'image_path']

session = db.session

# ------------------------------------
# Main queries
# ------------------------------------


def getUserCompanies(username):
    companies = None
    try:
        user_id = session.query(User.user_id).filter(
            User.username == username).one()
        hasCompanies = session.query(Company.name).filter(
            Company.user_id == user_id).scalar() is not None
        if(not hasCompanies):
            return {}, 200
        companies = session.query(Company.name).filter(
            Company.user_id == user_id).all()
    except exc.SQLAlchemyError as error:
        print(error)
        return {}, 404

    companies = json.loads(AlchemyEncoder().encode(companies))
    user_obj = []
    for company_name in companies:
        company = getCompany(company_name)
        company['company_units'] = getCompanyUnits(company_name)
        company['injured'] = getCompanyInjured(company_name)
        user_obj.append(company)
    return user_obj, 200


def getArmies():
    faction_names_query = None
    try:
        faction_names_query = session.query(Faction.name).all()
    except exc.SQLAlchemyError as error:
        print(error)
        return {}, 404

    faction_names = [u for u, in faction_names_query]
    armies = {}
    try:
        for faction_name in faction_names:
            units = getUnits(faction_name)
            if(units != {}):
                armies[faction_name] = units
    except exc.SQLAlchemyError as error:
        print(error)
        return {}, 404

    return armies, 200


def getUser(username):
    user_query = None
    try:
        user_query = session.query(User).filter(
            User.username == username).one()
    except exc.SQLAlchemyError as error:
        print(error)
        return {}, 103

    return json.loads(AlchemyEncoder(list=['user_id', 'username', 'firstname', 'lastname', 'email', 'password_hash'], ordered=True).encode(user_query)), 200


def getCompanyFactions():
    company_factions_query = None
    try:
        company_factions_query = session.query(CompanyFaction).all()
    except exc.SQLAlchemyError as error:
        print(error)
        return {}, 404

    company_factions = {}
    for company_faction in company_factions_query:
        company_faction_obj = json.loads(AlchemyEncoder(
            list=["people", "name", "note"], ordered=True).encode(company_faction))
        companyFactionName = company_faction_obj["name"]

        company_faction_obj["reinforcements"] = getReinforcements(
            companyFactionName)
        company_faction_obj["special_rules"] = getCompanyFactionSpecialRules(
            companyFactionName)
        company_faction_obj["unit_promotions"] = getUnitPromotions(
            companyFactionName)
        company_factions[companyFactionName] = company_faction_obj

    return company_factions, 200


# ------------------------------------
# Helper queries
# ------------------------------------

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
        equipement.pop('altering_effect_id')

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


def getUnits(factionName):
    faction_id = session.query(Faction.faction_id).filter(
        Faction.name == factionName)

    units_name_query = session.query(Unit.name).filter(
        Unit.faction_id == faction_id).all()

    whole_faction = {}
    # untuple the result
    units_name = [u for u, in units_name_query]
    for unit_name in units_name:
        whole_faction[unit_name] = getUnit(unit_name, factionName)

    return whole_faction


def getCompany(companyName):
    company_query = session.query(Company).filter(
        Company.name == companyName).one()
    company = AlchemyEncoder(list=['company_id', 'name', 'gold', 'victories', 'draws',
                                   'losses', 'rating', 'effective_rating', 'image_path'], ordered=True).encode(company_query)

    return json.loads(company)


def getCompanyInjured(company_name):
    injured_query = session.query(CompanyUnit.company_unit_name).select_from(
        db.join(Company, CompanyHasInjured, isouter=True).join(CompanyUnit, isouter=True)).all()
    injured = json.loads(AlchemyEncoder().encode(injured_query))
    injured = reduce(lambda x, y: x+y, injured) if injured != [[None]] else []
    return injured


def getCompanyUnits(companyName):
    company_id = session.query(Company.company_id).filter(
        Company.name == companyName).one()
    company_unit_names = session.query(CompanyUnit.company_unit_name).filter(
        CompanyUnit.company_id == company_id).all()

    company = {}
    for company_unit_name in json.loads(AlchemyEncoder().encode(company_unit_names)):
        company[company_unit_name[0]] = getCompanyUnit(company_unit_name[0])

    return company


def getCompanyUnit(companyUnitName):
    company_unit = session.query(CompanyUnit).filter(
        CompanyUnit.company_unit_name == companyUnitName).one()

    company_unit = json.loads(AlchemyEncoder(
        list=company_unit_fields_no_characteristics, ordered=True).encode(company_unit))

    unit_id = company_unit['unit_id']
    unit_name = session.query(Unit.name).filter(
        Unit.unit_id == unit_id).one()[0]

    company_unit['unit_id'] = unit_name
    company_unit['unit_name'] = company_unit.pop('unit_id')

    company_id = company_unit['company_id']
    company_unit['company_name'] = session.query(Company.name).filter(
        Company.company_id == company_id).one()[0]

    company_unit['characteristics'] = getCharacteristics(
        unit_name)

    equipement_query = session.query(Equipement.name).select_from(
        db.join(Equipement, CompanyUnitHasEquipement, isouter=True).join(CompanyUnit, isouter=True))

    company_unit['wargear'] = getCompanyUnitEquipement(companyUnitName)
    company_unit['magical_powers'] = getMagicalPowers(
        companyUnitName, companyUnit=True)
    company_unit['special_rules'] = getSpecialRules(
        companyUnitName, companyUnit=True)
    company_unit['promotions'] = getPromotions(companyUnitName)

    return company_unit


def getCompanyUnitEquipement(companyUnitName):
    has_equipements_query = session.query(Equipement.name, CompanyUnitHasEquipement.points).select_from(
        db.join(Equipement, CompanyUnitHasEquipement, isouter=True).join(CompanyUnit, isouter=True))

    has_equipements = has_equipements_query.filter(
        CompanyUnit.company_unit_name == companyUnitName).all()

    equipement_list = []
    for hasEquipement in has_equipements:
        hasEquipement = json.loads(AlchemyEncoder(
            list=["name", 'points'], ordered=True).encode(hasEquipement))
        equipement_object = {}
        equipement_object["name"] = hasEquipement[0]
        equipement_object["points"] = hasEquipement[1]

        altering_effect_query = session.query(Equipement.altering_effect_id).filter(
            Equipement.name == hasEquipement[0]).scalar()

        if(altering_effect_query is not None):
            altering_effect = session.query(AlteringEffect).filter(
                AlteringEffect.altering_effect_id == altering_effect_query).one()
            altering_effect_obj = json.loads(str(altering_effect))
            altering_effect_obj.pop('altering_effect_id')
            equipement_object['altering_effect'] = altering_effect_obj

        equipement_list.append(equipement_object)

    return equipement_list


def getPromotions(companyUnitName):
    promotion_query = session.query(Promotion).select_from(db.join(Promotion, CompanyUnitHasPromotion, isouter=True).join(
        CompanyUnit, isouter=True)).filter(CompanyUnit.company_unit_name == companyUnitName).all()
    promotions = AlchemyEncoder(
        list=['name', 'description', 'special_rule_id', 'altering_effect_id'], ordered=True).encode(promotion_query)

    company_unit_id = session.query(CompanyUnit.company_unit_id).filter(
        CompanyUnit.company_unit_name == companyUnitName).one()[0]
    promotions = json.loads(promotions)
    # transforming ids to actual essential data

    promotions_with_data = []
    for promotion in promotions:
        altering_effect_id = promotion['altering_effect_id']
        special_rule_id = promotion['special_rule_id']
        promotion['altering_effect'] = None
        promotion['special_rule'] = None
        promotion.pop('altering_effect_id')
        promotion.pop('special_rule_id')
        if(altering_effect_id != None):
            altering_effect_query = session.query(AlteringEffect).filter(
                AlteringEffect.altering_effect_id == altering_effect_id).one()
            altering_effect = AlchemyEncoder(
                list=['characteristic', 'value'], ordered=True).encode(altering_effect_query)
            promotion['altering_effect'] = json.loads(altering_effect)

        if(special_rule_id != None):
            special_rule_query = session.query(SpecialRule.name).filter(
                SpecialRule.special_rule_id == special_rule_id).one()
            special_rule = AlchemyEncoder().encode(special_rule_query)
            promotion['special_rule'] = json.loads(special_rule)[0]

        promotion_id = session.query(Promotion.promotion_id).filter(
            Promotion.name == promotion['name']).one()
        number = session.query(CompanyUnitHasPromotion.number).filter(and_(
            CompanyUnitHasPromotion.promotion_id == promotion_id, CompanyUnitHasPromotion.company_unit_id == company_unit_id)).one()
        promotion['number'] = json.loads(AlchemyEncoder().encode(number))[0]

        promotions_with_data.append(promotion)

    return promotions_with_data


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


def getMagicalPowers(unitName, companyUnit=False):
    if(companyUnit):
        magicalPower_query = session.query(MagicalPower.name).select_from(
            db.join(MagicalPower, CompanyUnitHasMagicalPower, isouter=True).join(CompanyUnit, isouter=True)).filter(CompanyUnit.company_unit_name == unitName).all()
    else:
        magicalPower_query = session.query(MagicalPower.name).select_from(
            db.join(MagicalPower, UnitHasMagicalPower, isouter=True).join(Unit, isouter=True)).filter(Unit.name == unitName).all()

    magicalPower_list = magicalPower_query
    magicalPower_list = AlchemyEncoder().encode(magicalPower_list)
    magicalPower_list = json.loads(magicalPower_list)
    magicalPower_list = reduce(
        lambda x, y: x+y, magicalPower_list) if magicalPower_list != [] else []
    return magicalPower_list


def getSpecialRules(unitName, companyUnit=False):
    specialRule_query = session.query(SpecialRule).select_from(db.join(SpecialRule, UnitHasSpecialRule, isouter=True).join(
        Unit, isouter=True)) if not companyUnit else session.query(SpecialRule).select_from(db.join(SpecialRule, CompanyUnitHasSpecialRule, isouter=True).join(CompanyUnit, isouter=True))

    specialRule_list = specialRule_query.filter(Unit.name == unitName).all(
    ) if not companyUnit else specialRule_query.filter(CompanyUnit.company_unit_name == unitName).all()
    specialRule_list = AlchemyEncoder(
        list=['name', 'origin']).encode(specialRule_list)
    specialRule_list = json.loads(specialRule_list)
    # specialRule_list = reduce(
    #     lambda x, y: x+y, specialRule_list) if specialRule_list != [] else []
    return specialRule_list


def getUnit(unitName, factionName):

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

    # we set the correct image_path here should be done database side
    unit['image_path'] = factionName+"/"+unit['name'] + ".png"

    return unit


def getReinforcements(companyFactionName):
    reinforcement_query = session.query(Unit.name).select_from(
        db.join(Unit, CompanyFactionHasReinforcement, isouter=True).join(CompanyFaction, isouter=True))
    reinforcement = reinforcement_query.filter(
        CompanyFaction.name == companyFactionName).all()

    reinforcement_list = AlchemyEncoder().encode(reinforcement)
    reinforcement_list = json.loads(reinforcement_list)
    reinforcement_list = reduce(
        lambda x, y: x+y, reinforcement_list) if reinforcement_list != [] else []

    return reinforcement_list


def getCompanyFactionSpecialRules(companyFactionName):
    special_rule_query = session.query(SpecialRule.name).select_from(
        db.join(SpecialRule, CompanyFactionHasSpecialRule, isouter=True).join(CompanyFaction, isouter=True))
    special_rule = special_rule_query.filter(
        CompanyFaction.name == companyFactionName).all()

    special_rule_list = AlchemyEncoder().encode(special_rule)
    special_rule_list = json.loads(special_rule_list)
    special_rule_list = reduce(
        lambda x, y: x+y, special_rule_list) if special_rule_list != [] else []
    return special_rule_list


def getUnitPromotions(companyFactionName):
    company_faction_id = session.query(CompanyFaction.company_faction_id).filter(
        CompanyFaction.name == companyFactionName).one()
    old_unit_ids = session.query(CompanyFactionHasUnitPromotions.old_unit_id).filter(
        CompanyFactionHasUnitPromotions.company_faction_id == company_faction_id).distinct(CompanyFactionHasUnitPromotions.old_unit_id)
    unit_promotions = {}
    for old_unit_id in old_unit_ids:
        old_unit_name = json.loads(AlchemyEncoder().encode(
            session.query(Unit.name).filter(Unit.unit_id == old_unit_id).one()[0]))
        new_unit_ids = session.query(CompanyFactionHasUnitPromotions.new_unit_id).filter(
            and_(CompanyFaction.name == companyFactionName, CompanyFactionHasUnitPromotions.old_unit_id == old_unit_id)).all()

        new_units = {}
        for new_unit_id in new_unit_ids:
            new_unit_name = json.loads(AlchemyEncoder().encode(
                session.query(Unit.name).filter(Unit.unit_id == new_unit_id).one()[0]))
            required_equipement_id = session.query(CompanyFactionHasUnitPromotions.required_equipement_id).filter(and_(
                CompanyFactionHasUnitPromotions.old_unit_id == old_unit_id, CompanyFactionHasUnitPromotions.new_unit_id == new_unit_id)).one()
            required_equipement = json.loads(AlchemyEncoder().encode(session.query(
                Equipement.name).filter(Equipement.equipement_id == required_equipement_id).scalar()))
            new_unit_obj = {}
            new_unit_obj["required_equipement"] = required_equipement
            new_units[new_unit_name] = new_unit_obj
        unit_promotions[old_unit_name] = new_units

    return unit_promotions
