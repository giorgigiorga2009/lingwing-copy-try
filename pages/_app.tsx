import '@styles/globals.scss'
import Script from 'next/script'
import 'regenerator-runtime/runtime'
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import { IntlProvider } from 'react-intl'
import { Locale, messages } from '@utils/localization'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from 'react-query'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const queryClient = new QueryClient()
  const { locale: initialLocale } = useRouter()
  const locale = initialLocale ? initialLocale : 'en'
  console.log(session)
  return (
    <IntlProvider locale={locale} messages={messages[locale as Locale]}>
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
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </SessionProvider>
    </IntlProvider>
  )
}

export default MyApp
