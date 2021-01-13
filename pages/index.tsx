import 'core-js/es';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import 'html5-history-api/history';
import styles from '../styles/home.module.css'
import Head from 'next/head'
import api from '../services'
import SwiperComp from '../components/Home/swiper'
import PlaceAndProductComp from '../components/Home/PlaceAndProductComp'
import HomeIntro from '../components/Home/HomeIntro'
import NewsCenter from '../components/Home/NewsCenter'
import PartnersComp from '../components/Home/PartnersComp'
import ServeWorth from '../components/Home/ServeWorth'
import { useSelector } from 'react-redux'
import { IStore } from '../utils/types4TS';
import { getFilterClassifyList } from '../utils';
// import { setSwiperState, setNewsState, setLv1ClassifyState, setHomeProductState } from '../actions'
// if (process.browser) { window.history.replaceState = window.history.replaceState || function () {} }
// if (process.browser) {
//   console.log(window.history.replaceState);
// }

export default function Home() {
  const { swiperData, newsDate } = useSelector((store: IStore) => store.home);

  return (
    <div className={styles['home-page-wrap']}>
      <Head>
        <title>郑州名片之家电子商务有限公司</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SwiperComp swiperData={swiperData} />  {/* 轮播图 */}
      <PlaceAndProductComp />                 {/* 在线报价、软件下载及产品介绍 */}
      <HomeIntro />                           {/* 公司介绍 */}
      <NewsCenter newsDate={newsDate} />      {/* 新闻中心 */}
      <PartnersComp />                        {/* 合作伙伴 */}
      <ServeWorth />                          {/* 服务价值 */}
    </div>
  )
}

export async function getServerSideProps() {
  let key = true;
  const handleErrCatch = () => {
    key = false;
  }
  const res = await Promise.all([api.getSwiperData().catch(handleErrCatch), api.getNewsArticleList().catch(handleErrCatch), api.getProductClassify().catch(handleErrCatch)]);
  const [swiperResp, newsResp, classifyRes] = res;
  let swiperData = [];
  let newsDate = [];
  let lv1Classify = [];
  let products = [];
  if (key && swiperResp && newsResp && classifyRes) {
    if (swiperResp.data.Status === 1000) swiperData = swiperResp.data.Data;
    if (newsResp.data.Status === 1000) newsDate = newsResp.data.Data;
    if (classifyRes.data.Status === 1000) {
      lv1Classify =  getFilterClassifyList(classifyRes.data.Data);
      if (lv1Classify.length > 0) {
        const proResp = await api.getProductsList({
          Page: 1,
          PageSize: 3,
          ProductClass: {
            First: lv1Classify[0].ID
          }
        }).catch(handleErrCatch)
        if (key && proResp && proResp.data.Status === 1000) {
          products = proResp.data.Data;
        }
      }
    }
  }
  
  return {
    props: {
      initialReduxState: {
        home: {
          swiperData,
          newsDate,
          lv1Classify,
          products,
        }
      }
    }
  };
}