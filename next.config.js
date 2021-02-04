// const withLess = require('@zeit/next-less')

// module.exports = withLess({
//   cssModules: true,
// })
// 环境变量配置
const dotenv = require('dotenv')
const envPath = process.env.DOT_ENV_FILE ? `.dotenv.${process.env.DOT_ENV_FILE}` : '.dotenv.local'
const dotEnvResult = dotenv.config({ path: envPath })
if (dotEnvResult.error) {
  throw dotEnvResult.error
}
console.log(`[运行环境] ======= ${process.env.NEXT_PUBLIC_APIURL} ========`)