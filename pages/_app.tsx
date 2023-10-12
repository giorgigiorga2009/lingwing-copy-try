import '@styles/globals.scss'
import Script from 'next/script'
import 'regenerator-runtime/runtime'
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import { IntlProvider } from 'react-intl'
import { SessionProvider } from 'next-auth/react'
import { Locale, messages } from '@utils/localization'
import { QueryClient, QueryClientProvider } from 'react-query'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const queryClient = new QueryClient()
  const { locale: initialLocale, pathname } = useRouter() // Get the current path
  const locale = initialLocale ? initialLocale : 'en'
  const isLessonsPage = pathname.includes('lessons')

  let isDesktopSize = false
  if (typeof window !== 'undefined') {
    isDesktopSize = window.innerWidth >= 768
  }

  return (
    <IntlProvider locale={locale} messages={messages[locale as Locale]}>
      {isLessonsPage && isDesktopSize && (
        <>
          <Script
            src={'https://www.smartsuppchat.com/loader.js?'}
            strategy="lazyOnload"
          />
          <Script id="" strategy="lazyOnload">
            {`var _smartsupp = _smartsupp || {};
            _smartsupp.key = '0696a3568cc098f5267b4220491bdae0748c6d75';
            window.smartsupp||(function(d) {
            var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
            s=d.getElementsByTagName('script')[0];c=d.createElement('script');
            c.type='text/javascript';c.charset='utf-8';c.async=true;
            c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
            })(document);`}
          </Script>
        </>
      )}
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </SessionProvider>
    </IntlProvider>
  )
}

export default MyApp
