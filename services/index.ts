import { ILoginPagrms } from '../utils/TSTypes';
import instance from './axios';

const api = {
  /* 登录注册部分 与 账号相关等 api
  ----------------------------------------------------------------------------------- */
  getLogin(data: ILoginPagrms) { // POST /Api/Customer/Login
    return instance.post('/api/Customer/Login', { ...data, Terminal: 1} );
  },

  /* 首页
  ----------------------------------------------------------------------------------- */
  getSwiperData() { // GET /api/Banner/List
    return instance.get('/api/Banner/List?useIndex=true&page=1&pageSize=4');
  },
  getNewsArticleList(data = { Page: 1, pageSize: 6 }) { // POST /api/Article/ArticleList 获取新闻列表
    return instance.post('/api/Article/ArticleList', data);
  },
  getProductsList(data = {}) { // POST /api/Product/List 获取产品介绍列表
    return instance.post('/api/Product/List', data);
  },
  getProductClassify() { // 获取产品分类
    return instance.post('/api/Constant/VersionValid', { Key: 6 });
  },
  /* 新闻
  ----------------------------------------------------------------------------------- */
  getNewsHotList(data = { Page: 1, pageSize: 4 }) { // POST /api/Article/ArticleList 获取新闻列表
    return instance.post('/api/Article/ArticleList', data);
  },
};

export default api;
