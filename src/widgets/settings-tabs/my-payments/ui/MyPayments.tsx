import { useEffect, useState } from 'react'

import { useGetPaymentsQuery } from '@/features/profile/userManagement'
import {
  PaymentType,
  SubscriptionType,
} from '@/features/profile/userManagement/model/types/services'
/*import { PaymentType, SubscriptionType } from '@/features/profile/subscriptions'*/
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

import { invoice } from './temporaryObject/invoice'

export const MyPayments = () => {
  /** here srtart with tokkens*/
  /* const token = nextSessionApi.getSessionToken()
                                
                                                         const [tok, setTok] = useState('')
                                
                                
                                                         useEffect(() => {
                                                           token.then((e: any) => {
                                                             console.log('token : ', e.data.accessToken)
                                                             setTok(e.data.accessToken)
                                                           })
                                                         }, [])*/

  const { locale } = useRouter()

  /** які взагалі у мене є пейменти */

  const { currentData, data, isError, status } = useGetPaymentsQuery()

  console.log(
    'payments22222222 : ',
    currentData,
    '  isError: ',
    isError,
    '  data :',
    data,
    '  status: ',
    status
  )

  function formatDate(date: string): string {
    const dateForm = new Date(date)

    if (locale === 'en') {
      return `${dateForm.getMonth()}.${dateForm.getDay()}.${dateForm.getFullYear()}`
    } else {
      return `${dateForm.getDay()}.${dateForm.getMonth()}.${dateForm.getFullYear()}`
    }
  }

  /*console.log('formatDate : ', formatDate)*/

  /** experimentation function  */
  /** 1 uses*/
  function useScreenHeightTracker() {
    const [screenHeight, setScreenHeight] = useState(0)

    useEffect(() => {
      // Function to update height
      const updateHeight = () => {
        setScreenHeight(window.innerHeight)
      }

      // Set the initial height
      updateHeight()
      // Add event listener for resize
      window.addEventListener('resize', updateHeight)

      // Clean up the event listener on unmount
      return () => {
        window.removeEventListener('resize', updateHeight)
      }
    }, [])

    return screenHeight
  }

  /**amount cells on page*/

  const screen = useScreenHeightTracker()

  function amountCells() {
    const number = screen - 440

    return Math.floor(number / 36)
  }

  console.log(useScreenHeightTracker())
  console.log('cellsa: ', Math.ceil((invoice.length + 1) / amountCells()))

  /** experiment what we are putting on the page and how to choose the page*/
  const count = { from: 0, to: amountCells() }

  const [from, setFrom] = useState<number>(1)

  function amountFrom(x: number) {
    return amountCells() * x - amountCells()
  }

  function amountToo(x: number) {
    return amountCells() * x
  }

  function table() {
    if (!isError && !data?.length) {
      return invoice?.map((el, i) => {
        if (!isError) {
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
              <TableHead className={'text-left'}>Date of Payment</TableHead>
              <TableHead className={'text-left'}>End date of subscription</TableHead>
              <TableHead className={'text-left'}>Price</TableHead>
              <TableHead className={'text-left'}>Subscription Type</TableHead>
              <TableHead className={'text-left'}>Payment Type</TableHead>
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
            onPerPageChange={() => {}}
            pageCount={Math.ceil((invoice.length + 1) / amountCells())}
          />
        </div>
      </div>
    </div>
  )
}
