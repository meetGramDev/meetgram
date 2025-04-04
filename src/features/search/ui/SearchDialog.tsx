import { useEffect, useState } from 'react'

import { Input } from '@/shared/ui'

import s from './SearchDialog.module.scss'

type DebounceInputProps = {
  onValueQuery: (value: string) => void
  value?: string
}
export const SearchDialog = ({ onValueQuery, value }: DebounceInputProps) => {
  const [timerId, setTimerId] = useState(0)
  const [str, setStr] = useState<string>(value || '')

  useEffect(() => {
    setTimerId(
      +setTimeout(() => {
        onValueQuery(str)
      }, 500)
    )

    return clearTimeout(timerId)
  }, [str, onValueQuery])

  const onChangeValue = (value: string) => {
    setStr(value)
  }
  const clearValue = () => {
    setStr('')
  }

  return (
    <>
      <Input
        className={s.search}
        clearValue={clearValue}
        onChange={e => onChangeValue(e.currentTarget.value)}
        placeholder={'Search'}
        type={'search'}
        value={str}
      />
    </>
  )
}
