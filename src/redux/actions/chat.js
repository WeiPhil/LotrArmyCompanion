import { socketEmitAction } from "./socket";

const { GET_COMMUNITY_CHAT, NEW_MESSAGE } = require("../../server/Events");

export const getCommunityChat = () => {
  return socketEmitAction({
    message: GET_COMMUNITY_CHAT,
    emitPayload: null
  });
};

export const sendMessage = message => {
  return socketEmitAction({
    message: NEW_MESSAGE,
    emitPayload: message
  });
};
