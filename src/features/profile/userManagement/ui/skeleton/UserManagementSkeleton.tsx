import s from './UserManagementSkeleton.module.scss'

export const UserManagementSkeleton = () => {
  return (
    <div className={s.formWrapper}>
      <div className={s.labelSkeleton}></div>
      <div className={s.fieldSkeleton}></div>
      <div className={s.buttonSkeleton}></div>
      <div className={s.labelSkeleton}></div>
      <div className={s.fieldSkeleton}></div>
    </div>
  )
}
