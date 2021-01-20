import axios from 'axios';
import model from '../utils/model';
import { message } from 'antd';

import { isBrower } from '../utils/index';
import { SetupEnumType } from '../utils/types4TS';


message.config({ top: 60, })

let closeTip = false;
axios.interceptors.request.use(
  (config) => {
    const curConfig = config;
    if (!isBrower()) {
      curConfig.baseURL = SetupEnumType.baseUrl;
    }
    return curConfig;
  },
  (error) => {
    if (isBrower()) model.showWarn({ msg: error });
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    const _list2NotNeed2Toast = ['/Api/ExpressWaybill/Record/Excel', '/api/Customer/Login'];
    const _statusList2NotNeed2Toast = [1000];
    // 包含以上的状态码 或 以上的请求路径  不会弹窗报错  其余以外都会报错出来

    const _url = response.config && response.config.url ? response.config.url.split('?')[0] : '';

    if ([7025, 8037].includes(response.data.Status)) {
      message.error(response.data.Message);
      // router.replace('/login');
      // sessionStorage.removeItem('loginAuth');
      return response;
    }
    if (!_statusList2NotNeed2Toast.includes(response.data.Status) && !_list2NotNeed2Toast.includes(_url) && (!closeTip) && isBrower()) {
      const _obj: {
        title?: string | undefined;
        msg?: string | undefined;
        onOk?: (() => void) | undefined;
        onCancel?: (() => void) | undefined;
      } = { msg: `${response.data.Message}` };
      let _msg = '错误';
      if (_url === '/Api/Staff/Login') _msg = '登录失败';
      if (_url === '/Api/Staff/Detail') _msg = '获取用户信息失败';
      if (_url === '/Api/ExpressWaybill/OrderInfo') _msg = '获取订单信息失败';
      if (_url === '/Api/Package/Scan') _msg = '扫描失败';

      _obj.title = _msg;
      model.showWarn(_obj);
    }
    return response;
  },
  async (error) => {
    if (error.response) {
      let key = false;

      const _url = error.response.config.url.split('?')[0];
      let _msg = '操作失败';
      // if (_url === '/Api/Staff/Login') _msg = '登录失败';
      // if (_url === '/Api/Staff/Detail') _msg = '获取用户信息失败';
      // if (_url === '/Api/ExpressWaybill/OrderInfo') _msg = '获取订单信息失败';

      switch (error.response.status) {
        case 401:
          // router.replace('/login');
          // sessionStorage.removeItem('loginAuth');
          key = true;
          break;
        default:
          // model.showWarn({ title: _msg, msg: `${error.response.data && error.response.data.Message ? error.response.data.Message : error.response.statusText}]` });
          key = true;
          break;
      }
      if (key) return Promise.reject(error.response);
    }
    if (isBrower()) {
      if (error.message === 'Network Error') {
        model.showWarnWithoutMsg({ title: '网络错误' })
      } else if (error.message && error.message.includes('timeout')) {
        model.showWarnWithoutMsg({ title: '网络超时' })
      } else if (error.response && error.response.status === 404) {
        model.showWarnWithoutMsg({ title: '404， 内容找不到' })
      } else {
        let msg = '未知错误';
        if (error.response && error.response.data && error.response.data.Message) {
          msg = error.response.data.Message;
        }
        model.showWarnWithoutMsg({ title: msg })
      }
    }
    return Promise.reject(error);
  },
);

export default axios;