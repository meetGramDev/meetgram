import { PropsWithChildren } from 'react'

import { HeadMeta, HeadMetaProps } from './HeadMeta'

export const Page = ({ children, ...rest }: PropsWithChildren<HeadMetaProps>) => {
  return (
    <>
      <HeadMeta {...rest} />
      <>{children}</>
    </>
  )
}
