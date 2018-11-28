from flask import Flask
from flask import request
from flask import jsonify

import json

app = Flask(__name__)

PATH = './database/usersCompanies/philippe.json'


def loadJson(path):
    with open(path) as f:
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
def getJsonHandler():
    response = jsonify(loadJson(PATH))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == "__main__":
    app.run(host='0.0.0.0')
    # app.run(debug=True)
