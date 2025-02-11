import { useEffect, useState } from 'react'

import { Input } from '@/shared/ui'
import { useRouter } from 'next/router'

import s from './SearchDialog.module.scss'

type DebounceInputProps = {
  onValueQuery: (value: string) => void
  value?: string
}
export const SearchDialog = ({ onValueQuery, value }: DebounceInputProps) => {
  const [timerId, setTimerId] = useState(0)
  const [str, setStr] = useState<string>(value || '')
  const router = useRouter()

  useEffect(() => {
    setTimerId(
      +setTimeout(() => {
        //onValueQuery(str)
        if (str === '') {
          router.push('/users')
        } else {
          router.push(`/users?search=${str}&pageSize=10&pageNumber=1&cursor=0`)
        }
      }, 500)
    )

    return clearTimeout(timerId)
  }, [str, onValueQuery])

  const onChangeValue = (value: string) => {
    setStr(value)
  }

  return (
    <>
      <Input
        className={s.search}
        onChange={e => onChangeValue(e.currentTarget.value)}
        placeholder={'Search'}
        type={'search'}
        value={str}
      />
    </>
  )
}
