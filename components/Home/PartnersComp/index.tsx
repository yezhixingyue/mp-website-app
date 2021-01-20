// import { Carousel } from 'antd'
import React from 'react'
import MpImage from '../../common/MpImage'
import styles from './index.module.css'

export default function index() {
  // const settings = {
  //   // dots: true,
  //   autoplay: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 0.25
  // };

  return (
    <section className={styles.wrap}>
      <header>
        <p className={styles.f}>合作伙伴</p>
        <p>COOPERATIVE PARTNER</p>
      </header>
      {/* <Carousel autoplay slidesToScroll={0.25} dots={false} pauseOnHover={false}> */}
        {/* <div className={styles.item} style={{background: '#f40'}}>1</div>
        <div className={styles.item} style={{background: 'yellow'}}>2</div>
        <div className={styles.item} style={{background: 'blue'}}>3</div>
      </Carousel> */}
      <ul>
        <li className={styles.item}>
          <MpImage src='/logo1.png' />
          <MpImage src='/logo2.png' />
          <MpImage src='/logo10.png' />
          <MpImage src='/logo3.png' />
          <MpImage style={{marginRight: 0}} src='/logo4.png' />
        </li>
        <li className={styles.item}>
          <MpImage src='/logo5.png' />
          <MpImage src='/logo6.png' />
          <MpImage src='/logo8.png' />
          <MpImage src='/logo7.png' />
          <MpImage style={{marginRight: 0}} src='/logo9.png' />
        </li>
      </ul>
    </section>
  )
}
