
/* SETUP
----------------------------------------------------------------------------------- */
export enum SetupEnumType {
  baseUrl = 'http://192.168.1.92:8055/', // 服务器地址

  downloadUrl = 'https://www.mpzj.cn/Private/Files/6373284376831804391773893001.rar', // 客户端下载地址

  placeOrderUrl = 'http://order.mpzj.cn:7000/#/placeOrder', // 下单系统链接地址 + 地址域名和下面需要保持一致 ↓

  loginUrl = 'http://order.mpzj.cn:7000/#/login', // ↑ 与上面域名相同

  agreementID = '72', // 用户协议对应分类ID

  accrualID = '73', // 权责声明对应分类ID

  newsID = '69', // 新闻中心主推新闻文章ID

  domain='mpzj.cn',
}
