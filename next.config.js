/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    captchaSiteKey: '6LeY2y0mAAAAANwI_paCWfoksCgBm1n2z9J0nwNQ',
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru', 'be', 'es', 'uk'],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
