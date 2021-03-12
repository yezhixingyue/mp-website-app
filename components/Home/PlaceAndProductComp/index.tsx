import React from 'react'
import Panel from '../Panel'
import HomeProductIntro from '../HomeProductIntro'
import styles from './index.module.css'
import { Icon } from 'antd'
import Link from 'next/link'

export default function index() {
  return (
    <section className={styles.wrap} id='change-title-style-to-show'>
      <header>
        <Panel />
      </header>
      <div className='home-page-part-title'>
        <p className='f part-title'>产品介绍</p>
        <p className='s part-title-2'>
          <span className='s-l'>PRODUCT INTRODUCTION</span>
          {/* <Link href='/productIntro'>
            <a target='_blank'>
              <span className='s-r'>查看更多 <Icon type="right" /></span>
            </a>
          </Link> */}
        </p>
      </div>
      <HomeProductIntro />
    </section>
  )
}
