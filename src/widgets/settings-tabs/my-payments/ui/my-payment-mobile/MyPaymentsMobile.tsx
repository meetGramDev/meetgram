import React from 'react'

import { useGetPaymentsQuery } from '@/features/profile/userManagement'
import { dateFormatting, useTranslate } from '@/shared/lib'
import { formatPaymentType, formatSubscriptionType } from '@/widgets/settings-tabs/my-payments/lib'
import { useRouter } from 'next/router'

import s from './MyPaymentsMobile.module.scss'

export const MyPaymentsMobile = () => {
  const t = useTranslate()
  const { locale } = useRouter()
  const { data, isError, isLoading } = useGetPaymentsQuery()

  return (
    <div>
      {!isError &&
        data?.length &&
        data?.map((el, i) => {
          return (
            <div className={s.wrapper} key={i}>
              <ul className={s.unOrderList}>
                <li className={s.list}>
                  <p>{t('Date of Payment')}:</p>
                  <p>{dateFormatting(el.dateOfPayment, { locale: locale || 'en' })}</p>
                </li>
                <li className={s.list}>
                  <p>{t('End date of subscription')}:</p>
                  <p>{dateFormatting(el.endDateOfSubscription, { locale: locale || 'en' })}</p>
                </li>
                <li className={s.list}>
                  <p>{t('Price')}</p>
                  <p>{'$ ' + el.price}</p>
                </li>
                <li className={s.list}>
                  <p>{t('Subscription Type')}:</p>
                  <p>{formatSubscriptionType(el.subscriptionType)}</p>
                </li>
                <li className={s.list}>
                  <p>{t('Payment Type')}:</p>
                  <p>{formatPaymentType(el.paymentType)}</p>
                </li>
              </ul>
            </div>
          )
        })}
    </div>
  )
}
