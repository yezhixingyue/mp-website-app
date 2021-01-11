import * as types from './types/test'
import * as HomeTypes from './types/home'

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


// SWIPER HOME
export const setSwiperState = (payload) => ({type: HomeTypes.SWIPER, payload });
export const setNewsState = (payload) => ({type: HomeTypes.HOMENEWS, payload });
export const setLv1ClassifyState = (payload) => ({type: HomeTypes.LEVEL1PROCLASSLIST, payload });
export const setHomeProductState = (payload) => ({type: HomeTypes.HOMEPRODUCTS, payload });