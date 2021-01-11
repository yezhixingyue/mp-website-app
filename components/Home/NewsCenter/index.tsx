import React from 'react'
import MpImage from '../../common/MpImage';
import styles from './newscenter.module.css'
// import Image from 'next/image';

function SingleNewsCode({ newsData }) {
  return (
    <li>
      <MpImage src={'http://192.168.1.92:8055' + newsData.Cover} alt="" width={380} height={185}/>
      <p>{newsData.Title}</p>
      <p>
        {newsData.Introduce}
      </p>
    </li>
  )
}


export default function index({ newsDate }) {
  return (
    <div>
      <section className={styles['news-center-wrap']}>
        <header className='home-page-part-title'>
          <p className='f'>新闻中心</p>
          <p className='s'>
            <span className='s-l'>NEWS CENTER</span>
            <span className='s-r'>查看更多 &gt;</span>
          </p>
        </header>
        <ul>
          { newsDate.map(it => <SingleNewsCode newsData={it} key={it.ID} />) }
        </ul>
      </section>
    </div>
  )
}
