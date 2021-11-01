import React, { Component } from 'react'
import { Form, Input, Button, Select } from 'antd'
import { DateTool } from "../../../util/utils";
import TitleTab from '../../../components/TitleTab';
import Table from '../../../components/Table';
import axios from '../../../util/api.request';
import './style.scss'
import Detail from './detail';
import FirmwareInfo from './firmwareInfo';
import { TIMECHANGE } from '../../dataAnalysis/historicalTrend/store/actionNames';
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
      searchType: "undefined",
      pageIndex:1,
      list:[],
      pager:{},
      id:undefined,// 审核或者查看 的id，同时用来控制弹窗是否可见
      productId:undefined,// 点击查看的固件的产品id，同时用来控制弹窗是否可见
      status:1,//当前弹窗是审核（待审核状态1）还是查看（通过3、未通过2）
    };
    this.column = [
        { title: '提交账号', dataIndex: 'userId',ellipsis:true },
        { title: '提交时间', dataIndex: 'createTime', width:'160px',
            render: text => <span>{text && DateTool.utcToDev(text) || '--'}</span>
        },
        { title: '归属产品', dataIndex: 'productName', ellipsis:true },
        { title: '类型', dataIndex: 'type',width:'60px',render:t=><span>{ {'1':'免费','2':'采购'}[t]}</span> },
        { title: '方案', dataIndex: 'schemeType',width:'90px',render:s=><span>{ {'1':'免开发','2':'MCU方案','3':'Soc方案'}[s]}</span> },
        { title: '模组名称', dataIndex: 'moduleName'},
        { title: '数量', dataIndex: 'num',width:'50px'},
        { title: '固件名称', dataIndex: 'firmwareName', // 仅免开发方案可查看固件
          render: (t, {schemeType,productId })=>{
            t = t||"--";
            return schemeType==1?<a onClick={()=>{this.setState({productId})}}>{t}</a>:<span>{t}</span>
          }
        },
        { title: '状态', dataIndex: 'status', width:'76px', render:s=><span>{ {'1':'待审核','2':'未通过','3':'通过'}[s]}</span>},
        { title: '操作', key: 'id', width:'60px',
            render: (text, { status,id}) =>  <a onClick={()=> this.setState({id,status})} >{status==1&&'审核'||'查看'}</a>
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

getList=(index)=>{
  if(index){
    this.setState({pageIndex:index})
  }
  let {searchName,searchType,pageIndex} = this.state;
  let param = {
      pageIndex:index||pageIndex,
      pageRows:10,
      productName:searchName,
      mode:searchType=="undefined"? undefined : searchType
  }
  axios.Post('manage-open/moduleApplyVerify/getModuleApplyListByPage',param,{},{loading:true, headers: {"Content-Type":"application/json"}}).then( ({data={}}) => {
    let res = data.data || {};
    let { list=[] , pager={} } = res
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
    const { searchName, searchType, list, pager,id, status, productId } = this.state;
    
    return (
      <div className="apply-modul-auditing">
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

        <Detail id={id} status={status} closeDetail={()=>{this.setState({id:undefined})}} getList={this.getList} />
        <FirmwareInfo productId={productId}  closeFirmware={()=>{this.setState({productId:undefined})}} />
      </div>
    )
  }
}


export default Form.create()(List)