import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
import Loading from '../../../utils/loading';
import { Router } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { SetupEnumType } from '../../../setup';

NProgress.configure({
  trickleSpeed: 30,
  showSpinner: false,
});

export default function index() {
  const [loading, setLoading] = useState(false)
  const startLoading = () => {
    setLoading(true)
    NProgress.start();
  }
  const stopLoading = () => {
    // setTimeout(() => {
    //   setLoading(false)
    //   NProgress.done();
    // }, 200 )
    setLoading(false)
    NProgress.done();
  }
  useEffect(() => {
    Router.events.on('routeChangeStart', startLoading)
    Router.events.on('routeChangeComplete', stopLoading)
    return () => {
      Router.events.off('routeChangeStart', stopLoading)
      Router.events.off('routeChangeComplete', stopLoading)
    }
  }, [])
  return (
    <div className={styles['foot-wrap']}>
      <div className={styles.content}>
        {/* 左侧区域 */}
        <div className={styles.left}>
          {/* 左侧 - 顶部 */}
          <div className={styles.top}>
            <div className={styles.logo}></div>
            <ul>
              <li>
                <Link href='/contact-us/#contact-top' ><a>联系我们</a></Link>
              </li>
              <li>
                <Link href={`/help?type=${SetupEnumType.agreementID}`} ><a>用户协议</a></Link>
              </li>
              <li>
                <Link href={`/help?type=${SetupEnumType.accrualID}`} ><a>权责声明</a></Link>
                {/* <Link href='/statement' >权责声明</Link> */}
              </li>
              <li>
                <Link href='/contact-us/#opinion' ><a>意见建议</a></Link>
              </li>
            </ul>
          </div>
          {/* 左侧 - 底部 */}
          <div className={styles.bottom}>
            <span>Copyright ©2019 - 2022 郑州名片之家电子商务有限公司</span>
            <span>服务热线：4006363006</span>
            <span>售后专线：4006363500</span>
            <span className={styles['last-span']}>
              <a href="https://beian.miit.gov.cn/" target='_blank'>豫ICP备16032622号-1</a>
            </span>
          </div>
        </div>
        {/* 右侧二维码区域 */}
        <div className={styles.right}>
          <div className={styles['official-account']}></div>
          <p>扫描进入公众号</p>
        </div>
      </div>
      <Loading loading={loading} />
    </div>
  )
}
