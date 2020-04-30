import React,  {Component} from 'react'
import {connect} from 'react-redux'
import { Card ,  Table, Button, Column, Tooltip} from 'antd';
import ProtocolFilterPannel from './ProtocolFilterPannel'
import {REQUEST_SUCCESS} from '../../../config/config'
import {protocolTemplateListRequest} from '../../../apis/protocolTemplate' 
import {DateTool} from '../../../util/utils'
import {JSTool} from '../../../util/utils'
import {withRouter} from 'react-router-dom'
import TableCom from '../../../components/Table'
const mapStateToProps = (state) => {
  let deviceType = state.getIn(['globalDeviceInfo','deviceType'])
  return {
    deviceType
  }
}

@withRouter
class ProtocolTemplateList extends Component {

   tableColumn = [
    {title:'模板ID', dataIndex:'protocolTemplateId',key:'protocolTemplateId',width:'75px'},
    {title:'模板名称',dataIndex:'templateName',key:'templateName', width: "20%",render: (text) => <span title={text}>{text}</span>},
    {title:'语言版本',dataIndex:'language',key:'language',width:'9%',
      render: (item)=> {
          return <span>{item===0?'中文':'英文'}</span>
      }
    },
    // {title:'设备大类',dataIndex:'deviceTypeName',key:'deviceTypeName'},
    // {title:'设备小类',dataIndex:'deviceSubtypeName',key:'deviceSubtypeName'},
    {title:'所属分类',dataIndex:'allCategoryName',key:'allCategoryName',width:'28%',render: (text) => <span title={text}>{text}</span>},
    {title:'状态',dataIndex:'templateStatus',key:'templateStatus',width:'10%',
      render:(item)=> {
        return <span>{item===1?"正式":"草稿"}</span>
      }
    },
    {title:'创建时间',dataIndex:'createTime',key:'createTime', width: "15%",
        render: (item)=> {
          let timeStr = DateTool.utc2beijing(item, "yyyy-MM-dd hh:mm:ss")
          return <span title={timeStr} className="td-break">{timeStr}</span>
        }
    },
    {title:'修改时间',dataIndex:'updateTime',key:'updateTime', width: "15%",
        render: (item)=> {
          let timeStr = DateTool.utc2beijing(item, "yyyy-MM-dd hh:mm:ss")
          return <span className="td-break" title={timeStr}>{timeStr}</span>
        }
    },
    {
      title:'操作',dataIndex:'templateNumber',key:'operation',width:'100px', fixed: 'right',
      render: (item)=> {
        // console.log("operation +" + JSON.stringify(item))
        return (
          <Tooltip placement="top" title="编辑">
            <Button onClick={this.editProtocolTemp.bind(this, item)} icon="edit" shape="circle" size="small"></Button>
          </Tooltip>
        )
      }
    }
  ]

  constructor(props){
    super(props);
    this.state = {
      tableDataSources:[],
      pageRows:10, //每页展示的数量
      currentPage:0, // 当前也
      totalRows:0,  // 总共页数
      isLoading:false,
      searchParams:{},
      pager:{}
    }

    // console.log("ProtocolTemplateList" + JSON.stringify(props));
  }

  componentDidMount(){
    this.getProtocolTemplateList({
      pageRows:this.state.pageRows,
      pageIndex:this.state.currentPage
    })
  }

  getProtocolTemplateList(params){
    this.setState({isLoading:true})
    params = Object.assign({}, this.state.searchParams, params)
    params = JSTool.filterParam(params)
    protocolTemplateListRequest(params).then(res => {
      this.setState({isLoading:false})
      let code = res.data.code 
      if(code === REQUEST_SUCCESS){
        let data = res.data.data.list 
        let pager = res.data.data.pager
        this.setState({
          tableDataSources:data,
          totalRows:pager.totalRows,
          currentPage: pager.pageIndex,
          pager:pager
        })
      }
    }).catch(()=>{
      this.setState({isLoading:false})
    })
  }
  //查询
  handleFilter(filterParams) {
      console.log('Receve values of form:', filterParams);
      this.setState({
        searchParams: filterParams
      })
      let params = {
        pageRows: this.state.pageRows,
        sort: "modifyTime",
        order: "desc",
        deviceTypeId: filterParams.deviceTypeId,
        // deviceSubtypeId: filterParams.deviceSubType,
        templateName: filterParams.templateName,
        pageIndex: 0,  // 点击搜索，pageindex 设置为
      };

      this.getProtocolTemplateList(params);
  }

  handlePagination(current){
    console.log('Receve values of page:', current);
    this.setState({
      currentPage:current
    })
    this.getProtocolTemplateList({
      pageRows:this.state.pageRows,
      pageIndex:current
    })
  }

  addTemplate(){
    this.props.history.push('/config/protocoltemplate/add');
  }

  editProtocolTemp(templateNumber){
    this.props.history.push({pathname:`/config/protocoltemplate/edit/${templateNumber}`})
  }

  render(){
    let columns = this.tableColumn
    let tabledata = this.state.tableDataSources
    let totalRows = this.state.totalRows
    return (
      <div>
        <Card>
          <h2 style={{fontSize:'20px',fontWeight:"bold"}}>协议模板</h2>
          <ProtocolFilterPannel filterPannelOperation={this.handleFilter.bind(this)}></ProtocolFilterPannel>
          <div style={{marginTop:'20px'}}>
            <Button type="primary" onClick={this.addTemplate.bind(this)}>新增协议模板</Button>
          </div>
        </Card>
       <Card style={{marginTop:'10px'}}>
        <TableCom 
          bordered
          columns={columns} 
          dataSource={tabledata} 
          rowKey="protocolTemplateId" 
          loading={this.state.isLoading}
          onPageChange={this.handlePagination.bind(this)}
          pager={this.state.pager}
          scroll={{x: 1200, y: 'auto'}}
          >
          
        </TableCom>
       </Card>
      </div>
    )
  }
}


let ConnectProtocolTemplate =  connect(mapStateToProps)(ProtocolTemplateList)
export default ConnectProtocolTemplate