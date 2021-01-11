import React, { useState } from 'react'
import styles from './index.module.css'
import { Tabs } from 'antd';
import api from '../../../services';
import { isBrower } from '../../../utils';
import MpImage from '../../common/MpImage'

const { TabPane } = Tabs;

export default function index({ pruducts, classify }) {
  const [state, setState] = useState({
    pruductList: pruducts,
  })
  const onTabChange = async (ID) => {
    if (!isBrower()) return;
    setState({
      ...state,
      pruductList: [],
    })
    const resp = await api.getProductsList({
      Page: 1,
      PageSize: 3,
      ProductClass: {
        First: ID
      }
    })
    if (resp.data.Status === 1000) {
      setState({
        ...state,
        pruductList: resp.data.Data,
      })
    }
  }
  return (
    <section className={styles['intro-wrap']}>
      <Tabs style={{ height: 525 }} onChange={(activeKey) => onTabChange && onTabChange(activeKey)}>
        {classify.map(it => (
          <TabPane tab={it.ClassName} key={it.ID}>
            { state.pruductList.map(product => (
              <div key={product.ID} className={styles['product-item']}>
                <MpImage src={'http://192.168.1.92:8055/' + product.Cover} width={330} height={220} />
                <section>
                  <header>{product.Name}</header>
                  <div>{product.Introduce}</div>
                  <footer>
                    <span>点击查看</span>
                    <i></i>
                  </footer>
                </section>
              </div>
            )) }
          </TabPane>
        ))}
      </Tabs>
    </section>
  )
}
