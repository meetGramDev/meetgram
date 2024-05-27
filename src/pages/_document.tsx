import { Head, Html, Main, NextScript } from 'next/document'
import Link from 'next/link'

export default function Document() {
  return (
    <Html lang={'en'}>
      <Head />
      <header
        className={
          'flex items-center justify-space gap-5 w-full h-10 border-solid border-b-2 border-black'
        }
      >
        <Link href={'/'}>Main</Link>
        <Link href={'/sign-in'}>Sign in</Link>
        <Link href={'/sign-up'}>Sign up</Link>
        <Link href={'/profile'}>Profile</Link>
      </header>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
