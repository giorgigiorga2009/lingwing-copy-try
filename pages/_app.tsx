import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import { IntlProvider } from 'react-intl'
import en from '../public/localization/locale-en_US.json'
import bn from '../public/localization/locale-bn_BN.json'
import es from '../public/localization/locale-es_ES.json'
import ka from '../public/localization/locale-ka_GE.json'
import ru from '../public/localization/locale-ru_RU.json'
import tr from '../public/localization/locale-tr_TR.json'
import { useRouter } from 'next/router'
import { useTranslation } from '../utils/useTranslation'

const LOCALE = ['en', 'bn', 'es', 'ka', 'ru', 'tr']
type LOCALE = typeof LOCALE[number]

interface Messages {
  [x: LOCALE]: {}
}

const messages = {
  en,
  bn,
  es,
  ka,
  ru,
  tr,
} as Messages

function MyApp({ Component, pageProps }: AppProps) {
  const { locale: defaultLocale } = useRouter()
  const locale = defaultLocale ? defaultLocale : 'en'
  const { t } = useTranslation()

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <Head>
        <link rel="icon" href="favicon.png" sizes="16x16" type="image/png" />
        <title>Lingwing: Foreign languages online learning</title>
      </Head>
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
