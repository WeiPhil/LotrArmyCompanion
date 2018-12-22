const io = require("./index.js").io;

const { VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED, LOGOUT, COMMUNITY_CHAT, MESSAGE_SENT, MESSAGE_RECEIVED } = require("./Events");

const { createUser, createMessage, createChat } = require("./Factories");

let connectedUsers = {};

let communityChat = createChat();

module.exports = function(socket) {
  console.log("Socket Id: " + socket.id);

  let sendMessageToChatFromUser;
  //Verify Username
  socket.on(VERIFY_USER, (nickname, callback) => {
    if (isUser(connectedUsers, nickname)) {
      callback({ isUser: true, user: null });
    } else {
      callback({ isUser: false, user: createUser({ name: nickname }) });
    }
  });

  //User connects with username
  socket.on(USER_CONNECTED, user => {
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

  // User logouts
  socket.on(LOGOUT, () => {
    connectedUsers = removeUser(connectedUsers, socket.user.name);

    io.emit(USER_DISCONNECTED, connectedUsers);
    console.log(connectedUsers);
  });

  socket.on(COMMUNITY_CHAT, callback => {
    callback(communityChat);
  });

  socket.on(MESSAGE_SENT, ({ chatId, message }) => {
    console.log("Message " + message + " sent by " + socket.user + "on chat with id : " + chatId);
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

function isUser(userList, username) {
  return username in userList;
}

function sendMessageToChat(sender) {
  return (chatId, message) => {
    console.log("sent " + chatId);
    console.log(`${MESSAGE_RECEIVED}-${chatId}`);
    io.emit(`${MESSAGE_RECEIVED}-${chatId}`, createMessage({ message, sender }));
  };
}
