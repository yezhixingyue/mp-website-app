import * as types from './types/test'
import * as HomeTypes from './types/home'
import * as UserTypes from './types/user'
import api from './services'

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
export const setSwiperState = (payload) => ({type: HomeTypes.SWIPER, payload });
export const setNewsState = (payload) => ({type: HomeTypes.HOMENEWS, payload });
export const setLv1ClassifyState = (payload) => ({type: HomeTypes.LEVEL1PROCLASSLIST, payload });
export const setHomeProductState = (payload) => ({type: HomeTypes.HOMEPRODUCTS, payload });

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
      if (process.browser) sessionStorage.setItem('user', JSON.stringify(user));
      return true;
    } else {
      dispatch(removeUserState());
      return false;
    }
  };
}

// ACTIONS FOR PRODUCT
