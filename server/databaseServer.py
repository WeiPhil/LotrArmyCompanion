from flask import Flask, send_from_directory
from flask import request
from flask import jsonify
from flask import abort

import json
import os

app = Flask(__name__)

USER_COMPANIES_PATH = os.path.join("database", "usersCompanies")
USER_ARMIES_PATH = os.path.join("database", "armies")

DATABASE_PORT = 5000


def loadJson(path):
    with open(path, encoding='utf-8') as f:
        data = json.load(f)
    return data


def writeJson(content, path):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(content, f)


@app.route("/")
def home():
    # for now return the admin's company
    return getCompany("admin")


@app.route('/postJson', methods=['POST'])
def postJsonHandler():
    print(request.is_json)
    content = request.get_json()
    print(content)
    return 'JSON posted'


@app.route('/getCompany/<user_id>', methods=['GET'])
def getCompany(user_id):
    # check if company of given user exists
    company_path = os.path.join(USER_COMPANIES_PATH, user_id + ".json")
    if os.path.exists(company_path):
        # respond with data
        response = jsonify(loadJson(os.path.join(
            USER_COMPANIES_PATH, user_id + ".json")))
        response.headers.add('Access-Control-Allow-Origin', '*')
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


@app.route('/getArmy/<user_id>', methods=['GET'])
def getArmy(user_id):
    # check if army of given user exists
    company_path = os.path.join(USER_ARMIES_PATH, user_id + ".json")
    if os.path.exists(company_path):
        # respond with data
        response = jsonify(loadJson(os.path.join(
            USER_ARMIES_PATH, user_id + ".json")))
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    # company not found
    abort(404)


@app.route('/postArmy/<user_id>', methods=['POST'])
def postArmy(user_id):
    if request.data:
        army_path = os.path.join(USER_ARMIES_PATH, user_id + ".json")
        # TODO: check if army exist, authentication, validation...
        # for now override data
        writeJson(request.get_json(), army_path)

        return "JSON written"
    return "JSON invalid"


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
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, use_reloader=True, port=DATABASE_PORT)
