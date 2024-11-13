import { useState } from 'react'

import { Button, Dialog } from '@/shared/ui'

export type PaymentParams = {
  success: 'false' | 'true'
}

export type AccountManagementProps = {
  success?: boolean
}
export const AccountManagement = ({ success }: AccountManagementProps) => {
  const [open, setOpen] = useState(true)

  const handleCloseDialog = () => setOpen(false)

  return (
    <div>
      AccountManagementTab
      <Dialog
        defaultOpen={false}
        onOpenChange={setOpen}
        open={open}
        title={success ? 'Success' : 'Failed'}
      >
        <div>
          <p className={'text-regular14'}>
            {success ? 'Payment was successful!' : 'Transaction failed. Please, write to support'}
          </p>
          <Button onClick={handleCloseDialog}>{success ? 'Ok' : 'Back to payment'}</Button>
        </div>
      </Dialog>
    </div>
  )
}
