import { ChangeEvent } from 'react'

import { Input } from '@/shared/ui'

import s from './SearchDialog.module.scss'

export const SearchDialog = () => {
  return (
    <div className={'mb-6'}>
      <Input className={s.search} placeholder={'Search'} type={'text'} />
    </div>
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
