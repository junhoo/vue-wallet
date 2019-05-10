import axios from 'axios'

// axios.defaults.timeout = 5000;
// axios.defaults.baseURL ='http://www.baidu.com'; //填写域名

// http request 拦截器
// axios.interceptors.request.use(
//   config => {
//     config.data = JSON.stringify(config.data)
//     config.headers = {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )

// 响应拦截器即异常处理
// axios.interceptors.response.use(response => {
//     return response
// }, err => {
//     if (err && err.response) {
//       switch (err.response.status) {
//         case 400:
//             console.log('错误请求')
//           break;
//         case 401:
//             console.log('未授权，请重新登录')
//           break;
//         case 403:
//           console.log('拒绝访问')
//           break;
//         case 404:
//           console.log('请求错误,未找到该资源')
//           break;
//         case 405:
//           console.log('请求方法未允许')
//           break;
//         case 408:
//           console.log('请求超时')
//           break;
//         case 500:
//           console.log('服务器端出错')
//           break;
//         case 501:
//           console.log('网络未实现')
//           break;
//         case 502:
//           console.log('网络错误')
//           break;
//         case 503:
//           console.log('服务不可用')
//           break;
//         case 504:
//           console.log('网络超时')
//           break;
//         case 505:
//           console.log('http版本不支持该请求')
//           break;
//         default:
//           console.log(`连接错误${err.response.status}`)
//       }
//     } else {
//       console.log('连接到服务器失败')
//     }
//     return Promise.resolve(err.response)
// })

export function post (url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(res => {
        res = res.data
        if (parseInt(res.code) === 10000) {
          resolve(res)
        } else {
          reject(res)
        }
      })
      .catch(e => {
        reject(e)
      })
  })
}

export function get (url, data) {
  return new Promise((resolve, reject) => {
    axios.get(url, data)
      .then(res => {
        res = res.data
        resolve(res)
      })
      .catch(e => {
        reject(e)
      })
  })
}
