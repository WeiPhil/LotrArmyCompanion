#!/bin/env python
from settings import WEBSERVER_PORT
from server import create_app
from flask_socketio import SocketIO

socketio = SocketIO()

def start():
    app = create_app(debug=False)
    socketio.init_app(app)
    socketio.run(app, host='0.0.0.0', port=WEBSERVER_PORT, use_reloader=True)
