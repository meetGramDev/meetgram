import { UserResponseWithPosts } from '@/entities/user'
import { Button, Photo } from '@/shared/ui'
import { clsx } from 'clsx'
import Link from 'next/link'

import s from './User.module.scss'

import notUserPhoto from '../../../shared/assets/img/not-photo-user.jpg'

type ProfileUserType = {
  onProfileSettingsClicked: () => void
} & Omit<
  UserResponseWithPosts,
  'city' | 'createdAt' | 'dateOfBirth' | 'firstName' | 'isFollowedBy' | 'isFollowing' | 'lastName'
>

export const User = ({
  aboutMe,
  avatars,
  followersCount = 0,
  followingCount = 0,
  id,
  onProfileSettingsClicked,
  publicationsCount = 0,
  userName = 'User Name',
}: ProfileUserType) => {
  const userPhoto = Array.isArray(avatars.length) ? avatars[0]?.url : notUserPhoto

  const classNames = {
    followers: clsx(s.userLinks, s.userFollowers),
    following: clsx(s.userLinks, s.userFollowing),
    publications: clsx(s.userLinks, s.userPublications),
  }

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
                <span>{followingCount}</span>
                <br />
                Following
              </Link>

              <Link className={classNames.followers} href={'#'}>
                <span>{followersCount}</span>
                <br />
                Followers
              </Link>
              <Link className={classNames.publications} href={'#'}>
                <span>{publicationsCount}</span>
                <br />
                Publications
              </Link>
            </div>
            <div>
              <p className={s.aboutMeText}>{aboutMe}</p>
            </div>
          </div>
        </div>
        {!publicationsCount && (
          <div className={s.withoutFriends}>
            <h1>Add first friend</h1>
            <Button onClick={() => alert('Add new friend')} variant={'primary'}>
              +
            </Button>
          </div>
        )}
        {!!publicationsCount && (
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
