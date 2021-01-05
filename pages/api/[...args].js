// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { createProxyMiddleware } from "http-proxy-middleware";

export default createProxyMiddleware({
  target: "http://192.168.1.92:8055",
  changeOrigin: true
});
