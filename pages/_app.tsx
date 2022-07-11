import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <link rel="icon" href="favicon.png" sizes="16x16" type="image/png" />
        <title>Lingwing: Foreign languages online learning</title>
      </Head>
      <Script
        src={"https://www.smartsuppchat.com/loader.js?"}
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
    </div>
  );
}

export default MyApp;
