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
    </Head>
  )
}
