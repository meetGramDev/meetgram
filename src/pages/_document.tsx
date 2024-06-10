import { Header } from '@/widget/header'
import { Head, Html, Main, NextScript } from 'next/document'
// import { Inter } from 'next/font/google'
// const inter = Inter({ subsets: ['latin'] })

export default function Document() {
  return (
    <Html lang={'en'}>
      <Head />
      <body>
        <Header isAuth={false} />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
