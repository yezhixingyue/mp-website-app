import { Typography } from 'antd';
import React from 'react'
import MpImage from '../../common/MpImage'
import styles from './index.module.scss'
// import Image from 'next/image'
const { Paragraph } = Typography;

export default function index() {
  return (
    <section className={styles.wrap}>
      <header>
        <p className={`${styles.f} part-title`}>服务价值</p>
        <p className='part-title-2'>SERVICE VALUE</p>
      </header>
      <div className={styles.content}>
        <ul>
          <li>
            <div>
              <MpImage src='/worth-equ.png' width={52} height={47} />
              <h2>先进设备</h2>
              <h3>Advanced equipment</h3>
              <p>采购行业先进印前、印刷、印后等设备，不断推动产业链持续升级，帮助客户创造价值与回报。</p>
            </div>
            <section>
              <header>
                <h2>先进设备</h2>
                <p>Advanced equipment</p>
              </header>
              <Paragraph ellipsis={{ rows: 5, expandable: false }}>采购行业先进印前、印刷、印后等设备，不断推动产业链持续升级，帮助客户创造价值与回报。</Paragraph>
            </section>
          </li>
          <li>
            <div>
              <MpImage src='/worth-color.png' width={50} height={47} />
              <h2>色彩管理</h2>
              <h3>Color management</h3>
              <p>运用标准色彩管理系统，从输出、材料、设备、油墨、环境等实现数字化应用管理，提供高质量色彩匹配，实现所见即所得。</p>
            </div>
            <section>
              <header>
                <h2>色彩管理</h2>
                <p>Color management</p>
              </header>
              <Paragraph ellipsis={{ rows: 5, expandable: false }}>运用标准色彩管理系统，从输出、材料、设备、油墨、环境等实现数字化应用管理，提供高质量色彩匹配，实现所见即所得。</Paragraph>
            </section>
          </li>
          <li>
            <div>
              <MpImage src='/worth-team.png' width={47} height={47} />
              <h2>专业团队</h2>
              <h3>Professional team</h3>
              <p>12年专注印刷服务行业、专业服务广告设计机构；200余位专业客服，专属对接，将您的需求快速落到实处。</p>
            </div>
            <section>
              <header>
                <h2>专业团队</h2>
                <p>Professional team</p>
              </header>
              <Paragraph ellipsis={{ rows: 5, expandable: false }}>12年专注印刷服务行业、专业服务广告设计机构；200余位专业客服，专属对接，将您的需求快速落到实处。</Paragraph>
            </section>
          </li>
          <li style={{marginRight: 0}}>
            <div>
              <MpImage src='/worth-pro.png' width={47} height={47} />
              <h2>千款产品</h2>
              <h3>Thousands of product</h3>
              <p>八大体系、百种系列、千款单品，数百万广告设计机构客户的口碑见证。</p>
            </div>
            <section>
              <header>
                <h2>千款产品</h2>
                <p>Thousands of product</p>
              </header>
              <Paragraph ellipsis={{ rows: 5, expandable: false }}>八大体系、百种系列、千款单品，数百万广告设计机构客户的口碑见证。</Paragraph>
            </section>
          </li>
        </ul>
      </div>
    </section>
  )
}
