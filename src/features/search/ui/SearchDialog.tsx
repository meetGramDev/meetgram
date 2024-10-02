import { Input } from '@/shared/ui'

import s from './SearchDialog.module.scss'

export const SearchDialog = () => {
  return (
    <div className={'mb-6'}>
      <Input className={s.search} placeholder={'Search'} type={'text'} />
    </div>
  )
}
