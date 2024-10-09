import { memo } from 'react'

import { Gallery } from '@/shared/assets/icons/Gallery'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

export type PostType = {
  alt: string
  className?: string
  height?: number
  isGallery?: boolean
  src: StaticImport | string
  width?: number
}

export const Post = memo(
  ({ alt, className, height = 300, isGallery = false, src, width = 300 }: PostType) => {
    return (
      <div className={'relative w-fit'}>
        <Image alt={alt} className={className} height={height} src={src} width={width} />

        {isGallery && (
          <div className={'absolute right-0 top-0 z-0 m-2 text-light-100'}>
            <Gallery />
          </div>
        )}
      </div>
    )
  }
)
