export type GetPostMessageTruncatedArgs = {
  cutTextEnd?: number
  hideCount: number
  isExpanded: boolean
  message: string
  showedCount: number
}

export const getPostMessageTruncated = ({
  cutTextEnd,
  hideCount,
  isExpanded,
  message,
  showedCount,
}: GetPostMessageTruncatedArgs) => {
  const messageLength = message.length

  if (messageLength === 0) {
    return ''
  }

  const sliceEnd = (length: number) => (cutTextEnd ? length - cutTextEnd : length)
  const suffix = (limit: number) => (messageLength > limit ? '... ' : ' ')

  if (!isExpanded && messageLength > hideCount) {
    return `${message.slice(0, sliceEnd(hideCount))}${suffix(hideCount)}`
  }

  if (isExpanded && messageLength >= showedCount) {
    return `${message.slice(0, sliceEnd(showedCount))}${suffix(showedCount)}`
  }

  return `${message} `
}
