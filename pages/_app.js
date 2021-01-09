import '../styles/globals.scss';
import 'antd/dist/antd.css';
import Header from '../components/layout/CommonHeader';
import Footer from '../components/layout/CommonFooter';
import Aside from '../components/layout/Aside';
import React, { useState } from 'react'

import { useRouter } from 'next/router';
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  if (router.pathname === '/login') return <Component {...pageProps} />  // 登录页
  
  return (
    <div style={{position: 'relative'}}>
      <Header />
      <Component {...pageProps} />
      <Aside />
      <Footer />
    </div>
  )
}

export default MyApp
