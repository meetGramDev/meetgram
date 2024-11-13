import { useEffect } from 'react'

import { selectIsUserAuth } from '@/entities/user'
import { PROFILE_SETTINGS } from '@/shared/config/router'
import { useAppSelector } from '@/shared/config/storeHooks'
import { Loader } from '@/shared/ui'
import { AccountManagementProps, PaymentParams } from '@/widgets/settings-tabs/account-management'
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
} satisfies GetServerSideProps<AccountManagementProps>

export default function Index({ success }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  const isAuth = useAppSelector(selectIsUserAuth)

  useEffect(() => {
    if (isAuth) {
      // router.replace(ACCOUNT_MANAGEMENT)
      router.replace(PROFILE_SETTINGS)
    }
  }, [isAuth])

  return (
    <div className={'w-full'}>
      Payment: {success ? 'Оплата прошла' : 'Оплата не прошла'}
      <div className={'m-auto mt-[30dvh] flex w-1/2 items-center justify-center'}>
        <Loader />
      </div>
      <p className={'mt-7 px-6 text-center text-regular16'}>
        You will be redirected to the Meetgram. It might take a few seconds.
        <br />
        Please do not refresh the page or click the &quot;Back&quot; or &quot;Close&quot; button of
        your browser.
      </p>
    </div>
  )
}
