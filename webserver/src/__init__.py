import _mysql as mariadb
from flask import Flask, g
from flask_socketio import SocketIO
from flask_jwt_extended import JWTManager
from flask_cors import CORS

from . import database

import logging
import logging.handlers as loghandlers
import sys


def create_app(debug=False):
    """Create an application."""
    app = Flask(__name__, static_folder='./../../build')
    app.debug = debug

    handler = logging.StreamHandler(sys.stdout)
    handler.setLevel(logging.INFO)
    app.logger.addHandler(handler)
    app.logger.info("logger initialized")

    # database setup
    database.init_app(app)

    CORS(app, expose_headers='Authorization')

    # Setup the Flask-JWT-Extended extension
    app.config['JWT_SECRET_KEY'] = 'badSecret'  # TODO: change secret
    # No token expiration (easier)
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = False

    jwt = JWTManager(app)

    # import modules
    from .main import main as main_module
    app.register_blueprint(main_module)
    from .auth import auth as auth_module
    app.register_blueprint(auth_module)

    return app
