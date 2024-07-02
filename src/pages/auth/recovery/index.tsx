import { useEffect, useState } from 'react'

import { useCheckRecoveryCodeMutation } from '@/features/auth/forgotPassword/model/services/forgotPassword.service'
import Img from '@/shared/assets/img/time-management.png'
import { CREATE_NEW_PASSWORD, FORGOT_PASSWORD } from '@/shared/config/router'
import { CONFIRMATION_CODE_LS_KEY } from '@/shared/const/consts'
import { Button } from '@/shared/ui'
import { getAuthLayout } from '@/widgets/layouts'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

import style from './index.module.scss'

const Recovery = () => {
  const [checkRecoveryCode, { isLoading }] = useCheckRecoveryCodeMutation()
  const params = useSearchParams()
  const [checkIsFailed, setCheckIsFailed] = useState(false)

  const router = useRouter()

  const confirmationCode = params?.get('code')

  useEffect(() => {
    if (confirmationCode !== null) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(CONFIRMATION_CODE_LS_KEY, String(confirmationCode))
        checkRecoveryCode({ recoveryCode: String(confirmationCode) })
          .unwrap()
          .then(() => {
            router.push(CREATE_NEW_PASSWORD)
          })
          .catch(e => {
            setCheckIsFailed(true)
            console.log(e)
          })
      }
    }
  }, [confirmationCode, checkRecoveryCode, router])

  return (
    <div>
      {!checkIsFailed && <div>Processing ...</div>}
      {checkIsFailed && (
        <div className={style.root}>
          <div className={style.textWrapper}>
            <h2 className={style.title}>Email verification link expired</h2>
            <div>
              Looks like the verification link has expired. Not to worry, we can send the link again
            </div>
            <Button as={Link} href={FORGOT_PASSWORD}>
              {' '}
              Going to forgot password{' '}
            </Button>
          </div>
          <Image alt={'img'} className={style.img} src={Img} />
        </div>
      )}
    </div>
  )
}

Recovery.getLayout = getAuthLayout

export default Recovery
