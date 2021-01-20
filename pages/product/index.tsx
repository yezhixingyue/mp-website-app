import { Breadcrumb, Button, Icon, Tabs } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import MpImage from '../../components/common/MpImage';
import api from '../../services';
import { getFilterClassifyList } from '../../utils';
import { BaseClassifyItem, IArticleType, IClassifyItem, IStore, SetupEnumType } from '../../utils/types4TS';
import styles from './index.module.scss';
import ProductClassifyComp from '../../components/common/ProductClassifyComp';


export default function index(props: { curProduct: null | IArticleType, classifyRes: IClassifyItem[], lv2List: BaseClassifyItem[] }) {
  const router = useRouter();
  // const dispatch = useDispatch();

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

  const path = props.curProduct ? `/productIntro?First=${props.curProduct.ProductClass.FirstLevelID}&Second=${props.curProduct.ProductClass.SecondLevelID}` : '/productIntro';
  
  return (
    <section className={styles['product-detail-wrap']}>
      <header>
        <div>
          <Breadcrumb separator={<Icon type="right" />} className='mp-breadcrumb'>
            <Breadcrumb.Item>
              <Link href="/"><a>名片之家</a></Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link href={path}><a>产品介绍</a></Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item >产品详情</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        {
          props.classifyRes &&  <ProductClassifyComp
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
            <div className='rich-edit-content ql-editor ql-snow' dangerouslySetInnerHTML={{ __html: props.curProduct.Content }}></div>
            <footer>
              {/* <Link href={path}>
                 <a><Button style={{marginRight: 30}}>返回列表</Button></a>
              </Link> */}
              <Button type='primary'>立即下单</Button>
            </footer>
          </section>
          <aside>
            <header>相关推荐</header>
            <ul>
              {props.curProduct.AboutList.map(it => (
                <li key={it.ID} onClick={() => onAsideClick(it.ID)}>
                  <div>
                    <MpImage src={SetupEnumType.baseUrl + it.Cover} alt="" height={87} width={87} />
                  </div>
                  <section>
                    <header>{it.Name}</header>
                    <div>{it.Introduce}</div>
                  </section>
                </li>
              ))}
            </ul>
            <footer>
              <Link href={path}>
                 <a style={{color: '#'}}>查看更多</a>
              </Link>
            </footer>
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