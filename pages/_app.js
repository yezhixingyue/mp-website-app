import '../styles/globals.scss';
import 'antd/dist/antd.css';
import '../styles/quill.snow.css';
import Header from '../components/layout/CommonHeader';
import Footer from '../components/layout/CommonFooter';
import Aside from '../components/layout/Aside';
import React from 'react';
import { Provider } from 'react-redux';
import { useStore } from '../store';
import { useRouter } from 'next/router';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const store = useStore(pageProps.initialReduxState);


  if (router.pathname === '/login') {
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>  // 登录页
    )
  }

  return (
    <Provider store={store}>
      <div style={{ position: 'relative' }}>
        <Header {...pageProps} />
        <Component {...pageProps} />
        <Aside {...pageProps} />
        <Footer {...pageProps} />
      </div>
    </Provider>
  )
}

export default MyApp
