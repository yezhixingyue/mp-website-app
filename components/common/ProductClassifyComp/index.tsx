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

  const setWidth = () => {
    const w = lv1Ref.current.offsetWidth - 40;
    setState({
      ...state,
      lv1Width: w,
    })
  }

  useEffect(() => {
    setWidth();
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

  const getRenderTabBar = (props, DefaultTabBar) => {
    console.log(props);
    console.log(props.prevIcon);
    console.log(DefaultTabBar);
    const list = props.panels.map(item => (<a
        key={item.key} 
      >
        <div style={{padding:'0 56px', display: 'inline-block'}}>{item.props.tab}</div>
      </a>))

    const dom = (
      <div role="tablist" className={`ant-tabs-bar ${props.className}`} tabIndex={props.activeKey}>
            <div className="ant-tabs-nav-container">
              <span className="ant-tabs-tab-prev ant-tabs-tab-btn-disabled">
                <span className="ant-tabs-tab-prev-icon">
                  <i aria-label="icon: left" className="anticon anticon-left ant-tabs-tab-prev-icon-target">
                    标签</i>
                </span>
              </span>
            <span className="ant-tabs-tab-next ant-tabs-tab-btn-disabled">
              <span className="ant-tabs-tab-next-icon">
                <i aria-label="icon: right" className="anticon anticon-right ant-tabs-tab-next-icon-target">
                标签</i>
              </span>
            </span>
            <div className="ant-tabs-nav-wrap">
              <div className="ant-tabs-nav-scroll">
                <div className="ant-tabs-nav ant-tabs-nav-animated">
                  <div>
                    <div role="tab" aria-disabled="false" aria-selected="true" className="ant-tabs-tab-active ant-tabs-tab">全部</div>
                    <div role="tab" aria-disabled="false" aria-selected="false" className=" ant-tabs-tab">铜版名片</div>
                    <div role="tab" aria-disabled="false" aria-selected="false" className=" ant-tabs-tab">星幻系列</div>
                    <div role="tab" aria-disabled="false" aria-selected="false" className=" ant-tabs-tab">美绘系列</div>
                    <div role="tab" aria-disabled="false" aria-selected="false" className=" ant-tabs-tab">缤纷系列</div>
                    <div role="tab" aria-disabled="false" aria-selected="false" className=" ant-tabs-tab">清雅系列</div>
                    <div role="tab" aria-disabled="false" aria-selected="false" className=" ant-tabs-tab">名爵系列</div>
                    <div role="tab" aria-disabled="false" aria-selected="false" className=" ant-tabs-tab">焕彩系列</div>
                    </div><div className="ant-tabs-ink-bar ant-tabs-ink-bar-animated"></div>
                  </div>
                </div>
              </div>
            </div>
            </div>
    )
            
    return <div>
      {list}
    </div>;
  }
  
  const getTabs = (lv2List) => {
    const _list = [{ClassName: '全部', ID: '0'}, ...lv2List];
    
    return _list.map(it => (
      <TabPane tab={it.ClassName} key={`${it.ID}`}>
        {props.children}
      </TabPane>
    ))
  };


  return (
    <section className={`${styles.wrap} pro-wrap`}>
      <div style={{ height: 76, borderBottom: '1px dashed #eee' }} onMouseEnter={setWidth}> {/* 一级产品分类 */}
        {
          state.lv1Width > 1200 && state.lv1Left < 0 && !state.isAnimate && <div className={`${styles['move-item']} ${styles['move-prev']}`} onClick={onLv1MenuToLeft}>
            <Icon type="left" />
          </div>
        }
        <ul ref={lv1Ref} style={{ left: state.lv1Left }}>
          {
            props.classData && props.classData.map(lv1 => (
              <li key={lv1.ID}>
                <Link href={`/productIntro?First=${lv1.ID}&Second=0&Page=1`}>
                  <a title={lv1.ClassName}>
                    <span className={props.First === lv1.ID ? `${styles.active}` : ''}>
                      {/* onClick={() => { props.onLv1ClassChange && props.onLv1ClassChange(lv1.ID) }} */}
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
          onChange={(activeKey) => props.onLv2ClassChange && props.onLv2ClassChange(+activeKey)}
          onTabClick={id => props.onTabClick&&props.onTabClick(+id)}
          className='mp-product-tab-wrap'
          activeKey={`${props.Second}`}
          renderTabBar={getRenderTabBar}
        >
          {/* <TabPane tab='全部' key='0'>{props.children}</TabPane>
          {lv2List.map(it => (
            <TabPane tab={it.ClassName} key={`${it.ID}`}>
              {props.children}
            </TabPane>
          ))} */}
          {getTabs(lv2List)}
        </Tabs>
      </div>
    </section>
  )
}
