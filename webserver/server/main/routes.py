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


@main.route('/getCompanies/<username>', methods=['GET'])
@jwt_required
def getCompanies(username):
    from ..database.select_queries import getUserCompanies

    jwt_identity = get_jwt_identity()

    if(jwt_identity != username):
        return "Unauthorized Content", 401

    companies, code = getUserCompanies(username)
    if(companies == {} and code == 200):
        return jsonify(companies=companies, hasNoCompanies=True), code
    elif(code == 404):
        return jsonify(companies=companies, hasNoCompanies=True), code
    else:
        return jsonify(companies=companies, hasNoCompanies=False), code


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
    from ..database.select_queries import getArmies

    armies, code = getArmies()

    return jsonify(armies), code


@main.route('/getCompanyFactions', methods=['GET'])
def getCompanyFactions():
    from ..database.select_queries import getCompanyFactions

    # query user

    companyFactions, code = getCompanyFactions()

    return jsonify(companyFactions), code


@main.route('/addCompany', methods=['POST'])
def addCompany():
    from ..database.add_queries import addCompany

    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    # get submited data
    data = request.get_json()

    code = addCompany(username=data["username"], companyName=data["companyName"],
                      companyFactionName=data["companyFactionName"], companyNotes=data["companyNotes"])
    if(code == 404):
        return "An error occured retry please.", 404

    return "You have successfully added your new company!", code


@main.route('/databaseTest', methods=['GET'])
def databaseTest():
    from ..database import query

    content = query()
    # try:
    #     content =
    # except Exception as e:
    #     return str(e)

    return str(content)
