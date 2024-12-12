import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { ServerMessagesType } from '@/shared/api'
import { PayPal } from '@/shared/assets/icons/PayPal'
import { Stripe } from '@/shared/assets/icons/Stripe'
import { dateFormatting, serverErrorHandler, useClientProgress } from '@/shared/lib'
import { Button, RadioGroup, RadioGroupProps } from '@/shared/ui'
import { useRouter } from 'next/router'

import s from './UserManagement.module.scss'

import { changeCostOfPayment, createRadioGroupData } from '../lib'
import {
  useCancelAutoRenewalMutation,
  useCreatePaymentSubscriptionMutation,
  useGetCostOfPaymentSubscriptionQuery,
  useGetCurrentPaymentQuery,
} from '../model/services/subscription.service'
import { CreatePaymentRequestType, PaymentType } from '../model/types/services'
import { AccountManagerField } from './accountManagerField'

const managerItems: RadioGroupProps['options'] = [
  { label: 'Personal', value: 'Personal' },
  { label: 'Business', value: 'Business' },
]

export const UserManagement = () => {
  const { data } = useGetCurrentPaymentQuery()
  const { data: costOfPaymentData } = useGetCostOfPaymentSubscriptionQuery()
  const [createPayment, { isLoading }] = useCreatePaymentSubscriptionMutation()
  const [cancelAutoRenewal, { isLoading: cancelAutoRenewalLoading }] =
    useCancelAutoRenewalMutation()
  const locale = useRouter().locale

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

  const dataPacking = (paymentMethod: PaymentType): CreatePaymentRequestType => {
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
      baseUrl:
        `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/${router.locale}${process.env.NEXT_PUBLIC_PAYMENT_REDIRECT_URL}` ||
        '',
      paymentType: paymentMethod,
      typeSubscription: getSubscribeAmount.typeDescription,
    }

    return requestData
  }

  const cancelAutoRenewalHandler = async () => {
    try {
      if (data?.hasAutoRenewal) {
        await cancelAutoRenewal().unwrap()
        toast.success('Auto-renewal has been turned off')
      }
    } catch (error) {
      const err = serverErrorHandler(error)

      if (typeof err === 'string') {
        toast.error(err)
      }

      setError(err)
    }
  }

  const lastDate = data?.data?.length ? data.data[data.data.length - 1] : null

  useClientProgress(isLoading || cancelAutoRenewalLoading)

  return (
    <div className={s.wrapper}>
      <AccountManagerField fieldTitle={'Current Subscription:'}>
        {lastDate !== null ? (
          <div className={'flex flex-row gap-16'}>
            <div className={'flex flex-col gap-3'}>
              <p className={'text-light-1000'}>Expire at</p>
              <span>
                {dateFormatting(lastDate.endDateOfSubscription, { locale: locale || 'en' })}
              </span>
            </div>
            {lastDate.autoRenewal && (
              <div className={'flex flex-col gap-3'}>
                <p className={'text-light-1000'}>Next payment</p>
                <span>
                  {dateFormatting(lastDate.endDateOfSubscription, {
                    addDays: 1,
                    locale: locale || 'en',
                  })}
                </span>
              </div>
            )}
          </div>
        ) : (
          'You do not have subscriptions'
        )}
      </AccountManagerField>
      {data && data.data && data.data.length > 0 && (
        <Button
          className={'-mt-2 mb-4 w-min whitespace-nowrap'}
          disabled={data?.hasAutoRenewal === false || cancelAutoRenewalLoading}
          onClick={cancelAutoRenewalHandler}
          variant={'secondary'}
        >
          {data?.hasAutoRenewal ? 'Cancel Auto-Renewal' : 'Auto-Renewal disabled'}
        </Button>
      )}
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
                    const requestData = dataPacking('PAYPAL')

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
                    const requestData = dataPacking('STRIPE')

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
