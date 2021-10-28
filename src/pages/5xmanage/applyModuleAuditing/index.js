import React, { Component } from 'react'
import { Form, Input, Button, Select } from 'antd'
import { DateTool } from "../../../util/utils";
import TitleTab from '../../../components/TitleTab';
import Table from '../../../components/Table';
import axios from '../../../util/api.request';
import './style.scss'
const { Option } = Select

const modeList = {
  0: '开发中',
  1: '已发布',
  2: '审核中'
}
const mockda = [
  {name:"啊啊啊",createTime:'2021-10-28 15:30:55',productName:"多得多",type:1,schemeType:3,moduleName:'dsdsdsd',num:4,firmwareName:'颠三倒四的',status:1,id:1}
]

class List extends Component {

  constructor(props){
    super(props);
    this.state = {
      searchName: undefined,
      searchType: "undefined",
      list:mockda,
      pager:{},
    };
    this.column = [
        { title: '提交账号', dataIndex: 'name',ellipsis:true },
        { title: '提交时间', dataIndex: 'createTime', width:'180px',
            render: text => <span>{text && DateTool.utcToDev(text) || '--'}</span>
        },
        { title: '归属产品', dataIndex: 'productName', width:'100px' },
        { title: '申请类型', dataIndex: 'type',render:t=><span>{ {'1':'免费','2':'采购'}[t]}</span> },
        { title: '方案', dataIndex: 'schemeType',render:s=><span>{ {'1':'免开发','2':'MCU方案','3':'Soc方案'}[s]}</span> },
        { title: '模组名称', dataIndex: 'moduleName'},
        { title: '数量', dataIndex: 'num'},
        { title: '固件名称', dataIndex: 'firmwareName', //免开发 查看固件，其他方案下载固件 ；
          render: v=><a > v </a>  
        },
        { title: '状态', dataIndex: 'status',render:s=><span>{ {'1':'待审核','2':'未通过','3':'通过'}[s]}</span>},
        
        { title: '操作', key: 'action', width:'120px',
            render: (text, { status, schemeType }) => ( 
                <span>
                  {
                    status==1?<a onClick={()=>{} } >审核</a>:
                    <a onClick={ ()=>{}} >查看</a>
                  } 
                </span>
            ),
        },
    ];
  }
  componentDidMount=()=>{
    this.getList();
  }
  onReset = ()=>{
    this.setState({
      searchName:undefined,
      searchType:"undefined"
    }, () => {
      this.getList();
    })
  }
  changeSearch = (t,v)=>{
    this.setState({[t]:v})
  }

getList=(pageIndex = 1)=>{
    let {searchName,searchType} = this.state;
    let param = {
        pageIndex,
        pageRows:10,
        productName:searchName,
        mode:searchType=="undefined"? undefined : searchType
    }
    axios.Post('/manage-open/moduleApplyVerify/getModuleApplyListByPage',param).then(({data={}}) => {
      let { list=[] , pager={} } = data
      this.setState({list,pager})
    });

}

openModal=(data)=>{
    this.setState({visible:true,editData:data});
}



// 关闭
handleCancel = () => {
    this.setState({
        visible: false
    });
}






  render() {
    const { searchName, searchType, list, pager } = this.state;
    
    return (
      <div className="product">
        <TitleTab title="申请&采购模组申请">
          <div className="comm-title-search-box">
            <span className="labeknam">产品名称：</span>
            <Input value={searchName} placeholder="输入产品名称查询" maxLength={10} onPressEnter={()=>{this.getList()} } onChange={e=>{ this.changeSearch("searchName",e.target.value || undefined)}}/>
            <span className="labeknam">产品状态：</span>
            <Select className="select" placeholder="请选择状态" value={searchType} onChange={v=>{this.changeSearch("searchType",v)}} >
              <Option key={"undefined"} value={"undefined"}> 全部 </Option>
              {
                Object.keys(modeList).map((item, index) => (
                  <Option key={index} value={+item}> {modeList[item]} </Option>
                ))
              }
            </Select>
            <Button className='btn' type="primary" onClick={ ()=>{this.getList()} } >查询</Button>
            <Button className='btn' onClick={this.onReset}>重置</Button>
          </div>
        </TitleTab>
        <div className="comm-contont-card">
            <Table rowKey={"id"} columns={this.column} dataSource={list} pager={pager} onPageChange={this.getList} />
        </div>
      </div>
    )
  }
}


export default Form.create()(List)