import * as Tabs from '@radix-ui/react-tabs'

import s from './tabSwitcher.module.scss'

export type TabType = {
  disabled?: boolean
  text: string
  value: string
}

type Props = {
  className?: string
  onValueChange: (value: string) => void
  tabs: TabType[]
  value: string
}

export const TabSwitcher = ({ className, onValueChange, tabs, value }: Props) => {
  return (
    <Tabs.Root className={className} onValueChange={onValueChange} value={value}>
      <Tabs.List aria-label={'tabs'} className={s.list}>
        {tabs.map(tab => (
          <Tabs.Trigger className={s.tab} disabled={tab.disabled} key={tab.value} value={tab.value}>
            <span className={s.text}>{tab.text}</span>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  )
}
