import React, { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import api from '../../services'
import { BaseClassifyItem, IClassifyItem, ICondtion4ProList, IStore } from '../../utils/types4TS';
import { getFilterClassifyList } from '../../utils';
import styles from './index.module.scss';
import { useSelector } from 'react-redux';
import { Empty, Icon, Pagination } from 'antd';
import MpImage from '../../components/common/MpImage';

// interface IState {
//   lv1Left: number;
//   lv2Left: number;
//   lv2List: BaseClassifyItem[];
// }

export default function index() {
  const productState = useSelector((state: IStore) => state.product);
 

  const [state, setState] = useState({
    lv1Left: 0,
    lv2Left: 0,
    lv2List: [],
    lv1Width: 0,
    lv2Width: 0,
  })
  const lv1Ref = useRef<HTMLUListElement | undefined>();
  const lv2Ref = useRef<HTMLUListElement | undefined>();
  useEffect(() => {
    const t = productState.productClassify.find(it => it.ID === productState.curLv1Class);
    setState({
      ...state,
      lv2List: t ? t.children : [],
      lv1Width: lv1Ref.current.offsetWidth - 40,
      lv2Width: lv2Ref.current.offsetWidth - 75,
    })
  }, [productState.curLv1Class])

  const onPageChange = (page: number, pageSize?: number) => {
    console.log(page, pageSize, 'onPageChange');
  }

  return (
    <section className={styles['mp-product-intro-list-page-wrap']}>
      <Head>
        <title>产品介绍 - 郑州名片之家电子商务有限公司</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <p>
          <span>名片之家<Icon type="right" />产品介绍</span>
        </p>
        <div>
          <div style={{height: 76}}> {/* 一级产品分类 */}
            <ul ref={lv1Ref} style={{left: state.lv1Left}}>
              {
                productState.productClassify.map(lv1 => (
                  <li key={lv1.ID}>
                    <span className={productState.curLv1Class === lv1.ID ? `${styles.active}` : ''}>
                      {lv1.ClassName}
                    </span>
                  </li>
                ))
              }
            </ul>
          </div>
          <div style={{height: 77}}> {/* 一级产品分类 */}
            <ul className={styles.lv2ul} ref={lv2Ref} style={{left: state.lv2Left}}>
              <li>
                <span className={productState.curLv2Class === 0 ? `${styles.active}` : ''}>全部</span>
              </li>
              {
                state.lv2List.map(lv2 => (
                  <li key={lv2.ID}>
                    <span className={productState.curLv2Class === lv2.ID ? `${styles.active}` : ''}>
                      {lv2.ClassName}
                    </span>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </header>
      <div className={styles.content}>
        {
          productState.productList.length === 0
          && 
          <div>
            <Empty description='该分类暂无产品数据' />
          </div>
        }
        <section>
          <ul>
            {
              productState.productList.map(it => (
                <li key={it.ID}>
                  <MpImage src={`http://192.168.1.92:8055${it.Cover}`} alt="" width={371} height={247.3} />
                  <section>
                    <header>{it.Name}</header>
                    <div>{it.Introduce}</div>
                    <footer className='link-blue'>点击查看 <Icon type="right" /></footer>
                  </section>
                </li>
              ))
            }
          </ul>
        </section>
      </div>
      <footer>
        <Pagination
         current={productState.Page || 1}
         onChange={onPageChange}
         pageSize={9}
         total={productState.DataNumber}
         />
      </footer>
    </section>
  )
}

export async function getServerSideProps() {
  let key = true;
  const handleErrCatch = () => {
    key = false;
  }
  let productClassify: IClassifyItem[] = [];
  let productList = [];
  let DataNumber = 0;
  let curLv1Class = 0;
  const classifyRes = await api.getProductClassify().catch(handleErrCatch);
  if (key && classifyRes && classifyRes.data.Status === 1000) {
    productClassify = getFilterClassifyList(classifyRes.data.Data);
  }
  if (productClassify.length > 0) {
    curLv1Class = productClassify[0].ID;
    const _temp:ICondtion4ProList = { Page: 1, PageSize: 9, ProductClass: { First: curLv1Class } };
    const proResp = await api.getProductsList(_temp).catch(handleErrCatch);
    if (key && proResp && proResp.data.Status === 1000) {
      productList = proResp.data.Data;
      DataNumber = proResp.data.DataNumber;
    }
  }
  return {
    props: {
      initialReduxState: {
        product: {
          productClassify,
          productList,
          DataNumber,
          curLv1Class,
          curLv2Class: 0,
          curProduct: null,
          Page: 1,
        }
      }
    }
  }
}