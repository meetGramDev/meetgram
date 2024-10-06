import { toast } from 'react-toastify'

import { serverErrorHandler } from '@/shared/lib/errorHandlers'
import { isErrorServerMessagesType } from '@/shared/types'

export function showToastError(error: unknown) {
  const msg = serverErrorHandler(error)

  if (typeof msg === 'string') {
    toast.error(msg)
  }

  if (isErrorServerMessagesType(msg)) {
    toast.error(msg[0].message)
  }
}
