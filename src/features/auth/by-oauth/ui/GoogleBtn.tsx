import googleIcon from '@/shared/assets/icons/google-icon.svg'
import { Button } from '@/shared/ui'
import Image from 'next/image'

import { useLoginGoogle } from '../lib/useLoginGoogle'

export const GoogleBtn = () => {
  const handleLogin = useLoginGoogle()

  return (
    <Button onClick={() => handleLogin()} variant={'text'}>
      <Image alt={'Login with google'} height={36} priority src={googleIcon} width={36} />
    </Button>
  )
}
