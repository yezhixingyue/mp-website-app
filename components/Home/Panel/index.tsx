import React, { useState } from 'react'
import styles from './index.module.css'
import Link from 'next/link';
import { SetupEnumType } from '../../../setup';
import { Icon } from 'antd';

export default function index() {

  const [state, setState] = useState({
    leftActive: false,
    rightActive: false,
  })

  const onLeftPanelMouseEnter = () => {
    setState({
      ...state,
      leftActive: true,
    })
  }

  const onLeftPanelMouseLeave = () => {
    setState({
      ...state,
      leftActive: false,
    })
  }

  const onRightPanelMouseEnter = () => {
    setState({
      ...state,
      rightActive: true,
    })
  }

  const onRightPanelMouseLeave = () => {
    setState({
      ...state,
      rightActive: false,
    })
  }

  return (
    <div className={styles.wrap}>
      <Link href={SetupEnumType.placeOrderUrl}>
        <a target='_blank'>
          <ul className={`${styles['panel-wrap']} ${styles.left}`} onMouseEnter={onLeftPanelMouseEnter} onMouseLeave={onLeftPanelMouseLeave}>
            <li className={styles.left}>
              <img src='/place.png' alt="" width={58} height={58}/>
            </li>
            <li className={styles.center}>
              <p>报价下单</p>
              <div>网页版省去下载环节，不占电脑内存，打开网页即可登录，轻巧便捷，实现24小时极速下单，全程零等待；登录账号、上线产品类目及下单步骤，均与自助下单客户端相同。</div>
            </li>
            <li className={styles.right}>
              <i className={`${state.leftActive ? styles.enter : styles.leave}`}>
                <Icon type="right" />
              </i>
            </li>
          </ul>
        </a>
      </Link>
      <Link href="/download">
        <a target='_blank'>
          <ul className={styles['panel-wrap']} onMouseEnter={onRightPanelMouseEnter} onMouseLeave={onRightPanelMouseLeave}>
            <li className={styles.left}>
              <img src='/download.png' alt="" width={58} height={58}/>
            </li>
            <li className={styles.center}>
              <p>软件下载</p>
              <div>名片之家自助下单客户端已全新上线！客户端存放桌面便于寻找，对于订单量大的客户来说方便稳定。自助报价、自助上传、自助查单功能全面开启，升级版体验来袭，线上下单还可享专惠！</div>
            </li>
            <li className={styles.right}>
              <i className={`${state.rightActive ? styles.enter : styles.leave}`}>
                <Icon type="right" />
              </i>
            </li>
          </ul>
        </a>
      </Link>
    </div>
    
  )
}
