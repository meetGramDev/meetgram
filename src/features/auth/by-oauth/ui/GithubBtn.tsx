import { BASE_URL } from '@/shared/api'
import { Button } from '@/shared/ui'
import Image from 'next/image'

export const GithubBtn = () => {
  const handleLogin = () => {
    window.location.assign('https://inctagram.work/api/v1/auth/github/login')
  }

  return (
    <Button onClick={handleLogin} variant={'text'}>
      <Image alt={'Login with github'} height={36} src={'github-icon.svg'} width={36} />
    </Button>
  )
}
