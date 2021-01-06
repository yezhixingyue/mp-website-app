import axios from 'axios';
// import { useRouter } from 'next/router';
// import model from '../utils/model';
import { message } from 'antd';


message.config({top: 60, })
// const router = useRouter();

let closeTip = false;
axios.interceptors.request.use(
  (config) => {
    const curConfig = config;
    // const loginAuth = sessionStorage.getItem('loginAuth');
    // closeTip = curConfig.closeTip; 用于设置某个请求 出错时不需要弹窗提示
    const url = curConfig && curConfig.url ? curConfig.url.split('?')[0] : '';
    const arrWithOutToken:string[] = [];
    // if (loginAuth && !arrWithOutToken.includes(url)) {
    //   curConfig.headers.common.Authorization = `Bearer ${loginAuth}`;
    // }
    return curConfig;
  },
  (error) => {
    // model.showWarn({ msg: error });
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    const _list2NotNeed2Toast = ['/Api/ExpressWaybill/Record/Excel'];
    const _statusList2NotNeed2Toast = [1000, 9062, 9169, 1004];
    // 包含以上的状态码 或 以上的请求路径  不会弹窗报错  其余以外都会报错出来

    const _url = response.config && response.config.url ? response.config.url.split('?')[0] : '';

    if (response.data.Status === 1004) {
      message.error('找不到相关订单信息')
    }

    if ([7025, 8037].includes(response.data.Status)) {
      message.error(response.data.Message);
      // router.replace('/login');
      // sessionStorage.removeItem('loginAuth');
      return response;
    } if ((!_statusList2NotNeed2Toast.includes(response.data.Status) && !_list2NotNeed2Toast.includes(_url) && (!closeTip)) || [7025, 8037].includes(response.data.Status)) {
      const _obj:{
        title?: string | undefined;
        msg?: string | undefined;
        onOk?: (() => void) | undefined;
        onCancel?: (() => void) | undefined;
      } = { msg: `${response.data.Message}` };
      if ([7025, 8037].includes(response.data.Status)) {
        _obj.onOk = () => {
          // router.replace('/login');
  
          // sessionStorage.removeItem('loginAuth');
        };
      } else {
        _obj.onOk = undefined;
      }
      let _msg = '错误';
      if (_url === '/Api/Staff/Login') _msg = '登录失败';
      if (_url === '/Api/Staff/Detail') _msg = '获取用户信息失败';
      if (_url === '/Api/ExpressWaybill/OrderInfo') _msg = '获取订单信息失败';
      if (_url === '/Api/Package/Scan') _msg = '扫描失败';

      _obj.title = _msg;
      // model.showWarn(_obj);
    }
    return response;
  },
  async (error) => {
    if (error.response) {
      let key = false;
      let b;
      let r:undefined | FileReader;
      let buffterRes:undefined | ProgressEvent<FileReader>;
      let buffterErr = '文件导出数据过大，请缩小导出时间区间或精确筛选条件';

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
        // case 413: // 处理文件导出错误
        //   b = new Blob([error.response.data]);
        //   r = new FileReader();
        //   r.readAsText(b, 'utf-8');
        //   buffterRes = await new Promise((resolve, reject) => {
        //     if (r) {
        //       r.onload = res => resolve(res); 
        //     }
        //   });
        //   if (buffterRes && buffterRes.currentTarget && buffterRes.currentTarget.result) {
        //     // result这里对ts自带设置有改动 原未有该项 进行了添加设置
        //     if (typeof buffterRes.currentTarget.result === 'string') buffterErr = buffterRes.currentTarget.result;
        //   }
          // model.showWarn({ title: _msg, msg: `${buffterErr}` });
        //   key = true;
        //   break;
        default:
          // model.showWarn({ title: _msg, msg: `${error.response.data && error.response.data.Message ? error.response.data.Message : error.response.statusText}]` });
          key = true;
          break;
      }
      if (key) return Promise.reject(error.response);
    }
    if (error.message === 'Network Error') {
      message.error('网络错误');
    } else if (error.message.includes('timeout')) {
      message.error('网络超时');
    } else if (error.response && error.response.status === 404) {
      message.error('404');
    } else {
      let msg = '未知错误';
      if (error.response && error.response.data && error.response.data.Message) {
        msg = error.response.data.Message;
      }
      message.error(msg);
    }
    return Promise.reject(error);
  },
);

export default axios; // .create({ baseURL: 'http://192.168.1.92:8055/' })
// export default axios.create({ baseURL: 'http://192.168.1.92:8055/' });
