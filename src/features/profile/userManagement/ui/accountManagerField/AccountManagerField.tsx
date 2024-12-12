import { type ReactNode } from 'react'

import { Card } from '@/shared/ui'

import s from './AccountManagerField.module.scss'

export type AccountManagerFieldProps = {
  children: ReactNode
  fieldTitle: string
}
export const AccountManagerField = ({ children, fieldTitle }: AccountManagerFieldProps) => {
  return (
    <div className={s.fieldWrapper}>
      <h3 className={s.fieldTitle}>{fieldTitle}</h3>
      <Card className={s.card}>{children}</Card>
    </div>
  )
}
