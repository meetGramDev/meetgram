import { Head, Html, Main, NextScript } from 'next/document'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Document() {
  return (
    <Html lang={'en'}>
      <Head />
      <header
        className={
          'justify-space flex h-10 w-full items-center gap-5 border-b-2 border-solid border-black'
        }
      >
        <Link href={'/'}>Main</Link>
        <Link href={'/sign-in'}>Sign in</Link>
        <Link href={'/sign-up'}>Sign up</Link>
        <Link href={'/profile'}>Profile</Link>
      </header>
      <body className={`${inter.className}`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
