import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <link
          rel="icon"
          href='favicon.png'
          sizes="16x16"
          type='image/png'
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
