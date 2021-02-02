import React from 'react'
import styles from './index.module.css'
import { Button } from 'antd'
import Link from 'next/link'
// import { useRouter } from 'next/router'

export default function index() {
  // const router = useRouter();

  // const onMoreClick = () => {
  //   router.push('/about');
  // }

  return (
    <section className={styles.bgwrap}>
      <div className={styles.wrap}>
        <section>
          <header>
            <p>做中国文化创意与印刷科技产业</p>
            <p>生态系统的缔造者</p>
          </header>
          <ul>
            <li>
              名片之家创始于2008年，是500万广告设计机构印刷服务商，我们坚持专业化、规模化、关联化的经营理念，以构建未来商业印刷生态系统为己任，做中国文化创意与印刷科技产业生态系统的缔造者。经过十多年的沉淀与发展，名片之家聚焦产业革新、产品创新，持续为广大广告、设计、图文、电商等合作伙伴，提供具有竞争力的产品。我们现有画册系列、商务数码系列、高档名片系列、单页/海报系列、拼版不干胶系列、特殊材料不干胶系列、不干胶卷标系列、PVC制卡系列、商务包装系列、商务办公系列等近千种单品的输出，为客户提供全面多元化服务。
            </li>
            <li>名片之家致力于将优质的产品通过广泛的销售渠道、自建物流体系、第三方物流等渠道快速送达到客户手中，努力构建快速服务体系。目前名片之家员工近千人，业务遍及河南、河北、山西、陕西、山东、安徽、江苏、北京等地，服务数百万广告设计机构。</li>
            <li>名片之家立足中原，与生态伙伴开放合作，聚焦产业链人才培育、技术创新、模式创新等，提供产品规划、设计、研发、制造、交付、配送等一站式综合服务，向全国客户提供行业定制化解决方案，为客户创造非凡价值。</li>
          </ul>
          <footer>
            <Link href='/about'>
              <a target='_blank'>
                <Button type="primary">了解更多</Button>
              </a>
            </Link>
          </footer>
        </section>
      </div>
    </section>
  )
}
