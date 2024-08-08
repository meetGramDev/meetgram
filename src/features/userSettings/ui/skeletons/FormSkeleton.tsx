import s from './Skeletons.module.scss'

export const FormSkeleton = () => {
  return (
    <div className={s.formWrapper}>
      {Array.from({ length: 3 }).map((_, i) => {
        return (
          <div className={s.fieldWrapper} key={i}>
            <div className={s.labelSkeleton}></div>
            <div className={s.inputSkeleton}></div>
          </div>
        )
      })}
      <div className={s.selectsWrapper}>
        <div className={s.labelSkeleton}></div>
        <div className={s.inputSkeleton}></div>
        <div className={s.labelSkeleton}></div>
        <div className={s.inputSkeleton}></div>
      </div>
      <div className={s.fieldWrapper}>
        <div className={s.labelSkeleton}></div>
        <div className={s.textareaSkeleton}></div>
      </div>
    </div>
  )
}
