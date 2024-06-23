import { LogOut } from '@/features/auth/logOut'

export default function Profile() {
  return (
    <div>
      <LogOut email={'email@email.com'} />
    </div>
  )
}
