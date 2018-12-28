from flask import current_app, g
from flask.cli import with_appcontext
from sqlalchemy import exc
from flask_sqlalchemy import SQLAlchemy
import json

from server.run import db
from .models import *


def query():
    newFaction = Faction(name="Numenor", alignment='good')
    db.session.add(newFaction)

    try:
        db.session.commit()
    except exc.SQLAlchemyError as error:
        print(str(error))

    print(Faction.query.all())
