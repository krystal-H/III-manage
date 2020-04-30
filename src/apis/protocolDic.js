import axios from '../util/api.request'


const managerName = "manage-open"

/************************* 数据分类 */
// 主体分类
export const protocolDicSubjectListRequest = (params) => {
  return axios.request({
    url:`/${managerName}/protocol/dictionary/common/getSubjectMenu`,
    params:params,
    method:'get'
  })
}
// 主体扩展分类
export const protocolDicSubjectExtendsListRequest = (params) => {
  return axios.request({
    url:`/${managerName}/protocol/dictionary/common/getSubjectExtendMenu`,
    params:params,
    method:'get'
  })
}
// 功能分类
export const protocolDicFunctionListRequest = (params) => {
  return axios.request({
    url:`/${managerName}/protocol/dictionary/common/getFunctionMenu`,
    params:params,
    method:'get'
  })
}
// 功能扩展分类
export const protocolDicFunctionExtendsListRequest = (params) => {
  return axios.request({
    url:`/${managerName}/protocol/dictionary/common/getFunctionExtendMenu`,
    params:params,
    method:'get'
  })
}

// 功能列表
export const protocolDicFunctionGetAllListRequest = (params) => {
  return axios.request({
    url:`/${managerName}/protocol/dictionary/function/getAllList`,
    params:params,
    method:'get'
  })
}





/************************* 常用数据 */
// 协议字典 常用列表获取
export const protocolDicCommonListGetRequest = (params) => {
  return axios.request({
    url:`/${managerName}/protocol/dictionary/common/getList`,
    params:params,
    method:'get'
  })
}

// 协议字典 常用单个数据获取
export const protocolDicCommonItemGetRequest = (params) => {
  return axios.request({
    url:`/${managerName}/protocol/dictionary/common/getByCommonId`,
    params:params,
    method:'get'
  })
}

// 协议字典 常用单个数据保存
export const protocolDicCommonItemSaveRequest = (params) => {
  return axios.request({
    url:`/${managerName}/protocol/dictionary/common/save`,
    data:params,
    method:'post',
    headers:{
      'Content-Type':'application/json'
    }
  })
}

// 协议字典 常用单个数据删除
export const protocolDicCommonItemDeleteRequest = (params) => {
  return axios.request({
    url:`/${managerName}/protocol/dictionary/common/delete`,
    params:params,
    method:'get'
  })
}


/*************************  主体数据 */
// 协议字典 主体列表获取
export const protocolDicMainListGetRequest = (params) => {
  return axios.request({
    url:`/${managerName}/protocol/dictionary/subject/getList`,
    params:params,
    method:'get'
  })
}

// 协议字典 主体单个数据获取
export const protocolDicMainItemGetRequest = (params) => {
  return axios.request({
    url:`/${managerName}/protocol/dictionary/subject/getBySubjectId`,
    params:params,
    method:'get'
  })
}

// 协议字典 主体单个数据保存
export const protocolDicMainItemSaveRequest = (params) => {
  return axios.request({
    url:`/${managerName}/protocol/dictionary/subject/save`,
    data:params,
    method:'post',
    headers:{
      'Content-Type':'application/json'
    }
  })
}

// 协议字典 主体单个数据删除
export const protocolDicMainItemDeleteRequest = (params) => {
  return axios.request({
    url:`/${managerName}/protocol/dictionary/subject/delete`,
    params:params,
    method:'get'
  })
}

/*************************  主体扩展数据 */

// 协议字典 主体扩展获取
export const protocolDicSubjectExtendsListGetRequest = (params) => {
  return axios.request({
    url:`/${managerName}/protocol/dictionary/subjectExtend/getList`,
    params:params,
    method:'get'
  })
}

// 协议字典 主体扩展单个数据获取
export const protocolDicMainExtendsItemGetRequest = (params) => {
  return axios.request({
    url:`/${managerName}/protocol/dictionary/subjectExtend/getBySubjectExtendId`,
    params:params,
    method:'get'
  })
}

// 协议字典 主体扩展单个数据保存
export const protocolDicMainExtendsItemSaveRequest = (params) => {
  return axios.request({
    url:`/${managerName}/protocol/dictionary/subjectExtend/save`,
    data:params,
    method:'post',
    headers:{
      'Content-Type':'application/json'
    }
  })
}

// 协议字典 主体扩展单个数据删除
export const protocolDicMainExtendsItemDeleteRequest = (params) => {
  return axios.request({
    url:`/${managerName}/protocol/dictionary/subjectExtend/delete`,
    params:params,
    method:'get'
  })
}






/*************************  功能数据 */

// 协议字典 功能获取
export const protocolDicFunctionListGetRequest = (params) => {
  return axios.request({
    url:`/${managerName}/protocol/dictionary/function/getList`,
    params:params,
    method:'get'
  })
}
// 协议字典 功能扩展单个数据获取
export const protocolDicFunctionItemGetRequest = (params) => {
  return axios.request({
    url:`/${managerName}/protocol/dictionary/function/getByFunctionId`,
    params:params,
    method:'get'
  })
}

// 协议字典 功能扩展单个数据保存
export const protocolDicFunctionItemSaveRequest = (params) => {
  return axios.request({
    url:`/${managerName}/protocol/dictionary/function/save`,
    data:params,
    method:'post',
    headers:{
      'Content-Type':'application/json'
    }
  })
}

// 协议字典 主体扩展单个数据删除
export const protocolDicFunctionItemDeleteRequest = (params) => {
  return axios.request({
    url:`/${managerName}/protocol/dictionary/function/delete`,
    params:params,
    method:'get'
  })
}


/*************************  功能扩展数据 */
// 协议字典 功能获取
export const protocolDicFunctionExtendsListGetRequest = (params) => {
  return axios.request({
    url:`/${managerName}/protocol/dictionary/functionExtend/getList`,
    params:params,
    method:'get'
  })
}

// 协议字典 功能扩展单个数据获取
export const protocolDicFunctionExtendsItemGetRequest = (params) => {
  return axios.request({
    url:`/${managerName}/protocol/dictionary/functionExtend/getByFunctionExtendId`,
    params:params,
    method:'get'
  })
}

// 协议字典 功能扩展单个数据保存
export const protocolDicFunctionExtendsItemSaveRequest = (params) => {
  return axios.request({
    url:`/${managerName}/protocol/dictionary/functionExtend/save`,
    data:params,
    method:'post',
    headers:{
      'Content-Type':'application/json'
    }
  })
}

// 协议字典 主体扩展单个数据删除
export const protocolDicFunctionExtendsItemDeleteRequest = (params) => {
  return axios.request({
    url:`/${managerName}/protocol/dictionary/functionExtend/delete`,
    params:params,
    method:'get'
  })
}
