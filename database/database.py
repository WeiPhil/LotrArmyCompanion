import json
import os
import time

from flask import Flask, abort, jsonify, request, send_from_directory

from flask_cors import CORS, cross_origin
from flask_jwt_extended import (JWTManager, create_access_token,
                                get_jwt_identity, jwt_required)
from passlib.hash import pbkdf2_sha256

app = Flask(__name__)


@app.route("/")
def home():
    # for now return the admin's company
    return "Hello Useless database"


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False,
            use_reloader=True, port=DATABASE_PORT)
