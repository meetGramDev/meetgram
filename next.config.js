/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru', 'be', 'es', 'uk'],
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        destination: '/profile',
        permanent: true,
        source: '/',
      },
    ]
  },
}

module.exports = nextConfig
