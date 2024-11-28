import { PaymentModel } from '@/features/profile/userManagement/model/types/services'
import { Meta, StoryObj } from '@storybook/react'

import { PaymentTable } from './PaymentTable'

const meta = {
  component: PaymentTable,
  tags: ['autodocs'],
  title: 'Shared/Table',
} satisfies Meta<typeof PaymentTable>

export default meta
type Story = StoryObj<typeof meta>

const mockData: PaymentModel[] = [
  {
    dateOfPayment: '2024-11-13T17:06:08.525Z',
    endDateOfSubscription: '2024-12-31T17:06:08.525Z',
    paymentType: 'PAYPAL',
    price: 100,
    subscriptionId: 'jfaksei239jfma',
    subscriptionType: 'DAY',
    userId: 0,
  },
  {
    dateOfPayment: '2024-11-13T17:06:08.525Z',
    endDateOfSubscription: '2024-12-31T17:06:08.525Z',
    paymentType: 'STRIPE',
    price: 100,
    subscriptionId: 'jfakseidsfma',
    subscriptionType: 'WEEKLY',
    userId: 0,
  },
  {
    dateOfPayment: '2024-11-13T17:06:08.525Z',
    endDateOfSubscription: '2024-12-31T17:06:08.525Z',
    paymentType: 'CREDIT_CARD',
    price: 100,
    subscriptionId: 'jfafsa6534239jfma',
    subscriptionType: 'MONTHLY',
    userId: 0,
  },
]

export const PaymentTableDefault: Story = {
  args: { data: mockData },
}
