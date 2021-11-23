import axios from 'axios'
import { REQUEST_SUCCESS } from '../config/config'
import { notification, Modal } from 'antd';
import { JSTool } from '../util/utils';
import store from '../store/index'
import {AuthorizedFailed }from '../store/globalAuthorized/actionCreators'
import {loadingShowStatu} from '../components/loading/store/ActionCreator';
import qs from 'qs'

let loadingList = [];

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.queue = {}
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type':'application/x-www-form-urlencoded',
        'X-Requested-With':'XMLHttpRequest'
      }
    }
    return config;
  }
  destory(url) {
    delete this.queue[url]
  }
  interceptor(instance, url, isModalError, loading) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      this.queue[url] = true;
      return config
    }, error => {
      return Promise.reject(error);
    })

    //响应拦截
    instance.interceptors.response.use(res => {
      let config = res.config;
      if(url.indexOf("getModuleApplyListByPage")){
        console.log(4,config)
    
      }
      if(loading){

        if(url.indexOf("getModuleApplyListByPage")){
          console.log(3,config)
      
        }


        closeLoading(config);
      }
      this.destory(url)
      const { data, status } = res
      if (status >= 200 && status < 300) {
        if(data.code != 0){
          //token 过期，需要重新登录
          if(data.code === 100010110){
            store.dispatch(AuthorizedFailed())
          }else{
            const errortext = data.msg;
			if(isModalError){
				Modal.error({
				  title: errortext,
				  centered: true,
				  zIndex: 1080
				});
			}
			else{
				notification.error({
				  message: `请求错误 ${data.code}`,
				  description: errortext,
				});
			}
          }
        }
        return res;
      }

      const errortext = data.msg;

      if(isModalError){
        Modal.error({
          title: errortext,
          centered: true,
          zIndex: 1080
        });
      }else{
        notification.error({
          message: `请求错误 ${res.status}: ${res.url}`,
          description: errortext,
        });
      }


      return { data, status }
    }, error => {
      this.destory(url);
      let {status, statusText, data} = error.response;
      let config = error.config;
      if(loading){
        closeLoading(config);
      }
	  if(isModalError){
		let modalObj = {
		  title: `网络连接错误`,
		  content: `状态码：${status}（${statusText}）`,
		  centered: true,
		  zIndex: 1080
		};
		if(data && data.msg){
			modalObj.title = data.msg;
			delete modalObj.content;
		}
		Modal.error(modalObj);
	  }
	  else{
		notification.error({
		  message: `请求错误 ${status}`,
		  description: statusText,
		});
	  }

      return Promise.reject(error)
    }, function axiosRetryInterceptor(err) {
      var config = err.config;
      // If config does not exist or the retry option is not set, reject
      if (!config || !config.retry) return Promise.reject(err);

      // Set the variable for keeping track of the retry count
      config.__retryCount = config.__retryCount || 0;

      // Check if we've maxed out the total number of retries
      if (config.__retryCount >= config.retry) {
        // Reject with the error
        return Promise.reject(err);
      }

      // Increase the retry count
      config.__retryCount += 1;

      // Create new promise to handle exponential backoff
      var backoff = new Promise(function (resolve) {
        setTimeout(function () {
          resolve();
        }, config.retryDelay || 1);
      });

      // Return the promise in which recalls axios to retry the request
      return backoff.then(function () {
        return axios(config);
      });
    })

  }

  request(option) {
    const instance = axios.create({
      timeout: 30000
    })
    let defaultConfig = this.getInsideConfig()
    let time = new Date().getTime();
    option = Object.assign(defaultConfig, option)
    let {url,loading} = option;
    if(loading){
      if(loadingList.length === 0){
        store.dispatch(loadingShowStatu(true));
      }
      loadingList.push(url);
    }
    delete option.loading;
    
    

    if (option.method && option.method.toLowerCase() === 'post') {

      if (option.data) {
        if(option.headers && option.headers['Content-Type'] === 'application/x-www-form-urlencoded'){
          if(option.needFormData){
            let _data = JSTool.objToFormdata(option.data);
            option = {
              ...option,
              data:_data,
              headers:{
                'Content-Type': 'multipart/form-data'
              }
            };
          }else {
            option.data['_'] = time;
            let data = option.data;
            option.data = qs.stringify(data);
          }
        }
      }else{
        option.params['_'] = time;
      }
      if(option.params){
        if(option.headers && option.headers['Content-Type'] === 'application/json'){
          option.headers['Content-Type'] = 'application/json';
          option.body = JSON.stringify(option);
        }
      }
    } else if (option.method && option.method.toLowerCase() === 'get') {
      if (option.params) {
        option.params['_'] = time;
      }
    }

    this.interceptor(instance, option.url, option.isModalError, loading)

    return instance(option)
  }



  /***
   *  url     : 请求url
   *  params    : get data
   *  option  : 自定义axios的option
   */
  Get(url="", params={}, option={}){
    let defaultOption = {
      method:'get',
      url:url,
      params:params,
      ...option
    }
    return this.request(defaultOption)
  }

  /***
   *  url    :请求url
   *  data   :请求data
   *  params :请求params
   *  option :自定义axios的option
   */
  Post(url="", data={}, option={}){
      let defaultOption = {
        method:'post',
        url:url,
        data:data,
        ...option
      }
      return this.request(defaultOption)
  }
}

// 判断是否需要关闭loading
function closeLoading (config) {


  if(config.url.indexOf("getModuleApplyListByPage")){
    console.log(1,loadingList)

  }


  loadingList = loadingList.filter(item => item !== config.url);


  if(config.url.indexOf("getModuleApplyListByPage")){
    console.log(2,loadingList)

  }



  if (loadingList.length === 0) {
    // TODO: 不使用redux管理
    store.dispatch(loadingShowStatu(false));
  }
}

export default HttpRequest;
