import React from 'react'
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import 'react-lazy-load-image-component/src/effects/blur.css';
import LazyLoad from 'react-lazyload';
import styles from './index.module.scss';

interface IProps {
  src: string;
  width?: string | number;
  height?: string | number;
  wrapHeight?: number | string;
  alt?: string;
  caption?: string; // 标题
}
const MpImage = (props: IProps) => {
  // <LazyLoadImage
  //   alt={props.alt}
  //   height={props.height}
  //   effect="black-and-white"
  //   src={props.src}
  //   width={props.width} />
  if (process.browser && !window.btoa) {
    return <img
      alt={props.alt}
      height={props.height}
      src={props.src}
      width={props.width} />
  }
  return <LazyLoad height={props.wrapHeight || '100%'} offset={100} once className={styles['mp-imgae-comp-wrap']}>
    <img
      alt={props.alt}
      height={props.height}
      src={props.src}
      width={props.width} />
  </LazyLoad>
}

export default MpImage;