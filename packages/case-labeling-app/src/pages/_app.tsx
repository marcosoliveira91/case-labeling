import Head from 'next/head';
import { Layout } from 'antd';
import '../shared/styles/global.scss';
import '../shared/styles/vars.scss';
import 'antd/dist/antd.css';

import type { AppProps } from 'next/app';

const CaseLabelingWebApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout className='layout-app'>
      <Head>
        <title>Case Labeling App</title>
      </Head>
      <Component {...pageProps} />
    </Layout>

  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default CaseLabelingWebApp;
