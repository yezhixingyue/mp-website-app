import { ICondtion4ProList, ILoginPagrms } from '../utils/types4TS';
import instance from './axios';

const api = {
  /* 登录注册部分 与 账号相关等 api
  ----------------------------------------------------------------------------------- */
  getLogin(data: ILoginPagrms) { // POST /Api/Customer/Login
    return instance.post('/api/Customer/Login', { ...data, Terminal: 1} );
  },
  getUserDetail() { // GET /Api/Customer/Detail
    return instance.get('/api/Customer/Detail');
  },

  /* 首页
  ----------------------------------------------------------------------------------- */
  getSwiperData() { // GET /api/Banner/List
    return instance.get('/api/Banner/List?useIndex=true&page=1&pageSize=4');
  },
  getNewsArticleList(data = { Page: 1, pageSize: 6 }) { // POST /api/Article/ArticleList 获取新闻列表
    return instance.post('/api/Article/ArticleList', data);
  },
  getProductsList(data:ICondtion4ProList = { Page: 1, PageSize: 3 }) { // POST /api/Product/List 获取产品介绍列表
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
  getNewsDetail(id: number) { // GET /Api/Article/Detail 获取新闻详情
    return instance.get(`/Api/Article/Detail?id=${id}&isRead=true`);
  },
  getArticleClass(type: number) { // GET /Api/ArticleClass/List 获取文章分类 0 为新闻 1为帮助
    return instance.get(`/Api/ArticleClass/List?Type=${type}`);
  },
  /* 产品
  ----------------------------------------------------------------------------------- */
  getProductIntroduce(productID: string) { // GET /Api/Product/Introduce
    return instance.get(`/api/Product/Introduce?productID=${productID}`);
  },
};

export default api;
