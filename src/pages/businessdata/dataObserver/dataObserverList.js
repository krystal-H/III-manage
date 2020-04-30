import React from 'react'
import {Card, Form, Divider, Button, Popconfirm, Tooltip} from 'antd'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import PTable from '../../../components/Table'
import {DateTool} from '../../../util/utils'
import {actionCreator} from './store/index' 

const FormItem = Form.Item

@Form.create()
class DataObserverList extends React.Component {

  state = {
    visible:false,
    stopID:'',
    query: '',
    pager: {
      totalRows:20,
      pageIndex:0,
      
    }
  }

  columns = [
    { title: '订阅ID', dataIndex: 'urlConfId', width: '100px' },
    { title: '订阅用户ID', dataIndex: 'developerId',width: '110px' },
    { title: '订阅形式', dataIndex: 'pushWay',render:(pushWay)=>{
      let observerWay = this.props.observerWay
      let observerValue = observerWay[pushWay]
      return <span>{observerValue}</span>
    }},
    { title: '创建时间', dataIndex: 'createTime',render: (timestamp)=> {
      let createDate = DateTool.utcToDev(timestamp)
      return <span>{createDate}</span>
    } },
    { title: '修改时间', dataIndex: 'updateTime',render: (timestamp)=> {
      return <span>{DateTool.utcToDev(timestamp)}</span>
    } },
    { title: '状态', dataIndex: 'pushState', width: '90px',render:(state)=>{
        let pushStateValue = this.props.observerPushState[state]
        let style = state == 1 ? {color:"#00ff00"} : {color:"#ff0000"} 
        return <span style={style}>{pushStateValue}</span>
    }},
    { title: '操作' ,width:'150px',
      render: (item) => {
        return (
          <div>
             <Tooltip placement="top" title="查看">
                <Button shape="circle" size="small" icon="info" key={0} onClick={this.handleDetail.bind(this, item.urlConfId)} />
             </Tooltip>
            {item.pushState == 1 &&
              (<span>
                <Divider type="vertical" />
                <Popconfirm
                  title={<div>即将停用订阅ID:&nbsp;{item.urlConfId}<p>停用之后不可使用，确认要停用吗</p></div>}
                  okText="停用"
                  okType="danger"
                  cancelText="取消"
                  placement="topRight"
                  onConfirm={() => this.handleStop(item.urlConfId)}
                >
                  <Tooltip placement="top" title="停用">
                    <Button shape="circle" size="small" icon="stop" key={0} />
                  </Tooltip>
                </Popconfirm>
              </span>)
            }
            {item.pushState == 0 &&
              (<span>
                <Divider type="vertical" />
                <Popconfirm
                  title={<div>即将启用订阅ID:&nbsp;{item.urlConfId}<p>建议进入编辑确认是否是最新订阅内容和形式</p></div>}
                  okText="启用"
                  cancelText="取消"
                  placement="topRight"
                  onConfirm={() => this.handleStart(item.urlConfId)}
                >
                  <Tooltip placement="top" title="启用">
                    <Button shape="circle" size="small" icon="check" />
                  </Tooltip>
                </Popconfirm>
              </span>)
            }
            <span>
                <Divider type="vertical" />
                  <Tooltip placement="top" title="编辑">
                    <Button shape="circle" size="small" icon="edit" href={`#/businessdata/dataObserver/add/${item.urlConfId}`}/>
                  </Tooltip>
            </span> 


            
            
            
          </div>
        )
      }
    }
  ];
  handleDetail = (urlConfId) => {
    this.props.history.push(`/businessdata/dataObserver/detail/${urlConfId}`)
  }

  handlerSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if(!err){
        let searchValue = values['serachKey']
        this.setState({
          query:searchValue
        })
        console.log(searchValue)
      }
    })
  }

  handlerReset = () => {
    this.props.form.resetFields()
    this.setState({
      query:''
    })
  }

  // handlerNewObserver = () => {
  //   this.props.history.push('/businessdata/dataObserver/add')
  // }

  handleStop = (urlConfId) => {
    //停用该数据
    this.props.stopObseverurlConfId(urlConfId, this.props.pager)
  }
  handleStart = (urlConfId) => {
    this.props.startObseverurlConfId(urlConfId, this.props.pager)
  }
  

  pagerChange = (pageIndex)=>{
    let pager = this.props.pager
    let newpager = Object.assign({}, {...pager},{pageIndex})
    // console.log("newpager")
    // console.log(newpager)
    this.props.getList(newpager);
  }

  componentDidMount(){
    this.props.cleanAddStore();
    this.props.getList({pageRows : 20,pageIndex : 0});
  }

  render(){

    let {getFieldDecorator} = this.props.form;
    let {dataObserverList} = this.props;

    return(
      <div>
        <Card>
          
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between' }}>
            <div>
              <h2 className="title" >数据订阅</h2>
            </div>
            <div>
              <Button href='#/businessdata/dataObserver/add/0' type='primary'>新建数据订阅</Button>
            </div>
          </div>
        </Card>
        <Card style={{marginTop:'10px'}}>
          <PTable onPageChange={this.pagerChange} columns={this.columns} dataSource={[...dataObserverList]} pager={this.props.pager} rowKey="urlConfId"></PTable>
        </Card>
      </div>
    );
  }
}


const mapPropsToState = (state) => {
  let observerWay = state.getIn(["dataObserver","observerWay"]).toJS();
  let observerProtocolType = state.getIn(["dataObserver","observerProtocolType"]).toJS();
  let observerPushState = state.getIn(["dataObserver","observerPushState"]).toJS();

  let dataObserverList = state.getIn(["dataObserver","dataObserverList"]) || [];
  let pager = state.getIn(["dataObserver","pager"]);
  
  return {
    pager,
    observerWay,
    observerProtocolType,
    dataObserverList,
    observerPushState
  }
}

const mapDispatchToState = (dispatch) => {

  return {
    getList(pager){
      dispatch(actionCreator.getObserverList(pager))
    },
    stopObseverurlConfId(urlConfId,pager){
      dispatch(actionCreator.stopObseverurlConfId(urlConfId,pager))
    },
    startObseverurlConfId(urlConfId,pager){
      dispatch(actionCreator.startObseverurlConfId(urlConfId,pager))
    },

    
    cleanAddStore(){
      dispatch(actionCreator.cleanObserverAddData())
    }
  }
}

const DataObserverListConnect = connect(mapPropsToState,mapDispatchToState)(DataObserverList)
export default DataObserverListConnect;