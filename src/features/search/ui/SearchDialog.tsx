import { useEffect, useState } from 'react'

import { Input } from '@/shared/ui'

import s from './SearchDialog.module.scss'

type DebounceInputProps = {
  onValueQuery: (value: string) => void
}
export const SearchDialog = ({ onValueQuery }: DebounceInputProps) => {
  const [timerId, setTimerId] = useState(0)
  const [str, setStr] = useState('')

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
      />
    </>
  )
}
