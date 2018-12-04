from flask import Flask
from flask import request
from flask import jsonify

import json
import os

app = Flask(__name__)

PATH = './database/usersCompanies/admin.json'


def loadJson(path):
    with open(path, encoding='utf-8') as f:
        data = json.load(f)
    return data


@app.route("/")
def home():
    test = loadJson(PATH)
    print(test)
    return test  # "Hello, World!"


@app.route('/postJson', methods=['POST'])
def postJsonHandler():
    print(request.is_json)
    content = request.get_json()
    print(content)
    return 'JSON posted'


@app.route('/getCompany', methods=['GET'])
def getCompany():
    response = jsonify(loadJson(PATH))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/getArmies', methods=['GET'])
def getArmies():
    armies = os.listdir("./database/armies")
    armiesJson = [loadJson("./database/armies/"+army) for army in armies]
    formattedJson = [armiesJson[0]]
    for i, army in enumerate(armiesJson):
        if i != 0:
            formattedJson[0][armies[i][:-5]] = army[armies[i][:-5]]

    response = jsonify(formattedJson[0])
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == "__main__":
    app.run(host='0.0.0.0')
    # app.run(debug=True)
