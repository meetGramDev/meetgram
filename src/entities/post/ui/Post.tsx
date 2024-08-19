import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

export type PostType = {
  alt: string
  className?: string
  height?: number
  src: StaticImport | string
  width?: number
}

export const Post = ({ alt, className, height = 228, src, width = 234 }: PostType) => {
  return <Image alt={alt} className={className} height={height} src={src} width={width} />
}
