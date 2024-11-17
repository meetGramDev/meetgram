import { useState } from 'react'

import {
  useGetCostOfPaymentSubscriptionQuery,
  useGetCurrentPaymentQuery,
} from '@/features/profile/userManagement/services/subscription.service'
import { PayPal } from '@/shared/assets/icons/PayPal'
import { Stripe } from '@/shared/assets/icons/Stripe'
import { Button, Card } from '@/shared/ui'
import { RadioGroup, RadioGroupProps } from '@/shared/ui/radioGroup'
import Link from 'next/link'

import s from './UserManagement.module.scss'

const managerItems: CreateDataProps[] = [
  { label: 'Personal', value: 'Personal' },
  { label: 'Business', value: 'Business' },
]

export const UserManagement = () => {
  const { data } = useGetCurrentPaymentQuery()
  const { data: getCostOfPayment } = useGetCostOfPaymentSubscriptionQuery()

  const [radioOptions, setRadioOptions] = useState<RadioGroupProps>(
    createRadioGroupData(managerItems)
  )

  const costOfPaymentData = getCostOfPayment?.data.map(cost => ({
    checked: false,
    disabled: false,
    label: cost.typeDescription,
    value: cost.amount,
  }))

  // const [paymentData, setPaymentData] = useState<RadioGroupProps>({ options: costOfPaymentData })

  console.log(radioOptions)

  // const radioOptions: RadioGroupProps = {
  //   options: [
  //     { checked: true, disabled: false, label: 'Personal', value: 'Personal' },
  //     { checked: false, disabled: false, label: 'Business', value: 'Business' },
  //   ],
  // }

  const onValueChange = (value: string) => {
    const copyOptions = { ...radioOptions, options: radioOptions.options.map(option => option) }

    if (value === 'Personal') {
      copyOptions.options[0].checked = true
      copyOptions.options[1].checked = false
    }

    if (value === 'Business') {
      copyOptions.options[0].checked = false
      copyOptions.options[1].checked = true
    }
    setRadioOptions(copyOptions)
  }

  return (
    <div className={s.wrapper}>
      <AccountManagerField fieldTitle={'Current Subscription:'}>
        {data?.data?.length ? data?.data : 'You do not have subscriptions'}
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
      {radioOptions.options[1].checked && (
        <AccountManagerField fieldTitle={'Change your subscription:'}>
          {/*<RadioGroup options={} />*/}
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
      {radioOptions.options[1].checked && (
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

type CreateDataProps = {
  label: string
  value: string
}
const createRadioGroupData = (valueData: CreateDataProps[]): RadioGroupProps => {
  let returnedData

  if (valueData.length <= 1) {
    returnedData = {
      options: [
        { checked: true, disabled: false, label: valueData[0].label, value: valueData[0].value },
      ],
    }
  } else {
    returnedData = {
      options: valueData.map((el, index) => {
        if (index === 0) {
          return {
            checked: true,
            disabled: false,
            label: el.label,
            value: el.value,
          }
        } else {
          return {
            checked: false,
            disabled: false,
            label: el.label,
            value: el.value,
          }
        }
      }),
    }
  }

  return returnedData
}

//позже переписать на switch case
