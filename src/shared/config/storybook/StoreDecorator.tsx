import { StoreProvider } from '@/app/lib'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { StoryFn } from '@storybook/react'

export const StoreDecorator = () =>
  function (StoryComponent: StoryFn) {
    return (
      <StoreProvider>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
          <StoryComponent />
        </GoogleOAuthProvider>
      </StoreProvider>
    )
  }
