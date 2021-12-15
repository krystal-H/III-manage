import React, { Component } from 'react'
import { Form, Input, Button, Select } from 'antd'
import { DateTool } from "../../../util/utils";
import TitleTab from '../../../components/TitleTab';
import Table from '../../../components/Table';
import axios from '../../../util/api.request';
import './style.scss'
import Update from './update';
const { Option } = Select

const modeList = {
  0: '开发中',
  1: '已发布',
  2: '审核中'
}
const mockda = [
  {name:"啊啊啊",createTime:'2021-10-28 15:30:55',
  productName:"多得多",type:1,schemeType:3,moduleName:'dsdsdsd',num:4,firmwareName:'颠三倒四的',status:1,id:1
}
]

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
        { title: '模组型号', dataIndex: 'hetModuleTypeName' },
        { title: '使用的产品名称', dataIndex: 'productName'},
        { title: '使用的产品ID', dataIndex: 'productId'},
        { title: '产品方案', dataIndex: 'schemeType', render:s=><span>{ {'1':'免开发','2':'MCU方案','3':'Soc方案'}[s]}</span> },
        { title: '产品归属账号', dataIndex: 'userName'},
        { title: '操作', dataIndex: 't', width:'60px',
            render: (t,updata) =>  <a onClick={()=> this.setState({updata})} >升级</a>
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
  let {searchName,searchKey,pageIndex} = this.state;
  let param = {
      pageIndex:index||pageIndex,
      pageRows:10,
      productName:searchName,
      hetModuleTypeName:searchKey
  }
  axios.Post('manage-open/product/module/search',param,{loading:true, headers: {"Content-Type":"application/json"}}).then( ({data={}}) => {
    
    console.log(666,data)
    let res = data.data || {};
    let { list=[] , pager={} } = res
    this.setState({list,pager})
  });
}

  render() {
    const { searchName, searchKey, list, pager, pageIndex, updata  } = this.state;
    
    return (
      <div className="pro-firmware-up">
        <TitleTab title="产品模组升级">
          <div className="comm-title-search-box">

            <span className="labeknam">关键字：</span>
            <Input value={searchKey} placeholder="请输入生产厂商或模组型号" maxLength={30} onPressEnter={()=>{this.getList()} } onChange={e=>{ this.changeSearch("searchKey",e.target.value || undefined)}}/>

            <span className="labeknam">产品名称：</span>
            <Input value={searchName} placeholder="请输入产品名称" maxLength={30} onPressEnter={()=>{this.getList()} } onChange={e=>{ this.changeSearch("searchName",e.target.value || undefined)}}/>
            
            <Button className='btn' type="primary" onClick={ ()=>{this.getList()} } >查询</Button>
            <Button className='btn' onClick={this.onReset}>重置</Button>
          </div>
        </TitleTab>
        <div className="comm-contont-card">
            <Table rowKey="productId" columns={this.column} dataSource={list} pager={{...pager,pageIndex}} onPageChange={this.getList} />
        </div>

        {updata.productId && <Update updata={updata}  close={()=>this.setState({updata:{}})} />}

      </div>
    )
  }
}


export default Form.create()(List)