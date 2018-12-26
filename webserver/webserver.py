#!/bin/env python
from settings import DATABASE_CFG, WEBSERVER_PORT
from src import create_app, socketio

app = create_app(debug=False)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=WEBSERVER_PORT, use_reloader=True)
