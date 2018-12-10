from flask import Flask, send_from_directory
from flask import request

import os

app = Flask(__name__, static_folder='./../build')

WEBSERVER_PORT = os.getenv('DATABASE_PORT', 3000)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists("./../build/" + path):
        return send_from_directory('./../build', path)
    else:
        return send_from_directory('./../build', 'index.html')


# Serve React App


if __name__ == "__main__":
    app.run(host='0.0.0.0', use_reloader=True,
            port=WEBSERVER_PORT, threaded=True)
