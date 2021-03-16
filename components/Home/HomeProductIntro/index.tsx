import React, { useState } from 'react'
import styles from './index.module.css'
import { Empty, Icon, Spin, Tabs, Typography } from 'antd';
import api from '../../../services';
import { isBrower } from '../../../utils';
import MpImage from '../../common/MpImage';
import { useSelector, useDispatch } from 'react-redux';
import { setHomeProductState } from '../../../actions';
import { IHomePageState, IStore } from '../../../utils/types4TS';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { SetupEnumType } from '../../../setup';
const { Paragraph } = Typography;

const { TabPane } = Tabs;

export default function index() {
  const { products, lv1Classify }: IHomePageState = useSelector((store: IStore) => store.home);
  const dispatch = useDispatch();
  const router = useRouter();

  const [state, setState] = useState({ loading: false, err: '' })

  const onTabChange = async (ID) => {
    if (!isBrower()) return;
    dispatch(setHomeProductState([]));
    setState({ ...state, loading: true, err: '' });
    let key = true;
    const resp = await api.getProductsList({
      Page: 1,
      PageSize: 8,
      ProductClass: {
        First: ID
      }
    }).catch(() => { key = false });
    let errMsg = '';
    if (key && resp && resp.data.Status === 1000) {
      dispatch(setHomeProductState(resp.data.Data));
    } else if (!key) {
      errMsg = '错误， 获取数据失败';
    } else if (key && resp && resp.data.Status !== 1000) {
      errMsg = resp.data.Message;
    }
    setState({ ...state, loading: false, err: errMsg });
  }

  // const onProductClick = (id: string) => {
  //   router.push(`/product?productID=${id}`);
  // }

  const content = products.length > 0
   ? products.map(product => (
      <div key={product.ID} className={styles['product-item']}>
        <Link href={`/product?productID=${product.ID}`}>
          <a target='_blank' title={product.Name}>
            <MpImage src={SetupEnumType.baseUrl + product.Cover} width={280} height={210} hasModel alt={product.Name} title={product.Name} />
            <section>
              <header>{product.Name}</header>
              <div>
                <Paragraph ellipsis={{ rows: 2, expandable: false }}>{product.Introduce}</Paragraph>
                {/* {product.Introduce} */}
              </div>
              {/* <footer>
                <span>点击查看</span>
                <i></i>
              </footer> */}
            </section>
          </a>
        </Link>
      </div>
    ))
   : <Empty description='暂无数据' className={styles.empty} />

  return (
    <section className={styles['intro-wrap']}>
      {/* <Spin spinning={state.loading} delay={100}>
        <Tabs style={{ minHeight: 525 }}  onChange={(activeKey) => onTabChange && onTabChange(activeKey)} className='mp-home-tab-wrap'>
          {lv1Classify.map(it => (
            <TabPane tab={it.ClassName} key={`${it.ID}`}>
                {!state.loading && !state.err && content}
                {!state.loading && state.err && <div className={styles.showItem}>{state.err}</div>}
            </TabPane>
          ))}
        </Tabs>
      </Spin> */}
      {!state.loading && !state.err && content}
      {!state.loading && state.err && <div className={styles.showItem}>{state.err}</div>}
      <footer>
        <Link href='/productIntro'>
          <a target='_blank'>
            <span className='s-r mp-link-style'>查看更多 <Icon type="right" /></span>
          </a>
        </Link>
      </footer>
    </section>
  )
}
