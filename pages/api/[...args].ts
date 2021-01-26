import { createProxyMiddleware } from "http-proxy-middleware";
import { SetupEnumType } from "../../setup";

const cookieName = "token";
const maxAge = 24 * 60 * 60;

export default createProxyMiddleware({
  target: SetupEnumType.baseUrl,
  changeOrigin: true,
  onProxyRes(proxyRes) {
    // console.log('proxyRes', proxyRes);
    // const token = proxyRes.headers["authorization"];
    // if (token) {
    //   //说明数据服务器给我响应了token
    //   //将header中的token放到cookie中
    //   delete proxyRes.headers["authorization"]; //删除响应头中的header
    //   proxyRes.headers[
    //     "set-cookie"
    //   ] = `${cookieName}=${token}; Max-Age=${maxAge}; path=/`;
    // }
  },
  onProxyReq(proxyReq, req: any, res) {
    const token = req.cookies[cookieName];
    if (token) {
      proxyReq.setHeader("Authorization", `Bearer ${token}`);
    }
  }
});

// export default function handler(req, res) {
//   res.statusCode = 200
//   res.setHeader('Content-Type', 'application/json')
//   res.end(JSON.stringify({ name: 'John Doe' }))
// }

export const config = {
  api: {
    bodyParser: false
  }
};
