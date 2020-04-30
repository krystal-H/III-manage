import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink} from 'react-router-dom';
import TableCom from '../../../components/Table';
import { DateTool } from "../../../util/utils";
import AppManagementLinkProduct from "./AppManagementLinkProduct";
import { actionCreators } from './store';

import { Card, Form, Input, Button, Select, Tooltip} from 'antd'
import './style.less'

const FormItem = Form.Item
const {Option } = Select;
const modeList = {
  0: '开发中',
  1: '已发布',
  2: '审核中'
}

@Form.create()
class AppManagement extends Component {

  constructor (props){
    super(props);

    this.state = {
      appId: '',
      status: undefined,
      query: {},
      loading: false,
  
      typeList:[
        '应用ID',
        '应用名称',
        '用户名'
      ],
      appTypeList:[
        "移动应用",
        "小程序应用",
      ],
      visible: false, //关联产品弹窗
      appType: '', //1是移动应用 2是小程序
      isAdmin: false, // 是否管理员
    }

    this._setParentState = this._setParentState.bind(this);
    this.queryList = this.queryList.bind(this);
  }

  componentDidMount() {
    this.queryList(); // 获取产品列表
    this.props.getAllProductList(); //获得所有产品类目菜单
    // 判断是否管理员
    this.props.judgeAdmin().then(res => {
      if(!res){
        this.setState({
          isAdmin: true
        })
      }
    })
  }
  _setParentState(state,fn){
    this.setState(state,fn);
  }
  queryList(pageIndex){  // 查询
    this.setState({ loading: true });
    pageIndex = pageIndex?pageIndex:1;

    let {userType, deviceId, appType} = this.state.query;
    let data={};
    if(appType=="小程序应用"){
      appType=2;
    }
    if(appType=="移动应用"){
      appType=0;
    }
    data.appType = appType;

    switch(userType){
      case '应用ID'||undefined:
        data.appId = deviceId;
      break;
      case '应用名称':
        // placeholder = "请输入应用名称"
        data.appName = deviceId;

      break;      
      case '用户名':
        // placeholder = "请输入用户名"
        data.developerName = deviceId;
        
      break;
    }

    this.props.getProductList({ pageIndex, ...data, version:1.1}).then((res) => {
      this.setState({ loading: false })
    });
  }

  handleFilter(e){  //查询按钮
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ query: values }, () => {
          this.queryList();
        })
      }
    })
  }

  handleReset(){ //重置
    this.props.form.resetFields(["userType", "deviceId", "appType"]);
    this.setState({ query: {} },()=>{
      this.queryList();
    })
  }

  AppManagementView(appName, appId, appType){ //跳转至查看页面 type //1是移动应用 2是小程序
    // `/config/protocoltemplate/edit/${templateNumber}`
    this.props.history.push({ pathname: `/businessdata/appManagement/view/${appName}/${appId}/${appType}`});
  }
  handleChangeLinkPro(appId,appType){ //关联产品弹窗
    this.setState({
      visible:true,
      appId: appId,
      appType: appType, //1是移动应用 2是小程序
    });
  }
  changeUserType(){
    this.props.form.resetFields([ "deviceId"]);
  }
  render() {
    let { getFieldDecorator, getFieldValue} = this.props.form;
    let { productList, pager, allProList} = this.props;
    let { loading, visible, appType, appId, isAdmin} = this.state;

    let column = [
      { title: "应用ID", dataIndex: 'appId', key: 'appId', width: "13%" },
      { title: "应用名称", dataIndex: 'appName', key: 'appName', width: "20%" },
      { title: "应用类型", dataIndex: 'appType', key: 'appType', width: "15%", render: (item)=>(item===0?"移动应用":"小程序应用")},
      { title: "创建用户", dataIndex: 'developerName', key: 'developerName', width: "25%"},
      {
        title: "更新时间", dataIndex: 'updateTime', key: 'updateTime', width: "21%", render: (item) => {
          let timeStr = DateTool.utcToDev(item, "yyyy-MM-dd hh:mm:ss")
          return <span>{timeStr=="Invalid date"?'--':timeStr}</span>
        }
      },
      {
        title: "操作", dataIndex: 'operation', key: 'operation', width: "16%",
        render: (item,data) => {
          return (
            <div>
               <Tooltip placement="top" title="查看">
                  <Button shape="circle" size="small" icon="info" key={0} onClick={this.AppManagementView.bind(this,data.appName, data.appId,data.appType)} />
               </Tooltip>
               {
                 isAdmin ? <span>
                    &nbsp; | &nbsp;
                    <Tooltip placement="top" title="关联产品">
                        <Button shape="circle" size="small" icon="link" key={0} onClick={this.handleChangeLinkPro.bind(this,data.appId,data.appType)} />
                    </Tooltip>
                 </span> : null
               }
            </div>
          )
        }
      }
    ]
    let typeList =  this.state.typeList.map((ele,i,self)=>{ //用户Id 用户名称列表
      return <Option value={ele} key={i}>{ele}</Option>;
    });
    let appTypeList = this.state.appTypeList.map((ele,i,self)=>{ //应用类型列表
      return <Option value={ele} key={i}>{ele}</Option>
    });
    let placeholder = "请输入应用ID";

    switch(getFieldValue("userType")){
      case '应用ID'||undefined:
        placeholder = "请输入应用ID"
      break;
      case '应用名称':
        placeholder = "请输入应用名称"
      break;      
      case '用户名':
        placeholder = "请输入用户名"
      break;
    }

    return (
      <div className="app-manage">
        <Card>
          <h2 className="title">应用管理</h2>
          <Form layout="inline">
          <FormItem> 
              {getFieldDecorator('userType', {})( 
                <Select style={{ width: 160 }} placeholder="请选择" onChange={this.changeUserType.bind(this)}> 
                  {typeList}
                </Select>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('deviceId', {})(
                 <Input placeholder={placeholder} maxLength={20} style={{ width: 240 }}></Input>
              )}
            </FormItem>

            <FormItem label="应用类型">
              {getFieldDecorator('appType')(
                <Select style={{ width: 160 }} placeholder="全部">
                  {appTypeList}
                </Select>
              )}
            </FormItem>
            <FormItem  >
              <Button type="primary" onClick={this.handleFilter.bind(this)} >查询</Button>
            </FormItem>
            <FormItem >
              <Button onClick={this.handleReset.bind(this)}>重置</Button>
            </FormItem>
          </Form>
        </Card>

        <Card style={{ marginTop: "10px" }}>
          <TableCom rowKey={"appId"} columns={column} dataSource={productList} pager={pager} onPageChange={this.queryList} loading={loading} />
        </Card>
        
        {visible?<AppManagementLinkProduct visible={visible} queryList={this.queryList.bind(this)} appId={appId} appType={appType} _setParentState={this._setParentState} parentTagType={this.props.allProList}/>:null}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  productList: state.getIn(['appManagement', 'productList']).toJS(),
  pager: state.getIn(['appManagement', 'pager']).toJS(),
  allProList: state.getIn(['appManagement','allProList']).toJS(),
})

const mapDispatchToProps = (dispatch) => ({
  getProductList: (pager) => {
    return dispatch(actionCreators.getProductList(pager))
  },
  getAllProductList: () => {
    return dispatch(actionCreators.getAllProductList())
  },
  judgeAdmin: () => {
    return dispatch(actionCreators.JudgeAdmin())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AppManagement)