import React from 'react'
import Panel from '../Panel'
import HomeProductIntro from '../HomeProductIntro'
import styles from './index.module.css'
import { useRouter } from 'next/router'

export default function index() {
  const router = useRouter();

  const onMoreClick = () => {
    router.push('/productIntro');
  }

  return (
    <section className={styles.wrap} id='change-title-style-to-show'>
      <header>
        <Panel />
      </header>
      <div className='home-page-part-title'>
        <p className='f'>产品介绍</p>
        <p className='s'>
          <span className='s-l'>PRODUCT INTRODUCTION</span>
          <span className='s-r' onClick={onMoreClick}>查看更多 &gt;</span>
        </p>
      </div>
      <HomeProductIntro />
    </section>
  )
}
