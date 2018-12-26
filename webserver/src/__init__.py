import _mysql as mariadb
from flask import Flask, g
from flask_socketio import SocketIO
from flask_jwt_extended import JWTManager
from flask_cors import CORS

import logging
import logging.handlers as loghandlers
import sys

from settings import DATABASE_CFG

def create_app(debug=False):
    """Create an application."""
    app = Flask(__name__, static_folder='./../../build')
    app.debug = debug

    handler = logging.StreamHandler(sys.stdout)
    handler.setLevel(logging.INFO)
    app.logger.addHandler(handler)
    app.logger.info("logger initialized")

    # database connection setup
    app.logger.info("connecting to database...")
    db = mariadb.connect(
        host=DATABASE_CFG["host"],
        user=DATABASE_CFG["user"],
        passwd=DATABASE_CFG["password"],
        db=DATABASE_CFG["database"]
    )
    app.logger.info("database connected")

    CORS(app, expose_headers='Authorization')

    # Setup the Flask-JWT-Extended extension
    app.config['JWT_SECRET_KEY'] = 'badSecret'  # Change this!
    # No tokenn expiration (easier)
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = False

    jwt = JWTManager(app)

    def shutdown():
        """
        Shutdown hook.
        Perform shutdown / cleanup actions here.
        """
        # closes database connection
        print("closing database ")
        db.close()

    # import modules
    from .main import main as main_module
    app.register_blueprint(main_module)
    from .auth import auth as auth_module
    app.register_blueprint(auth_module)
    # from .chat import chat as chat_module
    # app.register_blueprint(chat_module)

    return app
