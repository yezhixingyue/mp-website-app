import { Icon, Tabs } from 'antd'
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
    const distance = state.lv1Left < -1055 ? 1055 : -state.lv1Left;
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
    const distance = state.lv1Width - 1200 + state.lv1Left > 1055 ? 1055 : state.lv1Width - 1200 + state.lv1Left;
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
  
  return (
    <section className={styles.wrap}>
      <div style={{ height: 76 }} onMouseEnter={setWidth}> {/* 一级产品分类 */}
        {
          state.lv1Width > 1200 && state.lv1Left < 0 && !state.isAnimate && <div className={`${styles['move-item']} ${styles['move-prev']}`} onClick={onLv1MenuToLeft}>
            <Icon type="left" />
          </div>
        }
        <ul ref={lv1Ref} style={{ left: state.lv1Left }}>
          {
            props.classData && props.classData.map(lv1 => (
              <li key={lv1.ID}>
                <span className={props.First === lv1.ID ? `${styles.active}` : ''} onClick={() => { props.onLv1ClassChange && props.onLv1ClassChange(lv1.ID) }}>
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
      <div > {/* 二级产品分类 style={{height: 77}} */}
        <Tabs
          onChange={(activeKey) => props.onLv2ClassChange && props.onLv2ClassChange(+activeKey)}
          onTabClick={id => props.onTabClick&&props.onTabClick(+id)}
          className='mp-product-tab-wrap'
          activeKey={`${props.Second}`}
        >
          <TabPane tab='全部' key='0'>{props.children}</TabPane>
          {lv2List.map(it => (
            <TabPane tab={it.ClassName} key={`${it.ID}`}>{props.children}</TabPane>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
