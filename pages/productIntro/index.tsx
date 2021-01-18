import React, { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import api from '../../services'
import { BaseClassifyItem, IClassifyItem, ICondtion4ProList, IStore } from '../../utils/types4TS';
import { animateScroll, getFilterClassifyList } from '../../utils';
import styles from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Button, Empty, Icon, Pagination, Spin, Tabs } from 'antd';
import MpImage from '../../components/common/MpImage';
import { changeCurLv1Class, changeCurLv2Class, changeCurPage, clearCurProduct } from '../../actions';
import { useRouter } from 'next/router';
import Item from 'antd/lib/list/Item';
import Link from 'next/link';
const { TabPane } = Tabs;
import ProductClassifyComp from '../../components/common/ProductClassifyComp'

// interface IState {
//   lv1Left: number;
//   lv2Left: number;
//   lv2List: BaseClassifyItem[];
// }

export default function index() {
  const productState = useSelector((state: IStore) => state.product);
  const dispatch = useDispatch();
  const router = useRouter();

  // const [state, setState] = useState({
  //   lv1Width: 0,
  //   lv1Left: 0,
  //   isAnimate: false,
  // })
  // const lv1Ref = useRef<HTMLUListElement | undefined>();

  // useEffect(() => {
  //   setState({
  //     ...state,
  //     lv1Width: lv1Ref.current.offsetWidth - 40,
  //   })
  // }, [])

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

  // const onLv1MenuToLeft = () => {
  //   const distance = state.lv1Left < -1200 ? 1200 : -state.lv1Left;
  //   setState({
  //     ...state,
  //     isAnimate: true,
  //   })
  //   animateScroll(state.lv1Left, state.lv1Left + distance, (num) => {
  //     setState({
  //       ...state,
  //       lv1Left: num
  //     })
  //   }, 200, () => {
  //     setState({
  //       ...state,
  //       isAnimate: false,
  //     })
  //   });
    
  // }

  // const onLv1MenuToRight = () => {
  //   const distance = state.lv1Width - 1200 + state.lv1Left > 1200 ? 1200 : state.lv1Width - 1200 + state.lv1Left;
  //   setState({
  //     ...state,
  //     isAnimate: true,
  //   })
  //   animateScroll(state.lv1Left, state.lv1Left - distance, (num) => {
  //     setState({
  //       ...state,
  //       lv1Left: num
  //     })
  //   }, 200, () => {
  //     setState({
  //       ...state,
  //       isAnimate: false,
  //     })
  //   });
  // }

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
      <Spin spinning={productState.Loading} delay={200}>
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
                    <li key={it.ID} onClick={() => onDetailClick(it.ID)}>
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
        }
        {/* {
          productState.curProduct && <article>
            <section>
              <header>
                <span>{`${productState.curProduct.ProductClass.SecondLevelName}-${productState.curProduct.Name}`}</span>
              </header>
              <div className='rich-edit-content' dangerouslySetInnerHTML={{__html: productState.curProduct.Content}}></div>
              <footer>
                <Button type='primary'>立即下单</Button>
              </footer>
            </section>
            <aside>
              <header>相关推荐</header>
              <ul>
                { productState.curProduct.AboutList.map(it => (
                  <li key={it.ID}>
                    <div>
                      <MpImage src={'http://192.168.1.92:8055/' + it.Cover} alt="" height={87} width={87} />
                    </div>
                    <section>
                      <header>{it.Name}</header>
                      <div>{it.Introduce}</div>
                    </section>
                  </li>
                )) }
              </ul>
              <footer>查看更多</footer>
            </aside>
          </article>
        } */}
      </Spin>
    </div>
  )

  return (
    <section className={styles['mp-product-intro-list-page-wrap']}>
      <Head>
        <title>产品介绍 - 郑州名片之家电子商务有限公司</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <div>
          <Breadcrumb separator={<Icon type="right" />} className='mp-breadcrumb'>
            <Breadcrumb.Item>
              <Link href="/"><a>名片之家</a></Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>产品介绍</Breadcrumb.Item>
          </Breadcrumb>
          {/* <span>名片之家<Icon type="right" />产品介绍</span> */}
        </div>
        {
          productState.productClassify && <ProductClassifyComp
           classData={productState.productClassify}
           First={productState.curLv1Class}
           Second={productState.curLv2Class}
           onLv1ClassChange={onLv1ClassChange}
           onLv2ClassChange={onLv2ClassChange}
          >
            {Content}
          </ProductClassifyComp>
        }
        {/* <div>
          <div style={{height: 76}}>
            {
              state.lv1Width > 1200 && state.lv1Left < 0 && !state.isAnimate && <div className={`${styles['move-item']} ${styles['move-prev']}`} onClick={onLv1MenuToLeft}>
                <Icon type="left" />
              </div>
            }
            <ul ref={lv1Ref} style={{left: state.lv1Left}}>
              {
                productState.productClassify.map(lv1 => (
                  <li key={lv1.ID}>
                    <span className={productState.curLv1Class === lv1.ID ? `${styles.active}` : ''} onClick={() => { onLv1ClassChange(lv1.ID) }}>
                      {lv1.ClassName}
                    </span>
                  </li>
                ))
              }
            </ul>
            {
              state.lv1Width > 1200 && 1200 - state.lv1Left < state.lv1Width && !state.isAnimate && <div className={`${styles['move-item']} ${styles['move-next']}`} onClick={onLv1MenuToRight}>
                <Icon type="right" />
              </div>
            }
          </div>
          <div >
            <Tabs
             onChange={(activeKey) => onLv2ClassChange && onLv2ClassChange(+activeKey)}
             className='mp-product-tab-wrap'
             activeKey={`${productState.curLv2Class}`}
             >
              <TabPane tab='全部' key='0'>{Content}</TabPane>
              {productState.lv2List.map(it => (
                <TabPane tab={it.ClassName} key={`${it.ID}`}>{Content}</TabPane>
              ))}
            </Tabs> */}
            {/* <ul className={styles.lv2ul} ref={lv2Ref} style={{left: state.lv2Left}}>
              <li>
                <span className={productState.curLv2Class === 0 ? `${styles.active}` : ''} onClick={() => { onLv2ClassChange(0) }}>全部</span>
              </li>
              {
                productState.lv2List.map(lv2 => (
                  <li key={lv2.ID}>
                    <span className={productState.curLv2Class === lv2.ID ? `${styles.active}` : ''} onClick={() => { onLv2ClassChange(lv2.ID) }}>
                      {lv2.ClassName}
                    </span>
                  </li>
                ))
              }
            </ul> */}
          {/* </div> */}
        {/* </div> */}
      </header>
      {/* {Content} */}
      <footer>
        <Pagination
         current={productState.Page}
         onChange={onPageChange}
         pageSize={9}
         total={productState.DataNumber}
         className={productState.DataNumber === 0 ? 'opacity-0' : ''}
         />
      </footer>
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
    const _temp:ICondtion4ProList = { Page: 1, PageSize: 9, ProductClass: { First: curLv1Class } };
    if (curLv2Class) _temp.ProductClass.Second = curLv2Class;
    // if (!productID) {
      const proResp = await api.getProductsList(_temp).catch(handleErrCatch);
      if (key && proResp && proResp.data.Status === 1000) {
        productList = proResp.data.Data;
        DataNumber = proResp.data.DataNumber;
      }
    // }
    //  else {
    //   const res = await api.getProductIntroduce(productID).catch(e => {
    //     handleErrCatch();
    //   });
    //   if (key && res && res.data.Status === 1000) {
    //     curProduct = res.data.Data;
    //   }
    // }
    
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