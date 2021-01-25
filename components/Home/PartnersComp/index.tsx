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

  const createLogoImg = (src: string, title: string, style?: any) => (
    <MpImage src={src} style={style} title={title} />
  )
  // <MpImage src={src} style={style}>
  //   <div className={styles['logo-msg']}>{title}</div>
  // </MpImage>

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
          {createLogoImg('/logo1.png', 'MBO印刷设备')}
          {createLogoImg('/logo2.png', '爱普生')}
          {createLogoImg('/logo10.png', '小森')}
          {createLogoImg('/logo3.png', '方正')}
          {createLogoImg('/logo4.png', '富士胶片', {marginRight: 0})}
        </li>
        <li className={styles.item}>
          {createLogoImg('/logo5.png', '海德堡')}
          {createLogoImg('/logo6.png', '惠普')}
          {createLogoImg('/logo8.png', '柯尼卡美能达')}
          {createLogoImg('/logo7.png', '柯达')}
          {createLogoImg('/logo9.png', '马天尼', {marginRight: 0})}
        </li>
      </ul>
    </section>
  )
}
