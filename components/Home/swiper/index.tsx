import React, { useRef } from 'react'
import { Carousel } from 'antd';
// import 'antd/es/carousel/style'<HTMLUListElement | undefined>
import styles from './index.module.scss';
import MpImage from '../../common/MpImage';
import { SetupEnumType } from '../../../setup';

export default function index({ swiperData }) {
  const ref = useRef<Carousel | undefined>();

  const onPrevClick = () => {
    if (ref && ref.current) {
      ref.current.prev()
    }
  }
  
  const onNextClick = () => {
    if (ref && ref.current) {
      ref.current.next()
    }
  }

  const onMouseEnter = () => {
    if (ref && ref.current) {
      ref.current.innerSlider.pause()
    }
  }

  // const onMouseLeave = () => {
  //   if (ref && ref.current) {
  //     // ref.current.innerSlider.slickPause()
  //     console.log(ref.current);
  //   }
  // }

  return (
    <section className={styles.wrap}>
      <div className={styles.prev} onClick={onPrevClick} onMouseEnter={onMouseEnter}><i></i></div>
      <Carousel autoplay className={styles.carousel} ref={ref}>
        {
          swiperData.map(it => (
            <div key={it.ID}>
              <a href={it.Url} target='_blank' title={it.Title}>
                <MpImage src={SetupEnumType.baseUrl + it.Pic} alt={it.Title} />
              </a>
            </div>
          ))
        }
      </Carousel>
      <div className={styles.next} onClick={onNextClick} onMouseEnter={onMouseEnter}><i></i></div>
    </section>
  )
}
