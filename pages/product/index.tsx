import { Breadcrumb, Button, Icon, Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import MpImage from '../../components/common/MpImage';
import api from '../../services';
import { changeRichContentImgUrl, getFilterClassifyList } from '../../utils';
import { BaseClassifyItem, IArticleType, IClassifyItem, IStore } from '../../utils/types4TS';
import styles from './index.module.scss';
import ProductClassifyComp from '../../components/common/ProductClassifyComp';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import model from '../../utils/model';
import { SetupEnumType } from '../../setup';
const { Paragraph } = Typography;

export default function index(props: { curProduct: null | IArticleType, classifyRes: IClassifyItem[], lv2List: BaseClassifyItem[] }) {
  const router = useRouter();
  // const dispatch = useDispatch();
  const user = useSelector((state: IStore) => state.user);

  const onAsideClick = (productID) => {
    router.push(`/product?productID=${productID}`)
  }

  useEffect(() => {
    if (props.curProduct) {
    } else {
      router.replace('/productIntro');
    }
  }, [])

  const onLv1ClassChange = (id) => {
    // console.log(id, 'onLv1ClassChange');
    router.push(`/productIntro?First=${id}`);
  }


  // const onLv2ClassChange = (id) => {
  //   console.log('onLv2ClassChange', id);
  // }

  const onTabClick = (id) => {
    // console.log('onTabClick', id);
    router.push(`/productIntro?First=${props.curProduct.ProductClass.FirstLevelID}&Second=${id}`);
  }

  const onPlaceOrderClick = () => {
    if (!props.curProduct) return;
    if (props.curProduct.AllowCustomOrder) {
      let path = SetupEnumType.placeOrderUrl + '?id=' + props.curProduct.ID;
      // if (user && user.Account.Token) path += `&token=${user.Account.Token}`;
      window.open(path);
    } else {
      model.showWarn({
        title: '跳转失败',
        msg: '当前产品尚不支持自助下单，请联系客服咨询人工下单',
      })
    }
  }

  const getPageTitle = () => {
    let title = '产品详情';
    if (props.curProduct && props.curProduct.Name) title = props.curProduct.Name;
    return title;
  };

  const path = props.curProduct ? `/productIntro?First=${props.curProduct.ProductClass.FirstLevelID}&Second=${props.curProduct.ProductClass.SecondLevelID}` : '/productIntro';
  
  return (
    <section className={styles['product-detail-wrap']}>
      <Head>
        <title>{getPageTitle()} - 郑州名片之家电子商务有限公司</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <div>
          <Breadcrumb separator={<Icon type="right" />} className='mp-breadcrumb'>
            <Breadcrumb.Item>
              <Link href="/"><a>首页</a></Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link href={path}><a>产品介绍</a></Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item >产品详情</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        {
          props.classifyRes && props.curProduct &&  <ProductClassifyComp
           classData={props.classifyRes}
           First={props.curProduct.ProductClass.FirstLevelID}
           Second={props.curProduct.ProductClass.SecondLevelID}
           onLv1ClassChange={onLv1ClassChange}
          //  onLv2ClassChange={onLv2ClassChange}
           onTabClick={onTabClick}
           />
        }
      </header>
      {
        props.curProduct && <article>
          <section>
            <header>
              <span>{`${props.curProduct.ProductClass.SecondLevelName}-${props.curProduct.Name}`}</span>
            </header>
            <div className='rich-edit-content mce-content-body ql-editor ql-snow' dangerouslySetInnerHTML={{ __html: changeRichContentImgUrl(props.curProduct.Content) }}></div>
            <footer>
              {/* <Link href={path}>
                 <a><Button style={{marginRight: 30}}>返回列表</Button></a>
              </Link> */}
              <Button type='primary' onClick={onPlaceOrderClick}>立即下单</Button>
            </footer>
          </section>
          <aside>
            <header>相关推荐</header>
            <ul>
              {props.curProduct.AboutList.map(it => (
                <li key={it.ID}>
                  <Link href={`/product?productID=${it.ID}`}>
                    <a title={it.Name}>
                      <div>
                        <MpImage src={SetupEnumType.baseUrl + it.Cover} alt="" height={87} width={87} />
                      </div>
                      <section>
                        <header>{it.Name}</header>
                        {/* <div>{it.Introduce}</div> */}
                        <Paragraph ellipsis={{ rows: 2, expandable: false }}>{it.Introduce}</Paragraph>
                      </section>
                    </a>
                  </Link>
                </li>
              ))}
              {
                props.curProduct.AboutList.length === 0 && <li style={{color: '#888', cursor: 'text'}}>暂无推荐产品</li>
              }
            </ul>
            {
              props.curProduct.AboutList.length > 0 && 
              <footer>
                <Link href={path}>
                    <a style={{color: '#'}}>查看更多</a>
                </Link>
              </footer>
            }
          </aside>
        </article>
      }
    </section>
  )
}

export const getServerSideProps = async ({ query }) => {
  const { productID } = query;
  let curProduct: IArticleType = null;
  let classifyRes: IClassifyItem[] = [];
  let lv2List: BaseClassifyItem[] = [];
  if (productID) {
    let key = true;
    let key2 = true;
    const allResp = await Promise.all([api.getProductIntroduce(productID).catch(() => { key = false }), api.getProductClassify().catch(() => { key2 = false })]);
    const [resp, res] = allResp;
    if (key && resp && resp.data.Status === 1000) {
      curProduct = resp.data.Data;
    }
    if (key2 && res && res.data.Status === 1000) {
      classifyRes = getFilterClassifyList(res.data.Data);
      if (curProduct) {
        const t = classifyRes.find(it => it.ID === curProduct.ProductClass.FirstLevelID);
        if (t) lv2List = t.children;
      }
    }
  }
  return {
    props: {
      curProduct,
      classifyRes,
      lv2List,
    }
  }
}