import { ComponentProps } from 'react'

import { ImgOutline } from '@/shared/assets/icons/ImgOutline'
import { DefinePropertyType } from '@/shared/types'
import { Button } from '@/shared/ui/button/button'
import { clsx } from 'clsx'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

import s from './Photo.module.scss'

import { Delete } from './Delete'

type PhotoType = 'empty' | 'fill'

type RestProps = {
  alt: string
  src: StaticImport | string
}

type DefineRestProps<T extends PhotoType> = T extends 'empty'
  ? Partial<DefinePropertyType<RestProps, undefined>>
  : RestProps

type Props<T extends PhotoType = 'fill'> = {
  containerClassname?: string
  iconClassname?: string
  iconContainerClassname?: string
  /**
   * Delete photo callback
   */
  onDelete?: () => void
  /**
   * Define if component can be with or without photo src.
   * @type PhotoType = `empty` | `fill`. Default `fill`
   */
  type?: T
  /**
   * Style of photo component.
   */
  variant?: 'round' | 'square'
} & DefineRestProps<T> &
  Omit<ComponentProps<typeof Image>, 'alt' | 'src'>

export const Photo = <T extends PhotoType = 'fill'>({
  alt = '',
  className,
  containerClassname,
  iconClassname,
  iconContainerClassname,
  onDelete,
  src = '',
  type = 'fill' as T,
  variant = 'round',
  ...rest
}: Props<T>) => {
  return (
    <div className={clsx(s.container, containerClassname)}>
      {type === 'empty' ? (
        <div className={clsx(s.iconContainer, s[variant], iconContainerClassname, className)}>
          <ImgOutline className={clsx(s.icon, iconClassname)} />
        </div>
      ) : (
        <>
          <Image alt={alt} className={clsx(s[variant], className)} priority src={src} {...rest} />
          {onDelete && (
            <Button className={s.delete} onClick={onDelete} variant={'text'}>
              <Delete className={clsx(s.deleteIcon, iconClassname)} />
            </Button>
          )}
        </>
      )}
    </div>
  )
}
