import React, { useState } from 'react'
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import 'react-lazy-load-image-component/src/effects/blur.css';
import LazyLoad from 'react-lazyload';

interface IProps {
  src: string;
  width?: string | number;
  height?: string | number;
  wrapHeight?: number | string;
  wrapWidth?: number | string;
  alt?: string;
  caption?: string; // 标题
  hasModel?: boolean;
  className?: string;
  style?: any;
  tipContent?: string | JSX.Element;
  children?: JSX.Element;
  title?: string;
}
const MpImage = (props: IProps) => {
  const [state, setState] = useState({
    isLoaded: false,
    // msg: '加载中...'
    msg: ' '
  })
  let style: any = {};
  if (props.width) style.width = props.width;
  if (props.height) style.height = props.height;
  style = { ...style, ...props.style};

  const content = (<>
    {
      props.hasModel && <i className='hasmodel-i'></i>
    }
    <img
      className={`${!state.isLoaded && 'opacity-0'} ${props.hasModel && 'animate'}`}
      alt={props.alt}
      title={props.title ? props.title : ''}
      height={props.height}
      onLoad={() => {
        setState({ ...state, isLoaded: true, msg: '' })
      }}
      onError={() => {
        setState({ ...state, isLoaded: true, msg: '加载失败!' })
      }}
      src={state.msg === '加载失败!' ? '' : props.src}
      width={props.width} />
    {state.msg && <p className='msg'>{state.msg}</p>}
    {
      props.hasModel && <div className='hasmodel-div'></div>
    }
    {props.children}
  </>)

  if (process.browser && !window.btoa) {
    return <div className={state.isLoaded && state.msg !== '加载失败!' ? 'lazyload-wrapper' : 'lazyload-show-bg-wrapper'} style={style}>
      {content}
    </div>
  }
  return <LazyLoad offset={100} once style={style} classNamePrefix={state.isLoaded && state.msg !== '加载失败!' ? 'lazyload' : 'lazyload-show-bg'}>
    {content}
  </LazyLoad>
}

export default MpImage;