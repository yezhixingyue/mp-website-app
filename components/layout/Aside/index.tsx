import React from 'react'
import styles from './index.module.scss'
import { BackTop, Popover, Tooltip } from 'antd';
import { Typography } from 'antd';

const { Paragraph } = Typography;

export default function index() {

  const PhoneList = (
    <ul className={styles['phone-list']}>
      <li>
        <p>服务热线</p>
        <p><Paragraph copyable><span>4006363006</span></Paragraph></p>
      </li>
      <li style={{border: 'none', paddingTop: 15, paddingBottom: 4}}>
        <p>售后专线</p>
        <p><Paragraph copyable><span>4006363500</span></Paragraph></p>
      </li>
    </ul>
  )

  const QQList = (
    <ul className={styles['qq-list']}>
      <li>
        <p>省外大区</p>
        <p>京津冀、河北、山西、陕西、山东、其它</p>
        <p>
          {/* <a rel="nofollow" target="_blank" href="tencent://message/?uin=4006363006&amp;Site=名片之家&amp;Menu=yes">
            <span>4006363006</span>
          </a> */}
          {/* <span>4006363006</span> */}
          
          <Tooltip placement="right" title={<Paragraph copyable={{ text: '4006363006' }} style={{color: '#fff', marginBottom: '-6px', marginTop: '-1px'}}>复制号码：</Paragraph>}>
            <span>4006363006</span>
          </Tooltip>
        </p>
      </li>
      <li>
        <p>豫东大区</p>
        <p>开封、周口、商丘、安徽</p>
        <p>
          <a rel="nofollow" target="_blank" href="tencent://message/?uin=800131866&amp;Site=名片之家&amp;Menu=yes">
            <span>800131866</span>
          </a>
        </p>
      </li>
      <li>
        <p>豫西大区</p>
        <p>焦作、洛阳、济源、长治、晋城、运城、临汾、三门峡</p>
        <p>
          <a rel="nofollow" target="_blank" href="tencent://message/?uin=800131899&amp;Site=名片之家&amp;Menu=yes">
            <span>800131899</span>
          </a>
        </p>
      </li>
      <li>
        <p>豫南大区</p>
        <p>许昌、漯河、驻马店、南阳、信阳、平顶山</p>
        <p>
          <a rel="nofollow" target="_blank" href="tencent://message/?uin=800131808&amp;Site=名片之家&amp;Menu=yes">
            <span>800131808</span>
          </a>
        </p>
      </li>
      <li>
        <p>豫北大区</p>
        <p>安阳、邯郸、邢台、新乡、鹤壁、濮阳</p>
        <p>
          {/* <a rel="nofollow" target="_blank" href="tencent://message/?uin=800050507&amp;Site=名片之家&amp;Menu=yes">
            <span>800050507</span>
          </a> */}
          {/* <span>800050507</span> */}
          <Tooltip placement="right" title={<Paragraph copyable={{ text: '800050507' }} style={{color: '#fff', marginBottom: '-6px', marginTop: '-1px'}}>复制号码：</Paragraph>}>
            <span>800050507</span>
          </Tooltip>
        </p>
      </li>
      <li>
        <p>电商平台</p>
        <p>
          {/* <a rel="nofollow" target="_blank" href="tencent://message/?uin=800051513&amp;Site=名片之家&amp;Menu=yes">
            <span>800051513</span>
          </a> */}
          {/* <span>800051513</span> */}
          <Tooltip placement="right" title={<Paragraph copyable={{ text: '800051513' }} style={{color: '#fff', marginBottom: '-6px', marginTop: '-1px'}}>复制号码：</Paragraph>}>
            <span>800051513</span>
          </Tooltip>
        </p>
      </li>
      <li style={{border: 'none'}}>
        <p>郑州大区</p>
        <p>
          <a rel="nofollow" target="_blank" href="tencent://message/?uin=800065607&amp;Site=名片之家&amp;Menu=yes">
            <span>800065607</span>
          </a>
        </p>
      </li>
    </ul>
  )

  return (
    <div className={styles['mp-layout-aside-comp-wrap']}>
      <ul>
        <li style={{bottom: 415}}>
          <Popover placement="left" content={PhoneList}>
            <div className={styles.phone}></div>
          </Popover>
        </li>
        <li style={{bottom: 310}}>
          <Popover placement="left" content={QQList}>
            <div className={styles.qq}></div>
          </Popover>
        </li>
        <li style={{bottom: 205}}>
          <Popover placement="left" content={(
            <div className={styles['code-box']}>
              <img src="/code.png" alt=""/>
              <p>名片之家公众号</p>
            </div>
          )}>
            <div className={styles.code}></div>
          </Popover>
        </li>
        <li>
          <BackTop className='mp-back-top' visibilityHeight={0}>
            <div className={styles['back-top']}></div>
          </BackTop>
          <i></i>
        </li>
      </ul>
    </div>
  )
}
