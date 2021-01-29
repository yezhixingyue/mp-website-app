import * as types from './types/test'
import * as HomeTypes from './types/home'
import * as UserTypes from './types/user'
import * as ProductTypes from './types/product'
import api from './services'
import { IClassifyItem, IProductClass } from './utils/types4TS'
import { Cookie } from './utils/cookie'

// INITIALIZES CLOCK ON SERVER
export const serverRenderClock = () => (dispatch) =>
  dispatch({
    type: types.TICK,
    payload: { light: false, ts: Date.now() },
  })

// INITIALIZES CLOCK ON CLIENT
export const startClock = () => (dispatch) =>
  setInterval(() => {
    dispatch({ type: types.TICK, payload: { light: true, ts: Date.now() } })
  }, 1000)

// INCREMENT COUNTER BY 1
export const incrementCount = () => ({ type: types.INCREMENT })

// DECREMENT COUNTER BY 1
export const decrementCount = () => ({ type: types.DECREMENT })

// RESET COUNTER
export const resetCount = () => ({ type: types.RESET })


// ACTIONS FOR HOME
export const setSwiperState = (payload) => ({ type: HomeTypes.SWIPER, payload });
export const setNewsState = (payload) => ({ type: HomeTypes.HOMENEWS, payload });
export const setLv1ClassifyState = (payload) => ({ type: HomeTypes.LEVEL1PROCLASSLIST, payload });
export const setHomeProductState = (payload) => ({ type: HomeTypes.HOMEPRODUCTS, payload });

// ACTIONS FOR USER
export const setUserState = (payload) => ({ type: UserTypes.SETUSER, payload });
export const removeUserState = () => ({ type: UserTypes.SETUSER, payload: null });
export const fetchUserState = () => {
  return async (dispatch) => {
    let key = true;
    const res = await api.getUserDetail().catch(() => { key = false });
    if (key && res && res.data.Status === 1000) {
      const user = res.data.Data;
      dispatch(setUserState(user));
      // if (process.browser) sessionStorage.setItem('user', JSON.stringify(user));
      if (process.browser) Cookie.setCookie('customerInfo', JSON.stringify(user), 'Session');
      return true;
    } else {
      dispatch(removeUserState());
      return false;
    }
  };
}

// ACTIONS FOR PRODUCT
export const handleClassChange = (payload) => ({ type: ProductTypes.HANDLELV1CLASSCHANGE, payload });
export const changeCurLv1Class = ({ classID, productClassify }: { classID: number, productClassify: IClassifyItem[] }) => {
  // 处理 1. 更改仓库中curLv1Class curLv2Class(改为0) lv2List  Page状态  ---- actions
  // 2. 发生网络请求 重新获取productList列表数据 更改DataNumber
  return async (dispatch) => {
    const t = productClassify.find(it => it.ID === classID);
    if (t) {
      const lv2List = t.children;
      const curLv2Class = 0;
      const Page = 1;
      const curProduct = null;
      const curLv1Class = classID;
      let key = true;
      let productList = [];
      let DataNumber = 0;
      dispatch(handleClassChange({
        curLv1Class,
        curLv2Class,
        lv2List,
        Page,
        DataNumber,
        productList,
        curProduct,
        Loading: true,
      }));
      const resp = await api.getProductsList({ Page, PageSize: 9, ProductClass: { First: curLv1Class } }).catch(() => { key = false });
      if (key && resp && resp.data.Status === 1000) {
        productList = resp.data.Data;
        DataNumber = resp.data.DataNumber;
        dispatch(handleClassChange({ productList, DataNumber }))
      }
      dispatch(handleClassChange({ Loading: false }))
    }
  }
}
export const changeCurLv2Class = ({ curLv1Class, lv2ClassID }: { curLv1Class: number, lv2ClassID: number }) => {
  return async dispatch => {
    const Page = 1;
    const curProduct = null;
    let key = true;
    let productList = [];
    let DataNumber = 0;
    let Loading = true;
    dispatch(handleClassChange({ curLv2Class: lv2ClassID, Page, DataNumber, productList, Loading, curProduct }))
    const ProductClass: IProductClass = { First: curLv1Class };
    if (lv2ClassID) ProductClass.Second = lv2ClassID;
    const resp = await api.getProductsList({ Page, PageSize: 9, ProductClass }).catch(() => { key = false });
    if (key && resp && resp.data.Status === 1000) {
      productList = resp.data.Data;
      DataNumber = resp.data.DataNumber;
      dispatch(handleClassChange({ productList, DataNumber }))
    }
    dispatch(handleClassChange({ Loading: false }))
  }
}
export const changeCurPage = ({ curLv1Class, lv2ClassID, Page }: { curLv1Class: number, lv2ClassID: number, Page: number }) => {
  return async dispatch => {
    let key = true;
    let productList = [];
    let DataNumber = 0;
    dispatch(handleClassChange({ Loading: true }));
    const ProductClass: IProductClass = { First: curLv1Class };
    if (lv2ClassID) ProductClass.Second = lv2ClassID;
    const resp = await api.getProductsList({ Page, PageSize: 9, ProductClass }).catch(() => { key = false });
    if (key && resp && resp.data.Status === 1000) {
      productList = resp.data.Data;
      DataNumber = resp.data.DataNumber;
      dispatch(handleClassChange({ productList, DataNumber, Page }))
    }
    dispatch(handleClassChange({ Loading: false }))
  }
}

export const clearCurProduct = () => ({ type: ProductTypes.CLEARCURPRODUCT, payload: null });

export const setCurProduct = (payload) => ({ type: ProductTypes.SETCURPRODUCT, payload });