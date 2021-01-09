import React from 'react'
import styles from './index.module.scss'
import { Anchor } from 'antd';

const { Link } = Anchor;

interface IProps {
  handleAnchorChange: (link: string) => void
}


export default function index(props: IProps) {

  const onChange = (link: string) => {
    props.handleAnchorChange(link);
  };

  return (
    <Anchor affix={false} onChange={onChange} offsetTop={80} style={{height: 0}}>
      <Link href="#change-title-style-to-show" title="" />
    </Anchor>
  )
}
