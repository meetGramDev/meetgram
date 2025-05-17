export enum WS_MESSENGER_EVENTS_PATHS {
  ERROR = 'error',
  MESSAGE_DELETED = 'message-deleted',
  MESSAGE_SEND = 'message-send',
  RECEIVE_MESSAGE = 'receive-message',
  UPDATE_MESSAGE = 'update-message',
}

export type WS_ErrorType = {
  error: string
  message: string
}
