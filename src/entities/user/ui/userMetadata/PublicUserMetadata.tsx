import { useTranslate } from '@/shared/lib/useTranslate'

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
  const t = useTranslate()

  return (
    <div className={'mb-6 flex items-center justify-start gap-24'}>
      <div className={'text-regular14'}>
        <span className={'font-bold'}>{followingCount}</span>
        <br />
        {t('Following')}
      </div>
      <div className={'text-regular14'}>
        <span className={'font-bold'}>{followersCount}</span>
        <br />
        {t('Followers')}
      </div>
      <div className={'text-regular14'}>
        <span className={'font-bold'}>{publicationsCount}</span>
        <br />
        {t('Publications')}
      </div>
    </div>
  )
}
