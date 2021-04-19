import { Icon, Tabs } from 'antd'
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { animateScroll } from '../../../utils';
import { IClassifyItem } from '../../../utils/types4TS';
import styles from './index.module.scss'
const { TabPane } = Tabs;

interface IProps {
  classData: IClassifyItem[];
  First: number;
  Second: number;
  onLv1ClassChange?: (id: number) => void;
  onLv2ClassChange?: (id: number) => void;
  children?:JSX.Element;
  onTabClick?:(id: number) => void;
}

const getLv2List = (list: IClassifyItem[], id: number) => {
  const t = list.find(it => it.ID === id);
  if (t) return t.children;
  return [];
}


export default function index(props: IProps) {
  if (!props.classData) return null;

  const [state, setState] = useState({
    lv1Width: 0,
    lv1Left: 0,
    isAnimate: false,
  })
  const lv1Ref = useRef<HTMLUListElement | undefined>();

  const lv2List = getLv2List(props.classData, props.First);

  const setWidth = (isInit = false) => {
    const w = lv1Ref.current.offsetWidth - 40;
    if (isInit && w > 1160) { // 设置选中按钮初始位置 如果其在右侧隐藏区域时让其显示在可视范围内
      const i = props.classData.findIndex(it => it.ID === props.First);
      if (i > -1 && i < lv1Ref.current.children.length) {
        const initActiveDom = lv1Ref.current.children[i];
        const offsetLeft = (initActiveDom as HTMLElement).offsetLeft;
        const offsetWidth = (initActiveDom as HTMLElement).offsetWidth;
        const totalWidth = offsetLeft + offsetWidth;
        const distance = 1200 - totalWidth;
        if (distance < 0) {
          setState({
            ...state,
            lv1Width: w,
            lv1Left: distance,
          })
          return;
        }
      }
    }
    setState({
      ...state,
      lv1Width: w,
    })
  }

  useEffect(() => {
    setWidth(true);
    }, [])

  const onLv1MenuToLeft = () => {
    const distance = state.lv1Left < -1080 ? 1080 : -state.lv1Left;
    setState({
      ...state,
      isAnimate: true,
    })
    animateScroll(state.lv1Left, state.lv1Left + distance, (num) => {
      setState({
        ...state,
        lv1Left: num
      })
    }, 200, () => {
      setState({
        ...state,
        isAnimate: false,
      })
    });
  }

  const onLv1MenuToRight = () => {
    const distance = state.lv1Width - 1200 + state.lv1Left > 1080 ? 1080 : state.lv1Width - 1200 + state.lv1Left;
    setState({
      ...state,
      isAnimate: true,
    })
    animateScroll(state.lv1Left, state.lv1Left - distance, (num) => {
      setState({
        ...state,
        lv1Left: num
      })
    }, 200, () => {
      setState({
        ...state,
        isAnimate: false,
      })
    });
  }

  const getTabs = (lv2List) => {
    const _list = [{ClassName: '全部', ID: '0'}, ...lv2List];
    
    return _list.map(it => {
      const _tab = (<Link href={`/productIntro?First=${props.First}&Second=${it.ID}&Page=1`}>
        <a>{it.ClassName}</a>
      </Link>)
      return (
        <TabPane tab={_tab} key={`${it.ID}`}>
          {props.children}
        </TabPane>
      )
    })
  };
  


  return (
    <section className={`${styles.wrap} pro-wrap`}>
      <div style={{ height: 76, borderBottom: '1px dashed #eee' }} onMouseEnter={() => setWidth(false)}> {/* 一级产品分类 */}
        {
          state.lv1Width > 1200 && state.lv1Left < 0 && !state.isAnimate && <div className={`${styles['move-item']} ${styles['move-prev']}`} onClick={onLv1MenuToLeft}>
            <Icon type="left" />
          </div>
        }
        <ul ref={lv1Ref} style={{ left: state.lv1Left }}>
          {
            props.classData && props.classData.map(lv1 => (
              <li key={lv1.ID} style={{padding: '20.5px 0', marginRight: '40px'}}>
                <Link href={`/productIntro?First=${lv1.ID}&Second=0&Page=1`}>
                  <a title={lv1.ClassName}>
                    <span className={props.First === lv1.ID ? `${styles.active}` : ''}  style={{padding: '0 18px'}}>
                      {lv1.ClassName}
                    </span>
                  </a>
                </Link>
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
      <div > {/* 二级产品分类 style={{height: 77}} || router.push(`/productIntro?First=${props.curProduct.ProductClass.FirstLevelID}&Second=${id}&Page=1`); */}
        <Tabs
          // onChange={(activeKey) => props.onLv2ClassChange && props.onLv2ClassChange(+activeKey)}
          // onTabClick={id => props.onTabClick&&props.onTabClick(+id)}
          className='mp-product-tab-wrap'
          activeKey={`${props.Second}`}
        >
          {getTabs(lv2List)}
        </Tabs>
      </div>
    </section>
  )
}
