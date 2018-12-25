import io from "socket.io-client";

import { SOCKET_EMIT, DISCONNECT } from "../actions/types";

const { USER_CONNECTED, USER_DISCONNECTED } = require("../../server/Events");

let connected = false;
let currentUsername = null;

const createSocketMiddleware = socketUrl => {
  return ({ dispatch, getState }) => {
    let socket;

    return next => action => {
      next(action);

      // if already connected
      if (!connected && getState().auth.loggedIn) {
        connected = true;
        socket = io.connect(
          socketUrl,
          { reconnection: true, reconnectionDelay: 500, reconnectionAttempts: 10 }
        );

        socket.on("connect", () => {
          currentUsername = getState().auth.username;
          socket.emit(USER_CONNECTED, currentUsername);
          console.log("Connected to socket throug middleware");
        });

        socket.on("disconnect", () => {
          socket.emit(USER_DISCONNECTED, getState().auth.username);
          console.log("Disconnected from socket");
        });

        // respond to send events
        socket.on("message", ({ message, payload }) => {
          // Dispatch the action to the reducer
          dispatch({
            type: message,
            payload: payload
          });
        });
      }

      if (connected && action.type === DISCONNECT) {
        connected = false;
        socket.disconnect();
      }

      if (action.type === SOCKET_EMIT) {
        const { message, emitPayload } = action.payload;
        socket.emit(message, emitPayload);
      } else {
        return;
      }
    };
  };
};

export default createSocketMiddleware;
