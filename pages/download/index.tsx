import React from 'react';
import Head from 'next/head';
import styles from './index.module.scss';
import { Button } from 'antd';
import MpImage from '../../components/common/MpImage';
import { extname, getFileDownLoad } from '../../utils';
import { SetupEnumType } from '../../setup';

export default function index() {
  // const onDownLoadCLick = () => {
  //   getFileDownLoad(SetupEnumType.downloadUrl);
  // }

  const getfileName = (url: string, fileName?: string) => {
    const _arr = url.split('/');
    let _fileName = _arr[_arr.length - 1];
    if (fileName) {
      const _name = extname(_fileName);
      _fileName = fileName + '.' + _name;
    } else {
      const _t = _fileName.split(' ');
      if (_t.length === 2) _fileName = _t[1];
      else if (_t.length > 2) {
        const _t2 = _t.slice(1).join(' ');
        _fileName = _t2;
      }
    }
    return _fileName;
  }

  const fileName = getfileName(SetupEnumType.downloadUrl);

  return (
    <div className={styles.wrap}>
      <Head>
        <title>软件下载 - 郑州名片之家电子商务有限公司</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.banner}>
        <div>
          <h1>自助下单</h1>
          <h2>为您更高效便捷的提供服务</h2>
          <p>To provide more efficient and convenient services for you</p>
          <a href={SetupEnumType.downloadUrl} download={fileName}>
            <Button shape="round">立即下载</Button>
          </a>
        </div>
      </div>
      <section className={styles.introPart} id='change-title-style-to-show'>
        <header>
          <h2>功能介绍</h2>
          <p>{'Function introduction'.toLocaleUpperCase()}</p>
        </header>
        <ul>
          <li>
            <aside><MpImage src="/down-1.png" alt=""/></aside>
            <div>
              <h4>在线报价</h4>
              <span>不排队，零等待，一键获取最新价格，为用户提供快捷高效的在线报价</span>
            </div>
          </li>
          <li>
            <aside><MpImage src="/down-2.png" alt=""/></aside>
            <div>
              <h4>优惠下单</h4>
              <span>不定时优惠卷，下单先领劵。全天24h均可下单，在线下单专享优惠。</span>
            </div>
          </li>
          <li>
            <aside><MpImage src="/down-3.png" alt=""/></aside>
            <div>
              <h4>查账对账</h4>
              <span>系统提供查账对账功能，历史付款明细条理清晰，笔笔支出有迹可寻。</span>
            </div>
          </li>
          <li>
            <aside><MpImage src="/down-4.png" alt=""/></aside>
            <div>
              <h4>订单跟踪</h4>
              <span>从下单、拼板、生产到配送，全环节实时跟踪，随时查看。</span>
            </div>
          </li>
          <li>
            <aside><MpImage src="/down-5.png" alt=""/></aside>
            <div>
              <h4>在线充值</h4>
              <span>价格便宜，安全方便，鼠标轻触充值金额瞬间到账，账户金额实时更新。</span>
            </div>
          </li>
          <li>
            <aside><MpImage src="/down-6.png" alt=""/></aside>
            <div>
              <h4>批量下单</h4>
              <span>多个订单合并付款，一次支付，简单便捷，更能节省运费。</span>
            </div>
          </li>
        </ul>
      </section>
      <section className={styles.specialityPart}>
        <header>
          <h2>软件特性</h2>
          <p>{'Software Specification'.toLocaleUpperCase()}</p>
        </header>
        <div>
          <aside style={{textAlign: 'right'}}>
            <div className={styles['specialit-f']}>
              <MpImage src="/down-spec-1.png" alt=""/>
              <h4>适用平台</h4>
              <span>本软件支持windows7及以上版本系统安装使用</span>
            </div>
            <div>
              <MpImage src="/down-spec-3.png" alt=""/>
              <h4>软件优势</h4>
              <span>与同类软件相比较，无需安装插件、系统稳定性更高，可确保用户在下单过程中万无一失</span>
            </div>
          </aside>
          <div>
            <MpImage src="/speciality.png" alt=""/>
          </div>
          <aside>
            <div className={styles['specialit-f']}>
              <MpImage src="/down-spec-2.png" alt=""/>
              <h4>适用人群</h4>
              <span>本软件主要面向电商平台、广告公司、以及线下图文店等用户。</span>
            </div>
            <div>
              <MpImage src="/down-spec-4.png" alt=""/>
              <h4>免费版</h4>
              <span>自助下单免费版，面向个人用户，无试用时间限制。用户初次登录后，所有功能均可使用。</span>
            </div>
          </aside>
        </div>
      </section>
      <section className={styles.infoPart}>
        <div>
          <ul>
            <li className={styles['infoPart-first']}>
              <div>
                <MpImage src="/down-info-1.png" alt=""/>
              </div>
              <h2>61.6MB</h2>
              <h3>文件大小</h3>
            </li>
            <li>
              <div>
                <MpImage src="/down-info-2.png" alt=""/>
              </div>
              <h2>70%</h2>
              <h3>专属用户</h3>
            </li>
            <li>
              <div>
                <MpImage src="/down-info-3.png" alt=""/>
              </div>
              <h2>20000+</h2>
              <h3>文件下载</h3>
            </li>
            <li className={styles['infoPart-last']}>
              <div>
                <MpImage src="/down-info-4.png" alt=""/>
              </div>
              <h2>v2.0</h2>
              <h3>版本信息</h3>
            </li>
          </ul>
        </div>
      </section>
      <section className={styles.lastPart}>
        <aside>
          <MpImage src="/down-copy.png" alt=""/>
        </aside>
        <ul>
          <li className={styles['last-f']}>
            <h2>自助下单</h2>
            <p>名片之家自助下单客户端已全新上线，自助报价、自助上传、自助查单功能全面开启，升级版体验来袭，线上下单还可享专惠！</p>
            
            <a href={SetupEnumType.downloadUrl} download={fileName}>
              <Button>点击下载</Button>
            </a>
          </li>
          <li>
            <h2>移动端报价</h2>
            <img src="/down-mobile-code.png" alt=""/>
            <p>扫描二维码进入</p>
          </li>
        </ul>
      </section>
    </div>
  )
}
