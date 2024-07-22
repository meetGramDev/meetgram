import { useLoginGithub } from '@/features/auth/by-oauth'
import { useClientProgress } from '@/shared/lib'

const RedirectFromGithub = () => {
  useLoginGithub()
  useClientProgress(true)

  return <p className={'pt-[50vh] text-center text-regular16'}>Wait a second...</p>
}

export default RedirectFromGithub
