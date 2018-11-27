from flask import Flask
from flask import request
from flask import jsonify

app = Flask(__name__)

PATH = './database/usersCompanies/philippe.json'


def importDatabase(path):
    with open(path, 'r') as jsonFile:
        jsonObject = []
        for l in jsonFile.readlines():
            jsonObject.append(l)

        jsonObject = "".join(jsonObject)
        return jsonify(jsonObject)


@app.route("/")
def home():
    test = importDatabase(PATH)
    print(test)
    return test  # "Hello, World!"


@app.route('/postJson', methods=['POST'])
def postJsonHandler():
    print(request.is_json)
    content = request.get_json()
    print(content)
    return 'JSON posted'


@app.route('/getJson', methods=['GET'])
def getJsonHandler():
    response = importDatabase(PATH)  # jsonify(simpleJson)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == "__main__":
    app.run(host='0.0.0.0')
    # app.run(debug=True)
