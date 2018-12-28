from . import main
import time
import json
import os
from flask import abort, jsonify, request, send_from_directory
from flask_cors import CORS, cross_origin
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from passlib.hash import pbkdf2_sha256


USER_COMPANIES_PATH = os.path.join("data", "usersCompanies")
USER_ARMIES_PATH = os.path.join("data", "armies")
USERS_AUTH_PATH = os.path.join("data", "users")


@main.route('/', defaults={'path': ''})
@main.route('/<path:path>')
def serve(path):
    """Serve static app pages."""
    if path != "" and os.path.exists("./../build/" + path):
        return send_from_directory(os.path.abspath('./../build'), path)
    else:
        return send_from_directory(os.path.abspath('./../build'), 'index.html')


def loadJson(path):
    with open(path, encoding='utf-8') as f:
        data = json.load(f)
    return data


def writeJson(content, path):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(content, f)


@main.route('/postJson', methods=['POST'])
def postJsonHandler():
    print(request.is_json)
    content = request.get_json()
    print(content)
    return 'JSON posted'


@main.route('/getCompany/<user_id>', methods=['GET'])
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


@main.route('/postCompany/<user_id>', methods=['POST'])
def postCompany(user_id):
    if request.data:
        company_path = os.path.join(USER_COMPANIES_PATH, user_id + ".json")
        # TODO: check if company exist, authentication, validation...
        # for now override data
        writeJson(request.get_json(), company_path)

        return "JSON written"
    return "JSON invalid"


@main.route('/getArmy/<army_name>', methods=['GET'])
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


@main.route('/getArmies', methods=['GET'])
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


@main.route('/databaseTest', methods=['GET'])
def databaseTest():
    from ..database import query

    try:
        query()
    except:
        return "Something went wrong in query see console for info"

    return "Test runned"
