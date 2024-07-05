export type ServerMessagesType = {
  field: string
  message: string
}

export type ServerBadResponse = {
  error: string
  messages: ServerMessagesType
  statusCode: number
}
