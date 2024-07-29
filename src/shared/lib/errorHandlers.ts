import { ServerMessagesType } from '../api/types'
import { StatusCode } from '../enum/enums'
import {
  isErrorMessageString,
  isErrorServerMessagesType,
  isErrorWithMessage,
  isFetchBaseQueryError,
  isServerBadResponseError,
} from '../types'

/**
 * A function handles errors provided from RTK Query
 * @param error error object
 * @returns error message or array of messages
 */
export function serverErrorHandler(error: any): ServerMessagesType[] | string {
  let errMsg: string = ''

  if (isFetchBaseQueryError(error)) {
    if ('error' in error) {
      errMsg = 'Network error'
    } else if (isServerBadResponseError(error)) {
      switch (error.data.statusCode) {
        case StatusCode.BadRequest:
          if (isErrorMessageString(error.data.messages)) {
            errMsg = error.data.messages
          }

          if (isErrorServerMessagesType(error.data.messages)) {
            return error.data.messages
          }
          break

        case StatusCode.Unauthorized:
          if (isErrorMessageString(error.data.messages)) {
            errMsg = error.data.messages
          }
          break

        case StatusCode.NotFound:
          errMsg = 'Invalid server request'
          break
        default:
          errMsg = 'Some error was occurred'
          break
      }
    }
  } else if (isErrorWithMessage(error)) {
    errMsg = error.message
  }

  return errMsg
}
