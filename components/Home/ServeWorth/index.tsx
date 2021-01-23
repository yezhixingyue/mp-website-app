import React from 'react'
import MpImage from '../../common/MpImage'
import styles from './index.module.scss'
// import Image from 'next/image'

export default function index() {
  return (
    <section className={styles.wrap}>
      <header>
        <p className={styles.f}>服务价值</p>
        <p>SERVICE VALUE</p>
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
          </li>
          <li>
            <div>
              <MpImage src='/worth-color.png' width={50} height={47} />
              <h2>先进设备</h2>
              <h3>Advanced equipment</h3>
              <p>采购行业先进印前、印刷、印后等设备，不断推动产业链持续升级，帮助客户创造价值与回报。</p>
            </div>
          </li>
          <li>
            <div>
              <MpImage src='/worth-team.png' width={47} height={47} />
              <h2>先进设备</h2>
              <h3>Advanced equipment</h3>
              <p>采购行业先进印前、印刷、印后等设备，不断推动产业链持续升级，帮助客户创造价值与回报。</p>
            </div>
          </li>
          <li>
            <div>
              <MpImage src='/worth-pro.png' width={47} height={47} />
              <h2>先进设备</h2>
              <h3>Advanced equipment</h3>
              <p>采购行业先进印前、印刷、印后等设备，不断推动产业链持续升级，帮助客户创造价值与回报。</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  )
}
