from flask import current_app, g
from flask.cli import with_appcontext
from sqlalchemy import exc
from flask_sqlalchemy import SQLAlchemy

import json
import os
from functools import reduce

from server.run import db
from .models import *
from .utility import *
from .select_queries import *
from .add_queries import *


def writeEquipementsToJson():
    equipements = getAllEquipements()
    with open(os.path.join("cachedData/equipements.json"), 'w', encoding='utf8') as outfile:
        json.dump(equipements, ensure_ascii=False, fp=outfile)


def writeSpecialRulesToJson():
    specialRules = getAllSpecialRules()
    with open(os.path.join("cachedData/special_rules.json"), 'w', encoding='utf8') as outfile:
        json.dump(specialRules, ensure_ascii=False, fp=outfile)


def writeArmiesToJson():
    armies = getArmies()
    for (army_name, army) in armies:
        if army:
            with open(os.path.join("cachedData/armies", army_name+'.json'), 'w', encoding='utf8') as outfile:
                json.dump(army, ensure_ascii=False, fp=outfile)


def writeUserCompaniesToJson(username):
    user_companies = getUserCompanies(username)
    with open(os.path.join("cachedData/user_companies", username+'.json'), 'w', encoding='utf8') as outfile:
        json.dump(user_companies, ensure_ascii=False, fp=outfile)


def writeCompanyFactionsToJson():
    company_factions = getCompanyFactions()
    with open(os.path.join("cachedData/company_factions.json"), 'w', encoding='utf8') as outfile:
        json.dump(company_factions[0], ensure_ascii=False, fp=outfile)


def query():

    # db.create_all()
    # except exc.SQLAlchemyError as error:

    # writeArmiesToJson()

    # writeSpecialRulesToJson()
    username = 'admin'
    companyName = 'The Golden Robbers'
    unitName = 'moria_goblin_warrior'
    unitRank = 'lieutenant'
    companyUnitName = 'Slurpus'
    additionalEquipement = ['shield']
    image_path = 'tempCardBackground1.jpg'

    # addCompany(companyName, username)
    # addCompanyUnit(companyName, unitName, unitRank, companyUnitName, additionalEquipement, image_path)

    # return str(session.query(CompanyUnit).filter(CompanyUnit.company_unit_name == companyUnitName).one())
    # addPromotionToCompanyUnit('Gormungur', 'attacks_increase')
    # writeArmiesToJson()
#     writeSpecialRulesToJson()
#     writeEquipementsToJson()
#     writeCompanyFactionsToJson()
    writeUserCompaniesToJson(username)

    # for company_unit_name, company_unit in getCompanyUnits(companyName).items():
    #    result = checkAndUpdateCompanyUnitCost(company_unit)

    # checkAndUpdateCompanyUnitCost(getCompanyUnit('Gormungur'))

    return getCompanyFactions()
