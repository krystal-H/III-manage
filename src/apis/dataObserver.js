import axios from '../util/api.request'

export const getDataObserList = (params) => {
  return axios.Get(
    '/manage-open/data/push/config/getList',
    {
      ...params,
      version:'1.1'
    }
  )
}

export const dataObserStopObserId = (urlConfId) => {
  return axios.Get(
    '/manage-open/data/push/config/stop',
    {
      urlConfId,
      version:'1.1'
    }
  )
}
export const dataObserStartObserId = (urlConfId) => {
  return axios.Get(
    '/manage-open/data/push/config/enabled',
    {
      urlConfId,
      version:'1.1'
    }
  )
}

export const getDataObserDetailById = (urlConfId) => {
  return axios.Get(
    'manage-open/data/push/config/get',
    {
      urlConfId,
      version:'1.1'
    }
  )
}

// 获取标签，
// 接口是做成分页的了，但是交互暂时定位不分页，数量最大100条，展示不完整的情况通过条件过滤，其他情况不考虑
export const getDataObserLabelList= (searchInfo) => {
  return axios.Get(
    'manage-open/data/push/config/getLabelList',
    {
      ...searchInfo,
      pageRows:50, //先定死100个，不能拉完整的情况下，通过条件搜索
      version:'1.1'
    }
  )
}


// 获取产品列表
export const getDataObserProductList= (labelIds) => {
  return axios.Get(
    'manage-open/data/push/config/getProductByLabelIds',
    {
      labelIds,
      version:'1.1'
    }
  )
}

// 新建/修改 订阅
export const getDataObserCreate= (data) => {
  let api = data.urlConfId && 'manage-open/data/push/config/save' || 'manage-open/data/push/config/create';
  if(data.urlConfId){

  }
  return axios.Post(
    api,
    {
      ...data
    },
    {
      version:'1.1'
    },
    {
      headers: {
        "Content-Type":"application/json"
      }
    }
  )
}