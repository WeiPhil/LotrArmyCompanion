from flask import current_app, g
from flask.cli import with_appcontext
from sqlalchemy import exc
from flask_sqlalchemy import SQLAlchemy

import json

from server.run import db
from .models import *
from .utility import writeModelToJson


def query():

    # json_str = """{"name": "SuperJson", "alignment": "bad"}"""
    # obj = json.loads(json_str)

    # newFaction = Faction(name='The Shire', alignment='good')
    # db.session.add(newFaction)

    try:
        db.session.commit()
    except exc.SQLAlchemyError as error:
        print(str(error))
    # sys.stdout.reconfigure(encoding='utf-8')

    print(writeModelToJson(Faction.query.all(), isList=True))
    return "Noting"
