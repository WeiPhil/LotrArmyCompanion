from flask import Flask
from flask import request
from flask import jsonify

app = Flask(__name__)

PATH = './database/mistyMountains.json'


def importDatabase(path):
    with open(path, 'r') as jsonFile:
        jsonObject = []
        for l in jsonFile.readlines():
            jsonObject.append(l)

        jsonObject = "".join(jsonObject)
        return jsonify(jsonObject)


simpleJson = {
    "device": "TemperatureSensor",
    "value": "20",
    "timestamp": "25/01/2017 10:10:05"
}


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
