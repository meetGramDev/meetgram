import s from './TextArea.module.scss'

type TextAreaType = {
  label: string
}

export const TextArea = ({ label }: TextAreaType) => {
  return (
    <div className={s.wrapper}>
      <div>
        <label className={s.label} htmlFor={'text-area'}>
          {label}
        </label>
      </div>

      <textarea id={'text-area'} placeholder={'Text area'}></textarea>
    </div>
  )
}
