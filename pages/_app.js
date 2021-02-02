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
if (process.browser) { window.history.replaceState = window.history.replaceState || function () {} }
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

  // useEffect(() => {
  //   const key = process.browser && !window.btoa;
  //   if (key) {
  //     document.body.className.push
  //   }
  // }, [])

  const key = process.browser && !window.btoa;
  const _class = key ? 'ie9-less' : '';

  return (
    <Provider store={store}>
      <div style={{ position: 'relative' }} className={_class}>
        <Header {...pageProps} />
        <Component {...pageProps} />
        <Aside {...pageProps} />
        <Footer {...pageProps} />
      </div>
    </Provider>
  )
}

export default MyApp
