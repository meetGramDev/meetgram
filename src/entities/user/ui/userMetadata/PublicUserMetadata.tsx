type Props = {
  followersCount: number
  followingCount: number
  publicationsCount: number
}

export const PublicUserMetadata = ({
  followersCount,
  followingCount,
  publicationsCount,
}: Props) => {
  return (
    <div className={'mb-6 flex items-center justify-start gap-24'}>
      <div className={'text-regular14'}>
        <span className={'font-bold'}>{followingCount}</span>
        <br />
        Following
      </div>
      <div className={'text-regular14'}>
        <span className={'font-bold'}>{followersCount}</span>
        <br />
        Followers
      </div>
      <div className={'text-regular14'}>
        <span className={'font-bold'}>{publicationsCount}</span>
        <br />
        Publications
      </div>
    </div>
  )
}
