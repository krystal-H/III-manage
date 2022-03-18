import React, { Component } from 'react'
import { Form, Input, Button,Modal } from 'antd'
import { Link } from 'react-router-dom';
import { DateTool } from "../../../util/utils";
import TitleTab from '../../../components/TitleTab';
import Table from '../../../components/Table';
import axios from '../../../util/api.request';
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
class List extends Component {

  constructor(props){
    super(props);
    this.state = {
      userSceneId: undefined,
      userId:undefined,
      sceneName:undefined,
      pageIndex:1,
      list:[],
      pager:{},
      alarmId:"",
      dingToken:''
    };
    this.column = [
        { title: '场景名称', dataIndex: 'sceneName' },
        { title: '更新时间', dataIndex: 'updateTime'},
        { title: '场景ID', dataIndex: 'userSceneId'},
        { title: '用户ID', dataIndex: 'userId' },
        { title: '场景规则', dataIndex: 'ruleNames'},
        { title: '场景状态', dataIndex: 'runStatus', render:e=><span>{ {'1':'已启用','0':'未启用'}[e]}</span> },
        { title: '操作', dataIndex: 'r',width:150,
            render: (r,{userSceneId}) => <span className='comman-table-margin'>
            <Link to={{ pathname: "/sceneMgt/sceneList/log", search: `?userSceneId=${userSceneId}` }}>详情</Link>
            <a onClick={()=>this.getAlarm(userSceneId)}>预警关联</a>
            </span> 
        },
    ];
  }
  componentDidMount=()=>{
    this.getList();
  }
  onReset = ()=>{
    this.setState({
      userSceneId:undefined,
      userId:undefined,
      sceneName:undefined,
    }, () => {
      this.getList();
    })
  }
  changeSearch = (t,v)=>{
    this.setState({[t]:v})
  }

getList=(index)=>{
  if(index){
    this.setState({pageIndex:index})
  }
  let {pageIndex,userSceneId,userId,sceneName} = this.state;
  let param = {
      paged:true,
      pageIndex:index||pageIndex,
      pageRows:10,
      userSceneId,
      userId,
      sceneName,
  }
  axios.Post('expert/combine/userScene/list/v2.0',param).then( ({data={}}) => {
    let res = data.data || {};
    let { list=[] , pager={} } = res
    this.setState({list,pager})
  });
}

getAlarm=userSceneId=>{
  this.setState({
    alarmId:userSceneId
  })
  axios.Get('expert/combine/userScene/getAlarm/v2.0',{userSceneId}).then( ({data={}}) => {
    this.setState({
      dingToken:data.data && data.data.dingToken || ""
    })
  });

}
alarmOk=()=>{
  const {alarmId,dingToken} = this.state;
  axios.Post('expert/combine/userScene/setAlarm/v2.0',{userSceneId:alarmId,dingToken},{ headers: {"Content-Type":"application/json"}}).then( ({data={}}) => {
    this.setState({alarmId:""})
  });


}



  render() {
    const { userId, userSceneId,sceneName, list, pager, pageIndex, alarmId,dingToken } = this.state;
    
    return (
      <div>
        <TitleTab title="场景列表">
          <div className="comm-title-search-box">

            <span className="labeknam">用户ID：</span>
            <Input value={userId} placeholder="请输入用户ID" maxLength={30} onPressEnter={()=>{this.getList()} } onChange={e=>{ this.changeSearch("userId",e.target.value || undefined)}}/>

            <span className="labeknam">场景ID：</span>
            <Input value={userSceneId} placeholder="请输入场景ID" maxLength={30} onPressEnter={()=>{this.getList()} } onChange={e=>{ this.changeSearch("userSceneId",e.target.value || undefined)}}/>
            
            <span className="labeknam">场景名称：</span>
            <Input value={sceneName} placeholder="请输入场景名称" maxLength={20} onPressEnter={()=>{this.getList()} } onChange={e=>{ this.changeSearch("sceneName",e.target.value || undefined)}}/>

            <Button className='btn' type="primary" onClick={ ()=>{this.getList()} } >查询</Button>
            <Button className='btn' onClick={this.onReset}>重置</Button>

            {/* <Link to={{ pathname: "/sceneMgt/sceneList/log", search: `?userSceneId=${123}` }}>详情</Link> */}
          </div>
        </TitleTab>
        <div className="comm-contont-card">
            <Table rowKey="userSceneId" columns={this.column} dataSource={list} pager={{...pager,pageIndex}} onPageChange={this.getList} />
        </div>
        <Modal
          visible={!!alarmId}
          width={600}
          title="预警关联"
          onCancel={()=>{this.setState({alarmId:""})}}
          onOk={this.alarmOk}
          afterClose={()=>{this.setState({dingToken:""})}}
        >
        <Form {...formItemLayout}>
            <Form.Item style={{marginBottom:"16px"}} label="设备预警方式" > 钉钉机器人 </Form.Item>
            <Form.Item label="钉钉机器人URL" ><Input value={dingToken} onChange={e=>{ this.changeSearch("dingToken",e.target.value || "")}} maxLength={200} placeholder='请输入钉钉机器人URL' /></Form.Item>
        </Form>
      </Modal>

      </div>
    )
  }
}


export default Form.create()(List)