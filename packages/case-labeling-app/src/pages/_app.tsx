import 'antd/dist/antd.css';
import '../shared/styles/global.scss';
import '../shared/styles/vars.scss';

import type { AppProps } from 'next/app';
import { Layout } from 'antd';

const WebApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout className='layout-app'>
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

export default WebApp;
