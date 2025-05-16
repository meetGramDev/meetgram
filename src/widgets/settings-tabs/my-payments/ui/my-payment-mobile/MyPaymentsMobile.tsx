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
                  <text>{t('Date of Payment')}:</text>
                  <text>{dateFormatting(el.dateOfPayment, { locale: locale || 'en' })}</text>
                </li>
                <li className={s.list}>
                  <text>{t('End date of subscription')}:</text>
                  <text>
                    {dateFormatting(el.endDateOfSubscription, { locale: locale || 'en' })}
                  </text>
                </li>
                <li className={s.list}>
                  <text>{t('Price')}</text>
                  <text>{'$ ' + el.price}</text>
                </li>
                <li className={s.list}>
                  <text>{t('Subscription Type')}:</text>
                  <text>{formatSubscriptionType(el.subscriptionType)}</text>
                </li>
                <li className={s.list}>
                  <text>{t('Payment Type')}:</text>
                  <text>{formatPaymentType(el.paymentType)}</text>
                </li>
              </ul>
            </div>
          )
        })}
    </div>
  )
}
