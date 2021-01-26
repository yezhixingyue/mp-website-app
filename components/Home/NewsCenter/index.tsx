import { Empty, Icon } from 'antd';
import Link from 'next/link';
import React from 'react'
import { SetupEnumType } from '../../../setup';
import MpImage from '../../common/MpImage';
import styles from './newscenter.module.css'


export default function index({ newsDate }) {

  const SingleNewsCode = ({ newsData }) => (
    <li>
      <Link href={`/newsDetail?id=${newsData.ID}`}>
        <a target='_blank'>
          <MpImage src={SetupEnumType.baseUrl + newsData.Cover} alt="" width={380} height={185} hasModel/>
          <h2 className={styles.title}>{newsData.Title}</h2>
          <p>
            {newsData.Introduce}
          </p>
        </a>
      </Link>
    </li>
  )

  return (
    <div>
      <section className={styles['news-center-wrap']}>
        <header className='home-page-part-title'>
          <p className='f'>新闻中心</p>
          <p className='s'>
            <span className='s-l'>NEWS CENTER</span>
            <Link href='/news'>
              <a target='_blank'>
                <span className='s-r'>查看更多 <Icon type="right" /></span>
              </a>
            </Link>
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
