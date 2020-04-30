import * as constants from './constants'
import Operation from 'antd/lib/transfer/operation'
import {getDataObserList,
  dataObserStopObserId,
  dataObserStartObserId,
  getDataObserDetailById,
  getDataObserCreate,
  getDataObserProductList,
  getDataObserLabelList} from '../../../../apis/dataObserver'


export const observerAddChangeCurrent = (operation) => 
{
  return {type: constants.SET_DATA_OBSERVER_ADD_CURRENT , data: operation}
} 

export const observerList = (pager,list) => {
  return {type:constants.SET_DATA_OBSERVER_LIST , data:{pager, list}}
}

export const updateDetailData = (data)=> {
  return {type:constants.SET_DATA_OBSERVER_Detail_DATA, data:data}
}

export const observerAddFieldChange = (otherState) => 
{
  // let data = []
  // let keys = Object.keys(operation)
  // for(let key of keys){
  //   let ops = {}
  //   let value = operation[key]
  //   ops["key"]=key
  //   ops["value"]=value
  //   data.push(ops)
  // }
  console.log(222,otherState);
  return {type: constants.SET_DATA_OBSERVER_ADD_FIELD , data:otherState }
} 

// 增加数据订阅，标签列表增加
export const observerAddLabelList = (labelList) => {
  return {type: constants.SET_DATA_OBSERVER_Add_Label, data:labelList}
}

// 增加数据订阅，产品列表展示
export const obseverAddProductList = (productList) => {
  return {type: constants.SET_DATA_OBSERVER_Add_Product, data:productList}
}


export const getObserverList = (pager) => {
  let {pageRows,pageIndex} = pager;
  return (dispatch)=> {
    getDataObserList({pageIndex,pageRows}).then(data => {
      let result = data.data
      let code = result.code
      if(code === 0){
        let resultdata = result.data
        let pager = resultdata.pager
        let list = resultdata.list
        // console.log("action")
        // console.log(list)
        // console.log(pager)
        dispatch(observerList(pager,list))
      }
    })
  }
}

export const stopObseverurlConfId = (urlConfId, pager) => {
  return (dispatch)=> {
    dataObserStopObserId(urlConfId).then(data => {
      let result = data.data
      let code = result.code
      if(code === 0){
        //停用成功后，再次获取List
        dispatch(getObserverList(pager))
      }
    })
  }
}

export const startObseverurlConfId = (urlConfId, pager) => {
  return (dispatch)=> {
    dataObserStartObserId(urlConfId).then(data => {
      let result = data.data
      let code = result.code
      if(code === 0){
        //停用成功后，再次获取List
        dispatch(getObserverList(pager))
      }
    })
  }
}

export const getDataObseDetailById = (urlConfId,edit) => {
  return (dispatch) => {
    getDataObserDetailById(urlConfId).then( data => {
      let result = data.data
      let code = result.code
      if(code === 0){
        let resultData = result.data
        resultData['isedit'] = edit;
        dispatch(updateDetailData(resultData))
      }
    })
  }
}

//获取标签
// 查询条件：label value 过滤
export const getLabelList = (searchQuery) => {
  return (dispatch) => {
    getDataObserLabelList(searchQuery).then( data => {
      let result = data.data
      let code = result.code 
      if(code === 0) {
        let resultData = result.data 
        if(resultData.list){
          dispatch(observerAddLabelList(resultData))
        }
      }
    })
  }
}

//获取标签
// 查询条件： 用户选择的 label 名称
export const getProductList = (selsectLabel) => {
  return (dispatch) => {
    getDataObserProductList(selsectLabel).then( data => {
      let result = data.data
      let code = result.code 
      if(code === 0) {
        let resultData = result.data 
        if (resultData){
          dispatch(obseverAddProductList(resultData))
        }
        
      }
    })
  }
}

//clean store Add 的数据
export const cleanObserverAddData = () => {
  return {type: constants.SET_DATA_OBSERVER_Add_Clean}
}


export const CreateObserver = (observerData) => {
  return (dispatch) => {
    getDataObserCreate(observerData).then( data => {
      let result = data.data
      let code = result.code 
      if(code === 0) {
        let resultData = result.data 
        dispatch(cleanObserverAddData())
      }
    })
  }
}