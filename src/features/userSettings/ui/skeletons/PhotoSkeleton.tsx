import { Photo } from '@/entities/photo'

import s from './Skeletons.module.scss'

export const PhotoSkeleton = () => {
  return (
    <div className={'flex h-full w-full flex-col items-center gap-6 text-center'}>
      <Photo type={'empty'} />
      <div className={s.photoSkeleton}></div>
    </div>
  )
}
