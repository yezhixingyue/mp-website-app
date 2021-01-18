import React from 'react'
import styles from './index.module.css'
import { Tabs } from 'antd';
import api from '../../../services';
import { isBrower } from '../../../utils';
import MpImage from '../../common/MpImage';
import { useSelector, useDispatch } from 'react-redux';
import { setHomeProductState } from '../../../actions';
import { IHomePageState, IStore } from '../../../utils/types4TS';
import { useRouter } from 'next/router';

const { TabPane } = Tabs;

export default function index() {
  const { products, lv1Classify }: IHomePageState = useSelector((store: IStore) => store.home);
  const dispatch = useDispatch();
  const router = useRouter();

  const onTabChange = async (ID) => {
    if (!isBrower()) return;
    dispatch(setHomeProductState([]));
    const resp = await api.getProductsList({
      Page: 1,
      PageSize: 3,
      ProductClass: {
        First: ID
      }
    })
    if (resp.data.Status === 1000) {
      dispatch(setHomeProductState(resp.data.Data));
    }
  }

  const onProductClick = (id: string) => {
    router.push(`/product?productID=${id}`);
  }

  return (
    <section className={styles['intro-wrap']}>
      <Tabs style={{ height: 525 }} onChange={(activeKey) => onTabChange && onTabChange(activeKey)}>
        {lv1Classify.map(it => (
          <TabPane tab={it.ClassName} key={`${it.ID}`}>
            { products.map(product => (
              <div key={product.ID} className={styles['product-item']} onClick={() => onProductClick(product.ID)}>
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
