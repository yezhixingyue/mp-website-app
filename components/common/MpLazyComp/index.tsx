import React from 'react'
import LazyLoad from 'react-lazyload';

export default function index(props) {
  return (
    <LazyLoad offset={props.offset || 100} once>
      {props.children}
    </LazyLoad>
  )
}
