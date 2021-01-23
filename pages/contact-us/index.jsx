import Head from 'next/head'
import React, { useEffect } from 'react'
import styles from './index.module.scss'
import OpinionForm from '../../components/ContactPage/OpinionForm'
// import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function index() {
  // const router = useRouter();
  const user = useSelector((state) => state.user);

  const handleMapBringIn = () => {
    if (AMap) {
      const map = new AMap.Map('map-container', {
        center: [113.684598, 34.818867],
        zoom: 13
      });
      const marker = new AMap.Marker({
        position: new AMap.LngLat(113.684598, 34.818867),
        title: '名片之家',
      });
      map.add(marker);
    }
  }

  const mapUrl = 'https://webapi.amap.com/maps?v=1.4.15&key=d1de441473f06000bd61463102442b1e';

  useEffect(() => {
    // setTimeout(() => {
    //   if (router.asPath.includes('opinion')) {
    //     const oWrap = document.getElementsByTagName('html')[0];
    //     oWrap.scrollTop = 1075;
    //   }
    // }, 100);
    let key = true;
    const oSrc = document.getElementsByTagName('script');
    for (let i = 0; i < oSrc.length; i++) {
      const s = oSrc[i];
      if (s.src === mapUrl) {
        key = false;
        handleMapBringIn();
        break;
      }
    }
    if (!key) return;
    window.initMap = () => {
      handleMapBringIn();
    };
    const jsapi = document.createElement('script');
    jsapi.charset = 'utf-8';
    jsapi.src = 'https://webapi.amap.com/maps?v=1.4.15&key=d1de441473f06000bd61463102442b1e&callback=initMap';
    document.head.appendChild(jsapi);

  }, [])

  return (
    <section className={styles['mp-contact-page-wrap']}>
      <Head>
        <title>联系我们 - 郑州名片之家电子商务有限公司</title>
        <link rel="icon" href="/favicon.ico" />
        {/* <script src={mapUrl}></script> */}
      </Head>
      <header id='contact-top'>
        <div>联系我们</div>
        <h2>{'contact us'.toLocaleUpperCase()}</h2>
      </header>
      <section className={styles['intro-part']} id='change-title-style-to-show'>
        {/* <header>
          <h1>联系我们</h1>
          <h2>{'contact us'.toLocaleUpperCase()}</h2>
        </header> */}
        <ul>
          <li className={styles['intro-item-f']}>
            <aside>
              <img src="/contact-add.png" alt="" />
            </aside>
            <div>
              <h2>地址</h2>
              <p style={{ width: 212 }}>郑州花园路与国基路花园SOHO一栋10楼</p>
            </div>
          </li>
          <li className={styles['intro-item-s']}>
            <aside>
              <img src="/contact-service.png" alt="" />
            </aside>
            <div>
              <h2>售后专线</h2>
              <p>4006363500</p>
            </div>
          </li>
          <li className={styles['intro-item-l']}>
            <aside>
              <img src="/contact-website.png" alt="" />
            </aside>
            <div>
              <h2>官方网址</h2>
              <p>www.mpzj.cn</p>
            </div>
          </li>
        </ul>
        <ul>
          <li className={styles['intro-item-f']}>
            <aside>
              <img src="/contact-qq.png" alt="" />
            </aside>
            <div>
              <h2>接单QQ</h2>
              <p>
                <span>
                  <i>郑州大区：800065607</i>
                  <i>省外大区：800051518</i>
                </span>
                <span>
                  <i>豫东大区：800131866</i>
                  <i>豫西大区：800131899</i>
                </span>
              </p>
            </div>
          </li>
          <li className={styles['intro-item-s']}>
            <aside>
              <img src="/contact-phone.png" alt="" />
            </aside>
            <div>
              <h2>服务热线</h2>
              <p>4006363006</p>
            </div>
          </li>
          <li className={styles['intro-item-l']}>
            <aside>
              <img src="/contact-mobile.png" alt="" />
            </aside>
            <div>
              <h2>招商热线</h2>
              <p>18638768191</p>
            </div>
          </li>
        </ul>
      </section>
      <div>
        <div id="map-container" tabIndex="0"></div>
        <section id='opinion'>
          <header>
            <span>请写下您的意见或建议</span>
            <i><em>/</em>Opinion suggestion</i>
          </header>
          <OpinionForm user={user} />
        </section>
      </div>
    </section>
  )
}
