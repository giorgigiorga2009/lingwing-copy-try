import { FC } from 'react'
import Head from 'next/head'
import { useTranslation } from '@utils/useTranslation'

interface Props {
  title: string
  description: string
  keywords: string
}

export const PageHead: FC<Props> = ({ title, description, keywords }) => {
  const { t } = useTranslation()

  return (
    <Head>
      <title>{t(title)}</title>
      <meta name="description" content={t(description)} />
      <meta name="keywords" content={t(keywords)} />
      <meta property="og:description" content={t(description)}></meta>
      <meta property="og:title" content={t(title)}></meta>
      <meta property="og:image" content="https://lingwing.com/themes/images/v2/display.png"></meta>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="google-site-verification" content="H2zVlOBKHx916NjSlvNC9RVhe8kyC9aZppkYGVZlUNg"></meta>
      <meta name="facebook-domain-verification" content="tjk8pca0ajrw8hj985o2b6fov52o7h"></meta>
      <meta name="theme-color" content="#692E96"></meta>
      <meta name="author" content="Lingwing Team"/>
      <meta name="robots" content="index, follow"/>
      <meta name="google" content="notranslate"></meta>
      <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
      <link rel="icon" type="image/x-icon"  href="/favicon.ico"/>
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
