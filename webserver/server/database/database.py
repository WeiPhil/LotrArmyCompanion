from flask import current_app, g
from flask.cli import with_appcontext
from sqlalchemy import exc
from flask_sqlalchemy import SQLAlchemy

import json
import os
from functools import reduce

from server.run import db
from .models import *
from .utility import writeModelToJson, AlchemyEncoder
from .queries import *


def writeEquipementsToJson():
    equipements = getAllEquipements()
    with open(os.path.join("cachedData/equipements", "equipements.json"), 'w', encoding='utf8') as outfile:
        json.dump(equipements, ensure_ascii=False, fp=outfile)


def writeSpecialRulesToJson():
    specialRules = getAllSpecialRules()
    with open(os.path.join("cachedData/special_rules", "special_rules.json"), 'w', encoding='utf8') as outfile:
        json.dump(specialRules, ensure_ascii=False, fp=outfile)


def writeArmiesToJson():
    armies = getAllArmies()
    for (army_name, army) in armies:
        if army:
            with open(os.path.join("cachedData/armies", army_name+'.json'), 'w', encoding='utf8') as outfile:
                json.dump(army, ensure_ascii=False, fp=outfile)


def query():

    # except exc.SQLAlchemyError as error:

    # writeArmiesToJson()

    # writeSpecialRulesToJson()
    result = createCompanyUnit()

    return result
