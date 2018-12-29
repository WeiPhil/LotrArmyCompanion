# -*- coding: utf-8 -*-

from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy


from settings import WEBSERVER_PORT
from .app import create_app

db = SQLAlchemy()

socketio = SocketIO()

app = create_app(debug=False)
app.app_context().push()
db.init_app(app)


def start():
    socketio.init_app(app)
    socketio.run(app, host='0.0.0.0', port=WEBSERVER_PORT, use_reloader=True)
