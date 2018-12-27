#!/bin/env python
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy


from settings import WEBSERVER_PORT
import server

socketio = SocketIO()
db = SQLAlchemy()


def start():
    app = server.create_app(debug=False)
    socketio.init_app(app)
    db.init_app(app)
    socketio.run(app, host='0.0.0.0', port=WEBSERVER_PORT, use_reloader=True)
