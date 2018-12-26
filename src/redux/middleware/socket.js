import io from "socket.io-client";

import { SOCKET_EMIT, DISCONNECT } from "../actions/types";

import { USER_CONNECTED, USER_DISCONNECTED, CONNECTED_TO_SOCKET, DISCONNECTED_FROM_SOCKET } from "../actions/types";

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

          dispatch({
            type: CONNECTED_TO_SOCKET,
            payload: null
          });
          console.log("Connected to socket throug middleware");
        });

        socket.on("disconnect", () => {
          socket.emit(USER_DISCONNECTED, getState().auth.username);
          dispatch({
            type: DISCONNECTED_FROM_SOCKET,
            payload: null
          });
          console.log("Disconnected from socket");
        });

        // respond to send events
        socket.on("message", data => {
          const { message, payload } = JSON.parse(data);
          // console.log();
          // Dispatch the action to the reducer
          dispatch({
            type: message,
            payload: payload
          });
        });
      }

      if (connected && action.type === DISCONNECT) {
        connected = false;
        dispatch({
          type: DISCONNECTED_FROM_SOCKET,
          payload: null
        });
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
