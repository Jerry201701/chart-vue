import axios from 'axios';
import config from './config';
import Cookies from "js-cookie";
import router from '@/router'

// 使用vuex做全局loading时使用
// import store from '@/store'

export default function $axios(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: config.baseUrl,
      headers: config.headers,
      timeout: config.timeout,
      withCredentials: config.withCredentials
    })

    // request 拦截器
    instance.interceptors.request.use(
      config => {
       
        let token = Cookies.get('token')
        if (token) {
          config.headers.token =token
        } else {
          router.push('/login')
        }
        // 3. 根据请求方法，序列化传来的参数，根据后端需求是否序列化
        if (config.method === 'post') {
         
        }

        return config
      },

      error => {
        //console.log('request:', error)
        // 1. 判断请求超时
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
          console.log('timeout请求超时')
          // return service.request(originalRequest);// 再重复请求一次
        }
      
        return Promise.reject(error) 
      }
    )

    // response 拦截器
    instance.interceptors.response.use(
      response => {
        let data;
        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        if (response.data == undefined) {
          data = JSON.parse(response.request.responseText)
        } else {
          data = response.data
        }
       
        // 根据返回的code值来做不同的处理
        switch (data.rc) {
          case 1:
            //console.log(data.desc)
            break;
          case 0:
            store.commit('changeState')
            // console.log('登录成功')
          default:
        }
        // 若不是正确的返回code，且已经登录，就抛出错误
        // const err = new Error(data.desc)
        // err.data = data
        // err.response = response
        // throw err

        return data
      },
      err => {
        
        if(err.response.status==403){
          router.push('/403')
        }
        //console.log(err)
        //console.log(err.response)
        
        // if (err && err.response) {
        
        //   switch (err.response.status) {
        //     case 400:
        //       err.message = '请求错误'
        //       break
        //     case 401:
        //       err.message = '未授权，请登录'
        //       break
        //     case 404:
        //       err.message = `请求地址出错: ${err.response.config.url}`
        //       break
        //     case 408:
        //       err.message = '请求超时'
        //       break
        //     case 500:
        //       err.message = '服务器内部错误'
        //       break
        //     case 501:
        //       err.message = '服务未实现'
        //       break
        //     case 502:
        //       err.message = '网关错误'
        //       break
        //     case 503:
        //       err.message = '服务不可用'
        //       break
        //     case 504:
        //       err.message = '网关超时'
        //       break
        //     case 505:
        //       err.message = 'HTTP版本不受支持'
        //       break
        //     default:
        //   }
        // }
       
         return Promise.reject(err) 
      }
    )

    // 请求处理
    instance(options).then(res => {
      resolve(res)
      return false
    }).catch(error => {
      reject(error)
    })
  })
}