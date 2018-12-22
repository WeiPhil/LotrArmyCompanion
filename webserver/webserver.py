from passlib.hash import pbkdf2_sha256
from flask_jwt_extended import (JWTManager, create_access_token,
                                get_jwt_identity, jwt_required)
from flask_cors import CORS, cross_origin
from flask import Flask, abort, jsonify, request, send_from_directory
import time
import json
from flask import Flask, send_from_directory
from flask import request

import os

app = Flask(__name__, static_folder='./../build')

WEBSERVER_PORT = int(os.getenv('WEBSERVER_PORT', 3000))


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists("./../build/" + path):
        return send_from_directory('./../build', path)
    else:
        return send_from_directory('./../build', 'index.html')


CORS(app, expose_headers='Authorization')

# Setup the Flask-JWT-Extended extension
app.config['JWT_SECRET_KEY'] = 'badSecret'  # Change this!
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = False  # No tokenn expiration (easier)

jwt = JWTManager(app)

USER_COMPANIES_PATH = os.path.join("data", "usersCompanies")
USER_ARMIES_PATH = os.path.join("data", "armies")
USERS_AUTH_PATH = os.path.join("data", "users")


def loadJson(path):
    with open(path, encoding='utf-8') as f:
        data = json.load(f)
    return data


def writeJson(content, path):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(content, f)

# /!\ Temporary authentication (not worst ever but database should be linked to the db

# Provide a method to create access tokens. The create_access_token()
# function is used to actually generate the token, and we can return
# it to the caller however we choose.


@app.route('/login', methods=['POST'])
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


@app.route('/register', methods=['POST'])
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


@app.route('/postJson', methods=['POST'])
def postJsonHandler():
    print(request.is_json)
    content = request.get_json()
    print(content)
    return 'JSON posted'


@app.route('/getCompany/<user_id>', methods=['GET'])
@jwt_required
def getCompany(user_id):

    jwt_identity = get_jwt_identity()

    if(jwt_identity != user_id):
        return "Unauthorized Content", 401

    # check if company of given user exists
    company_path = os.path.join(USER_COMPANIES_PATH, user_id + ".json")
    if os.path.exists(company_path):
        # respond with data
        response = jsonify(loadJson(os.path.join(
            USER_COMPANIES_PATH, user_id + ".json")))
        return response

    # company not found
    abort(404)


@app.route('/postCompany/<user_id>', methods=['POST'])
def postCompany(user_id):
    if request.data:
        company_path = os.path.join(USER_COMPANIES_PATH, user_id + ".json")
        # TODO: check if company exist, authentication, validation...
        # for now override data
        writeJson(request.get_json(), company_path)

        return "JSON written"
    return "JSON invalid"


@app.route('/getArmy/<army_name>', methods=['GET'])
def getArmy(army_name):
    # check if army of given user exists
    company_path = os.path.join(USER_ARMIES_PATH, army_name + ".json")
    if os.path.exists(company_path):

        json = {army_name: loadJson(os.path.join(
            USER_ARMIES_PATH, army_name + ".json"))}
        # respond with data
        response = jsonify(json)
        return response

    # company not found
    abort(404)


@app.route('/getArmies', methods=['GET'])
def getArmies():
    armies = os.listdir(USER_ARMIES_PATH)

    armies_json = [json.loads(getArmy(a[:-5]).data)
                   for a in armies if a.endswith(".json")]

    formattedJson = [armies_json[0]]
    for i, army in enumerate(armies_json):
        if i != 0:
            formattedJson[0][armies[i][:-5]] = army[armies[i][:-5]]

    response = jsonify(formattedJson[0])

    return response

# Serve React App


if __name__ == "__main__":
    app.run(host='0.0.0.0', use_reloader=True,
            port=WEBSERVER_PORT, threaded=True)
