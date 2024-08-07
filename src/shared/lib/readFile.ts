export const readFile = (file: File) => {
  return new Promise<string>(resolve => {
    const reader = new FileReader()

    reader.addEventListener('load', () => resolve(reader.result as string))
    reader.readAsDataURL(file)
  })
}
