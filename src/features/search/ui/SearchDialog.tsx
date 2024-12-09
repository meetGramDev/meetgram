import { ChangeEvent, useEffect, useState } from 'react'

import { Input } from '@/shared/ui'

import s from './SearchDialog.module.scss'

// export const SearchDialog = () => {
//   return (
//     <div className={'mb-6'}>
//       <Input className={s.search} placeholder={'Search'} type={'text'} />
//     </div>
//   )
// }

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
      }, 1500)
    )

    return clearTimeout(timerId)
  }, [str])

  const onChangeValue = (value: string) => {
    setStr(value)
  }

  return (
    <>
      <Input
        className={'mb-6'}
        onChange={e => onChangeValue(e.currentTarget.value)}
        placeholder={'Search'}
        type={'search'}
      />
    </>
  )
}

// type SearchDialogProps = {
//   onValueChange: (value: string) => void
//   placeholder: string
//   type: string
// }
// export const SearchDialog = ({ onValueChange }: SearchDialogProps) => {
//   return (
//     <div className={'mb-6'}>
//       <Input
//         className={s.search}
//         onChange={e => onValueChange(e.currentTarget.value)}
//         placeholder={'Search'}
//         type={'text'}
//       />
//     </div>
//   )
// }
