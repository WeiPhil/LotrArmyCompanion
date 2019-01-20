
import json
from sqlalchemy.ext.declarative import DeclarativeMeta
from sqlalchemy import and_, or_

from server.run import db
import os
from collections import OrderedDict


def checkAndUpdateCompanyUnitCost(companyUnit):
    from .models import Unit, Equipement, CompanyUnit, CompanyUnitHasEquipement, Company
    session = db.session

    """ Finds altering effects in the promotions """
    def findAlteringEffects(dict_obj):
        occurences = []
        numberInPromotion = 1
        currentAlteringEffect = None
        for key, value in dict_obj.items():
            if key == 'number':
                numberInPromotion = value
            if key == 'altering_effect' and isinstance(value, dict):
                occurences.append(value)
                currentAlteringEffect = value
            elif isinstance(value, dict):
                occurences = occurences + \
                    findAlteringEffects(value)
            elif isinstance(value, list):
                for v in value:
                    if(key == 'promotions'):
                        occurences = occurences + findAlteringEffects(v)
        if (currentAlteringEffect != None):
            for i in range(1, numberInPromotion):
                occurences.append(currentAlteringEffect)
        return occurences

    altering_effects = findAlteringEffects(companyUnit)
    totalAttackWounds = companyUnit['characteristics']['wounds'] + companyUnit['characteristics']['attacks'] + len(
        list(filter(lambda x: x['characteristic'] == 'wounds' or x['characteristic'] == 'attacks', altering_effects)))

    isHighCost = False if totalAttackWounds < 3 else True

    optional_wargear = list(
        filter(lambda x: x['points'] > 0, companyUnit['wargear']))

    company_unit_id = session.query(CompanyUnit.company_unit_id).filter(
        CompanyUnit.company_unit_name == companyUnit['company_unit_name']).one()[0]

    for equipement in optional_wargear:

        cost = None
        if(isHighCost):
            cost = session.query(Equipement.high_cost).filter(
                Equipement.name == equipement['name']).one()
        else:
            cost = session.query(Equipement.low_cost).filter(
                Equipement.name == equipement['name']).one()
        cost = int(json.loads(AlchemyEncoder().encode(cost))[0])
        if cost != equipement['points']:
            equipement_id = session.query(Equipement.equipement_id).filter(
                Equipement.name == equipement['name']).one()[0]
            company_unit_has_equipement = session.query(CompanyUnitHasEquipement).filter(and_(
                CompanyUnitHasEquipement.company_unit_id == company_unit_id,
                CompanyUnitHasEquipement.equipement_id == equipement_id
            )).one()
            company_unit_has_equipement.points = cost
            index = companyUnit['wargear'].index(equipement)
            companyUnit['wargear'][index]['points'] = cost
            session.commit()

    wargearCost = 0
    for equipement in companyUnit['wargear']:
        wargearCost += equipement['points']

    values = 0
    for altering_effect in altering_effects:
        char = altering_effect['characteristic']
        if(char != 'shoot'):
            values += altering_effect['value']
            if(char in ['attacks', 'wounds']):
                values += altering_effect['value']

    increase_cost = values * 5

    base_cost = session.query(Unit.points).filter(
        Unit.name == companyUnit['unit_name']).one()
    base_cost = int(json.loads(AlchemyEncoder().encode(base_cost))[0])

    special_rules_num = len(
        list(filter(lambda x: x['special_rule'] != None, companyUnit['promotions'])))
    special_rules_cost = special_rules_num * 5

    magical_powers_num = len(companyUnit['magical_powers'])
    magical_powers_cost = magical_powers_num * 5

    effective_cost = base_cost+wargearCost+increase_cost + \
        special_rules_cost+magical_powers_cost

    if(effective_cost != companyUnit['effective_points']):
        company = session.query(Company).filter(
            Company.name == companyUnit['company_name']).one()
        company.effective_rating += effective_cost - \
            companyUnit['effective_points']
        company.rating += effective_cost-companyUnit['effective_points']
        companyUnit['effective_points'] = effective_cost
        company_unit = session.query(CompanyUnit).filter(
            CompanyUnit.company_unit_name == companyUnit['company_unit_name']).one()
        company_unit.effective_points = effective_cost
        session.commit()

    return companyUnit


def checkAndUpdateCompanyCost(company_name):
    print(company_name)


class AlchemyEncoder(json.JSONEncoder):
    def __init__(self, ordered=False, list=[], exclude=False, **kwargs):
        kwargs['ensure_ascii'] = False
        kwargs['check_circular'] = False
        super(AlchemyEncoder, self).__init__(**kwargs)
        self.list = list
        self.visited_objs = []
        self.exclude = exclude
        self.ordered = ordered

    def default(self, obj):  # pylint: disable=E0202
        if isinstance(obj.__class__, DeclarativeMeta):
            # don't re-visit self
            if obj in self.visited_objs:
                return None
            self.visited_objs.append(obj)

            # an SQLAlchemy class
            fields = {}
            if(self.exclude):
                for field in [x for x in dir(obj) if not x.startswith('_') and x != 'metadata' and not x.startswith('query') and x not in self.list]:
                    fields[field] = obj.__getattribute__(field)
            elif(self.list == []):
                for field in [x for x in dir(obj) if not x.startswith('_') and x != 'metadata' and not x.startswith('query')]:
                    fields[field] = obj.__getattribute__(field)
            else:
                for field in [x for x in dir(obj) if not x.startswith('_') and x != 'metadata' and not x.startswith('query') and x in self.list]:
                    fields[field] = obj.__getattribute__(field)

            # a json-encodable dict
            return OrderedDict(sorted(fields.items(), key=lambda i: self.list.index(i[0]))) if self.ordered else fields

        return json.JSONEncoder.default(self, obj)
