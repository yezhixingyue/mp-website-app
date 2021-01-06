import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { Tabs } from 'antd';
import api from '../../../services';

const { TabPane } = Tabs;

export default function index({ pruducts, classify }) {
  const [state, setState] = useState({
    pruductList: pruducts,
  })
  // useEffect(() => {
  //   console.log('pruducts', pruducts);
  //   console.log('classify', classify);
  // }, [])

  const onTabChange = async (ID) => {
    console.log(ID, 'onTabChange');
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
      <Tabs style={{ height: 525 }} onChange={onTabChange}>
        {classify.map(it => (
          <TabPane tab={it.ClassName} key={it.ID}>
            { state.pruductList.map(product => (
              <div key={product.ID} className={styles['product-item']}>
                <img src={'http://192.168.1.92:8055/' + product.Cover} />
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
