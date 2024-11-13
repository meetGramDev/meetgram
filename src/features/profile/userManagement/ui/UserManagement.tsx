import { useState } from 'react'

import { PayPal } from '@/shared/assets/icons/PayPal'
import { Stripe } from '@/shared/assets/icons/Stripe'
import { Button, Card } from '@/shared/ui'
import { RadioGroup, RadioGroupProps } from '@/shared/ui/radioGroup'
import Link from 'next/link'

import s from './UserManagement.module.scss'

export const UserManagement = () => {
  const [radioOptions, setRadioOptions] = useState({
    options: [
      { checked: true, disabled: false, label: 'Personal', value: 'Personal' },
      { checked: false, disabled: false, label: 'Business', value: 'Business' },
    ],
  })

  // const radioOptions: RadioGroupProps = {
  //   options: [
  //     { checked: true, disabled: false, label: 'Personal', value: 'Personal' },
  //     { checked: false, disabled: false, label: 'Business', value: 'Business' },
  //   ],
  // }

  const onValueChange = (value: string) => {
    radioOptions.options.map(option => {
      if (option.value === value) {
        setRadioOptions({ ...radioOptions, options: [...radioOptions.options] })
      }
    })
  }

  return (
    <div className={s.wrapper}>
      <AccountManagerField fieldTitle={'Current Subscription:'}>
        My subscriptions
      </AccountManagerField>
      <AccountManagerField fieldTitle={'Account type:'}>
        <RadioGroup onValueChange={onValueChange} options={radioOptions.options}></RadioGroup>

        {/*<Button onClick={() => setSubscription(false)} variant={'text'}>*/}
        {/*  Personal*/}
        {/*</Button>*/}
        {/*<br />*/}
        {/*<Button onClick={() => setSubscription(true)} variant={'text'}>*/}
        {/*  Business*/}
        {/*</Button>*/}
      </AccountManagerField>
      {radioOptions.options[1].value && (
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
