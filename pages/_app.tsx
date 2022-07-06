import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <link
          rel="icon"
          href='favicon.png'
          sizes="16x16"
          type='image/png'
        />
        <title>Lingwing: Foreign languages online learning</title>
      </Head>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
