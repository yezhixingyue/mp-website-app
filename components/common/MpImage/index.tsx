import React, { useState } from 'react'
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import 'react-lazy-load-image-component/src/effects/blur.css';
import LazyLoad from 'react-lazyload';
import styles from './index.module.scss';

interface IProps {
  src: string;
  width?: string | number;
  height?: string | number;
  wrapHeight?: number | string;
  wrapWidth?: number | string;
  alt?: string;
  caption?: string; // 标题
  hasModel?: boolean;
  // tipContent?: string | JSX.Element;
}
const MpImage = (props: IProps) => {
  const [state, setState] = useState({
    isLoaded: false,
    // msg: '加载中...'
    msg: ' '
  })
  // <LazyLoadImage
  //   alt={props.alt}
  //   height={props.height}
  //   effect="black-and-white"
  //   src={props.src}
  //   width={props.width} />
  if (process.browser && !window.btoa) {
    return <div className='lazyload-wrapper'>
      {
        props.hasModel && <i></i>
      }
      <img
        className={`${!state.isLoaded && 'opacity-0'} ${props.hasModel && 'animate'}`}
        alt={props.alt}
        height={props.height}
        onLoad={() => {
          setState({ ...state, isLoaded: true, msg: '' })
        }}
        onError={() => {
          setState({ ...state, isLoaded: true, msg: '加载失败!' })
        }}
        src={props.src}
        width={props.width} />
      {state.msg && <p>{state.msg}</p>}
      {
        props.hasModel && <div></div>
      }
    </div>
  }
  return <LazyLoad offset={100} once>
    {
      props.hasModel && <i></i>
    }
    <img
      className={`${!state.isLoaded && 'opacity-0'} ${props.hasModel && 'animate'}`}
      alt={props.alt}
      height={props.height}
      onLoad={() => {
        setState({ ...state, isLoaded: true, msg: '' })
      }}
      onError={() => {
        setState({ ...state, isLoaded: true, msg: '加载失败!' })
      }}
      src={props.src}
      width={props.width} />
    {state.msg && <p>{state.msg}</p>}
    {
      props.hasModel && <div></div>
    }

  </LazyLoad>
}

export default MpImage;