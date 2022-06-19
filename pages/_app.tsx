// import '../styles/globals.css'
// import type { AppProps } from 'next/app'
// import type { NextPage } from 'next'
// import type { ReactElement, ReactNode } from 'react'

// type NextPageWithLayout = NextPage & {
//   getLayout?: (page: ReactElement) => ReactNode
// }

// type AppPropsWithLayout = AppProps & {
//   Component: NextPageWithLayout
// }


// function MyApp({ Component, pageProps }: AppPropsWithLayout) {
//   const getLayout = Component.getLayout ?? ((page) => page)

//   return (
//     getLayout(<Component {...pageProps} />)
//   )
// }

// export default MyApp

import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
