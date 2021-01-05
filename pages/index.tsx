import 'core-js/es';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import Head from 'next/head'
import api from '../services'
import SwiperComp from '../components/Home/swiper'
import styles from '../styles/home.module.css'

export default function Home({ swiperData }) {
  return (
    <div className={styles['home-page-wrap']}>
      <Head>
        <title>郑州名片之家电子商务有限公司</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SwiperComp swiperData={swiperData} />
    </div>
  )
}

export async function getServerSideProps() {
  const resp = await api.getSwiperData();
  // console.log(resp);
  return {
    props: {
      swiperData: resp.data.Data,
    }
  };
}