import axios from 'axios'

// 创建实例
const service = axios.create()

// 配置请求地址
// 判断是否是生产环境
let baseURL = ''
if (process.env.NODE_ENV === 'production') {
  // 生产环境
  baseURL = 'https://a-home.xyz:1216'
} else {
  // 开发环境
  // baseURL = 'https://a-home.xyz:1216'
  baseURL = 'http://localhost:1216'
}

// 配置请求头
service.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// post请求
service.post = function (url, data, config) {
  return service({
    url: baseURL + url,
    method: 'post',
    data: data,
    ...config,
    headers: {
      token: localStorage.getItem('token')
    }
  })
}

// get请求
service.get = function (url, config) {
  return service({
    url: baseURL + url,
    method: 'get',
    ...config,
    headers: {
      token: localStorage.getItem('token')
    }
  })
}

export default service
