import { useState } from 'react'

import { useGetPaymentsQuery } from '@/features/profile/userManagement'
import {
  PaymentType,
  SubscriptionType,
} from '@/features/profile/userManagement/model/types/services'
import { useTranslate } from '@/shared/lib'
import { useDateFormatting } from '@/shared/lib/useDateFormatting'
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

import s from './MyPayments.module.scss'

export const MyPayments = () => {
  const t = useTranslate()

  const { data, isError } = useGetPaymentsQuery()

  const screen = useScreenHeightTracker()

  /** accept standard date and return European or English type */
  const formatDate = useDateFormatting

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
          <TableBody>
            {!isError && data?.length ? (
              data?.map((el, i) => {
                if (i >= getAmountFrom(from) && i <= getAmountToo(from)) {
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
            ) : (
              <TableRow>
                <TableCell>
                  <div className={s.skeleton}></div>
                </TableCell>
                <TableCell>
                  <div className={s.skeleton}></div>
                </TableCell>
                <TableCell>
                  <div className={s.skeleton}></div>
                </TableCell>
                <TableCell>
                  <div className={s.skeleton}></div>
                </TableCell>
                <TableCell>
                  <div className={s.skeleton}></div>
                </TableCell>
              </TableRow>
            )}
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
