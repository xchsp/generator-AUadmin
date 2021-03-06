// import axios from 'axios';
// import { message } from 'antd';
// import { createBrowserHistory } from 'history';
// import { getToken, removeToken } from './token';
// import loading from './loading';
// import permission from './permission';
// // import history from './history';

// let history = createBrowserHistory({
//   forceRefresh: true,
// });
// // create an axios instance
// const service = axios.create({
//   baseURL:
//     process.env.NODE_ENV === 'development' ? '/api' : 'http://localhost:2223', // api的base_url
//   timeout: 20000,
// });

// // request interceptor
// service.interceptors.request.use(
//   (config) => {
//     console.log('axios --- service.interceptors.request.use', config);
//     // Do something before request is sent
//     // 接口级权限效验
//     if (!permission.check(config)) {
//       // eslint-disable-next-line no-throw-literal
//       throw '403';
//     }
//     loading.show(config);
//     let token = getToken();
//     // console.log('token??', config)
//     // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
//     // eslint-disable-next-line prefer-template
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     // Do something with request error
//     console.log('请求错误', error); // for debug
//     Promise.reject(error);
//   },
// );

// // respone interceptor
// service.interceptors.response.use(
//   (response) => {
//     // console.log('axios --- service.interceptors.response.use', response);
//     loading.hide(response.config);
//     const res = response.data;
//     if (res.statusCode !== 200) {
//       message.error(res.msg);
//       return Promise.reject(res.msg);
//     }
//     return response.data;
//   },
//   (error) => {
//     loading.hide(error.config);
//     if (error.response && error.response.status === 401) {
//       removeToken();
//       if (error.config.url.indexOf('logout') === -1) {
//         message.error('登陆信息已过期,请重新登陆!');
//       }
//       setTimeout(() => {
//         history.push('/login');
//       }, 1000);
//     } else if (error.response && error.response.status === 500) {
//       message.error('系统错误!');
//     } else if (error.message && error.message.indexOf('timeout') > -1) {
//       message.error('网络超时!');
//     } else if (error === '403') {
//       message.error('没有请求权限!');
//     } else {
//       message.error('网络错误!');
//     }
//     return Promise.reject(error);
//   },
// );

// export default service;
