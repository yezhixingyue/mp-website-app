import instance from './axios';

const api = {
  /* 登录注册部分 与 账号相关等 api
  ----------------------------------------------------------------------------------- */
  getLogin(data) { // POST /Api/Staff/Login
    return instance.post('/Api/Staff/Login', data);
  },

  /* 首页
  ----------------------------------------------------------------------------------- */
  getSwiperData() { // GET /Api/Banner/List
    return instance.get('http://192.168.1.92:8055/Api/Banner/List?useIndex=true&page=1&pageSize=4');
  },
};

export default api;
