import React from 'react';
import styles from './index.module.scss';
import Link from 'next/link';

export default function index() {
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
                <Link href='/contact-us' >联系我们</Link>
              </li>
              <li>
                <Link href='/agreement' >用户协议</Link>
              </li>
              <li>
                <Link href='/statement' >权责声明</Link>
              </li>
              <li>
                <Link href='/opinion' >意见建议</Link>
              </li>
            </ul>
          </div>
          {/* 左侧 - 底部 */}
          <div className={styles.bottom}>
            <span>Copyright ©2019 - 2022 郑州名片之家电子商务有限公司</span>
            <span>服务热线：4006363006</span>
            <span>售后专线：4006363500</span>
            <span className={styles['last-span']}>
              <a href="http://www.beian.miit.gov.cn/" target='_blank'>豫ICP备16032622号-1</a>
            </span>
          </div>
        </div>
        {/* 右侧二维码区域 */}
        <div className={styles.right}>
          <div className={styles['official-account']}></div>
          <p>扫描进入公众号</p>
        </div>
      </div>
    </div>
  )
}
