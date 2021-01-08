import React from 'react'
import Head from 'next/head'
import styles from './index.module.scss'

export default function index() {
  return (
    <div>
      <Head>
        <title>新闻中心 - 郑州名片之家电子商务有限公司</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles['mp-news-center-page-wrap']}>
        <header></header>
        <section className={styles['news-intro']}>
          <header>
            <h2>
              <span style={{marginRight: 20}}>新讯传达</span>
              <span>闻听印刷</span>
            </h2>
            <p>
              <span style={{marginRight: 28}}>{'News communication'.toLocaleUpperCase()}</span>
              <span>{'listening and printing'.toLocaleUpperCase()}</span>
            </p>
          </header>
          <div>
            <ul>
              <li>在这里，与名片之家一起读懂印刷！</li>
              <li>这里为您提供名片之家最新动态、消息，与您分享印刷行业相关资讯，记录印刷历程，致力与热爱印刷的伙伴们一起共筑印刷梦，共享出彩人生！</li>
            </ul>
            <p>
              <span>点击查看</span><i></i>
            </p>
          </div>
        </section>
        <div className={styles['news-menus']}>
          <div>
            <div></div>
            <ul>
              <li></li>
            </ul>
          </div>
        </div>
        <section className={styles['news-hot']}></section>
      </section>
    </div>
  )
}
