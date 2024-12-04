import { useEffect, useState } from 'react'

import { PaymentType, SubscriptionType } from '@/features/profile/subscriptions'
import { nextSessionApi } from '@/shared/api/_next-auth'
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
import { useRouter } from 'next/router'

import s from './MyPayments.module.scss'

import { invoice } from './temporaryObject/invoice'

export const MyPayments = () => {
  /** here srtart with tokkens*/
  const token = nextSessionApi.getSessionToken()

  const [tok, setTok] = useState('')
  const { locale } = useRouter()

  useEffect(() => {
    token.then((e: any) => {
      console.log('token : ', e.data.accessToken)
      setTok(e.data.accessToken)
    })
  }, [])

  /** які взагалі у мене є пейменти */
  /*axios
                                                                                                                                                                                                                                                                                                                                            .get('https://inctagram.work/api/v1/subscriptions/current-payment-subscriptions', {
                                                                                                                                                                                                                                                                                                                                              headers: {
                                                                                                                                                                                                                                                                                                                                                Authorization: `Bearer ${tok}`, // Add the token here
                                                                                                                                                                                                                                                                                                                                                accept: 'application/json',
                                                                                                                                                                                                                                                                                                                                              },
                                                                                                                                                                                                                                                                                                                                            })
                                                                                                                                                                                                                                                                                                                                            .then(response => {
                                                                                                                                                                                                                                                                                                                                              console.log('tok', response.data?.data) // Successful response
                                                                                                                                                                                                                                                                                                                                            })
                                                                                                                                                                                                                                                                                                                                            .catch(error => {
                                                                                                                                                                                                                                                                                                                                              console.error('Error:', error.response?.status, error.response?.data) // Detailed error
                                                                                                                                                                                                                                                                                                                                            })*/

  /* const date = new Date('2024-11-25T21:35:38.482Z')
                                      
                                      
                                                                                                                                                                                                                                                                           const formatDate = `${date.getDate()} : ${date.getMonth()}`*/

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
          <TableBody>
            {invoice.map((el, i) => {
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
            })}
          </TableBody>
        </Table>
      </div>
      <Pagination
        className={s.paginationSize}
        currentPage={1}
        onPageChange={setFrom}
        onPerPageChange={() => {}}
        pageCount={Math.ceil((invoice.length + 1) / amountCells())}
      />
    </div>
  )
}
