import React from 'react'
import MpImage from '../../common/MpImage'
import styles from './index.module.css'
// import Image from 'next/image'

export default function index() {
  return (
    <section className={styles.wrap}>
      <header>
        <p className={styles.f}>服务价值</p>
        <p>SERVICE VALUE</p>
      </header>
      <div className={styles.content}>
        <div>
          <MpImage src='/worth.png' alt='' />
        </div>
        <ul>
          <li>
            <div>
              <MpImage src='/qian.png' width={87} height={87} />
            </div>
            <div>
              <p className={styles.f}>千款产品</p>
              <p>{'Thousands of products'.toLocaleUpperCase()}</p>
            </div>
          </li>
          <li>
            <div>
              <MpImage src='/team.png' width={87} height={87} />
            </div>
            <div>
              <p className={styles.f}>专业团队</p>
              <p>{'Professional team'.toLocaleUpperCase()}</p>
            </div>
          </li>
          <li>
            <div>
              <MpImage src='/express.png' width={87} height={87} />
            </div>
            <div>
              <p className={styles.f}>自营物流</p>
              <p>{'Self-support Logistics'.toLocaleUpperCase()}</p>
            </div>
          </li>
          <li>
            <div>
              <MpImage src='/color.png' width={87} height={87} />
            </div>
            <div>
              <p className={styles.f}>色彩管理</p>
              <p>{'Color Management'.toLocaleUpperCase()}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  )
}
