import React from 'react'
import Head from 'next/head'
import api from '../../services'
import { BaseClassifyItem, IClassifyItem, ICondtion4ProList, IStore } from '../../utils/types4TS';
import { getFilterClassifyList } from '../../utils';
import styles from './index.module.scss';
import { useSelector } from 'react-redux'

export default function index() {
  const productState = useSelector((state: IStore) => state.product);
  let lv2List: BaseClassifyItem[] = [];
  const t = productState.productClassify.find(it => it.ID === productState.curLv1Class);
  if (t) {
    lv2List = t.children;
  }
  return (
    <section className={styles['mp-product-intro-list-page-wrap']}>
      <Head>
        <title>产品介绍 - 郑州名片之家电子商务有限公司</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <p>
          <span>名片之家&gt;产品介绍</span>
        </p>
        <div>
          <ul>
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
          <ul className={styles.lv2ul}>
            <li>
              <span className={productState.curLv2Class === 0 ? `${styles.active}` : ''}>全部</span>
            </li>
            {
              lv2List.map(lv2 => (
                <li key={lv2.ID}>
                  <span className={productState.curLv2Class === lv2.ID ? `${styles.active}` : ''}>
                    {lv2.ClassName}
                  </span>
                </li>
              ))
            }
          </ul>
        </div>
      </header>
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
        }
      }
    }
  }
}