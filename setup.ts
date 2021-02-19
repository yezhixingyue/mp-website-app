let mode = process.env.NEXT_PUBLIC_APIURL; // local | test | prod
if (mode === 'local' && process.env.NODE_ENV === 'production') mode = 'prod';

/**
 * 测试 ---- 开发环境
 */
let _baseUrl = 'http://192.168.1.92:8055/';
let _placeOrderUrl = 'http://192.168.3.85:8055/#/';
let _loginUrl = 'http://192.168.3.85:8055/#/login';
let _agreementID = '71';
let _accrualID = '61';
let _newsID = '69';
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
  _baseUrl = 'http://order.mpzj.cn:8156/';
  _placeOrderUrl = 'https://order.mpzj.cn/#/';
  _loginUrl = 'https://order.mpzj.cn/#/login';
  _agreementID = '71';
  _accrualID = '61';
  _newsID = '69';
  _domain = 'mpzj.cn';
  _richContentImgSrc = 'https://order.mpzj.cn:8156/';
}

/* SETUP
----------------------------------------------------------------------------------- */
export const SetupEnumType = {
  baseUrl: _baseUrl, // 服务器地址

  downloadUrl: 'https://www.mpzj.cn/Private/Files/6373284376831804391773893001.rar', // 客户端下载地址

  placeOrderUrl: _placeOrderUrl, // 下单系统链接地址 + 地址域名和下面需要保持一致 ↓

  loginUrl: _loginUrl, // ↑ 与上面域名相同

  agreementID: _agreementID, // 用户协议对应分类ID -- 文章ID

  accrualID: _accrualID , // 权责声明对应分类ID -- 文章ID

  newsID: _newsID, // 新闻中心主推新闻文章ID

  domain: _domain,

  richContentImgSrc: _richContentImgSrc, // 富文本内替换图片地址
}

// console.log(SetupEnumType);