import { useLoginGithub } from '@/features/auth/by-oauth'

const RedirectFromGithub = () => {
  useLoginGithub()

  return <div></div>
}

export default RedirectFromGithub
