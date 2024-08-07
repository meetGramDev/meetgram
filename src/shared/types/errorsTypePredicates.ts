import { ServerBadResponse, ServerMessagesType } from '@/shared/api'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error
}

export function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  )
}

export function isServerBadResponseError(error: unknown): error is { data: ServerBadResponse } {
  return (
    typeof error === 'object' &&
    error != null &&
    'data' in error &&
    'statusCode' in (error.data as any)
  )
}

export const isErrorMessageString = (errMsg: unknown): errMsg is string =>
  typeof errMsg === 'string'

export const isErrorServerMessagesType = (error: unknown): error is ServerMessagesType[] =>
  Array.isArray(error) && 'field' in (error[0] as any[])
