import { Post } from '@/entities/post'
import { UserResponseType } from '@/entities/user'
import { Button, Photo } from '@/shared/ui'
import { getAuthLayout } from '@/widgets/layouts'
import { clsx } from 'clsx'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import s from './User.module.scss'

import photo from '../../../shared/assets/img/photo-preview.png'

type ProfileUserType = Omit<
  UserResponseType,
  'city' | 'createdAt' | 'dateOfBirth' | 'firstName' | 'lastName'
>

type UserPropsType = {
  followers?: number
  following?: number
  publications?: number
} & ProfileUserType

const following: number = 2218
const followers: number = 2358
const publications: number = 2764
const posts = [
  {
    alt: 'UserPhoto',
    height: 228,
    src: photo,
    width: 234,
  },
  {
    alt: 'UserPhoto',
    height: 228,
    src: photo,
    width: 234,
  },
  {
    alt: 'UserPhoto',
    height: 228,
    src: photo,
    width: 234,
  },
  {
    alt: 'UserPhoto',
    height: 228,
    src: photo,
    width: 234,
  },
  {
    alt: 'UserPhoto',
    height: 228,
    src: photo,
    width: 234,
  },
  {
    alt: 'UserPhoto',
    height: 228,
    src: photo,
    width: 234,
  },
  {
    alt: 'UserPhoto',
    height: 228,
    src: photo,
    width: 234,
  },
  {
    alt: 'UserPhoto',
    height: 228,
    src: photo,
    width: 234,
  },
  {
    alt: 'UserPhoto',
    height: 228,
    src: photo,
    width: 234,
  },
  {
    alt: 'UserPhoto',
    height: 228,
    src: photo,
    width: 234,
  },
  {
    alt: 'UserPhoto',
    height: 228,
    src: photo,
    width: 234,
  },
  {
    alt: 'UserPhoto',
    height: 228,
    src: photo,
    width: 234,
  },
  {
    alt: 'UserPhoto',
    height: 228,
    src: photo,
    width: 234,
  },
  {
    alt: 'UserPhoto',
    height: 228,
    src: photo,
    width: 234,
  },
  {
    alt: 'UserPhoto',
    height: 228,
    src: photo,
    width: 234,
  },
  {
    alt: 'UserPhoto',
    height: 228,
    src: photo,
    width: 234,
  },
  {
    alt: 'UserPhoto',
    height: 228,
    src: photo,
    width: 234,
  },
  {
    alt: 'UserPhoto',
    height: 228,
    src: photo,
    width: 234,
  },
  {
    alt: 'UserPhoto',
    height: 228,
    src: photo,
    width: 234,
  },
  {
    alt: 'UserPhoto',
    height: 228,
    src: photo,
    width: 234,
  },
]

export const User = ({ aboutMe, avatars, userName = 'User Name' }: UserPropsType) => {
  const params = useSearchParams()

  const classNames = {
    followers: clsx(s.userLinks, s.userFollowers),
    following: clsx(s.userLinks, s.userFollowing),
    publications: clsx(s.userLinks),
  }

  return (
    <div className={s.userWrapper}>
      {/*<div className={s.sidebar}>*/}
      {/*  <div>Sidebars</div>*/}
      {/*</div>*/}
      <div className={s.scrollingWrapper}>
        <div className={s.userData}>
          <Photo alt={'userPhoto'} className={s.userPhoto} src={avatars[0].url} />
          <div className={s.userInformation}>
            <div className={s.userName}>
              <h1 className={s.userNameTitle}>{userName}</h1>
              <Button variant={'secondary'}>Profile Settings</Button>
            </div>
            <div className={s.buttonPublications}>
              <Link className={classNames.following} href={'#'}>
                <span>{following}</span>
                <br />
                Following
              </Link>

              <Link className={classNames.followers} href={'#'}>
                <span>{followers}</span>
                <br />
                Followers
              </Link>
              <Link className={classNames.publications} href={'#'}>
                <span>{publications}</span>
                <br />
                Publications
              </Link>
            </div>
            <div>
              <p style={{ wordBreak: 'break-word' }}>{aboutMe}</p>
            </div>
          </div>
        </div>
        <div className={s.userFriendsWrapper}>
          {posts.map((post, count) => {
            return (
              <Post
                alt={post.alt}
                height={post.height}
                key={count}
                src={post.src}
                width={post.width}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
