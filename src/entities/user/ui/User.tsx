import { useFullUserProfileQuery } from '@/entities/user'
import notUserPhoto from '@/shared/assets/img/not-photo-user.jpg'
import { useClientProgress } from '@/shared/lib'
import { Button, Photo } from '@/shared/ui'
import { skipToken } from '@reduxjs/toolkit/query'
import { clsx } from 'clsx'
import Link from 'next/link'

import s from './User.module.scss'

type Props = {
  onProfileSettingsClicked: () => void
  userName: string
}

export const User = ({ onProfileSettingsClicked, userName }: Props) => {
  const { data, isLoading } = useFullUserProfileQuery(userName || skipToken)

  const userPhoto = data?.avatars?.length ? data?.avatars[0]?.url : notUserPhoto

  const classNames = {
    followers: clsx(s.userLinks, s.userFollowers),
    following: clsx(s.userLinks, s.userFollowing),
    publications: clsx(s.userLinks, s.userPublications),
  }

  useClientProgress(isLoading)

  return (
    <div className={s.userWrapper}>
      <div className={s.scrollingWrapper}>
        <div className={s.userData}>
          <Photo alt={'userPhoto'} className={s.userPhoto} src={userPhoto} />
          <div className={s.userInformation}>
            <div className={s.userName}>
              <h1 className={s.userNameTitle}>{userName}</h1>
              <Button onClick={onProfileSettingsClicked} variant={'secondary'}>
                Profile Settings
              </Button>
            </div>
            <div className={s.buttonPublications}>
              <Link className={classNames.following} href={'#'}>
                <span>{data ? data.followingCount : 0}</span>
                <br />
                Following
              </Link>

              <Link className={classNames.followers} href={'#'}>
                <span>{data ? data.followersCount : 0}</span>
                <br />
                Followers
              </Link>
              <Link className={classNames.publications} href={'#'}>
                <span>{data ? data.publicationsCount : 0}</span>
                <br />
                Publications
              </Link>
            </div>
            <div>
              <p className={s.aboutMeText}>{data?.aboutMe}</p>
            </div>
          </div>
        </div>
        {!data?.publicationsCount && (
          <div className={s.withoutPost}>
            <h1>Add first post</h1>
            <Button onClick={() => alert('Add new post')} variant={'primary'}>
              +
            </Button>
          </div>
        )}
        {!!data?.publicationsCount && (
          <div className={s.userFriendsWrapper}>
            {/*{posts?.map((post, count) => {*/}
            {/*  return (*/}
            {/*    <Post*/}
            {/*      alt={post.alt}*/}
            {/*      height={post.height}*/}
            {/*      key={count}*/}
            {/*      src={post.src}*/}
            {/*      width={post.width}*/}
            {/*    />*/}
            {/*  )*/}
            {/*})}*/}
          </div>
        )}
      </div>
    </div>
  )
}
