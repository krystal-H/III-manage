import React from 'react'
import { Link }from  'react-router-dom'
import { connect } from 'react-redux'
import { toJS } from 'immutable'
import { Card, Steps, Icon, Button, message } from 'antd'
import { constants, actionCreator } from './store/index'
import ObserverEditStepOne from './components/ObserverEditStepOne'
import ObserverEditStepTwo from './components/ObserverEditStepTwo'
import ObserverEditStepThree from './components/ObserverEditStepThree'
import {getDataObserCreate} from '../../../apis/dataObserver'
import  './style.less'
const { Step } = Steps

class DataObserverAdd  extends React.Component {
  ObserverEditStepOne = undefined
  ObserverEditStepTwo = undefined
  ObserverEditStepThree = undefined

  onFeildChange = (fields)=>{
    this.props.observerAddFieldChange(fields)
  }


  filterLabelAction = (params) => {
    this.props.getObserverLabelList(params)
  }

  onSubmit = () => {
    let {observerLabel, observerDataType,observerType, observerHttpURL,observerHttpToken } = this.props
    let observerLabelArray = observerLabel.value //数据标签
    let pushway = observerType.value // 推送方式
    let observerDataProtocolType = observerDataType.value  // 协议类型

    // console.log('---submit-observerlabel--',observerLabel);

    let params = {
      deviceLabelIds:observerLabelArray.join(','),
      pushWay:pushway,
      devicePushDataConfList:[]
    }
    observerDataProtocolType.map(dataType => {
      let items = {
        dataType,
        dataTypeScope:1
      }
      params.devicePushDataConfList.push(items)
    })

    if(pushway === "0"){
      params["url"] = observerHttpURL.value;
      params["pushToken"] = observerHttpToken.value;
    }

    let {id} = this.props.match.params;
    id = parseInt(id);

    let sucesstxt = '新增成功';
    if(id!==0){
      params['urlConfId'] = id;
      sucesstxt = '修改成功';
    }

  
    getDataObserCreate(params).then( data => {
      let result = data.data
      let code = result.code 
      if(code === 0) {
        message.success( sucesstxt, 0.1, () => {
          this.props.cleanStore()
          this.props.history.push("/businessdata/dataObserver/list")
        })
      }
    })
  }

  nextStepAction =  ()=>{
    this.props.changeCurrent(constants.CurrentOperation.next)
  }
  preStepAction = ()=>{
    this.props.changeCurrent(constants.CurrentOperation.pre)
  }

  stepOneAction = ()=> {
    this.ObserverEditStepOne.validataForm(()=> {
      let {observerLabel} = this.props
      let values = observerLabel.value
      let labels = values.join(',')
      this.props.getObserverLabelProductList(labels)
    })

  }

  componentDidMount(){
    let {id} = this.props.match.params;
    id = parseInt(id);
    this.props.getObserverLabelList();
    if(id!=0){
      this.props.getDetailData(id,true)
    }
    
  }

  backAction = () => {
    this.props.cleanStore();
    // this.props.history.push("/businessdata/dataObserver/list")

    this.props.history.goBack()
  }
  
  stepsContent = (steps = 1) => {
    let{ dataLabel,protocolType,productList,
      observerType,observerHttpURL,observerHttpToken,
      observerDataType,
      observerLabel,filterKey,filterValue,deviceLabelIds}  = this.props
    // let {id} = this.props.match.params;
    // if(id!=0){
    //   let arr = deviceLabelIds&&deviceLabelIds.split(',') || [];
    //   observerLabel.value = arr.map((item)=>{
    //     return parseInt(item);
    //   });
      
    // }

    const stepOne = (<ObserverEditStepOne 
      onRef={ (self) => this.ObserverEditStepOne  = self}
      nextStepAction={this.nextStepAction}
      labelOptions={dataLabel}
      observerLabel={observerLabel}
      filterKey={filterKey}
      filterValue={filterValue}
      onChange={this.onFeildChange}
      filterLabelAction={this.filterLabelAction}
      // deviceLabelIds={deviceLabelIds || []}
      />) ;
    
    const stepTwo = (<ObserverEditStepTwo 
      onRef={ (self) => this.ObserverEditStepTwo  = self}
      nextStepAction={this.nextStepAction}

      protocolType={protocolType}
      productList={productList}
      observerDataType={observerDataType}
      onChange={this.onFeildChange}      />) ;

    const stepThree = (<ObserverEditStepThree 
      onRef={ (self) => this.ObserverEditStepThree  = self}
      nextStepAction={this.nextStepAction}

      onSubmit={this.onSubmit}
      observerType={observerType}
      observerHttpURL={observerHttpURL}
      observerHttpToken={observerHttpToken}
      onChange={this.onFeildChange}
      />) ;

    switch(steps){
      case 0:
        return stepOne;
      case 1:
        return stepTwo;
      case 2:
        return stepThree;
      default:
        return stepOne;

    }
  }
  stepsButton = (steps = 1)=> {
    switch(steps){
      case 0:
        return (<Button type="primary" onClick={this.stepOneAction} >下一步</Button>)
      case 1:
          return (<div>
            <Button type="primary" onClick={this.preStepAction}>上一步</Button> &nbsp; &nbsp;<Button type="primary" onClick={()=> {  this.ObserverEditStepTwo.validataForm() }} >下一步</Button>
            </div>)
      case 2:
          return (<div>
            <Button type="primary" onClick={this.preStepAction}>上一步</Button> &nbsp; &nbsp;<Button type="primary" onClick={()=>{ this.ObserverEditStepThree.validataForm() }} >提交</Button>
            </div>)
      default:
          return (<Button type="primary" onClick={()=> { this.ObserverEditStepOne.validataForm() }} >下一步</Button>)
    }
  }

  render() {
    let { current } = this.props;
    let {id} = this.props.match.params;
    let pagetitle = id=='0'?'新增数据订阅':'修改数据订阅';
    return (
    <div>
      <Card>
        <div style={{display:'flex',justifyContent:'space-between'}}>
    <h2 className="title" >{pagetitle}</h2>
          <div ><Button onClick={this.backAction} style={{padding:'10px'}} type="link" ><Icon type="left"/> 返回</Button></div>
        </div>

      </Card>
      <Card style={{marginTop:'10px'}}>
        <div className="steps-container">
          <div className="steps-step">
            <Steps current={ parseInt(current) }>
              <Step title="配置订阅对象" />
              <Step title="配置订阅内容" />
              <Step title="配置订阅方式" />
            </Steps>
          </div>
          <div className="steps-content">
            {this.stepsContent(parseInt(current))}
          </div>
          <div className="steps-action">
            {
              this.stepsButton(parseInt(current))
            }
          </div>
        </div>
      </Card>
    </div>)
  }
}


const mapStateToProps = (state) => {
  let observerProtocolType = state.getIn(["dataObserver","observerProtocolType"]).toJS();
  let dataObserData = state.getIn(["dataObserver","dataObserverAdd"]).toJS();
  let dataObserverDetail = state.getIn(["dataObserver","dataObserverDetail"]);
  console.log('---dataObserData----',dataObserData);
  return {
    current: dataObserData.current,
    dataLabel:dataObserData.dataLabel,
    productList:dataObserData.productList,
    protocolType: observerProtocolType,

    observerType:dataObserData.observerType,
    observerHttpURL:dataObserData.observerHttpURL,
    observerHttpToken:dataObserData.observerHttpToken,
    observerDataType:dataObserData.observerDataType,
    observerLabel: dataObserData.observerLabel,
    filterKey:dataObserData.filterKey,
    filterValue:dataObserData.filterValue,

    deviceLabelIds:dataObserverDetail.deviceLabelIds || '',
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrent(operation){
      dispatch(actionCreator.observerAddChangeCurrent(operation))
    },
    observerAddFieldChange(value){
      dispatch(actionCreator.observerAddFieldChange(value))
    },
    getObserverLabelList(query){
      dispatch(actionCreator.getLabelList(query))
    },
    getObserverLabelProductList(labels){
      dispatch(actionCreator.getProductList(labels))
    },
    cleanStore(){
      dispatch(actionCreator.cleanObserverAddData())
    },
    getDetailData(id,edit) {
      dispatch(actionCreator.getDataObseDetailById(id,edit))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataObserverAdd) 