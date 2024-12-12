import { useState } from 'react'

import {
  PaymentType,
  SubscriptionType,
  useGetPaymentsQuery,
} from '@/features/profile/userManagement'
import { dateFormatting, useScreenHeightTracker, useTranslate } from '@/shared/lib'
import { Pagination } from '@/shared/ui'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { clsx } from 'clsx'
import { useRouter } from 'next/router'

import s from './MyPayments.module.scss'

import { formatPaymentType, formatSubscriptionType } from '../lib'
import { Skeleton } from './skeleton/Skeleton'

export const MyPayments = () => {
  const t = useTranslate()
  const { locale } = useRouter()
  const { data, isError, isLoading } = useGetPaymentsQuery()

  const screen = useScreenHeightTracker()

  /**amount cells on page*/
  const getAmountCells = () => {
    const number = screen - 440

    return Math.floor(number / 36)
  }

  const [from, setFrom] = useState<number>(1)
  const [onPage, setOnPage] = useState<number>()

  const getAmountFrom = (x: number) => {
    const amount = getAmountCells()

    return onPage ? onPage * x - onPage : amount * x - amount
  }

  const getAmountToo = (x: number) => {
    const amount = getAmountCells()

    return onPage ? onPage * x : amount * x
  }

  /** return how many pages have to be in the pagination*/
  const getPages = () => {
    const length = data?.length || 0

    return Math.ceil((length + 1) / (onPage ? onPage : getAmountCells()))
  }

  /** return array for options in pagination*/
  const makeListForOptions = () => {
    const arr = []
    const length = data?.length || 0

    for (let i = 10; i < length; i += 10) {
      arr.push(i)
    }

    return arr
  }

  if (isError || data?.length === 0) {
    return <div className={'mt-24 text-center'}>{t('subscription.message.No transactions')}</div>
  }

  return (
    <div>
      <div>
        <Table className={s.tableSize}>
          <TableHeader>
            <TableRow>
              <TableHead className={'w-80 text-left'}>{t('Date of Payment')}</TableHead>
              <TableHead className={'w-80 text-left'}>{t('End date of subscription')}</TableHead>
              <TableHead className={'w-[100px] text-left'}>{t('Price')}</TableHead>
              <TableHead className={'w-80 text-left'}>{t('Subscription Type')}</TableHead>
              <TableHead className={'w-80 text-left'}>{t('Payment Type')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading &&
              [1, 1, 1, 1].map((el, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                )
              })}
            {!isError &&
              data?.length &&
              data?.map((el, i) => {
                if (i >= getAmountFrom(from) && i <= getAmountToo(from)) {
                  return (
                    <TableRow key={i}>
                      <TableCell className={'font-medium'}>
                        {dateFormatting(el.dateOfPayment, { locale: locale || 'en' })}
                      </TableCell>
                      <TableCell className={'font-medium'}>
                        {dateFormatting(el.endDateOfSubscription, { locale: locale || 'en' })}
                      </TableCell>
                      <TableCell className={'font-medium'}>{'$ ' + el.price}</TableCell>
                      <TableCell className={'font-medium'}>
                        {formatSubscriptionType(el.subscriptionType)}
                      </TableCell>
                      <TableCell className={'font-medium'}>
                        {formatPaymentType(el.paymentType)}
                      </TableCell>
                    </TableRow>
                  )
                }
              })}
          </TableBody>
        </Table>
      </div>
      {makeListForOptions().length > 0 && (
        <div className={s.paginationWrapper}>
          <div className={clsx(s.paginationSize)}>
            <Pagination
              currentPage={1}
              onPageChange={setFrom}
              onPerPageChange={setOnPage}
              options={makeListForOptions()}
              pageCount={getPages()}
            />
          </div>
        </div>
      )}
    </div>
  )
}
