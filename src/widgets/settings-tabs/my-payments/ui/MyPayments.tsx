import { useEffect, useState } from 'react'

import { PaymentType, SubscriptionType } from '@/features/profile/subscriptions'
import { nextSessionApi } from '@/shared/api/_next-auth'
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

export const MyPayments = () => {
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

  const invoice = [
    {
      dateOfPayment: '2024-11-25T21:35:38.482Z',
      endDateOfSubscription: '2024-11-25T21:35:38.482Z',
      paymentType: 'STRIPE',
      price: 0,
      subscriptionId: 'string',
      subscriptionType: 'MONTHLY',
      userId: 0,
    },
    {
      dateOfPayment: '2024-11-25T21:35:38.482Z',
      endDateOfSubscription: '2024-11-25T21:35:38.482Z',
      paymentType: 'STRIPE',
      price: 0,
      subscriptionId: 'string',
      subscriptionType: 'MONTHLY',
      userId: 0,
    },
    {
      dateOfPayment: '2024-11-25T21:35:38.482Z',
      endDateOfSubscription: '2024-11-25T21:35:38.482Z',
      paymentType: 'STRIPE',
      price: 0,
      subscriptionId: 'string',
      subscriptionType: 'MONTHLY',
      userId: 0,
    },
    {
      dateOfPayment: '2024-11-25T21:35:38.482Z',
      endDateOfSubscription: '2024-11-25T21:35:38.482Z',
      paymentType: 'STRIPE',
      price: 0,
      subscriptionId: 'string',
      subscriptionType: 'MONTHLY',
      userId: 0,
    },
    {
      dateOfPayment: '2024-11-25T21:35:38.482Z',
      endDateOfSubscription: '2024-11-25T21:35:38.482Z',
      paymentType: 'STRIPE',
      price: 0,
      subscriptionId: 'string',
      subscriptionType: 'MONTHLY',
      userId: 0,
    },
    {
      dateOfPayment: '2024-11-25T21:35:38.482Z',
      endDateOfSubscription: '2024-11-25T21:35:38.482Z',
      paymentType: 'STRIPE',
      price: 0,
      subscriptionId: 'string',
      subscriptionType: 'MONTHLY',
      userId: 0,
    },
    {
      dateOfPayment: '2024-11-25T21:35:38.482Z',
      endDateOfSubscription: '2024-11-25T21:35:38.482Z',
      paymentType: 'STRIPE',
      price: 0,
      subscriptionId: 'string',
      subscriptionType: 'MONTHLY',
      userId: 0,
    },
    {
      dateOfPayment: '2024-11-25T21:35:38.482Z',
      endDateOfSubscription: '2024-11-25T21:35:38.482Z',
      paymentType: 'STRIPE',
      price: 0,
      subscriptionId: 'string',
      subscriptionType: 'MONTHLY',
      userId: 0,
    },
    {
      dateOfPayment: '2024-11-25T21:35:38.482Z',
      endDateOfSubscription: '2024-11-25T21:35:38.482Z',
      paymentType: 'STRIPE',
      price: 0,
      subscriptionId: 'string',
      subscriptionType: 'MONTHLY',
      userId: 0,
    },
    {
      dateOfPayment: '2024-11-25T21:35:38.482Z',
      endDateOfSubscription: '2024-11-25T21:35:38.482Z',
      paymentType: 'STRIPE',
      price: 0,
      subscriptionId: 'string',
      subscriptionType: 'MONTHLY',
      userId: 0,
    },
    {
      dateOfPayment: '2024-11-25T21:35:38.482Z',
      endDateOfSubscription: '2024-11-25T21:35:38.482Z',
      paymentType: 'STRIPE',
      price: 0,
      subscriptionId: 'string',
      subscriptionType: 'MONTHLY',
      userId: 0,
    },
    {
      dateOfPayment: '2024-11-25T21:35:38.482Z',
      endDateOfSubscription: '2024-11-25T21:35:38.482Z',
      paymentType: 'STRIPE',
      price: 0,
      subscriptionId: 'string',
      subscriptionType: 'MONTHLY',
      userId: 0,
    },
    {
      dateOfPayment: '2024-11-25T21:35:38.482Z',
      endDateOfSubscription: '2024-11-25T21:35:38.482Z',
      paymentType: 'STRIPE',
      price: 0,
      subscriptionId: 'string',
      subscriptionType: 'MONTHLY',
      userId: 0,
    },
    {
      dateOfPayment: '2024-11-25T21:35:38.482Z',
      endDateOfSubscription: '2024-11-25T21:35:38.482Z',
      paymentType: 'STRIPE',
      price: 0,
      subscriptionId: 'string',
      subscriptionType: 'MONTHLY',
      userId: 0,
    },
    {
      dateOfPayment: '2024-11-25T21:35:38.482Z',
      endDateOfSubscription: '2024-11-25T21:35:38.482Z',
      paymentType: 'STRIPE',
      price: 0,
      subscriptionId: 'string',
      subscriptionType: 'MONTHLY',
      userId: 0,
    },
    {
      dateOfPayment: '2024-11-25T21:35:38.482Z',
      endDateOfSubscription: '2024-11-25T21:35:38.482Z',
      paymentType: 'STRIPE',
      price: 0,
      subscriptionId: 'string',
      subscriptionType: 'MONTHLY',
      userId: 0,
    },
    {
      dateOfPayment: '2024-11-25T21:35:38.482Z',
      endDateOfSubscription: '2024-11-25T21:35:38.482Z',
      paymentType: 'STRIPE',
      price: 0,
      subscriptionId: 'string',
      subscriptionType: 'MONTHLY',
      userId: 0,
    },
  ]

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

  return (
    <div>
      MyPayments
      <Table>
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
          {invoice.map((el, i) => (
            <TableRow key={i}>
              <TableCell>{formatDate(el.dateOfPayment)}</TableCell>
              <TableCell>{formatDate(el.endDateOfSubscription)}</TableCell>
              <TableCell>{'$ ' + el.price}</TableCell>
              <TableCell>
                {formatSubscriptionType(el.subscriptionType as SubscriptionType)}
              </TableCell>
              <TableCell>{formatPaymentType(el.paymentType as PaymentType)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
