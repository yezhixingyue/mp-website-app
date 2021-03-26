import React, { useEffect } from 'react'
import Head from 'next/head'
import styles from './index.module.scss'
import api from '../../services'
import MpImage from '../../components/common/MpImage'
import NewsHot from '../../components/NewsCenter/NewsHot'
import Link from 'next/link'
import { SetupEnumType } from '../../setup'
import { useRouter } from 'next/router'

export default function index({ hotList, DataNumber, Page }) {
  const router = useRouter();
  useEffect(() => {
    const p = router.query.Page;
    if (p) return;
    router.push(`?Page=${Page}`, '', {shallow: true});
  }, [])
  return (
    <div>
      <Head>
        <title>新闻中心 - 郑州名片之家电子商务有限公司</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="keywords" content={`行业资讯,公司动态,产品上新,展会活动,传统专版,商务合版,PVC制卡,商业包装,数码快印`}></meta>
        <meta name="description" content={`新闻中心 - 郑州名片之家电子商务有限公司`}></meta>
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
              <Link  href={`/newsDetail?id=${SetupEnumType.newsID}`}>
                <a target='_blank'><span>点击查看</span><i></i></a>
              </Link>
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
        {/* hot */}
        <NewsHot hotList={hotList} DataNumber={DataNumber} Page={Page} />
      </section>
    </div>
  )
}

export async function getServerSideProps ({ query }) {
  const { Page } = query;
  let key = true;
  const resp = await api.getNewsHotList({ Page: Page ? +Page : 1, pageSize: 6 }).catch(() => { key = false });
  let hotList = [];
  let DataNumber = 0;
  if (key && resp && resp.data.Status === 1000) {
    hotList = resp.data.Data;
    DataNumber = resp.data.DataNumber;
  }
  return {
    props: {
      hotList,
      DataNumber,
      Page: Page ? +Page : 1,
    }
  };
}
