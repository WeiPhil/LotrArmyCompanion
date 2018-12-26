import json
import datetime
import uuid
from ..run import socketio
from flask_socketio import emit
from flask import jsonify, session

USER_CONNECTED = "USER_CONNECTED"
USER_DISCONNECTED = "USER_DISCONNECTED"
SET_COMMUNITY_CHAT = "SET_COMMUNITY_CHAT"
GET_COMMUNITY_CHAT = "GET_COMMUNITY_CHAT"
NEW_MESSAGE = "NEW_MESSAGE"

initialChatId = uuid.uuid4()

connectedUsers = []


def getTime():
    return datetime.datetime.now().strftime('%H:%m')


def createUser(name=""):
    user = {}
    user["id"] = str(uuid.uuid4())
    user["name"] = name
    return user


def createChat(messages=[], name="Community", users=[]):
    obj = {}
    obj["id"] = str(initialChatId)
    obj["messages"] = messages
    obj["name"] = name
    obj["users"] = users
    obj["typingUsers"] = []
    return obj


def createResponse(message, payload):
    response = {}
    response["message"] = message
    response["payload"] = payload
    return json.dumps(response)


def createMessage(message="", sender=""):
    newMess = {}
    newMess["id"] = str(uuid.uuid4())
    newMess["time"] = getTime()
    newMess["message"] = message
    newMess["sender"] = sender
    return newMess


def addUser(user):
    connectedUsers.append(user)


def removeUser(username):
    connectedUsers[:] = [u for u in connectedUsers if
                         u.get('name') != username]


def sendMessageToChat(sender):
    def func(chatId, message):
        payload = {}
        payload["chatId"] = chatId
        payload["message"] = createMessage(message, sender)
        emit("message", createResponse(
            "NEW_MESSAGE", payload), json=True, broadcast=True)

    return func


@socketio.on("disconnect")
def disconnect():
    removeUser(session["user"]["name"])


@socketio.on(GET_COMMUNITY_CHAT)
def getCommunityChat(message):
    emit("message", createResponse("SET_COMMUNITY_CHAT",
                                   createChat()), json=True, broadcast=True)


@socketio.on(USER_CONNECTED)
def userConnected(username):
    session["user"] = createUser(username)
    session["sendMessageToChatFromUser"] = sendMessageToChat(
        session["user"]["name"])
    addUser(session["user"])
    emit("message", createResponse(USER_CONNECTED,
                                   session["user"]), json=True, broadcast=True)


@socketio.on(USER_DISCONNECTED)
def userDisconnected(username):
    removeUser(username)


@socketio.on(NEW_MESSAGE)
def newMessage(data):
    chatId = data["chatId"]
    message = data["message"]
    session["sendMessageToChatFromUser"](chatId, message)
