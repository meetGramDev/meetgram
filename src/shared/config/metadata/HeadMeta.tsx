import Head from 'next/head'

export type HeadMetaProps = {
  description?: string
  title?: string
}

export const HeadMeta = ({ description, title }: HeadMetaProps) => {
  return (
    <Head>
      <title>{title ?? 'Meetgram'}</title>
      <meta content={description} name={'description'} />

      <link href={'/favicon.ico'} rel={'icon'} sizes={'48x48'} />
      <link href={'/icon.svg'} rel={'icon'} sizes={'any'} type={'image/svg+xml'} />
      <link href={'/apple-touch-icon.png'} rel={'apple-touch-icon'} />
      <link href={'/site.webmanifest'} rel={'manifest'} />
      <meta content={'#333333'} name={'theme-color'} />
    </Head>
  )
}
