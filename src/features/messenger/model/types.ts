import { Avatar } from '@/shared/types'

export enum MessageStatus {
  READ = 'READ',
  RECEIVED = 'RECEIVED',
  SENT = 'SENT',
}

export enum MessageType {
  IMAGE = 'IMAGE',
  TEXT = 'TEXT',
  VOICE = 'VOICE',
}

export type MessageModelType = {
  createdAt: string
  id: number
  messageText: string
  messageType: MessageType
  ownerId: number
  receiverId: number
  status: MessageStatus
  updatedAt: string
}

export type LastMessageViewType = {
  avatars: Avatar[]
  userName: string
} & MessageModelType

type AllMessagesResponseType<T> = {
  items: T[]
  pageSize: number
  totalCount: number
}

export type GetAllDialogsResponseType = AllMessagesResponseType<LastMessageViewType>
export type GetAllMessagesArgsType = {
  cursor?: number
  pageSize?: number
  searchName?: string
}

export type DialogMessagesArgsType = {
  cursor?: number
  dialoguePartnerId: number
  pageSize?: number
  searchName?: string
}
export type DialogMessagesResponseType = AllMessagesResponseType<MessageModelType>

export type MessageSendRequestType = {
  message: string
  receiverId: number
}

export type UpdateMessageStatusArgsType = {
  ids: number[]
}
