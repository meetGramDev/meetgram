import { useState } from 'react'

import { PayPal } from '@/shared/assets/icons/PayPal'
import { Stripe } from '@/shared/assets/icons/Stripe'
import { Button, Card } from '@/shared/ui'
import { RadioGroup, RadioGroupProps } from '@/shared/ui/radioGroup'
import Link from 'next/link'

import s from './UserManagement.module.scss'

export const UserManagement = () => {
  const [subscription, setSubscription] = useState<boolean>(false)

  const radioOptions: RadioGroupProps = {
    options: [
      { label: 'Personal', value: 'Personal' },
      { label: 'Business', value: 'Business' },
    ],
  }

  return (
    <div className={s.wrapper}>
      <AccountManagerField fieldTitle={'Current Subscription:'}>
        My subscriptions
      </AccountManagerField>
      <AccountManagerField fieldTitle={'Account type:'}>
        <RadioGroup options={radioOptions.options}></RadioGroup>

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
      <div className={s.paymentWrapper}>
        <Button
          as={Link}
          className={s.paymentButton}
          href={'https://www.paypal.com/ru/home'}
          variant={'outlined'}
        >
          <PayPal />
        </Button>
        or
        <Button
          as={Link}
          className={s.paymentButton}
          href={'https://stripe.com/'}
          variant={'outlined'}
        >
          <Stripe />
        </Button>
      </div>
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
