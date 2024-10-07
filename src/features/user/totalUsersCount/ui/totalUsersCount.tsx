import s from './totalUsersCount.module.scss'

type PropsType = {
  usersCount: number
}

export const TotalUsersCount = ({ usersCount }: PropsType) => {
  return (
    <div className={'mx-6 my-3 flex'}>
      <div>Registered users:</div>
      <div className={s.count}>{usersCount}</div>
    </div>
  )
}
