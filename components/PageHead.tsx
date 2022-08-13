import Head from 'next/head'
import { FC } from 'react'
import { useTranslation } from '../utils/useTranslation'

interface Props {
  text: string
}

export const PageHead: FC<Props> = ({ text }) => {
  const { t } = useTranslation()

  return (
    <Head>
      <link rel="icon" href="favicon.png" sizes="16x16" type="image/png" />
      <title>{t(text)}</title>
    </Head>
  )
}
