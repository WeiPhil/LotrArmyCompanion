import json
import time
import os

from flask import jsonify, request, send_from_directory
from flask_jwt_extended import (create_access_token, get_jwt_identity,
                                jwt_required)
from passlib.hash import pbkdf2_sha256
from sqlalchemy import exc

from . import auth


USERS_AUTH_PATH = os.path.join("data", "users")


# Provide a method to create access tokens. The create_access_token()
# function is used to actually generate the token, and we can return
# it to the caller however we choose.


def loadJson(path):
    with open(path, encoding='utf-8') as f:
        data = json.load(f)
    return data


def writeJson(content, path):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(content, f)


@auth.route('/login', methods=['POST'])
def login():
    from ..database.select_queries import getUser

    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    username = request.json.get('username', None)
    password = request.json.get('password', None)

    # query user

    user_object, internalErrorCode = getUser(username)

    if(internalErrorCode == 103):
        response = jsonify({'internalErrorCode': 103})
        response.status_code = 409
        return response

    correctPassword = pbkdf2_sha256.verify(
        password, user_object["password_hash"])

    if not correctPassword:
        print("Incorrect password")
        response = jsonify({'internalErrorCode': 104})
        response.status_code = 409
        return response

    # Identity can be any data that is json serializable
    accessToken = create_access_token(identity=username)
    return jsonify(username=username, accessToken=accessToken), 200


@auth.route('/register', methods=['POST'])
def register():
    from ..database.add_queries import addUser
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    # get submited data
    data = request.get_json()
    # create hashed password
    hashedPassword = pbkdf2_sha256.hash(data["password"])

    internalErrorCode = addUser(
        data['username'], data['firstName'], data['lastName'], data['email'], hashedPassword)

    if(internalErrorCode == 101):
        response = jsonify({'internalErrorCode': 101})
        response.status_code = 409
        return response
    if(internalErrorCode == 102):
        response = jsonify({'internalErrorCode': 102})
        response.status_code = 409
        return response

    return "You have successfully been registered!", 200
