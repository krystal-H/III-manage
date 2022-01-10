import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import { DateTool } from "../../../util/utils";
import TitleTab from '../../../components/TitleTab';
import Table from '../../../components/Table';
import axios from '../../../util/api.request';

class List extends Component {

  constructor(props){
    super(props);
    this.state = {
      searchName: undefined,
      searchKey:undefined,
      pageIndex:1,
      list:[],
      pager:{},
      updata:{}
    };
    this.column = [
        { title: '场景名称', dataIndex: 'sceneName' },
        { title: '更新时间', dataIndex: 'createTime'},
        { title: '场景ID', dataIndex: 'sceneId'},
        { title: '用户ID', dataIndex: 'userId' },
        { title: '场景规则', dataIndex: 'deviceTypeNames'},
        { title: '场景状态', dataIndex: 'enable', render:e=><span>{ {'1':'已启用','0':'未启用'}[e]}</span> },
        { title: '操作', dataIndex: 'r',width:150,
            render: (r,{sceneId,enable}) => <span className='comman-table-margin'>
            <Link  target="_black" to={{ pathname: "/sceneMgt/sceneList/log", search: `?sceneId=${sceneId}` }}>详情</Link>
            <a  >预警关联</a>
            </span> 
        },
    ];
  }
  componentDidMount=()=>{
    this.getList();
  }
  onReset = ()=>{
    this.setState({
      searchName:undefined,
      searchKey:undefined
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
  let {pageIndex,searchName,searchKey} = this.state;
  let param = {
      paged:true,
      pageIndex:index||pageIndex,
      pageRows:10,
      searchName,
      searchKey,
  }
  axios.Post('expert/userScene/userSceneList/v2.0',param).then( ({data={}}) => {
    let res = data.data || {};
    let { list=[] , pager={} } = res
    this.setState({list,pager})
  });
}



  render() {
    const { searchName, searchKey, list, pager, pageIndex  } = this.state;
    
    return (
      <div>
        <TitleTab title="场景列表">
          <div className="comm-title-search-box">

            <span className="labeknam">用户ID：</span>
            <Input value={searchKey} placeholder="请输入用户ID" maxLength={30} onPressEnter={()=>{this.getList()} } onChange={e=>{ this.changeSearch("searchKey",e.target.value || undefined)}}/>

            <span className="labeknam">场景ID：</span>
            <Input value={searchName} placeholder="请输入场景ID" maxLength={30} onPressEnter={()=>{this.getList()} } onChange={e=>{ this.changeSearch("searchName",e.target.value || undefined)}}/>
            
            <Button className='btn' type="primary" onClick={ ()=>{this.getList()} } >查询</Button>
            <Button className='btn' onClick={this.onReset}>重置</Button>
          </div>
        </TitleTab>
        <div className="comm-contont-card">
            <Table rowKey="sceneId" columns={this.column} dataSource={list} pager={{...pager,pageIndex}} onPageChange={this.getList} />
        </div>
      </div>
    )
  }
}


export default Form.create()(List)