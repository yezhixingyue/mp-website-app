import React from 'react'
import { Carousel } from 'antd';
// import 'antd/es/carousel/style'
import styles from './index.module.scss';

export default function index({ swiperData }) {
  return (
    <Carousel autoplay className={styles.wrap}>
      {
        swiperData.map(it => (
          <div key={it.ID}>
            <img src={'http://192.168.1.92:8055/' + it.Pic} alt=""/>
          </div>
        ))
      }
    </Carousel>
  )
}
