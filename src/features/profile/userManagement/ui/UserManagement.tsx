import { useEffect, useState } from 'react'

import {
  GetCostOfPaymentSubscriptionType,
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
  const { data: getCostOfPayment, isSuccess } = useGetCostOfPaymentSubscriptionQuery()

  const changeCostOfPayment = (data: GetCostOfPaymentSubscriptionType): CreateDataProps[] => {
    if (data === undefined) {
      return
    }
    const newData: CreateDataProps[] = data.data.map(item => {
      let changedLabel: string = item.typeDescription

      if (item.typeDescription === 'DAY') {
        changedLabel = `$${item.amount} per 1 day`
        // changedLabel = '$10 per 1 day'
      } else if (item.typeDescription === 'WEEKLY') {
        changedLabel = `$${item.amount} per 7 day`
      } else if (item.typeDescription === 'MONTHLY') {
        changedLabel = `$${item.amount} per month`
      }

      return {
        label: changedLabel,
        value: `${item.amount}`,
      }
    })

    return newData
  }
  let newCostOfPayment

  const [radioOptions, setRadioOptions] = useState<RadioGroupProps>(
    createRadioGroupData(managerItems)
  )

  const [cost, setCost] = useState<RadioGroupProps | undefined>(
    createRadioGroupData(changeCostOfPayment(newCostOfPayment))
  )

  useEffect(() => {
    newCostOfPayment = changeCostOfPayment(getCostOfPayment)
    setCost(createRadioGroupData(newCostOfPayment))
  }, [getCostOfPayment])

  const onValueChange = (value: string) => {
    setRadioOptions({
      ...radioOptions,
      options: radioOptions.options.map(option => {
        if (option.value === value) {
          return { ...option, checked: true }
        } else {
          return { ...option, checked: false }
        }
      }),
    })
  }

  const onValueChangeSubscriptionHandler = (value: string) => {
    setCost({
      ...cost,
      options: cost.options.map((item, count) => {
        if (item.value === value) {
          return { ...item, checked: true }
        } else {
          return { ...item, checked: false }
        }
      }),
    })
  }

  return (
    <div className={s.wrapper}>
      <AccountManagerField fieldTitle={'Current Subscription:'}>
        {data?.data?.length ? data?.data : 'You do not have subscriptions'}
      </AccountManagerField>
      <AccountManagerField fieldTitle={'Account type:'}>
        <RadioGroup onValueChange={onValueChange} options={radioOptions.options} />
      </AccountManagerField>
      {radioOptions.options[1].checked && (
        <AccountManagerField fieldTitle={'Change your subscription:'}>
          <RadioGroup
            className={s.radioGroup}
            onValueChange={onValueChangeSubscriptionHandler}
            options={cost.options}
          />
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

export type CreateDataProps = {
  label: string
  value: string
}
const createRadioGroupData = (valueData: CreateDataProps[]): RadioGroupProps => {
  let returnedData

  if (!valueData) {
    return
  }
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
