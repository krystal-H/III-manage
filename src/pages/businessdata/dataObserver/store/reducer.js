import { fromJS, setIn, Map, mergeDeepIn, mergeDeep } from 'immutable';
import * as constants  from './constants'
import { actionCreator } from '.';

const defaultState = fromJS({
  pager:{
  },
  dataObserverList:[],
  dataObserverDetail:{},
  dataObserverAdd:{
    current: 0,
    dataLabel:{pager:{},list:[]},
    productList:[],   //productId productName
    //step three
    observerType:{value:'0'},
    observerHttpURL:{value:''},
    observerHttpToken:{value:''},
    //step two
    observerDataType:{value:[]},
    //step one
    observerLabel:{value:[]},
    filterKey:{value:''},
    filterValue:{value:''}
  },
  observerWay:{"0":"PUSH数据订阅","1":"MQTT主题订阅"},
  observerPushState:{"0":"停用","1":"正常 ","2":"锁定"},
  observerProtocolType:[{key:"2",value:"控制数据"},{key:"3",value:"运行数据"},{key:"4",value:"故障数据"}]
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.SET_DATA_OBSERVER_ADD_CURRENT:
      let operation = action.data
      if(operation === constants.CurrentOperation.next){
        let current = state.getIn(["dataObserverAdd","current"]) + 1
        return state.setIn(['dataObserverAdd','current'], current)
      }else{
        let current = state.getIn(["dataObserverAdd","current"]) - 1
        return state.setIn(['dataObserverAdd','current'], current)
      }
    case constants.SET_DATA_OBSERVER_ADD_FIELD:{
      let actionObject = action.data
      var lastState = state;
      console.log('actionObject~~~~~~',actionObject);
      Object.keys(actionObject).map(key => {
        let dataObserverAddValue = actionObject[key]
        lastState = lastState.setIn(['dataObserverAdd',key], dataObserverAddValue)
      })
      return lastState
    }
    case constants.SET_DATA_OBSERVER_LIST:
      let {pager, list} = action.data
      let newstate =  state.set('pager', pager);
      return newstate.set('dataObserverList',list)
    case constants.SET_DATA_OBSERVER_Detail_DATA:
      let data = action.data;
      if(data.isedit){
        let deviceLabelIds = data.deviceLabelIds;
        let arr = deviceLabelIds&&deviceLabelIds.split(',') || [];
        let intarr = arr.map((item)=>{
          return parseInt(item);
        });
        return state.setIn(['dataObserverAdd','observerLabel'],{value:intarr})

      }else{
        return state.set('dataObserverDetail', data)
      }

    case constants.SET_DATA_OBSERVER_Add_Product:
      return state.setIn(['dataObserverAdd','productList'],action.data)
    case constants.SET_DATA_OBSERVER_Add_Label:
      return state.setIn(['dataObserverAdd','dataLabel'],action.data)
    case constants.SET_DATA_OBSERVER_Add_Clean:
        return state.merge({
          dataObserverAdd:
            {
              current: 0,
              dataLabel:{pager:{},list:[]}, 
              productList:[],   //productId productName
              //step three
              observerType:{value:'0'},
              observerHttpURL:{value:''},
              observerHttpToken:{value:''},
              //step two
              observerDataType:{value:[]},
              //step one
              observerLabel:{value:[]},
              filterKey:{value:''},
              filterValue:{value:''}
            }
        });
    default:
      return state;
  }
}