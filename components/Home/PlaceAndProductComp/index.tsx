import React from 'react'
import Panel from '../Panel'
import HomeProductIntro from '../HomeProductIntro'
import styles from './index.module.css'

export default function index() {
  return (
    <section className={styles.wrap}>
      <header>
        <Panel />
      </header>
      <div className='home-page-part-title'>
        <p className='f'>产品介绍</p>
        <p className='s'>
          <span className='s-l'>PRODUCT INTRODUCTION</span>
          <span className='s-r'>查看更多 &gt;</span>
        </p>
      </div>
      <HomeProductIntro />
    </section>
  )
}
