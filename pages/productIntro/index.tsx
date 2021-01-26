import React from 'react'
import Head from 'next/head'
import api from '../../services'
import { IClassifyItem, ICondtion4ProList, IStore } from '../../utils/types4TS';
import { getFilterClassifyList } from '../../utils';
import styles from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Empty, Icon, Pagination, Spin, Tabs } from 'antd';
import MpImage from '../../components/common/MpImage';
import { changeCurLv1Class, changeCurLv2Class, changeCurPage, clearCurProduct } from '../../actions';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ProductClassifyComp from '../../components/common/ProductClassifyComp'
import { SetupEnumType } from '../../setup';

export default function index() {
  const productState = useSelector((state: IStore) => state.product);
  const dispatch = useDispatch();
  const router = useRouter();


  const onLv1ClassChange = (classID: number) => {
    if (classID === productState.curLv1Class) return;
    const productClassify = productState.productClassify;
    dispatch(changeCurLv1Class({ classID, productClassify }));
  }

  const onLv2ClassChange = (lv2ClassID: number) => {
    if (lv2ClassID === productState.curLv2Class) return;
    dispatch(changeCurLv2Class({ curLv1Class: productState.curLv1Class, lv2ClassID }));
  }

  const onPageChange = (Page: number) => {
    if (Page === productState.Page) return;
    dispatch(changeCurPage({ curLv1Class: productState.curLv1Class, lv2ClassID: productState.curLv2Class, Page }));
  }

  const onDetailClick = (id: string) => {
    router.push(`/product?productID=${id}`)
    // router.push(`?productID=${id}`)
  }

  const onTabClick = (tabID) => {
    console.log(tabID, 'onTabClick - tabID', productState.curLv2Class);
    if (+tabID !== productState.curLv2Class) return;
    dispatch(clearCurProduct());
  }

  const Content = (
    <div className={styles.content}>
      {
        productState.productList.length === 0 && !productState.Loading && !productState.curProduct
        &&
        <div>
          <Empty description='暂无产品数据' />
        </div>
      }
      {
        !productState.curProduct && <section>
          <ul>
            {
              productState.productList.map(it => (
                <li key={it.ID}>
                  <Link href={`/product?productID=${it.ID}`}>
                    <a target='_blank'>
                      <MpImage src={`${SetupEnumType.baseUrl}${it.Cover}`} alt="" width={371} height={247.3} />
                      <section>
                        <header>{it.Name}</header>
                        <div>{it.Introduce}</div>
                        <footer className='link-blue'>点击查看 <Icon type="right" /></footer>
                      </section>
                    </a>
                  </Link>
                </li>
              ))
            }
          </ul>
        </section>
      }
    </div>
  )

  return (
    <section className={styles['mp-product-intro-list-page-wrap']}>
      <Head>
        <title>产品介绍 - 郑州名片之家电子商务有限公司</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <section>
          <Breadcrumb separator={<Icon type="right" />} className='mp-breadcrumb'>
            <Breadcrumb.Item>
              <Link href="/"><a>首页</a></Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>产品介绍</Breadcrumb.Item>
          </Breadcrumb>
          {/* <span>名片之家<Icon type="right" />产品介绍</span> */}
        </section>
      </header>
      <Spin spinning={productState.Loading} delay={200}>
        {
          productState.productClassify &&
          <ProductClassifyComp
            classData={productState.productClassify}
            First={productState.curLv1Class}
            Second={productState.curLv2Class}
            onLv1ClassChange={onLv1ClassChange}
            onLv2ClassChange={onLv2ClassChange}
          >
            {Content}
          </ProductClassifyComp>
        }
        <footer>
          <Pagination
            current={productState.Page}
            onChange={onPageChange}
            pageSize={9}
            total={productState.DataNumber}
            className={productState.DataNumber === 0 ? 'opacity-0' : ''}
          />
        </footer>
      </Spin>
    </section>
  )
}

export async function getServerSideProps({ query }) {
  const { First, Second } = query;
  let key = true;
  const handleErrCatch = () => {
    key = false;
  }
  let productClassify: IClassifyItem[] = [];
  let productList = [];
  let DataNumber = 0;
  let curLv1Class = First ? +First : 0;
  let curLv2Class = Second ? +Second : 0;
  let lv2List = [];
  // let curProduct = null;
  const classifyRes = await api.getProductClassify().catch(handleErrCatch);
  if (key && classifyRes && classifyRes.data.Status === 1000) {
    productClassify = getFilterClassifyList(classifyRes.data.Data);
  }
  if (productClassify.length > 0) {
    curLv1Class = curLv1Class ? curLv1Class : productClassify[0].ID;

    if (First) {
      const t = productClassify.find(it => it.ID === curLv1Class);
      if (t) lv2List = t.children;
      else lv2List = [];
    } else {
      lv2List = productClassify[0].children;
    }
    const _temp: ICondtion4ProList = { Page: 1, PageSize: 9, ProductClass: { First: curLv1Class } };
    if (curLv2Class) _temp.ProductClass.Second = curLv2Class;
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
          curLv2Class,
          // curProduct,
          Page: 1,
          lv2List,
          Loading: false,
        }
      }
    }
  }
}