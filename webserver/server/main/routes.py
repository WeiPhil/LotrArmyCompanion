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


@main.route('/getSpecialRules', methods=['GET'])
def getSpecialRules():
    from ..database.select_queries import getAllSpecialRules

    # query user

    specialRules, code = getAllSpecialRules()

    return jsonify(specialRules), code


@main.route('/addCompany', methods=['POST'])
def addCompany():
    from ..database.add_queries import addCompany

    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    # get submited data
    data = request.get_json()

    company, code = addCompany(username=data["username"], companyName=data["companyName"],
                               companyFactionName=data["companyFactionName"], companyNotes=data["companyNotes"])
    if(code == 404):
        return jsonify(message="An error occured retry please."), 404

    return jsonify(newCompany=company, message="You have successfully added your new company!"), code


@main.route('/addCompanyUnit', methods=['POST'])
def addCompanyUnit():
    from ..database.add_queries import addCompanyUnit

    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    # get submited data
    data = request.get_json()
    # companyName, unitName, unitRank, companyUnitName, additionalEquipement
    updated_company, code = addCompanyUnit(companyName=data["companyName"], unitName=data["unitName"],
                                           unitRank=data["unitRank"], companyUnitName=data["companyUnitName"], additionalEquipement=data["additionalEquipement"], image_path=data["image_path"])
    if(code == 404):
        return jsonify(message="An error occured retry please."), 404

    return jsonify(updatedCompany=updated_company, message="You have successfully added a new company unit!"), code


@main.route('/addPromotionToCompanyUnit', methods=['POST'])
def addPromotionToCompanyUnit():
    from ..database.add_queries import addPromotionToCompanyUnit

    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    # get submited data
    data = request.get_json()
    companyUnitName = data["companyUnitName"]
    promotionName = data["promotionName"]

    updated_company_unit, code = addPromotionToCompanyUnit(
        companyUnitName, promotionName)

    if(code == 404):
        return jsonify(message="An error occured retry please."), 404

    return jsonify(promotedCompanyUnit=updated_company_unit, message="You have successfully added a promotion!"), code


@main.route('/databaseTest', methods=['GET'])
def databaseTest():
    from ..database import query

    content = query()
    # try:
    #     content =
    # except Exception as e:
    #     return str(e)

    return str(content)
