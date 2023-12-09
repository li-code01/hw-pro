import axios from 'axios';

// 创建实例
const service = axios.create();

// 配置请求地址
const baseURL = 'http://124.71.138.134:1216';

// 配置请求头
service.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// post请求
service.post = function (url, data, config) {
    return service({
        url: baseURL + url,
        method: 'post',
        data: data,
        ...config
    });
}

// get请求
service.get = function (url, config) {
    return service({
        url: baseURL + url,
        method: 'get',
        ...config
    });
}

export default service;