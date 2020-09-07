import React from 'react'
import {Card, Icon, Row, Col,Button} from 'antd'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {actionCreator} from './store'
import {DateTool}from '../../../util/utils'
import './style.less'

let protocolRelfect = {
  "2":"控制数据",
  "3":"运行数据",
  "4":"故障数据"
}
class dataObserverDetail extends React.Component {

  componentDidMount(){
    let {match} = this.props
    let {id} = match.params 
    
    this.props.getDetailData(id)
  }

  render(){
    const contentTitles = [{title:"订阅形式",key:""},{title:"状态",key:""},{title:"订阅创建时间",key:""},{title:"订阅用户ID",key:""},]
    let {dataObserverDetail,observerWay,observerProtocolType,observerPushState,} = this.props
    let styleColor = dataObserverDetail.pushState == 1 ? {color:'#00ff00'} : {color:"#ff0000"}
    let labelList = dataObserverDetail.labelVoList || [] 
    let observerContent = dataObserverDetail.devicePushDataConfList || [] 
    return (
      <div>
        <Card>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <h2 className="title" >数据订阅详情</h2>
            <div ><Link to="/businessdata/dataObserver/list" style={{padding:'10px'}}><Icon type="left"/> 返回</Link></div>
          </div>
        </Card>
        <Card className="observerDetail-card">
          <div className="observerDetail-content">
            <div className="observerDetail-border">
              <Row>
                  <Col span={3}>
                    <p className="title">订阅形式</p>
                    <span className="content">{observerWay[dataObserverDetail.pushWay]}</span>
                  </Col>
                  <Col span={2}>
                    <p className="title">状态</p>
                    <span className="content" style={styleColor}>{observerPushState[dataObserverDetail.pushState]}</span>
                  </Col>
                  <Col span={4}>
                  <p className="title">创建时间</p>
                  <span className="content">{DateTool.utcToDev(dataObserverDetail.createTime)}</span>
                  </Col>
                  <Col span={4}>
                  <p className="title">更新时间</p>
                  <span className="content">{DateTool.utcToDev(dataObserverDetail.updateTime)}</span>
                  </Col>
                  <Col span={2}>
                  <p className="title">用户ID</p>
                  <span className="content">{dataObserverDetail.developerId}</span>
                  </Col>
                  {
                    dataObserverDetail.pushWay==0&&
                    <Col span={7}>
                    <p className="title">数据订阅URL</p>
                    <span className="content">{dataObserverDetail.url}</span>
                    </Col>
                  }
                  {
                    dataObserverDetail.pushWay==0&&
                    <Col span={2}>
                    <p className="title">token</p>
                    <span className="content">{dataObserverDetail.pushToken}</span>
                    </Col>
                  }
                  
              </Row>
            </div>
            <div className="observerDetail-border">
              <p className="title">订阅对象</p>
              <Row>
                {
                  labelList.map(item => {
                    return (
                      <Col span={8} key={item.labelId}>
                        <span>{item.labelValue}-{item.labelKey}</span>
                      </Col>
                    )
                  }) 
                }
              </Row>
              {/* <span className="content">产品名称1、设备唯一码1、设备唯一码2</span> */}
            </div>
            <div className="observerDetail-border">
              <p className="title">订阅内容</p>
              <div className="observerContent"> 
                {/* <p className="content">运行协议数据、控制协议数据、故障协议数据</p>
                <p className="content">协议命令名称1、协议命令名称2、协议命令名称3、协议命令名称4、协议命令名称5</p> */}
                <Row>
                {
                  observerContent.map(item => {
                    return (
                      <Col span={8} key={item.dataConfId}>
                        <div style={{overflowWrap: "break-word", padding: '5px'}}>
                          <p>{ item.dataType?protocolRelfect[item.dataType]:"" }</p>
                          <p>{item.protocolProperty}</p>
                        </div>
                      </Col>
                    )
                  }) 
                }
              </Row>
              </div>
            </div>
            
          </div>
          {dataObserverDetail.pushState==2&&<div style={{marginTop:'16px'}}><i>注：该数据订阅失败次数过多，订阅已锁定，请重新编辑或者直接停用此订阅。</i></div>}
          <div style={{textAlign:'right',marginTop:'20px'}}><Button type='primary' href={'#/businessdata/dataObserver/add/'+dataObserverDetail.urlConfId}>编辑</Button></div>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let observerWay = state.getIn(["dataObserver","observerWay"]).toJS();
  let observerProtocolType = state.getIn(["dataObserver","observerProtocolType"]).toJS();
  let observerPushState = state.getIn(["dataObserver","observerPushState"]).toJS();
  let dataObserverDetail = state.getIn(["dataObserver","dataObserverDetail"]);
  return {
    observerWay,
    observerProtocolType,
    observerPushState,
    dataObserverDetail
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailData(id) {
      dispatch(actionCreator.getDataObseDetailById(id))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(dataObserverDetail);