import type { NextPageWithLayout } from '@/shared/types'
import type { AppProps } from 'next/app'

import { StoreProvider } from '@/app/lib'
import { GoogleOAuthProvider } from '@react-oauth/google'

import '@/app/styles/globals.scss'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'

type AppPropsWithLayout = {
  Component: NextPageWithLayout
} & AppProps

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <StoreProvider>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
        {getLayout(<Component {...pageProps} />)}
      </GoogleOAuthProvider>
    </StoreProvider>
  )
}
