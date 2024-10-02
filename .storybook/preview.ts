import type { Preview } from '@storybook/react'
import '../src/app/styles/globals.scss'
import { StoreDecorator } from '../src/shared/config/storybook'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'black',
      values: [
        {
          name: 'black',
          value: '#000000',
        },
        {
          name: 'white',
          value: '#fff',
        },
      ],
    },
  },
  decorators: [StoreDecorator()],
}

export default preview
