import json
import time
import os

from flask import jsonify, request, send_from_directory
from flask_jwt_extended import (create_access_token, get_jwt_identity,
                                jwt_required)
from passlib.hash import pbkdf2_sha256

from . import auth

USERS_AUTH_PATH = os.path.join("data", "users")

# /!\ Temporary authentication (not worst ever but database should be linked to the db

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
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    username = request.json.get('username', None)
    password = request.json.get('password', None)

    # Make the user believe we do huge calculations on the server for his safety
    time.sleep(1)

    # open list of users
    usersJson = loadJson(USERS_AUTH_PATH+"/users.json")

    userIdx = -1
    for i, userData in enumerate(usersJson):
        if username == userData["username"]:
            userIdx = i

    if userIdx == -1:
        print("Bad index")
        response = jsonify({'internalErrorCode': 103})
        response.status_code = 409
        return response

    correctPassword = pbkdf2_sha256.verify(
        password, usersJson[userIdx]["password"])

    if not correctPassword:
        print("Bad password")
        response = jsonify({'internalErrorCode': 104})
        response.status_code = 409
        return response

    # Identity can be any data that is json serializable
    accessToken = create_access_token(identity=username)
    return jsonify(username=username, accessToken=accessToken), 200


@auth.route('/register', methods=['POST'])
def register():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    # get submited data
    data = request.get_json()

    # open list of users
    usersJson = loadJson(USERS_AUTH_PATH+"/users.json")

    # error 409 -> Conflict
    # check if some user with that username or email already exists in db
    # TODO check in db keys that are unique
    for user in usersJson:
        if(user["username"] == data["username"]):
            response = jsonify({'internalErrorCode': 101})
            response.status_code = 409
            return response
        if(user["email"] == data["email"]):
            response = jsonify({'internalErrorCode': 102})
            response.status_code = 409
            return response

    # Make the user believe we do huge calculations on the server for his safety
    time.sleep(1)

    # nice library that automatically stores the salt inside the hash
    hashedPassword = pbkdf2_sha256.hash(data["password"])

    data["password"] = hashedPassword

    usersJson.append(data)

    writeJson(usersJson, USERS_AUTH_PATH+"/users.json")
    return "You have successfully been registered!", 200
