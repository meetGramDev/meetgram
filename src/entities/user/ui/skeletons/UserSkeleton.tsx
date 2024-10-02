import { Photo } from '@/entities/photo'

import style from '../User.module.scss'
import s from './UserSkeleton.module.scss'

export const UserSkeleton = () => {
  return (
    <div className={style.userWrapper}>
      <div className={style.userData}>
        <Photo type={'empty'} />
        <div className={style.userInformation}>
          <div className={s.container}>
            <div className={s.userName}></div>

            <div>
              <div className={s.userProfileStats}>
                <span></span>
                <br />
                Following
              </div>
              <div className={s.userProfileStats}>
                <span></span>
                <br />
                Followers
              </div>
              <div className={s.userProfileStats}>
                <span></span>
                <br />
                Publications
              </div>
            </div>

            <div className={s.about}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
