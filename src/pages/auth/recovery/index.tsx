import { useEffect } from 'react'

import { useCheckRecoveryCodeMutation } from '@/features/auth/forgotPassword/model/services/forgotPassword.service'
import Img from '@/shared/assets/img/time-management.png'
import { Button } from '@/shared/ui'
import { getAuthLayout } from '@/widgets/layouts'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

import style from './index.module.scss'

const Recovery = () => {
  const params = useSearchParams()
  const [checkRecoveryCode, { error, isLoading }] = useCheckRecoveryCodeMutation()

  const router = useRouter()

  const confirmationCode = params?.get('code')

  useEffect(() => {
    if (confirmationCode !== null) {
      localStorage.setItem('confirmationCode', confirmationCode as string)
      checkRecoveryCode({ recoveryCode: confirmationCode as string })
        .unwrap()
        .then(res => {
          router.push('/create-new-password')
        })
        .catch(e => {
          console.log(e)
        })
    }
  }, [confirmationCode, checkRecoveryCode])

  if (isLoading) {
    return <div>... Loading ...</div>
  }

  return (
    <div>
      {/* @ts-ignore */}
      <div className={style.root}>
        <div className={style.textWrapper}>
          <h2 className={style.title}>Email verification link expired</h2>
          <div>
            Looks like the verification link has expired. Not to worry, we can send the link again
          </div>
          <Button as={Link} href={'/forgot-password'}>
            {' '}
            Going to forgot password{' '}
          </Button>
        </div>
        <Image alt={'img'} className={style.img} src={Img} />
      </div>
    </div>
  )
}

Recovery.getLayout = getAuthLayout

export default Recovery
