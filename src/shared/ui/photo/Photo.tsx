import { ComponentProps } from 'react'

import { ImgOutline } from '@/shared/assets/icons/ImgOutline'
import { Button } from '@/shared/ui/button/button'
import clsx from 'clsx'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

import s from './Photo.module.scss'

import { Delete } from './Delete'

type PhotoType = 'empty' | 'fill'

type RestProps = {
  alt: string
  src: StaticImport | string
}

type DefineRestProps<T extends PhotoType> = T extends 'fill' ? RestProps : Partial<RestProps>

type Props<T extends PhotoType = 'fill'> = {
  containerClassname?: string
  iconClassname?: string
  onDelete?: () => void
  type?: T
  variant?: 'round' | 'square'
} & DefineRestProps<T> &
  Omit<ComponentProps<typeof Image>, 'alt' | 'src'>

export const Photo = <T extends PhotoType = 'fill'>({
  alt = '',
  className,
  containerClassname,
  iconClassname,
  onDelete,
  src = '',
  type = 'fill' as T,
  variant = 'round',
  ...rest
}: Props<T>) => {
  return (
    <div className={clsx(s.container, containerClassname)}>
      {type === 'empty' ? (
        <div className={clsx(s.iconContainer, s[variant], containerClassname)}>
          <ImgOutline className={clsx(s.icon, iconClassname)} />
        </div>
      ) : (
        <>
          <Image alt={alt} className={clsx(s[variant], className)} src={src} {...rest} />
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
