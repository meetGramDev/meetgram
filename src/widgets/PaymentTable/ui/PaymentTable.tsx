import { PaymentModel } from '@/features/profile/subscriptions'
import { cn } from '@/shared/lib'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table/Table-components'

import { formatPaymentType, formatSubscriptionType } from '../lib'

type Props = {
  data: PaymentModel[]
  tableClassname?: string
} & (
  | {
      title: string
      titleClassname?: string
      withTitle?: true
    }
  | {
      title?: never
      titleClassname?: never
      withTitle?: false
    }
)

export const PaymentTable = ({ data, tableClassname, title, titleClassname, withTitle }: Props) => {
  return (
    <Table className={cn(tableClassname)}>
      {withTitle && <TableCaption className={cn(titleClassname)}>{title}</TableCaption>}
      <TableHeader>
        <TableRow>
          <TableHead className={'w-80 text-left'}>Date of Payment</TableHead>
          <TableHead className={'w-80 text-left'}>End date of subscription</TableHead>
          <TableHead className={'w-[100px] text-left'}>Price</TableHead>
          <TableHead className={'w-80 text-left'}>Subscription Type</TableHead>
          <TableHead className={'w-80 text-left'}>Payment Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(el => (
          <TableRow key={el.subscriptionId}>
            <TableCell className={'font-medium'}>
              {new Date(el.dateOfPayment).toLocaleDateString()}
            </TableCell>
            <TableCell className={'font-medium'}>
              {new Date(el.endDateOfSubscription).toLocaleDateString()}
            </TableCell>
            <TableCell className={'font-medium'}>${el.price}</TableCell>
            <TableCell className={'font-medium'}>
              {formatSubscriptionType(el.subscriptionType)}
            </TableCell>
            <TableCell className={'font-medium'}>{formatPaymentType(el.paymentType)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
