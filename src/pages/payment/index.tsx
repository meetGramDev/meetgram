import { useEffect } from 'react'

import { selectIsUserAuth } from '@/entities/user'
import { ACCOUNT_MANAGEMENT } from '@/shared/config/router'
import { useAppSelector } from '@/shared/config/storeHooks'
import { sleep, useTranslate } from '@/shared/lib'
import { Loader } from '@/shared/ui'
import { PaymentParams } from '@/widgets/settings-tabs/account-management'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'

export const getServerSideProps = async function (ctx) {
  const query = ctx.query as PaymentParams

  if (!query.success) {
    return {
      notFound: true,
    }
  }

  if (query.success === 'false') {
    return {
      props: {
        success: false,
      },
    }
  }

  return {
    props: {
      success: true,
    },
  }
} satisfies GetServerSideProps<{ success: boolean }>

export default function Index({ success }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  const t = useTranslate()
  const isAuth = useAppSelector(selectIsUserAuth)

  useEffect(() => {
    if (isAuth) {
      sleep(2000).then(() => {
        router.replace(`${ACCOUNT_MANAGEMENT}=''&success=${success}`)
      })
    }
  }, [isAuth])

  return (
    <div className={'w-full'}>
      <div className={'m-auto mt-[30dvh] flex w-1/2 items-center justify-center'}>
        <Loader />
      </div>
      <p className={'mt-7 px-6 text-center text-regular16'}>
        {t('subscription.You will be redirected to the Meetgram. It might take a few seconds.')}
        <br />
        {t(
          "subscription.Please do not refresh the page or click the 'Back' or 'Close' button of your browser."
        )}
      </p>
    </div>
  )
}
