import { UserManagement } from '@/features/profile/userManagement'
import { ACCOUNT_MANAGEMENT } from '@/shared/config/router'
import { useTranslate } from '@/shared/lib'
import { Button, Dialog } from '@/shared/ui'
import { useRouter } from 'next/router'

export type PaymentParams = {
  success: 'false' | 'true'
}

export const AccountManagement = () => {
  const t = useTranslate()
  const router = useRouter()
  const query = router.query as PaymentParams
  const isPaymentDialogOpen = query.success !== undefined
  const isSuccess = isPaymentDialogOpen && query.success === 'true'

  const handleCloseDialog = () =>
    router.replace(ACCOUNT_MANAGEMENT, undefined, { locale: router.locale, shallow: true })

  return (
    <div>
      <UserManagement />
      <Dialog
        defaultOpen={false}
        onOpenChange={handleCloseDialog}
        open={isPaymentDialogOpen}
        title={isSuccess ? t('Success') : t('subscription.Failed')}
      >
        <div className={'min-w-[160px] p-6 sm:min-w-80'}>
          <p className={'mb-14 text-regular16'}>
            {isSuccess
              ? t('subscription.message.Payment was successful!')
              : t('subscription.message.Transaction failed. Please, write to support.')}
          </p>
          <Button fullWidth onClick={handleCloseDialog}>
            {isSuccess ? t('subscription.buttons.Ok') : t('subscription.buttons.Back to payment')}
          </Button>
        </div>
      </Dialog>
    </div>
  )
}
