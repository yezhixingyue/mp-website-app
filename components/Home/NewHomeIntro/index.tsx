import { Icon } from 'antd'
import Link from 'next/link'
import React from 'react'
import MpImage from '../../common/MpImage'
import styles from './index.module.scss'

export default function index() {
  return (
    <section className={styles.wrap}>
      <header>名片之家</header>
      <div>
        <section>
          <header>
            <p><i style={{color: '#428dfa'}}>500万</i>广告</p>
            <p>设计机构<i style={{color: '#428dfa'}}>印刷服务商</i></p>
          </header>
          <div>
            <div>
              <p>名片之家创始于2008年，是500万广告设计机构印刷服务商，我们坚持专业化、规</p>
              <p>模化、关联化的经营理念，以构建未来商业印刷生态系统为己任，</p>
              <p>做中国文化创意与印刷科技产业生态系统的缔造者...</p>
            </div>
            <p>
              <Link href='/about'>
                <a>
                  <span className='mp-link-style'>查看详情 <Icon type="right" /></span>
                </a>
              </Link>
            </p>
          </div>
        </section>
        <aside>
          <Link href='/about'>
            <a>
              <MpImage src='/new-home-intro.png' width={520} height={360} hasModel />
            </a>
          </Link>
        </aside>
      </div>
    </section>
  )
}
