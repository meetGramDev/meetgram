import { useEffect, useState } from 'react'

import { Input } from '@/shared/ui'
import { useRouter } from 'next/router'

import s from './SearchDialog.module.scss'

type DebounceInputProps = {
  onValueQuery: (value: string) => void
}
export const SearchDialog = ({ onValueQuery }: DebounceInputProps) => {
  const [timerId, setTimerId] = useState(0)
  const [str, setStr] = useState('')
  // const [searchStr, setSearchStr] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const router = useRouter()

  useEffect(() => {
    setTimerId(
      +setTimeout(() => {
        onValueQuery(str)
        // router.push(`/users?search=${str}&pageSize=${pageSize}&pageNumber=${pageNumber}`)
      }, 1500)
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
      />
    </>
  )
}
