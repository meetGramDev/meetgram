import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { changeCostOfPayment } from '@/features/profile/userManagement/lib/changeCostOfPayment'
import { createRadioGroupData } from '@/features/profile/userManagement/lib/createRadioGroupData'
import {
  CreatePaymentRequestType,
  PaymentMethod,
  useCreatePaymentSubscriptionMutation,
  useGetCostOfPaymentSubscriptionQuery,
  useGetCurrentPaymentQuery,
} from '@/features/profile/userManagement/services/subscription.service'
import { AccountManagerField } from '@/features/profile/userManagement/ui/accountManagerField/AccountManagerField'
import { ServerMessagesType } from '@/shared/api'
import { PayPal } from '@/shared/assets/icons/PayPal'
import { Stripe } from '@/shared/assets/icons/Stripe'
import { serverErrorHandler, useClientProgress } from '@/shared/lib'
import { Button, Card } from '@/shared/ui'
import { RadioGroup, RadioGroupProps } from '@/shared/ui/radioGroup'
import { useRouter } from 'next/router'

import s from './UserManagement.module.scss'

const managerItems: RadioGroupProps['options'] = [
  { label: 'Personal', value: 'Personal' },
  { label: 'Business', value: 'Business' },
]

export const UserManagement = () => {
  const { data } = useGetCurrentPaymentQuery()
  const { data: costOfPaymentData } = useGetCostOfPaymentSubscriptionQuery()
  const [createPayment, { isLoading }] = useCreatePaymentSubscriptionMutation()

  const router = useRouter()
  let newCostOfPayment

  const [radioOptions, setRadioOptions] = useState<RadioGroupProps>(
    createRadioGroupData(managerItems)
  )

  const [cost, setCost] = useState<RadioGroupProps>({} as RadioGroupProps)

  const [error, setError] = useState<ServerMessagesType[] | string>('')

  useEffect(() => {
    if (costOfPaymentData) {
      newCostOfPayment = changeCostOfPayment(costOfPaymentData)
      setCost(createRadioGroupData(newCostOfPayment))
    }
  }, [costOfPaymentData])

  const onValueChange = (value: string) => {
    setRadioOptions({
      ...radioOptions,
      options: radioOptions.options.map(option => {
        return { ...option, checked: option.value === value }
      }),
    })
  }

  const onValueChangeSubscriptionHandler = (value: string) => {
    setCost({
      ...cost,
      options: cost.options.map((item, count) => {
        return { ...item, checked: item.value === value }
      }),
    })
  }

  const handleSubmitForm = async (data: CreatePaymentRequestType) => {
    try {
      const res = await createPayment(data).unwrap()

      if (res) {
        router.push(res.url)
      }
    } catch (error) {
      const err = serverErrorHandler(error)

      if (typeof err === 'string') {
        toast.error(err)
      }

      setError(err)
    }
  }

  const dataPacking = (paymentMethod: PaymentMethod): CreatePaymentRequestType => {
    const subscribeAmount = cost.options.find(option => option.checked)
    const subscribeCash = subscribeAmount?.value

    if (!subscribeCash) {
      throw new Error('Subscribe cash is not defined')
    }
    if (!costOfPaymentData) {
      throw new Error('costOfPaymentData is not defined')
    }

    const getSubscribeAmount = costOfPaymentData.data.find(
      getCost => getCost.amount === +subscribeCash
    )

    if (!getSubscribeAmount) {
      throw new Error('getSubscribeAmount is not defined')
    }
    const requestData: CreatePaymentRequestType = {
      amount: getSubscribeAmount.amount,
      baseUrl: process.env.NEXT_PUBLIC_PAYMENT_REDIRECT_URL || '',
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
        {typeof error === 'string' && <div className={s.error}>{error}</div>}
        {radioOptions.options[1].checked && (
          <div className={s.paymentWrapper}>
            <div className={s.paymentButtonWrapper}>
              <Button
                className={s.paymentButton}
                onClick={e => {
                  e.preventDefault()
                  if (costOfPaymentData !== undefined) {
                    const requestData = dataPacking(PaymentMethod.paypal)

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
                onClick={e => {
                  e.preventDefault()
                  if (costOfPaymentData !== undefined) {
                    const requestData = dataPacking(PaymentMethod.stripe)

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
