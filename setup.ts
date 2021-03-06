let mode = process.env.NEXT_PUBLIC_APIURL; // local | test | prod
if (mode === 'local' && process.env.NODE_ENV === 'production') mode = 'prod';

/**
 * 测试 ---- 开发环境
 */
let _baseUrl = 'http://192.168.1.92:8055/';
let _placeOrderUrl = 'http://192.168.3.85:8055/#/';
let _loginUrl = 'http://192.168.3.85:8055/#/login';
let _agreementID = '71'; // 用户协议 - 帮助中心
let _agreementLv2Type = '72'; // 用户协议2级分类ID
let _accrualID = '61'; // 权责声明 - 帮助中心
let _accrualLv2Type = '73'; // 权责声明2级分类ID
let _newsID = '69';　// 新闻中心页面 - 新闻推荐链接
let _ADPathID = '69'; // 产品详情页面 - 广告图 - 推荐新闻ID　－ 新闻中心
let _domain = '';
let _richContentImgSrc = 'http://192.168.1.92:8055/';

/**
 * 测试 ---- 生产环境
 */

if (mode === 'test') {
  // _baseUrl = 'http://192.168.1.92:8055/';
  _placeOrderUrl = 'http://192.168.1.92:8057/#/';
  _loginUrl = 'http://192.168.1.92:8057/#/login';
  // _agreementID = '71';  // 以下保持不变
  // _accrualID = '61';
  // _newsID = '69';
  // _domain = '';
  // _richContentImgSrc = 'http://192.168.1.92:8055/';
}

/**
 * 正式 ---- 生产环境
 */
if (mode === 'prod') {
  _baseUrl = 'https://order.mpzj.cn:8157/';
  _placeOrderUrl = 'https://order.mpzj.cn/#/';
  _loginUrl = 'https://order.mpzj.cn/#/login';

  _agreementID = '3';
  _agreementLv2Type = '4';

  _accrualID = '4';
  _accrualLv2Type = '5';

  _newsID = '3';

  _ADPathID = '4';
  
  _domain = 'mpzj.cn';
  _richContentImgSrc = 'https://order.mpzj.cn:8157/';

  // if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__ && typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
  //     __REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function() {};
  // }
}

/* SETUP
----------------------------------------------------------------------------------- */
export const SetupEnumType = {
  baseUrl: _baseUrl, // 服务器地址

  downloadUrl: 'https://order.mpzj.cn/Private/Files/mpzj_download_client.rar', // 客户端下载地址

  placeOrderUrl: _placeOrderUrl, // 下单系统链接地址 + 地址域名和下面需要保持一致 ↓

  loginUrl: _loginUrl, // ↑ 与上面域名相同

  agreementID: _agreementID, // 用户协议对应分类ID -- 文章ID

  agreementLv2Type: _agreementLv2Type, // 用户协议对应分类2级分类Type -- 文章列表

  accrualID: _accrualID , // 权责声明对应分类ID -- 文章ID

  accrualLv2Type: _accrualLv2Type, // 用户协议对应分类2级分类Type -- 文章列表

  newsID: _newsID, // 新闻中心主推新闻文章ID

  ADPathID: _ADPathID, // 产品详情页面 - 广告位链接 - 链接内容为新闻

  domain: _domain,

  richContentImgSrc: _richContentImgSrc, // 富文本内替换图片地址
}

// console.log(SetupEnumType);