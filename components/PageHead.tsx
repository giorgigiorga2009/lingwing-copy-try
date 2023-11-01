import { FC } from 'react'
import Head from 'next/head'
import { useTranslation } from '@utils/useTranslation'

interface Props {
  title: string
}

export const PageHead: FC<Props> = ({ title }) => {
  const { t } = useTranslation()

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" type="image/x-icon"  href="/favicon.ico"/>
      <title>{t(title)}</title>
      <meta property="og:title" content={t(title)}></meta>
      <link rel="alternate" href="lingwing.com/en/" hrefLang="en-us"/>
      <link rel="alternate" href="lingwing.com/en/" hrefLang="ka-ge"/>
      <link rel="alternate" href="lingwing.com/en/" hrefLang="ru-ru"/>
      <link rel="alternate" href="lingwing.com/en/" hrefLang="es-es"/>
      <link rel="alternate" href="lingwing.com/en/" hrefLang="tr-tr"/>
      {/* <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap');
      </style> */}
    </Head>
  )
}
