/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    captchaSiteKey: '6Le9h_IpAAAAAF6U0_jL6SNQKTXC_IuBTp-5ksOr',
  },
  i18n: {
    defaultLocale: 'ru',
    locales: ['en', 'ru'],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
