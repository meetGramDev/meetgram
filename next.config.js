/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    captchaSiteKey: '6Le9h_IpAAAAAF6U0_jL6SNQKTXC_IuBTp-5ksOr',
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru', 'be', 'es', 'uk'],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
