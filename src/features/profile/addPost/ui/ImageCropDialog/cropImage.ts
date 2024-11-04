// create the image with a src of the base64 string
export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()

    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', error => reject(error))
    image.setAttribute('crossOrigin', 'anonymous')
    image.src = url
  })

export const getCroppedImg = async (
  imageSrc: string,
  crop: CropType,
  canvaWidth: number,
  canvaHeight: number
): Promise<string> => {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = canvaWidth
  canvas.height = canvaHeight
  ctx &&
    ctx.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, canvas.width, canvas.height)

  // return new Promise((resolve, reject) => {
  //   canvas.toBlob(file => {
  //     if (!file) {
  //       return
  //     }
  //     resolve(URL.createObjectURL(file))
  //   }, 'image/jpeg')
  // })

  return canvas.toDataURL('image/jpeg')
}

export const onCrop = async (
  cropArea: CropType | null,
  inputImg: string | undefined,
  canvaWidth: number,
  canvaHeight: number,
  cropCallback: (img: string) => void
) => {
  if (cropArea && inputImg) {
    const img = await getCroppedImg(inputImg, cropArea, canvaWidth, canvaHeight)

    cropCallback(img)
  }
}

type CropType = {
  height: number
  width: number
  x: number
  y: number
}

// export const createImage = url =>
//   new Promise((resolve, reject) => {
//     const image = new Image()
//
//     image.addEventListener('load', () => resolve(image))
//     image.addEventListener('error', error => reject(error))
//     image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
//     image.src = url
//   })
//
// export function getRadianAngle(degreeValue) {
//   return (degreeValue * Math.PI) / 180
// }
//
// export function rotateSize(width, height, rotation) {
//   const rotRad = getRadianAngle(rotation)
//
//   return {
//     height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
//     width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
//   }
// }
//
// export default async function getCroppedImg(
//   imageSrc,
//   pixelCrop,
//   rotation = 0,
//   flip = { horizontal: false, vertical: false }
// ) {
//   const image = await createImage(imageSrc)
//   const canvas = document.createElement('canvas')
//   const ctx = canvas.getContext('2d')
//
//   if (!ctx) {
//     return null
//   }
//
//   const rotRad = getRadianAngle(rotation)
//
//   // calculate bounding box of the rotated image
//   const { height: bBoxHeight, width: bBoxWidth } = rotateSize(image.width, image.height, rotation)
//
//   // set canvas size to match the bounding box
//   canvas.width = bBoxWidth
//   canvas.height = bBoxHeight
//
//   // translate canvas context to a central location to allow rotating and flipping around the center
//   ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
//   ctx.rotate(rotRad)
//   ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
//   ctx.translate(-image.width / 2, -image.height / 2)
//
//   // draw rotated image
//   ctx.drawImage(image, 0, 0)
//
//   const croppedCanvas = document.createElement('canvas')
//
//   const croppedCtx = croppedCanvas.getContext('2d')
//
//   if (!croppedCtx) {
//     return null
//   }
//
//   // Set the size of the cropped canvas
//   croppedCanvas.width = pixelCrop.width
//   croppedCanvas.height = pixelCrop.height
//
//   // Draw the cropped image onto the new canvas
//   croppedCtx.drawImage(
//     canvas,
//     pixelCrop.x,
//     pixelCrop.y,
//     pixelCrop.width,
//     pixelCrop.height,
//     0,
//     0,
//     pixelCrop.width,
//     pixelCrop.height
//   )
//
//   // As Base64 string
//   // return croppedCanvas.toDataURL('image/jpeg');
//
//   // As a blob
//   return new Promise((resolve, reject) => {
//     croppedCanvas.toBlob(file => {
//       resolve(URL.createObjectURL(file))
//     }, 'image/jpeg')
//   })
// }
