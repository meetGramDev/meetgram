import { useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

type Props = {
  className?: string
  onChange: (token: string) => void
  siteKey: string
}

export const Recaptcha = ({ className, onChange, siteKey }: Props) => {
  const ref = useRef(null)

  const onChangeHandler = () => {
    // @ts-ignore
    onChange(ref.current?.getValue())
  }

  return (
    <div className={className}>
      <ReCAPTCHA onChange={onChangeHandler} ref={ref} sitekey={siteKey} theme={'dark'} />
    </div>
  )
}
