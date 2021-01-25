import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Anchor from '../Anchor';
import { Cookie } from '../../../utils/cookie';
import { useSelector, useDispatch } from 'react-redux'
import { HelpPageEnumType, IStore } from '../../../utils/types4TS';
import { setUserState, fetchUserState, removeUserState } from '../../../actions';
import { Icon, Popconfirm, Popover } from 'antd';
import { showConfirmWithoutMsg } from '../../../utils/model';

export default function index() {
  const router = useRouter();
  const user = useSelector((state: IStore) => state.user);
  const dispatch = useDispatch();

  const whoAmI = async () => {
    const userStr = sessionStorage.getItem('user');
    if (userStr) {
      dispatch(setUserState(JSON.parse(userStr)));
    } else {
      const res = await dispatch(fetchUserState());
      if (!res) {
        Cookie.removeCookie('token');
        sessionStorage.clear();
      }
    }
  }

  useEffect(() => {
    if (user) return;
    const token = Cookie.getCookie('token');
    if (token) {
      whoAmI();
    }
  }, [])

  const needShowBlueList = ['/help/[id]', '/help', '/productIntro', '/product', '/newsDetail']; // 需要顶部展示蓝色背景的页面地址， 目前只有主页需要
  const key = needShowBlueList.indexOf(router.pathname) > -1;
  const [state, setState] = useState({
    showBlueBg: false,
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
  }

  const onLoginClick = () => {
    if (!user) router.push('/login');
  };

  const onLoginoutClick = () => {
    showConfirmWithoutMsg({
      title: '确定退出登录吗?',
      onOk: loginOut
    })
  }

  const loginOut = () => {
    dispatch(removeUserState());
    Cookie.removeCookie('token');
    sessionStorage.clear();
    router.push('/login');
  };

  const onLogoClick = () => {
    if (router.pathname !== '/') router.push('/');
  }

  return (
    <div className={`${styles['mp-common-header-wrap']} ${(state.showBlueBg || key) && styles['show-blue']}`}>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.logo} onClick={onLogoClick}></div>
        </div>
        <ul className={styles.menus}>
          <li className={styles[router.pathname === '/' ? 'active' : '']}>
            <Link href='/'>首页</Link>
          </li>
          <li>
            <a href='http://order.mpzj.cn:8156/pc/#/placeOrder' target='_blank'>快捷下单</a>
          </li>
          <li className={styles[['/productIntro', '/product'].includes(router.pathname) ? 'active' : '']}>
            <Link href='/productIntro'>产品介绍</Link>
          </li>
          <li className={styles[['/news', '/newsDetail'].includes(router.pathname) ? 'active' : '']}>
            <Link href='/news'>新闻中心</Link>
          </li>
          <li className={styles[router.pathname === '/about' ? 'active' : '']}>
            <Link href='/about'>关于我们</Link>
          </li>
          <li className={styles[['/help/[id]', '/help'].includes(router.pathname) ? 'active' : '']}>
            <Link href={`/help`}>帮助中心</Link>
          </li>
        </ul>
        {
          user
          ?
            <Popover placement="bottom" content={
              <Popconfirm
                placement="bottomRight"
                title='确定退出登录吗?'
                onConfirm={loginOut}
                okText="确定"
                cancelText="取消"
                className='mp-pop-confirm-wrap'
              >
                <div className={styles['loginout-box']}><Icon type="poweroff" /> 注销登录</div>
              </Popconfirm>
              // <div className={styles['loginout-box']} onClick={onLoginoutClick}><Icon type="poweroff" /> 注销登录</div>
            } >
              <div className={styles.right} onClick={onLoginClick}>
                <i></i>
                <span>{user.CustomerName}</span>
              </div>
            </Popover>
          :
            <div className={styles.right} onClick={onLoginClick}>
              <i></i>
              <span>登录</span>
            </div>
        }
        
        
      </div>
      <Anchor handleAnchorChange={handleAnchorChange} />
    </div>
  )
}
