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


def query():
    factionName = "angmar"

    # except exc.SQLAlchemyError as error:

    # print(writeModelToJson(Unit.query.all(), isList=True, filename='units'))
    factionJson = getUnits(factionName)
    with open(os.path.join("queriedData", factionName+'.json'), 'w', encoding='utf8') as outfile:
        json.dump(factionJson, ensure_ascii=False, fp=outfile)

    return factionJson
