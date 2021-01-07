import React from 'react'
import Head from 'next/head'
import styles from './index.module.css'
import Item from 'antd/lib/list/Item'

export default function index() {
  return (
    <div className={styles['mp-abount-page-wrap']}>
      <Head>
        <title>关于我们 - 郑州名片之家电子商务有限公司</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.header}></div>
      <ul>
        <li className={styles.intro}>
          <div className={styles['item-header']}>
            <p>公司简介</p>
            <div>{'Company profile'.toLocaleUpperCase()}</div>
          </div>
          <div className={styles['intro-content']}>
            <ul>
              <li>名片之家创始于2008年，是国内领先的印刷供应商之一，我们坚持专业化、规模化、关联化的经营理念，以构建未来商业印刷生态系统为己任，做中国文化创意与印刷科技产业生态系统的缔造者。经过十多年的沉淀与发展，名片之家聚焦产业革新、产品创新，持续为广大广告、设计、图文、电商等合作伙伴，提供具有竞争力的产品。我们现有画册系列、商务数码系列、高档名片系列、单页/海报系列、拼版不干胶系列、特殊材料不干胶系列、不干胶卷标系列、PVC制卡系列、商务包装系列、商务办公系列等近千种单品的输出，为客户提供全面多元化服务。</li>
              <li>名片之家致力于将优质的产品通过广泛的销售渠道、自建物流体系、第三方物流等渠道快速送达到客户手中，努力构建快速服务体系。目前名片之家员工近千人，业务遍及河南、河北、山西、陕西、山东、安徽、江苏、北京等地，服务数百万广告设计机构。</li>
              <li>名片之家立足中原，与生态伙伴开放合作，聚焦产业链人才培育、技术创新、模式创新等，提供产品规划、设计、研发、制造、交付、配送等一站式综合服务，向全国客户提供行业定制化解决方案，为客户创造非凡价值。</li>
            </ul>
            <div></div>
          </div>
        </li>
        <li className={styles.menus}>
          <div style={{width: 215}}>
            <img src='/about-icon1.png' />
            <div>愿景</div>
            <p>做中国文化创意与印刷科技产业</p>
            <p>生态系统的缔造者</p>
          </div>

          <div style={{width: 215, marginLeft: 90}}>
            <img src='/about-icon2.png' />
            <div>使命</div>
            <p>实现产业链价值持续升级，帮助</p>
            <p>客户创造价值回报</p>
          </div>

          <div style={{width: 260, marginLeft: 90}}>
            <img src='/about-icon3.png' />
            <div>价值观</div>
            <p>以客户为中心 、相互成就、 共享共担、</p>
            <p>勇于创新、诚信、活力、精益求精</p>
          </div>

          <div style={{width: 240, marginLeft: 90}}>
            <img src='/about-icon4.png' />
            <div>愿景</div>
            <p>上善若水、臻于至善、以人为本、脚</p>
            <p>踏实地、百折不挠、创造奇迹。</p>
          </div>
        </li>
        <li className={styles.course}>
          <div className={styles['item-header']}>
            <p>发展历程</p>
            <div>{'development history'.toLocaleUpperCase()}</div>
          </div>
          <div className={styles['course-content']}>
            <img src="/about-line.png" alt=""/>
            <ul>
              <li style={{top: 185}}>
                <div></div>
                <h2>2008年—2009年</h2>
                <p>艰苦创业 靠OEM掘得第一桶金</p>
              </li>
              <li style={{top: 105, left: 190}}>
                <p>创新驱动发展   企业规模加速扩大</p>
                <h2>2010年—2011年</h2>
                <div></div>
              </li>
              <li style={{top: 94, left: 435}}>
                <div></div>
                <h2>2012年—2014年</h2>
                <p>奠定发展基础 跃居区域三强</p>
              </li>
              <li style={{top: 10, left: 640}}>
                <p>多品牌战略 再次迈向新起点</p>
                <h2>2015年—2017年</h2>
                <div></div>
              </li>
              <li style={{top: 132, left: 770}}>
                <div></div>
                <h2>2018年—2019年</h2>
                <p>大力推进转型升级 打造企业发展新引擎</p>
              </li>
              <li style={{top: 40, left: 890}}>
                <p>搭建全新印刷生态系统 开启发展新纪元</p>
                <h2>2020年</h2>
                <div></div>
              </li>
              <li style={{top: -60, right: 10}}>
                <p>共享、共创、共赢、共筑未来！</p>
                <h2>未来</h2>
                <div></div>
              </li>
            </ul>
            
          </div>
        </li>
      </ul>
    </div>
  )
}
