import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const { NEW_MESSAGE, SET_COMMUNITY_CHAT } = require("../../server/Events");

const persistConfig = {
  key: "chat",
  storage: storage,
  whitelist: ["chats"]
};

const chatInitialState = {
  activeChat: null,
  chats: []
};

const chatReducer = (state = chatInitialState, action) => {
  //   console.log("Data action type => ", action.type);
  switch (action.type) {
    case SET_COMMUNITY_CHAT: {
      const communityChat = action.payload;
      const oldChats = state.chats;

      // If chat doesn't exist add it to the chats
      if (oldChats.filter(chat => chat.name === communityChat.name).length === 0) {
        return { ...state, activeChat: communityChat, chats: [...oldChats, communityChat] };
      } else {
        let newChats = oldChats.map(chat => {
          if (chat.name === communityChat.name) {
            chat.id = communityChat.id;
            communityChat.id = chat.id;
            communityChat.messages = chat.messages;
          }
          return chat;
        });
        return { ...state, activeChat: communityChat, chats: newChats };
      }
    }

    case NEW_MESSAGE: {
      const oldChats = state.chats;
      const { chatId, message } = action.payload;

      let newActiveChat = state.activeChat;
      let newChats = oldChats.map(chat => {
        const messages = chat.messages;
        if (chat.id === chatId) {
          chat.messages = [...messages, message];
        }
        if (chat.id === newActiveChat.id) {
          newActiveChat.messages = [...messages, message];
        }

        return chat;
      });

      return { ...state, activeChat: newActiveChat, chats: newChats };
    }

    default:
      return state;
  }
};

export default persistReducer(persistConfig, chatReducer);
