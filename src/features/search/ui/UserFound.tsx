import { Photo } from '@/entities/photo'
import { UserFoundPropsType } from '@/features/search'
import notUserPhoto from '@/shared/assets/img/not-photo-user.jpg'
import { HOME } from '@/shared/config/router'
import { Button } from '@/shared/ui'
import Link from 'next/link'

export const UserFound = ({ firstName, lastName, url, userId, userName }: UserFoundPropsType) => {
  return (
    <>
      <div key={userId}>
        <div className={'mt-[12px] flex'}>
          <Button
            as={Link}
            className={'flex items-center justify-start text-light-100'}
            href={`${HOME}/${userId}`}
            variant={'text'}
          >
            <Photo alt={'Friend avatar'} height={36} src={url || notUserPhoto} width={36} />
          </Button>

          <div className={'ml-[12px]'}>
            <Button
              as={Link}
              className={
                'flex items-center justify-start text-[14px] font-bold leading-6 text-light-100'
              }
              href={`${HOME}/${userId}`}
              variant={'link'}
            >
              {userName}
            </Button>
            <p className={'text-[14px] text-light-900'}>{`${firstName} ${lastName}`}</p>
          </div>
        </div>
      </div>
    </>
  )
}
