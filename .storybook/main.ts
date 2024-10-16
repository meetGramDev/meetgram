import type { StorybookConfig } from '@storybook/nextjs'
import { webpack } from 'next/dist/compiled/webpack/webpack'
import Configuration = webpack.Configuration
import path from 'path'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],

  webpackFinal: async (config: Configuration) => {
    config.resolve.alias['@'] = path.resolve(__dirname, '..', 'src')

    return config
  },
}
export default config
