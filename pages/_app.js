import React from 'react'
import { Provider } from 'next-auth/client'
import Router from "next/router"
import Script from 'next/script'
import { shape, func } from 'prop-types'
import 'swiper/swiper.scss'
import '../styles/globals.css'
import '../styles/styles.css'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import * as ga from '../lib/ga'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => { setLoading(true) }
    const end = () => { setLoading(false) }
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    // google analytics
    const handleRouteChange = (url) => { ga.pageview(url) }
    //When the component is mounted, subscribe to router changes
    //and log those page views
    Router.events.on('routeChangeComplete', handleRouteChange)
    // If the component is unmounted, unsubscribe
    // from the event with the `off` method

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
      Router.events.off('routeChangeComplete', handleRouteChange)
    };
  }, []);
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_REACT_APP_GA_TRACKING_ID}`}
      />
      <Script
        id="ga"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${process.env.NEXT_PUBLIC_REACT_APP_GA_TRACKING_ID}', {
                            page_path: window.location.pathname,
                            });
                        `,
        }}
      />
      <Script
        strategy="lazyOnload"
        data-ad-client="ca-pub-1434074630735871"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1434074630735871"
        crossorigin="anonymous" />

      <Script async src="https://cse.google.com/cse.js?cx=d761393c77a5ff02c" />

      <Provider session={pageProps.session}>
        {
          loading ?
            <div className="container-center text-center">
              <div className="text-center">
                <div><AiOutlineLoading3Quarters size={50} className="animate-spin inline mr-1 mb-1" /></div>
              </div>
            </div>
            :
            <Layout>
              <Component {...pageProps} />
            </Layout>
        }
      </Provider>
    </>
  )
}
MyApp.propTypes = {
  Component: func,
  pageProps: shape({})
}
MyApp.defaultProps = {
  Component: null,
  pageProps: null
}
export default MyApp