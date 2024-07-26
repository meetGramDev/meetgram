import githubIcon from '@/shared/assets/icons/github-icon.svg'
import { Button } from '@/shared/ui'
import Image from 'next/image'

export const GithubBtn = () => {
  const handleLogin = () => {
    window.location.assign('https://inctagram.work/api/v1/auth/github/login')
  }

  return (
    <Button onClick={handleLogin} variant={'text'}>
      <Image alt={'Login with github'} height={36} priority src={githubIcon} width={36} />
    </Button>
  )
}
