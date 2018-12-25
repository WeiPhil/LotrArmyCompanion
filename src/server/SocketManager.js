const io = require("./index.js").io;

const { USER_CONNECTED, USER_DISCONNECTED, SET_COMMUNITY_CHAT, GET_COMMUNITY_CHAT, NEW_MESSAGE } = require("./Events");

const { createUser, createMessage, createChat } = require("./Factories");

let connectedUsers = {};

let communityChat = createChat();

const SOCKET_MESSAGE = "message";

module.exports = function(socket) {
  console.log("Socket Id: " + socket.id);

  console.log("CommunityChat Id: " + communityChat.id);

  let sendMessageToChatFromUser;

  //User connects with username
  socket.on(USER_CONNECTED, username => {
    if (username in connectedUsers) {
      //TODO
      // Handle duplicate user connecting (from two sockets for example)
    }

    user = createUser({ name: username });
    connectedUsers = addUser(connectedUsers, user);
    socket.user = user;

    sendMessageToChatFromUser = sendMessageToChat(user.name);

    io.emit(USER_CONNECTED, connectedUsers);
    console.log(connectedUsers);
  });

  // User disconnects from socket (refresh)
  socket.on("disconnect", () => {
    if ("user" in socket) {
      connectedUsers = removeUser(connectedUsers, socket.user.name);

      io.emit(USER_DISCONNECTED, connectedUsers);
      console.log(connectedUsers);
    }
  });

  // Every time someone reconnects resends actual communityChat id (not best way)
  socket.on(GET_COMMUNITY_CHAT, () => {
    console.log("Server got: GET_COMMUNITY_CHAT");
    io.emit(SOCKET_MESSAGE, { message: SET_COMMUNITY_CHAT, payload: communityChat });
  });

  socket.on(NEW_MESSAGE, ({ chatId, message }) => {
    console.log("Server got: NEW_MESSAGE");

    sendMessageToChatFromUser(chatId, message);
  });
};

function addUser(userList, user) {
  let newList = { ...userList };
  newList[user.name] = user;
  return newList;
}

function removeUser(userList, username) {
  let newList = { ...userList };
  delete newList[username];
  return newList;
}

function sendMessageToChat(sender) {
  return (chatId, message) => {
    const payload = { chatId: chatId, message: createMessage({ message, sender }) };

    io.emit(SOCKET_MESSAGE, { message: NEW_MESSAGE, payload: payload });
  };
}
