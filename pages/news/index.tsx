import React from 'react'
import Head from 'next/head'
import styles from './index.module.scss'
import api from '../../services'
import MpImage from '../../components/common/MpImage'

export default function index({ hotList }) {
  return (
    <div>
      <Head>
        <title>新闻中心 - 郑州名片之家电子商务有限公司</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles['mp-news-center-page-wrap']}>
        <header></header>
        <section className={styles['news-intro']} id='change-title-style-to-show'>
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
              <li style={{marginRight: 50}}>
                <aside>
                  <MpImage src="/news-menu-1.png" alt=""/>
                </aside>
                <div>
                  <h2>行业资讯</h2>
                  <p>{'Industry information'.toLocaleUpperCase()}</p>
                </div>
              </li>
              <li>
                <aside>
                  <MpImage src="/news-menu-2.png" alt=""/>
                </aside>
                <div>
                  <h2>公司动态</h2>
                  <p>{'Company news'.toLocaleUpperCase()}</p>
                </div>
              </li>
              <li style={{marginRight: 50}}>
                <aside>
                  <MpImage src="/news-menu-3.png" alt=""/>
                </aside>
                <div>
                  <h2>产品上新</h2>
                  <p>{'New products'.toLocaleUpperCase()}</p>
                </div>
              </li>
              <li>
                <aside>
                  <MpImage src="/news-menu-4.png" alt=""/>
                </aside>
                <div>
                  <h2>展会活动</h2>
                  <p>{'Exhibition activities'.toLocaleUpperCase()}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <section className={styles['news-hot']}>
          <header>
            <h2>新闻热议</h2>
            <h3>{'News hot discussion'.toLocaleUpperCase()}</h3>
          </header>
          <ul>
            {
              hotList.map(it => (
                <li key={it.ID} style={{background: `url(http://192.168.1.92:8055/${it.Cover}) no-repeat center center/cover`}}>
                  <div>
                    <div>
                      <p>{it.Title}</p>
                      <span>各省、自治区、直辖市和新疆生产建设兵团新闻出版局，北京、天津、上海、重庆市文化市场行政执法总队：　　根据《国家新闻出版署关于做好2019年印刷复制暨内部资料性出版物管理工作的通知》要求，2019年第一季度，国家新闻出版署组成检查组</span>
                    </div>
                    <p>
                      <span>{it.Title}</span>
                      <i></i>
                    </p>
                  </div>
                </li>
              ))
            }
          </ul>
        </section>
      </section>
    </div>
  )
}

export async function getServerSideProps () {
  const resp = await api.getNewsHotList();
  let hotList = [];
  if (resp.data.Status === 1000) {
    hotList = resp.data.Data;
  }
  return {
    props: {
      hotList,
    }
  };
}
