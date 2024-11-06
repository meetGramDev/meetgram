import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { useCheckRecoveryCodeMutation } from '@/features/auth/forgotPassword'
import Img from '@/shared/assets/img/time-management.png'
import { CREATE_NEW_PASSWORD, FORGOT_PASSWORD } from '@/shared/config/router'
import { CONFIRMATION_CODE_LS_KEY } from '@/shared/const/consts'
import { serverErrorHandler, translate, useClientProgress } from '@/shared/lib'
import { NextPageWithLayout, isErrorMessageString } from '@/shared/types'
import { Button } from '@/shared/ui'
import { getAuthLayout } from '@/widgets/layouts'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

import style from './index.module.scss'

const Recovery: NextPageWithLayout = () => {
  const [checkRecoveryCode, { isLoading }] = useCheckRecoveryCodeMutation()
  const params = useSearchParams()
  const [checkIsFailed, setCheckIsFailed] = useState(false)

  const router = useRouter()
  const t = translate(router.locale)

  useClientProgress(isLoading)

  const confirmationCode = params?.get('code')

  useEffect(() => {
    const sendCode = async function () {
      if (confirmationCode !== null) {
        if (typeof window !== 'undefined') {
          localStorage.setItem(CONFIRMATION_CODE_LS_KEY, String(confirmationCode))

          try {
            await checkRecoveryCode({ recoveryCode: String(confirmationCode) }).unwrap()

            router.push(CREATE_NEW_PASSWORD)
          } catch (error) {
            const e = serverErrorHandler(error)

            setCheckIsFailed(true)

            if (isErrorMessageString(e)) {
              toast.error(e)
            }
          }
        }
      }
    }

    sendCode()
  }, [confirmationCode, checkRecoveryCode, router])

  return (
    <div>
      {!checkIsFailed && <div>... Check user data ...</div>}
      {checkIsFailed && (
        <div className={style.root}>
          <div className={style.textWrapper}>
            <h2 className={style.title}> {t['Email verification link expired']}</h2>
            <div>
              {
                t[
                  'Looks like the verification link has expired. Not to worry, we can send the link again'
                ]
              }
            </div>
            <Button as={Link} href={FORGOT_PASSWORD}>
              {' '}
              {t.forgoPasswordForm.forgotPassword}{' '}
            </Button>
          </div>
          <Image alt={'img'} className={style.img} priority src={Img} />
        </div>
      )}
    </div>
  )
}

Recovery.getLayout = getAuthLayout

export default Recovery
