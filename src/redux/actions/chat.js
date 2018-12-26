import { socketEmitAction } from "./socket";

import { GET_COMMUNITY_CHAT, NEW_MESSAGE, RESET_MESSAGE_COUNTER } from "./types";

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

export const resetMessageCounter = () => {
  return { type: RESET_MESSAGE_COUNTER, payload: null };
};
