import { Button } from '@/shared/ui'
import Image from 'next/image'

export const GithubBtn = () => {
  return (
    <Button variant={'text'}>
      <Image alt={'Login with github'} height={36} src={'github-icon.svg'} width={36} />
    </Button>
  )
}
