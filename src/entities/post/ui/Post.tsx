import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

type PostType = {
  alt: string
  height?: number
  src: StaticImport | string
  width?: number
}

export const Post = ({ alt, height = 228, src, width = 234 }: PostType) => {
  return <Image alt={alt} height={height} src={src} width={width} />
}
