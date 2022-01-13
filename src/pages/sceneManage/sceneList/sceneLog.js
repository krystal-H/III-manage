import React, { Component } from 'react'
import { Form, Input, Button,Select,DatePicker ,notification} from 'antd'
import moment from "moment";
import { DateTool, JSTool } from "../../../util/utils";
import TitleTab from '../../../components/TitleTab';
import Table from '../../../components/Table';
import axios from '../../../util/api.request';
import './style.scss'  


const {Option} = Select
class List extends Component {

  constructor(props){
    super(props);
    this.state = {
      a:undefined,
      b:undefined,
      pageIndex:1,
      list:[],
      pager:{},

      ruleList:[],
      time:60,
      resultStatus:-9,
      ruleId:-9,
      beginTime:'',
      endTime:'',

      logDetail:null,
    };
    this.userSceneId = JSTool.getHrefParams(this.props.location.search).userSceneId || undefined
    this.column = [
        { title: '规则名称', dataIndex: 'sceneName' },
        { title: '执行时间', dataIndex: 'createTime'},
        { title: '场景ID', dataIndex: 'sceneId'},
        { title: '用户ID', dataIndex: 'userId' },
        { title: '场景规则', dataIndex: 'deviceTypeNames'},
        { title: '关联设备', dataIndex: 'devicesss'},
        { title: '执行状态', dataIndex: 'enable', render:e=><span>{ {'1':'成功','0':'失败'}[e]}</span> },
        { title: '操作', dataIndex: 'n',width:150,
            render: (n,{id}) => <a onClick={()=>this.getDetail(id)}>详情</a>
        },
    ];
    
  }
  componentDidMount=()=>{
    this.getList();
    axios.Post('combine/userRule/list/v2.0',{userSceneId:this.userSceneId}).then( ({data={}}) => {
      let res = data.data || {};
      let { list=[] } = res
      this.setState({ruleList:list})
    });
  }
  getDetail=id=>{
    axios.Get('scene/trigger/log/detail/v2.0 ',{id}).then( ({data={}}) => {
      this.setState({
        logDetail:data
      })
    });
  
  }
  closeDetail=()=>{
    this.setState({
      logDetail:null
    })
  }
  onReset = ()=>{
    this.setState({
      resultStatus:-9,
      ruleId:-9,
      time:60
    }, () => {
      this.getList();
    })
  }
  changeSearch = (t,v)=>{
    this.setState({[t]:v})
    if(t=="time" && v==0){
      this.setState({
        beginTime:'',
        endTime:'',
      })

    }
  }

getList=(index)=>{
  if(index){
    this.setState({pageIndex:index})
  }
  let { pageIndex,time,resultStatus,ruleId,beginTime,endTime} = this.state;
  if(time==0){
    if(beginTime=='' || endTime==''){
      notification.warning({
        message:'自定义时间不完整'
      })
      return
    }
    
  }else{
    endTime = moment().format('YYYY-MM-DD HH:mm:ss');
    beginTime = moment(moment(endTime)-time*60*1000).format('YYYY-MM-DD HH:mm:ss');
  }
  if(resultStatus==-9){
    resultStatus = undefined
  }
  if(ruleId==-9){
    ruleId = undefined
  }
  let param = {
      paged:true,
      pageIndex:index||pageIndex,
      pageRows:10,
      sceneId:this.userSceneId,
      resultStatus,
      ruleId,
      beginTime,
      endTime
  }
  axios.Post('scene/trigger/log/list/v2.0',param).then( ({data={}}) => {
    let res = data.data || {};
    let { list=[] , pager={} } = res
    this.setState({list,pager})
  });
}



  render() {
    const { a, b, time, list, pager, pageIndex, ruleList,resultStatus,ruleId  } = this.state;
    
    return (
      <div className='page-scene-log'>
        <TitleTab title="场景日志">
          <div className="comm-title-search-box">

            <span className="labeknam">状态：</span>
            <Select className="select" value={resultStatus} onChange={v=>{this.changeSearch("resultStatus",v)}} >
              <Option value={-9}> 全部 </Option>
              <Option value={0}> 成功 </Option>
              <Option value={-1}> 失败 </Option>
            </Select>
            <span className="labeknam">规则：</span>
            <Select className="select" value={ruleId} onChange={v=>{this.changeSearch("ruleId",v)}} >
              <Option value={-9}> 全部 </Option>
              {
                ruleList.map((id,name)=>{
                  <Option value={id}> {name} </Option>
                })
              }
            </Select>
            <span className="labeknam">时间：</span>
            <Select className="select" placeholder="请选择时间" value={time} onChange={v=>{this.changeSearch("time",v)}} >
              <Option value={15}>15分钟</Option>
              <Option value={60}>1小时</Option>
              <Option value={240}>4小时</Option>
              <Option value={720}>12小时</Option>
              <Option value={0}>自定义</Option>
            </Select>
            {
              time==0&&
              <><DatePicker className='datepicker datepickerbeg' onChange={v=>{this.changeSearch("beginTime",moment(v).format('YYYY-MM-DD HH:mm:ss'))}}
                  showTime
                  placeholder="请选择开始时间"
                  format="YYYY-MM-DD HH:mm:ss"
                  showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
                  // disabledDate={disabledDate}
                  // disabledTime={disabledDateTime}
                /> --  <DatePicker showTime className='datepicker' onChange={v=>{this.changeSearch("endTime",moment(v).format('YYYY-MM-DD HH:mm:ss'))}}
                    placeholder="请选择结束时间"
                    format="YYYY-MM-DD HH:mm:ss"
                    showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
                    // disabledDate={disabledDate}
                    // disabledTime={disabledDateTime}
                />
              </>
            }
            


          
                                                        
            
            <Button className='btn' type="primary" onClick={ ()=>{this.getList()} } >查询</Button>
            <Button className='btn' onClick={this.onReset}>重置</Button>
          </div>
        </TitleTab>
        <div className="comm-contont-card">
            <Table rowKey="sceneId" columns={this.column} dataSource={list} pager={{...pager,pageIndex}} onPageChange={this.getList} />
        </div>


        <Modal
          visible={!!logDetail}
          width={600}
          title="日志详情"
          onCancel={this.closeDetail}
          onOk={this.closeDetail}
        >
        <Form {...formItemLayout}>
            
        </Form>
      </Modal>


      </div>
    )
  }
}
export default Form.create()(List)


function disabledDate(current) {
  return current && current < moment().startOf("day");
}

function disabledDateTime() {
  return {
    disabledHours:()=> getDisabledTime("h") ,
    disabledMinutes: ()=> getDisabledTime("m"),
  };
}

function getDisabledTime(t){
    let _now = moment().format(t)-0;
    let a = [];
    for(let i=0; i< _now; i++){
        a.push(i)
    }
    return a
}