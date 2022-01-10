import React, { Component } from 'react'
import { Form, Input, Button,Select } from 'antd'
import { DateTool } from "../../../util/utils";
import TitleTab from '../../../components/TitleTab';
import Table from '../../../components/Table';
import axios from '../../../util/api.request';
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
      updata:{}
    };
    this.column = [
        { title: '场景名称', dataIndex: 'sceneName' },
        { title: '更新时间', dataIndex: 'createTime'},
        { title: '场景ID', dataIndex: 'sceneId'},
        { title: '用户ID', dataIndex: 'userId' },
        { title: '场景规则', dataIndex: 'deviceTypeNames'},
        { title: '场景状态', dataIndex: 'enable', render:e=><span>{ {'1':'已启用','0':'未启用'}[e]}</span> },
        { title: '操作', dataIndex: 'n',width:150,
            render: (n,{sceneId,enable}) => <span className='comman-table-margin'>
            <Link  target="_black" to={{ pathname: "/home", search: `?sceneId=${sceneId}` }}>详情</Link>
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
    const { a, b, c, list, pager, pageIndex  } = this.state;
    
    return (
      <div>
        <TitleTab title="场景日志">
          <div className="comm-title-search-box">

            <span className="labeknam">状态：</span>
            <Select className="select" placeholder="请选择状态" value={a} onChange={v=>{this.changeSearch("a",v)}} >
              <Option value={"0"}> 全部 </Option>
              <Option value={"1"}> 成功 </Option>
              <Option value={"2"}> 失败 </Option>
            </Select>
            <span className="labeknam">规则：</span>
            <Select className="select" placeholder="请选择规则" value={b} onChange={v=>{this.changeSearch("b",v)}} >
              <Option value={"0"}> 全部 </Option>
              <Option value={"1"}> 成功 </Option>
              <Option value={"2"}> 失败 </Option>
            </Select>
            <span className="labeknam">时间：</span>
            <Select className="select" placeholder="请选择时间" value={c} onChange={v=>{this.changeSearch("c",v)}} >
              <Option value={"0"}> 15分钟</Option>
              <Option value={"1"}> 1小时</Option>
              <Option value={"2"}> 4小时</Option>
              <Option value={"3"}> 12小时</Option>
              <Option value={"4"}> 自定义</Option>
            </Select>
            
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