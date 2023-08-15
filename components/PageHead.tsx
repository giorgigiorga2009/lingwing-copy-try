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
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <title>{t(text)}</title>
      {/* <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap');
      </style> */}
    </Head>
  )
}
