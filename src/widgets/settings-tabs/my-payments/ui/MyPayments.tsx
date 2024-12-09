import { useState } from 'react'

import { useGetPaymentsQuery } from '@/features/profile/userManagement'
import {
  PaymentType,
  SubscriptionType,
} from '@/features/profile/userManagement/model/types/services'
import { useTranslate } from '@/shared/lib'
import { useScreenHeightTracker } from '@/shared/lib/useScreenHeightTracker'
import { Pagination } from '@/shared/ui/pagination/Pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table/Table-components'
import { formatPaymentType, formatSubscriptionType } from '@/widgets/PaymentTable/lib'
import { clsx } from 'clsx'
import { useRouter } from 'next/router'

import s from './MyPayments.module.scss'

export const MyPayments = () => {
  const t = useTranslate()
  const { locale } = useRouter()

  const { data, isError } = useGetPaymentsQuery()

  const screen = useScreenHeightTracker()

  /**amount cells on page*/
  function amountCells() {
    const number = screen - 440

    return Math.floor(number / 36)
  }

  const [from, setFrom] = useState<number>(1)
  const [onPage, setOnPage] = useState<number>()

  function amountFrom(x: number) {
    const amount = amountCells()

    return onPage ? onPage * x - onPage : amount * x - amount
  }

  function amountToo(x: number) {
    const amount = amountCells()

    return onPage ? onPage * x : amount * x
  }

  /** return how many pages have to be in the pagination*/
  function pages() {
    const length = data?.length || 0

    return Math.ceil((length + 1) / (onPage ? onPage : amountCells()))
  }

  /** return array for options in pagination*/
  function arrForOptions() {
    const arr = []
    const length = data?.length || 0

    for (let i = 10; i < length; i += 10) {
      arr.push(i)
    }

    return arr
  }

  /** accept standard date and return European or English type */
  function formatDate(date: string): string {
    const dateForm = new Date(date)

    if (locale === 'en') {
      return `${dateForm.getMonth()}.${dateForm.getDay()}.${dateForm.getFullYear()}`
    } else {
      return `${dateForm.getDay()}.${dateForm.getMonth()}.${dateForm.getFullYear()}`
    }
  }

  function table() {
    if (!isError && data?.length) {
      return data?.map((el, i) => {
        if (i >= amountFrom(from) && i <= amountToo(from)) {
          return (
            <TableRow key={i}>
              <TableCell>{formatDate(el.dateOfPayment)}</TableCell>
              <TableCell>{formatDate(el.endDateOfSubscription)}</TableCell>
              <TableCell>{'$ ' + el.price}</TableCell>
              <TableCell>
                {formatSubscriptionType(el.subscriptionType as SubscriptionType)}
              </TableCell>
              <TableCell>{formatPaymentType(el.paymentType as PaymentType)}</TableCell>
            </TableRow>
          )
        }
      })
    } else {
      return (
        <TableRow>
          <TableCell>{0}</TableCell>
          <TableCell>{0}</TableCell>
          <TableCell>{0}</TableCell>
          <TableCell>{0}</TableCell>
          <TableCell>{0}</TableCell>
        </TableRow>
      )
    }
  }

  return (
    <div>
      <div>
        <Table className={s.tableSize}>
          <TableHeader>
            <TableRow>
              <TableHead className={'text-left'}>{t('Date of Payment')}</TableHead>
              <TableHead className={'text-left'}>{t('End date of subscription')}</TableHead>
              <TableHead className={'text-left'}>{t('Price')}</TableHead>
              <TableHead className={'text-left'}>{t('Subscription Type')}</TableHead>
              <TableHead className={'text-left'}>{t('Payment Type')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{table()}</TableBody>
        </Table>
      </div>
      <div className={s.paginationWrapper}>
        <div className={clsx(s.paginationSize)}>
          <Pagination
            currentPage={1}
            onPageChange={setFrom}
            onPerPageChange={setOnPage}
            options={arrForOptions()}
            pageCount={pages()}
          />
        </div>
      </div>
    </div>
  )
}
