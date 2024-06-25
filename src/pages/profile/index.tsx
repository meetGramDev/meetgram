import { useMeQuery } from '@/entities/user'

export default function Profile() {
  const { data } = useMeQuery()

  console.log(data)

  return <div>Profile</div>
}
