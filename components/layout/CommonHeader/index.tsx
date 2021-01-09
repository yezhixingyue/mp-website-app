import React, { useState } from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Anchor from '../Anchor';

export default function index() {
  const router = useRouter();
  const needShowBlueList = ['/']; // 需要顶部展示蓝色背景的页面地址， 目前只有主页需要
  const key = needShowBlueList.indexOf(router.pathname) > -1;
  const [state, setState] = useState({
    showBlueBg: false,
    num: 1
  });

  const handleAnchorChange = (link) => {
    if (link && link === '#change-title-style-to-show') {
      setState({
        ...state,
        showBlueBg: true,
      })
    }
     else if (!link && state.showBlueBg) {
      setState({
        ...state,
        showBlueBg: false,
      })
    }
    console.log('handleAnchorChange', link, state.showBlueBg);
  }

  return (
    <div className={`${styles['mp-common-header-wrap']} ${(state.showBlueBg || key) && styles['show-blue']}`}>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.logo}></div>
        </div>
        <ul className={styles.menus}>
          <li className={styles[router.pathname === '/' ? 'active' : '']}>
            <Link href='/'>首页</Link>
          </li>
          <li>
            <a href='http://192.168.1.92:8055/pc' target='_blank'>快捷下单</a>
          </li>
          <li className={styles[router.pathname === '/productIntro' ? 'active' : '']}>
            <Link href='/productIntro'>产品介绍</Link>
          </li>
          <li className={styles[router.pathname === '/news' ? 'active' : '']}>
            <Link href='/news'>新闻中心</Link>
          </li>
          <li className={styles[router.pathname === '/about' ? 'active' : '']}>
            <Link href='/about'>关于我们</Link>
          </li>
          <li className={styles[router.pathname === '/help' ? 'active' : '']}>
            <Link href='/help'>帮助中心</Link>
          </li>
        </ul>
        <div className={styles.right}>
          <i></i>
          <span>登录</span>
        </div>
      </div>
      <Anchor handleAnchorChange={handleAnchorChange} />
    </div>
  )
}
