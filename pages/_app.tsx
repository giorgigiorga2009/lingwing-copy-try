import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { IntlProvider } from 'react-intl'
import { useRouter } from 'next/router'
import { Locale, messages } from '../utils/localization'

function MyApp({ Component, pageProps }: AppProps) {
  const { locale: initialLocale } = useRouter()
  const locale = initialLocale ? initialLocale : 'en'

  return (
    <IntlProvider locale={locale} messages={messages[locale as Locale]}>
      <Script
        src={'https://www.smartsuppchat.com/loader.js?'}
        strategy="lazyOnload"
      />
      <Script strategy="lazyOnload">
        {`var _smartsupp = _smartsupp || {};
        _smartsupp.key = '0696a3568cc098f5267b4220491bdae0748c6d75';
        window.smartsupp||(function(d) {
        var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
        s=d.getElementsByTagName('script')[0];c=d.createElement('script');
        c.type='text/javascript';c.charset='utf-8';c.async=true;
        c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
        })(document);`}
      </Script>
      <Component {...pageProps} />
    </IntlProvider>
  )
}

export default MyApp
