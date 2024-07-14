/* eslint-disable no-console */
import { useMeQuery } from '@/entities/user'
import { UploadPhoto } from '@/features/profile/uploadUserPhoto'

export default function Profile() {
  const { data } = useMeQuery()

  console.log(data)

  return (
    <div className={'mx-auto h-[calc(100vh-240px)] w-60 pt-60'}>
      <UploadPhoto />
    </div>
  )
}
