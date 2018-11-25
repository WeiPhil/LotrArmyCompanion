from flask import Flask
from flask import request
from flask import jsonify

app = Flask(__name__)

simpleJson = {
    "device": "TemperatureSensor",
    "value": "20",
    "timestamp": "25/01/2017 10:10:05"
}


@app.route("/")
def home():
    return "Hello, World!"


@app.route('/postJson', methods=['POST'])
def postJsonHandler():
    print(request.is_json)
    content = request.get_json()
    print(content)
    return 'JSON posted'


@app.route('/getJson', methods=['GET'])
def getJsonHandler():
    print("Got: " + str(simpleJson))
    response = jsonify(simpleJson)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == "__main__":
    app.run(debug=True)
