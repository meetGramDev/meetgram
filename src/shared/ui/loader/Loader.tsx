import { clsx } from 'clsx'

import s from './Loader.module.scss'

type Props = {
  loaderClassName?: string
}

export const Loader = ({ loaderClassName }: Props) => {
  return <div className={clsx(s.loader, loaderClassName)}></div>
}
