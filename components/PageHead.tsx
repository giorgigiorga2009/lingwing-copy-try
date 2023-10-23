import { FC } from 'react'
import Head from 'next/head'
import { useTranslation } from '@utils/useTranslation'

interface Props {
  text: string
}

export const PageHead: FC<Props> = ({ text }) => {
  const { t } = useTranslation()

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <title>{t(text)}</title>
      {/* <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap');
      </style> */}
    </Head>
  )
}
