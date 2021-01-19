import { Empty } from 'antd';
import { useRouter } from 'next/router';
import React from 'react'
import MpImage from '../../common/MpImage';
import styles from './newscenter.module.css'
// import Image from 'next/image';



export default function index({ newsDate }) {
  const router = useRouter();

  const SingleNewsCode = ({ newsData }) => (
    <li onClick={() => { router.push(`/newsDetail?id=${newsData.ID}`) }}>
      <MpImage src={'http://192.168.1.92:8055' + newsData.Cover} alt="" width={380} height={185} hasModel/>
      <h2 className={styles.title}>{newsData.Title}</h2>
      <p>
        {newsData.Introduce}
      </p>
    </li>
  )

  
  const onMoreClick = () => {
    router.push('/news');
  }

  return (
    <div>
      <section className={styles['news-center-wrap']}>
        <header className='home-page-part-title'>
          <p className='f'>新闻中心</p>
          <p className='s'>
            <span className='s-l'>NEWS CENTER</span>
            <span className='s-r' onClick={onMoreClick}>查看更多 &gt;</span>
          </p>
        </header>
        <ul>
          { newsDate.length > 0 && newsDate.map(it => <SingleNewsCode newsData={it} key={it.ID} />) }
          { newsDate.length === 0 && <Empty style={{marginTop: 40}} description='暂无数据' /> }
        </ul>
      </section>
    </div>
  )
}
