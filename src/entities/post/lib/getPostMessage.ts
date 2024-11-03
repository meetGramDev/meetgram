export const getPostMessage = (
  message: string,
  hideCount: number,
  showedCount: number,
  isExpanted: boolean
) => {
  const messageLength = message.length

  if (messageLength === 0) {
    return ''
  } else if (messageLength < hideCount) {
    return `${message} `
  } else if (messageLength > hideCount && !isExpanted) {
    return `${message.slice(0, hideCount - 11)}... `
  } else if (messageLength > showedCount && isExpanted) {
    return `${message.slice(0, showedCount - 11)}... `
  } else if (messageLength < showedCount && isExpanted) {
    return `${message} `
  }
}
