import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { TabSwitcher, TabType } from './TabSwitcher'

const meta = {
  component: TabSwitcher,
  tags: ['autodocs'],
  title: 'shared/TabSwitcher',
} satisfies Meta<typeof TabSwitcher>

export default meta
type Story = StoryObj<typeof meta>

const tabs: TabType[] = [
  { text: 'General Information', value: 'generalInformation' },
  { text: 'Devices', value: 'devices' },
  { text: 'Account Management', value: 'accountManagement' },
  { text: 'My Payments', value: 'myPayments' },
]

// @ts-ignore
export const TabSwitcherStory: Story = {
  render: args => {
    const [activeTab, setActiveTab] = useState(tabs[0].value)

    const onValueChange = (value: string) => {
      setActiveTab(value)
    }

    return <TabSwitcher {...args} onValueChange={onValueChange} tabs={tabs} value={activeTab} />
  },
}

const tabsDisabled: TabType[] = [
  { text: 'First tab', value: 'first' },
  { disabled: true, text: 'Disabled tab', value: 'second' },
  { text: 'Third tab', value: 'third' },
]

export const TabSwitcherStoryWithDisabledItem: Story = {
  args: {
    onValueChange: fn(),
    tabs: tabsDisabled,
    value: tabsDisabled[0].value,
  },
}

const tabsDisabledActive: TabType[] = [
  { disabled: true, text: 'Disabled tab', value: 'first' },
  { text: 'Second tab', value: 'second' },
  { text: 'Third tab', value: 'third' },
]

export const TabSwitcherStoryWithDisabledActiveItem: Story = {
  args: {
    onValueChange: fn(),
    tabs: tabsDisabledActive,
    value: tabsDisabledActive[0].value,
  },
}
