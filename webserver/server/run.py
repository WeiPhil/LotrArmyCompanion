# -*- coding: utf-8 -*-

from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy as _BaseSQLAlchemy

from settings import WEBSERVER_PORT
from .app import create_app


class SQLAlchemy(_BaseSQLAlchemy):
    def apply_pool_defaults(self, app, options):
        super(SQLAlchemy, self).apply_pool_defaults(app, options)
        options["pool_pre_ping"] = True


db = SQLAlchemy()

socketio = SocketIO()

app = create_app(debug=False)
app.app_context().push()
db.init_app(app)


def start():
    socketio.init_app(app)
    socketio.run(app, host='0.0.0.0', port=WEBSERVER_PORT, use_reloader=True)
