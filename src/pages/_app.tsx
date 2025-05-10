import type { NextPageWithLayout } from '@/shared/types'
import type { AppProps } from 'next/app'

import { StoreProvider } from '@/app/lib'
import { AuthProvider } from '@/app/providers'
import { ErrorBoundary } from '@/app/providers/ErrorBoundary'
import { Page } from '@/shared/config/metadata'
import { useProgressBar } from '@/shared/lib'
import { ToastWrapper } from '@/shared/ui'
import { GoogleOAuthProvider } from '@react-oauth/google'

import '@/app/styles/globals.scss'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@meetgram/ui-kit/styles.css'

type AppPropsWithLayout = {
  Component: NextPageWithLayout
} & AppProps

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  useProgressBar()

  const getLayout = Component.getLayout ?? (page => page)

  return (
    <Page>
      <StoreProvider>
        <AuthProvider>
          <ToastWrapper>
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
              <ErrorBoundary>{getLayout(<Component {...pageProps} />)}</ErrorBoundary>
            </GoogleOAuthProvider>
          </ToastWrapper>
        </AuthProvider>
      </StoreProvider>
    </Page>
  )
}
