import { SOCKET_EMIT } from "../actions/types";

export function socketEmitAction({ message, emitPayload }) {
  return {
    type: SOCKET_EMIT,
    payload: {
      message,
      emitPayload
    }
  };
}
