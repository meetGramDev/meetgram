import { useState } from 'react'

import { Button, Card } from '@/shared/ui'

import s from './UserManagement.module.scss'

export const UserManagement = () => {
  const [subscription, setSubscription] = useState<boolean>(false)

  return (
    <div className={s.wrapper}>
      <AccountManagerField fieldTitle={'Current Subscription:'}>
        My subscriptions
      </AccountManagerField>
      <AccountManagerField fieldTitle={'Account type:'}>
        <Button onClick={() => setSubscription(false)} variant={'text'}>
          Personal
        </Button>
        <br />
        <Button onClick={() => setSubscription(true)} variant={'text'}>
          Business
        </Button>
      </AccountManagerField>
      {subscription && (
        <AccountManagerField fieldTitle={'Change your subscription:'}>
          <Button onClick={() => {}} variant={'text'}>
            $10 per 1 day
          </Button>
          <br />
          <Button onClick={() => {}} variant={'text'}>
            $50 per 7 day
          </Button>
          <br />
          <Button onClick={() => {}} variant={'text'}>
            $100 per month
          </Button>
        </AccountManagerField>
      )}
    </div>
  )
}

type AccountManagementProps = {
  children: React.ReactNode
  fieldTitle: string
}
const AccountManagerField = ({ children, fieldTitle }: AccountManagementProps) => {
  return (
    <div className={s.fieldWrapper}>
      <h3 className={s.fieldTitle}>{fieldTitle}</h3>
      <Card className={s.card}>{children}</Card>
    </div>
  )
}

//позже переписать на switch case
