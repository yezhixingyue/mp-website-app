import 'core-js/es';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import styles from '../styles/home.module.css'
import Head from 'next/head'
import api from '../services'
import SwiperComp from '../components/Home/swiper'
import PlaceAndProductComp from '../components/Home/PlaceAndProductComp'
import HomeIntro from '../components/Home/HomeIntro'
import NewsCenter from '../components/Home/NewsCenter'
import PartnersComp from '../components/Home/PartnersComp'
import ServeWorth from '../components/Home/ServeWorth'

export default function Home({ swiperData, newsDate, lv1Classify, pruducts }) {
  return (
    <div className={styles['home-page-wrap']}>
      <Head>
        <title>郑州名片之家电子商务有限公司</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SwiperComp swiperData={swiperData} />  {/* 轮播图 */}
      <PlaceAndProductComp lv1Classify={lv1Classify} pruducts={pruducts} />                 {/* 在线报价、软件下载及产品介绍 */}
      <HomeIntro />                           {/* 公司介绍 */}
      <NewsCenter newsDate={newsDate} />      {/* 新闻中心 */}
      <PartnersComp />                        {/* 合作伙伴 */}
      <ServeWorth />                          {/* 服务价值 */}
    </div>
  )
}

export async function getServerSideProps() {
  // const res = await Promise.all([api.getSwiperData(), api.getNewsArticleList(), api.getProductClassify()]);
  // const [ swiperResp, newsResp, classifyRes ] = res;
  // let lv1Classify = [];
  // let pruducts = [];
  // if (classifyRes.data.Status === 1000) {
  //   lv1Classify = classifyRes.data.Data.filter(it => it.Level === 1);
  //   if (lv1Classify.length > 0) {
  //     const proResp = await api.getProductsList({
  //       Page: 1,
  //       PageSize: 3,
  //       ProductClass: {
  //         First: lv1Classify[0].ID
  //       }
  //     })
  //     if (proResp.data.Status === 1000) pruducts = proResp.data.Data;
  //   }
  // }
  // return {
  //   props: {
  //     swiperData: swiperResp.data.Data,
  //     newsDate: newsResp.data.Data,
  //     lv1Classify,
  //     pruducts,
  //   }
  // };
  const res = await api.getTestData();
  console.log(res);
  return {
    props: {
      swiperData: [],
      newsDate: [],
      lv1Classify: [],
      pruducts: [],
    }
  };
}