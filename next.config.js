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
      {
        destination: '/auth/:slug?',
        permanent: true,
        source:
          '/:slug(sign-in|sign-up|create-new-password|forgot-password|recovery|registration-confirmation)',
      },
    ]
  },
}

module.exports = nextConfig
