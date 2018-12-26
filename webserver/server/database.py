import _mysql as mariadb
from flask import current_app, g
from flask.cli import with_appcontext
from settings import DATABASE_CFG


def get_db():
    if 'db' not in g:

        g.db = mariadb.connect(
            host=DATABASE_CFG["host"],
            user=DATABASE_CFG["user"],
            passwd=DATABASE_CFG["password"],
            db=DATABASE_CFG["database"]
        )
    return g.db


def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()

def init_db():
    # does nothing for now
    pass

def init_app(app):
    app.teardown_appcontext(close_db)
