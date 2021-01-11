import { combineReducers } from 'redux'
import * as types from './types/test'
import * as HomeTypes from './types/home'

// COUNTER REDUCER
const counterReducer = (state = 0, { type }) => {
  switch (type) {
    case types.INCREMENT:
      return state + 1
    case types.DECREMENT:
      return state - 1
    case types.RESET:
      return 0
    default:
      return state
  }
}

// INITIAL TIMER STATE
const initialTimerState = {
  lastUpdate: 0,
  light: false,
}

// TIMER REDUCER
const timerReducer = (state = initialTimerState, { type, payload }) => {
  switch (type) {
    case types.TICK:
      return {
        lastUpdate: payload.ts,
        light: !!payload.light,
      }
    default:
      return state
  }
}

const initialHomeState = {
  swiperData: [],
  newsDate: [],
  lv1Classify: [],
  products: [],
}
// HOME REDUCER 首页仓库状态
const homeReducer = (state = initialHomeState, { type, payload }) => {
  switch (type) {
    case HomeTypes.SWIPER:
      return { ...state, swiperData: payload }
    case HomeTypes.LEVEL1PROCLASSLIST:
      return { ...state, lv1Classify: payload }
    case HomeTypes.HOMEPRODUCTS:
      return { ...state, products: payload }
    case HomeTypes.HOMENEWS:
      return { ...state, newsDate: payload }
    default:
      return state
  }
}

// COMBINED REDUCERS
const reducers = {
  counter: counterReducer,
  timer: timerReducer,
  home: homeReducer,
}

export default combineReducers(reducers)
