import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Card,Form, Input, Select, Button, Tooltip, Popconfirm, message} from 'antd'
import {dataDictionaryListRequest} from '../../../apis/datadicmanager'
import {REQUEST_SUCCESS} from '../../../config/config'
import {DateTool} from '../../../util/utils'
import { dataDictionaryItemDeleteRequest} from '../../../apis/datadicmanager'
import TableCom from '../../../components/Table'

const FormItem = Form.Item
const {Option} = Select

@Form.create()
class DataDictManager extends Component {

   column = [
    {title:"参数ID",dataIndex:'paramId',key:'paramId',width: "80px"},
    {title:"名称",dataIndex:'name',key:'name',width:"15%",  render: (text) => <span title={text}>{text}</span>},
    {title:"参数值",dataIndex:'value',key:'value',width: "25%", render: (text) => <span title={text}>{text}</span>},
    {title:"描述",dataIndex:'desc',key:'desc',width: "25%",  render: (text) => <span title={text}>{text}</span>},
    {title:"状态",dataIndex:'status',key:'status',width:'100px',
      render: (item) => {
        return <span>{item?"有效":"无效"}</span>
      }
    },
    {title:"创建时间",dataIndex:'createTime',key:'createTime', width: "15%",
      render: (item)=> {
        let timeStr = DateTool.utc2beijing(item, "yyyy-MM-dd hh:mm:ss")
        return <span title={timeStr} className="td-break">{timeStr}</span>
      }
    },
    {title:"操作",dataIndex:'paramId',key:'operation', width: "120px",
      render: (paramId)=>{
        return (
          <div>
            <Tooltip title="编辑" placement="top">
              <Button onClick={this.pushToDetail.bind(this,paramId)} shape="circle" icon="edit" size="small"></Button>
            </Tooltip>
            
            &nbsp;&nbsp;
            <Popconfirm
              title="确认要删除吗"
              onConfirm={this.deleteDataDic.bind(this,paramId)}
              okText="确认"
              cancelText="取消"
              placement="topRight"
            >
              <Tooltip title="删除" placement="top">
                <Button icon="delete" shape="circle" size="small"></Button>
              </Tooltip>
            </Popconfirm>
          </div>
        )
      }
    }
  ]

  constructor(props){
    super(props);
    this.state = {
      pageIndex:1,
      pageRows:10,
      dataManagerList:[],
      totalRows:0,
      searchParams:{},
      loading: false,
      pager:{}
    }
  }

  pushToDetail(paramId){
    this.props.history.push(`/config/datadic/edit/${paramId}`)
  }

  deleteDataDic(paramId){
    dataDictionaryItemDeleteRequest(paramId).then(res => {
      let code = res.data.code
      if(code === REQUEST_SUCCESS){
        message.success('删除成功');
        this.requestListData()
      }
    }).catch(err => {
      message.error('删除失败');
    })
  }

  handleReset(){
    this.props.form.resetFields(["name"])
    this.setState({
      pageIndex:0,
      searchParams:{}
    })
    this.requestListData({pageIndex:0,name:""})
  }

  handleFilter(e){
    e.preventDefault();
    this.props.form.validateFields((err, values)=> {
      if (!err) {
        console.log('Received values of form: ', values);
        let name = values.name
        this.setState({
          searchParams: {name}
        })
        this.requestListData({name, pageIndex:0})
      }
    })
  }



  componentDidMount(){
    this.requestListData()
  } 

  requestListData(requesInfo){
    let parames = {
      pageIndex: this.state.pageIndex,
      pageRows:this.state.pageRows,
      order:'asc',
      ...this.state.searchParams
    }
    if(requesInfo){
      parames = Object.assign({},parames, requesInfo)
    }
    this.setState({
      loading:true
    })
    dataDictionaryListRequest(parames).then(res => {
      let code = res.data.code
      if(code === REQUEST_SUCCESS){
        let data = res.data.data
        this.setState({
          dataManagerList:data.list ,
          totalRows:data.pager.totalRows,
          pageIndex:data.pager.pageIndex,
          loading:false,
          pager:data.pager
        })
      }
    }).catch(err => {
      this.setState({
        loading:true
      })
    })
  }

  addDataDic(){
    this.props.history.push('/config/datadic/add')
  }
  handlePagination(current){
    console.log('Receve values of page:', current);
    this.setState({
      pageIndex:current
    })
    this.requestListData({
      pageRows:this.state.pageRows,
      pageIndex:current
    })
  }

  render() {

    let {getFieldDecorator} = this.props.form
    let dataSource = this.state.dataManagerList 
    return (
      <div style={{minWidth:'1400'}}> 
        
        <Card>
          <h2 style={{fontSize:'20px', fontWeight:'bold',marginBottom:'10px'}}>
            数据字典管理
          </h2>
          <Form layout="inline" onSubmit={this.handleFilter.bind(this)}>
            <FormItem label="名称">
              {getFieldDecorator('name')(
                <Input style={{width:'240px'}} placeholder="请输入名称"></Input>
              )}
            </FormItem>
            <FormItem  >
                <Button type="primary" htmlType="submit" >查询</Button>
            </FormItem>
            <FormItem >
                <Button onClick={this.handleReset.bind(this)}>重置</Button>
            </FormItem>
            <FormItem >
              <Button type="primary" onClick={this.addDataDic.bind(this)} >新增</Button>
            </FormItem>
          </Form>
        </Card>
        
        <Card style={{marginTop:"10px"}}>
          <TableCom rowKey={record => record.paramId} columns={this.column} dataSource={dataSource} 
            bordered 
            // pagination={{
            //   total:this.state.totalRows,
            //   current:this.state.pageIndex,
            //   pageSize:this.state.pageRows,
            // }}
            // pagination={true}
            pager={this.state.pager}
            loading={this.state.loading}
            onPageChange={this.handlePagination.bind(this)}
          ></TableCom>
        </Card>
      </div>
    )
  }
}

export default DataDictManager