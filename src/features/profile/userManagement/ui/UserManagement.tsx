import { useEffect, useState } from 'react'

import {
  CostOfPaymant,
  CreatePaymentRequestType,
  GetCostOfPaymentSubscriptionType,
  PaymentMethod,
  useCreatePaymentSubscriptionMutation,
  useGetCostOfPaymentSubscriptionQuery,
  useGetCurrentPaymentQuery,
} from '@/features/profile/userManagement/services/subscription.service'
import { ServerMessagesType } from '@/shared/api'
import { PayPal } from '@/shared/assets/icons/PayPal'
import { Stripe } from '@/shared/assets/icons/Stripe'
import { serverErrorHandler, useClientProgress } from '@/shared/lib'
import { Button, Card } from '@/shared/ui'
import { RadioGroup, RadioGroupProps } from '@/shared/ui/radioGroup'
import { useRouter } from 'next/router'

import s from './UserManagement.module.scss'

export type CreateDataProps = {
  label: string
  value: string
}

const managerItems: CreateDataProps[] = [
  { label: 'Personal', value: 'Personal' },
  { label: 'Business', value: 'Business' },
]

type Buttons = {
  paypal: string
  stripe: string
}
type UseFormType = {
  Payments: RadioGroupProps
}
export const UserManagement = () => {
  const { data } = useGetCurrentPaymentQuery()
  const { data: getCostOfPayment, isSuccess } = useGetCostOfPaymentSubscriptionQuery()
  const [createPayment, { isLoading }] = useCreatePaymentSubscriptionMutation()

  const router = useRouter()

  const changeCostOfPayment = (data: GetCostOfPaymentSubscriptionType): CreateDataProps[] => {
    const newData: CreateDataProps[] = data.data.map(item => {
      let changedLabel: string = item.typeDescription

      if (item.typeDescription === 'DAY') {
        changedLabel = `$${item.amount} per 1 day`
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

  const [cost, setCost] = useState<RadioGroupProps>({} as RadioGroupProps)

  const [error, setError] = useState<ServerMessagesType[] | string>('')

  useEffect(() => {
    if (getCostOfPayment) {
      newCostOfPayment = changeCostOfPayment(getCostOfPayment)
      setCost(createRadioGroupData(newCostOfPayment))
    }
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

  const handleSubmitForm = async (data: CreatePaymentRequestType) => {
    try {
      await createPayment(data)
        .unwrap()
        .then(res => {
          if (res) {
            router.push(res.url)
          }
        })
    } catch (error) {
      const err = serverErrorHandler(error)

      setError(err)
    }
  }

  const dataPacking = (paymentMethod: PaymentMethod): CreatePaymentRequestType => {
    const subscribeAmount = cost.options.find(option => option.checked)
    const subscribeCash = subscribeAmount?.value as string

    const getSubscribeAmount = getCostOfPayment?.data?.find(
      getCost => getCost.amount === +subscribeCash
    ) as CostOfPaymant

    const requestData: CreatePaymentRequestType = {
      amount: getSubscribeAmount.amount,
      baseUrl: process.env.NEXT_PUBLIC_PAYMENT_REDIRECT_URL as string,
      paymentType: paymentMethod,
      typeSubscription: getSubscribeAmount.typeDescription,
    }

    return requestData
  }

  useClientProgress(isLoading)

  return (
    <div className={s.wrapper}>
      <AccountManagerField fieldTitle={'Current Subscription:'}>
        {data?.data?.length
          ? data?.data.map(val => <div key={val.subscriptionId}>{val.dateOfPayment}</div>)
          : 'You do not have subscriptions'}
      </AccountManagerField>
      <AccountManagerField fieldTitle={'Account type:'}>
        <RadioGroup onValueChange={onValueChange} options={radioOptions.options} />
      </AccountManagerField>
      <form>
        {radioOptions.options[1].checked && (
          <AccountManagerField fieldTitle={'Change your subscription:'}>
            <RadioGroup
              className={s.radioGroup}
              onValueChange={onValueChangeSubscriptionHandler}
              options={cost.options}
            />
          </AccountManagerField>
        )}
        {typeof error === 'string' && <div>{error}</div>}
        {radioOptions.options[1].checked && (
          <div className={s.paymentWrapper}>
            <div className={s.paymentButtonWrapper}>
              <Button
                className={s.paymentButton}
                onClick={d => {
                  d.preventDefault()
                  if (getCostOfPayment) {
                    const requestData = dataPacking('PAYPAL' as PaymentMethod)

                    handleSubmitForm(requestData)
                  }
                }}
                type={'submit'}
                variant={'outlined'}
              >
                <PayPal />
              </Button>
              or
              <Button
                className={s.paymentButton}
                onClick={d => {
                  d.preventDefault()
                  if (getCostOfPayment) {
                    const requestData = dataPacking('STRIPE' as PaymentMethod)

                    handleSubmitForm(requestData)
                  }
                }}
                type={'submit'}
                variant={'outlined'}
              >
                <Stripe />
              </Button>
            </div>
          </div>
        )}
      </form>
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
