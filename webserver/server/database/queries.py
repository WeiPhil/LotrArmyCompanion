import json
from functools import reduce
from sqlalchemy import and_

from server.run import db
from .models import *

unit_characteristic_fields = ['move', 'fight', 'shoot', 'strength',
                              'defence', 'attacks', 'wounds', 'courage', 'might', 'will', 'faith']

unit_fields_no_characteristics = [
    'faction_id', 'unit_id', 'name', 'points', 'description', 'mount_id', 'image_path']

session = db.session


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


def getEquipement(unitName, optional=False):
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

    unit['base_wargear'] = getEquipement(unitName)
    unit['optional_wargear'] = getEquipement(unitName, optional=True)
    unit['keywords'] = getKeywords(unitName)
    unit['magical_powers'] = getMagicalPowers(unitName)
    unit['special_rules'] = getSpecialRules(unitName)

    return unit
