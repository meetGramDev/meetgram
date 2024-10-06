/**
 * Verifying both the file extension and the MIME type
 * @param file - The file to check
 * @param allowedTypes - An array of allowed MIME types (e.g., ['image/jpeg'])
 */
export function isImgFileTypeValid(file: File, allowedTypes: string[]): boolean {
  const mimeType = file.type

  if (!allowedTypes.includes(mimeType)) {
    return false
  }

  return true
}
