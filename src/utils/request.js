import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import router from '@/router'
// 创建axios实例
const service = axios.create({
  //baseURL: process.env.BASE_API, // api的base_url
  timeout: 150000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    // config.headers.userAgent = 'PC';// 让每个请求携带自定义userAgent 请根据实际情况自行修改
    if (store.getters.token) {
      config.headers["X-Token"] = 'Bearer ' + store.getters.token;
      // config.headers.Authorization = store.getters.token;// 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    // for debug
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data;
    if (res.code === 0) {
      return response.data
    } else {
      if(res.code === 403) {
        router.push('/login')
      }  
      Message({
        message: res.msg || res.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(res)
    }
  },
  error => {
    // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
