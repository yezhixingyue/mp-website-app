import React from 'react'
import styles from './index.module.css'
import { useRouter } from 'next/router';
// import Image from 'next/image'
// const imgSrc = require('../../../public/place.png');
// import imgSrc from '../../../public/place.png';
// console.log(imgSrc);

export default function index() {
  const router = useRouter();

  const onOnlineClick = () => {
    router.push('http://order.mpzj.cn:8156/pc/#/placeOrder');
  };

  const onDownloadClick = () => {
    router.push('/download');
  };

  return (
    <div className={styles.wrap}>
      <ul className={`${styles['panel-wrap']} ${styles.left}`} onClick={onOnlineClick}>
        <li className={styles.left}>
          <img src='/place.png' alt="" width={58} height={58}/>
        </li>
        <li className={styles.center}>
          <p>报价下单</p>
          <div>网页版省去下载环节，不占电脑内存，打开网页即可登录，轻巧便捷，实现24小时极速下单，全程零等待；登录账号、上线产品类目及下单步骤，均与自助下单客户端相同。</div>
        </li>
        <li className={styles.right}>
          <i></i>
        </li>
      </ul>
      <ul className={styles['panel-wrap']} onClick={onDownloadClick}>
        <li className={styles.left}>
          <img src='/download.png' alt="" width={58} height={58}/>
        </li>
        <li className={styles.center}>
          <p>软件下载</p>
          <div>名片之家自助下单客户端已全新上线！客户端存放桌面便于寻找，对于订单量大的客户来说方便稳定。自助报价、自助上传、自助查单功能全面开启，升级版体验来袭，线上下单还可享专惠！</div>
        </li>
        <li className={styles.right}>
          <i></i>
        </li>
      </ul>
    </div>
    
  )
}
