import React from 'react'
import ProtocolDicBase from './ProtocolDicBase'
import {Form, Popconfirm, Button,Input,Modal,Select,TreeSelect,notification, Tooltip,Popover} from 'antd'
import {protocolDicCommonListGetRequest, protocolDicCommonItemGetRequest, protocolDicCommonItemSaveRequest,protocolDicCommonItemDeleteRequest} from '../../../../apis/protocolDic'
import {REQUEST_SUCCESS} from '../../../../config/config'
import {connect} from 'react-redux'
import {DeviceCategoryUtils} from '../../../../util/utils'
import  * as protocolDic from '../../../../store/globalProtocolDicStore/actionCreators'

const { SHOW_PARENT } = TreeSelect;
const FormItem = Form.Item
const Option = Select.Option

const mapStateToProps =(state) => {
  let subjectMenuList = state.getIn(['globalProtocolDicInfo', 'subjectMenu'])
  let subjectExtendsMenuLsit = state.getIn(['globalProtocolDicInfo', 'subjectExtendsMenu'])
  let functionMenuList = state.getIn(['globalProtocolDicInfo', 'functionMenu'])
  let functionExtendsMenuList = state.getIn(['globalProtocolDicInfo', 'functionExtendsMenu'])
  let deviceCategoryList = state.getIn(['globalDeviceInfo','deviceCategoryList'])
  let deviceCategoryTreeSelect = state.getIn(['globalDeviceInfo','deviceCategoryTreeSelect'])

  return {
    subjectMenuList,
    subjectExtendsMenuLsit,
    functionMenuList,
    functionExtendsMenuList,
    deviceCategoryList,
    deviceCategoryTreeSelect,
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getSubjectMenu: () => {
      dispatch(protocolDic.SubjectListAsyncAction())
    },
    getSubjectExtendsMenu: ()=> {
      dispatch(protocolDic.SubjectExtendsListAsyncAction())
    },
    getFunctionMenu: ()=>{
      dispatch(protocolDic.FunctionListAsyncAction())
    },
    getFunctionExtendsMenu: ()=> {
      dispatch(protocolDic.FunctionExtendsListAsyncAction())
    }
  }
}
@connect(mapStateToProps,mapDispatchToProps)
@Form.create()
class ProtocolDicCommon extends React.Component 
{
  constructor(props){
    super(props)
    this.state ={
      visibleModal: false,
      isEdit:false,  // ???????????????
      commonData:{} // ????????????
    }
  }

  columns = [
    {title:"ID",dataIndex:"commonId",width:"100px",},
    {title:"????????????",dataIndex:"protocolName",},
    // {title:"??????????????????",dataIndex:"deviceTypeList",},
    {title:'????????????',dataIndex:'allCategoryNameList',key:'allCategoryNameList',
      render:(item) => <span title={item}>{item}</span>
    },
    {title:"????????????",dataIndex:"dataTypeNameList", render:(item) => <span title={item}>{item}</span>},
    {title:"??????",dataIndex:"commonId",key:"0",width:"100px",
      render:(item) => {
        return (
          <div>
            <Tooltip title="??????" placement="top">
              <Button onClick={this.handleEdit.bind(this,item)} shape="circle" icon="edit" size="small"></Button>
            </Tooltip>
            
            &nbsp;&nbsp;
            <Popconfirm
              title="??????????????????"
              onConfirm={this.handleDelete.bind(this,item)}
              okText="??????"
              cancelText="??????"
              placement="topRight"
            >
              <Tooltip title="??????" placement="top">
                <Button icon="delete" shape="circle" size="small"></Button>
              </Tooltip>
            </Popconfirm>
          </div>
        )
      }
    }
  ]

  // ????????????
  handleEdit(itemId){
    protocolDicCommonItemGetRequest({commonId:itemId}).then(res => {
      let code = res.data.code 
      if(code === REQUEST_SUCCESS){
        let data = res.data.data 
        this.setState({
          commonData:data,
          visibleModal: true,
          isEdit:true
        })
      }
    })
  }

  handleDelete(item){
      console.log("handleDelete: " + item);
      protocolDicCommonItemDeleteRequest({"commonId":item}).then(res => {
        let code = res.data.code 
        if(code === REQUEST_SUCCESS){
          notification.success({
            message: '??????',
            description: '????????????' 
          })
          this.setState({
            visibleModal:false,
            commonData:{} //??????????????????
          })
          //??????table
          if(this.ProtocolDicBaseItemRefreshTable){
            this.ProtocolDicBaseItemRefreshTable()
          }
        }
      })
  }

  getTableRequest(params){
    return protocolDicCommonListGetRequest(params)
  }

  // ??????
  handleNewProtocolDic(){
    this.setState({
      visibleModal:true,
      isEdit:false
    })
  }
 
  // modal ??????
  handleOk(){
    this.setState({
      visibleModal:false,
      commonData: {}
    })
  }

  // ????????????????????????
  handleCancel(){
    this.setState({
      visibleModal:false,
      commonData: {}
    })
  }

  componentDidMount(){

    this.props.getSubjectMenu()
    this.props.getSubjectExtendsMenu()
    this.props.getFunctionMenu()
    this.props.getFunctionExtendsMenu()
  }
  // ????????????
  handleSubmitSave(value){
    this.props.form.validateFields((err, values) => {

      if(err){
        return;
      }
      console.log("validateFields: " + values);
      let selectDeviceType = values["selectDeviceType"]
      let requestParams = {}
      let deviceTypeList = []
      let userSelectDeviceType = DeviceCategoryUtils.getDeviceTypeFromSelectList(selectDeviceType, this.props.deviceCategoryList)
      userSelectDeviceType.map((item,index) => {
        let items = {"deviceTypeId":item}
        deviceTypeList.push(items)
      })
      requestParams["deviceTypeList"] = deviceTypeList
      requestParams["protocolName"] = values["protocolName"]
      requestParams["subjectId"] = values["subjectId"]
      requestParams["functionId"] = values["functionId"]

      if(values["subjectExtendId"]){
        requestParams["subjectExtendId"] = values["subjectExtendId"]
      }
      
      if(values["functionExtendId"]){
        requestParams["functionExtendId"] = values["functionExtendId"]
      }
      
      if(this.state.isEdit){
        requestParams["commonId"] = this.state.commonData["commonId"]
      }
      protocolDicCommonItemSaveRequest(requestParams).then(res => {
        let code = res.data.code 
        if(code === REQUEST_SUCCESS){
          console.log("????????? ??????");
          notification.success({
            message: '??????',
            description: '????????????' 
          })
          if(this.ProtocolDicBaseItemRefreshTable){
            this.ProtocolDicBaseItemRefreshTable()
          }
        }
      })
      
      this.setState({
        visibleModal:false,
        commonData:{} //??????????????????
      })
      
    })
  }


  ProtocolDicCallback(callback){
    this.ProtocolDicBaseItemRefreshTable = callback
  }

  render(){
    let {getFieldDecorator} = this.props.form
    let subjectMenuList = this.props.subjectMenuList || []
    let subjectExtendsMenuLsit = this.props.subjectExtendsMenuLsit || []
    let functionMenuList = this.props.functionMenuList || []
    let functionExtendsMenuList = this.props.functionExtendsMenuList || []

    const tProps = {
      treeData: this.props.deviceCategoryTreeSelect || [],
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: '???????????????????????????',
      style: {width: 300,},
      showArrow:true
    };

    const formItemLayout = {
      labelCol: {xs: { span: 24 },sm: { span: 6 },},
      wrapperCol: {xs: { span: 24 },sm: { span: 16 },},
    }

    const tailItemLayout = {
      labelCol:{span: 24},
      wrapperCol:{span:24}
    }

    let isEdit = this.state.isEdit
    let initProtocolName  = isEdit ? (this.state.commonData["protocolName"]): undefined
    let initSubjectId = isEdit ? (this.state.commonData["subjectId"]) : undefined
    let initSubjectExtendId = isEdit ? (this.state.commonData["subjectExtendId"]) : undefined
    let initFunctionId = isEdit ? (this.state.commonData["functionId"]) : undefined
    let initFunctionExtendId = isEdit ? (this.state.commonData["functionExtendId"]) : undefined
    let initSelectDeviceType = undefined
    if(isEdit){
      let deviceList = this.state.commonData['deviceTypeList']
      let initDeviceTypeArray = []
      if(deviceList instanceof Array){
        deviceList.map((item) => {
          let deviceTypeId = item.deviceTypeId
          initDeviceTypeArray.push(deviceTypeId)
        })
        if(initDeviceTypeArray.length > 0){
          initSelectDeviceType = initDeviceTypeArray
        }
      }
    }
    
    return (
      <div>
        <ProtocolDicBase
          refFunction={ this.ProtocolDicCallback.bind(this) }
          // table ????????????
          getTableRequest={this.getTableRequest.bind(this)}
          rowKey={"commonId"}
          columns={this.columns}
          deviceCategoryList={this.props.deviceCategoryList}
          deviceCascaderList={this.props.deviceCascaderList}
          //filterPannel
          filterPannel={[
            {type:"Input",title:"????????????",paramskey:"protocolName",placeholder:"?????????????????????"},
            {type:"DeviceType",title:"????????????",paramskey:"deviceTypeId",placeholder:"?????????????????????"},
          ]}
        
          upload={"/v1/web/manage-open/protocol/dictionary/common/importExcel"}
          download={"/v1/web/manage-open/protocol/dictionary/common/download"}
          handleNewProtocolDic={this.handleNewProtocolDic.bind(this)}
        ></ProtocolDicBase>
       <Modal
          title={this.state.isEdit?"????????????":'????????????'}
          visible={this.state.visibleModal}
          onOk={this.handleSubmitSave.bind(this)}
          onCancel={this.handleCancel.bind(this)}
          destroyOnClose={true}
        >
          <Form {...formItemLayout} >
            <FormItem label="????????????">
              {getFieldDecorator("protocolName",{rules:[{required:true,message:"?????????????????????"}], initialValue: initProtocolName})(
                <Input placeholder="20??????????????????" maxLength={20} ></Input>
              )}
            </FormItem>
            <FormItem label="??????????????????">
              {getFieldDecorator("selectDeviceType",{rules:[{required:true,message:"?????????????????????"}], initialValue: initSelectDeviceType})(
                <TreeSelect {...tProps} ></TreeSelect>
              )}
            </FormItem>
            <FormItem label="??????">
              {getFieldDecorator("subjectId",{rules:[{required:true,message:"???????????????"}], initialValue: initSubjectId})(
                <Select showSearch 
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                >
                  {subjectMenuList.map((item, index) => {
                      return <Option key={index} value={item.menuId} >{item.menuName}</Option>
                    })}
                </Select>
              )}
            </FormItem>
            <FormItem label="???????????????">
              {getFieldDecorator("subjectExtendId",{rules:[{required:false,message:"?????????????????????"}], initialValue: initSubjectExtendId})(
                  <Select allowClear={true} 
                  showSearch
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  >
                  {subjectExtendsMenuLsit.map((item, index) => {
                      return <Option key={index} value={item.menuId} >{item.menuName}</Option>
                    })}
                </Select>
              )}
            </FormItem>
            <FormItem label="??????">
              {getFieldDecorator("functionId",{rules:[{required:true,message:"?????????????????????"}], initialValue: initFunctionId})(
                 <Select 
                 showSearch
                 filterOption={(input, option) =>
                   option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                 }
                 >
                 {functionMenuList.map((item, index) => {
                     return <Option key={index} value={item.menuId} >{item.menuName}</Option>
                   })}
               </Select>
              )}
            </FormItem>
            <FormItem label="???????????????">
              {getFieldDecorator("functionExtendId",{rules:[{required:false,message:"?????????????????????"}], initialValue: initFunctionExtendId})(
                <Select allowClear={true}
                showSearch
                filterOption={(input, option) =>{
                  return  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                 
                }
                >
                  {functionExtendsMenuList.map((item, index) => {
                      return <Option key={index} value={item.menuId} >{item.menuName}</Option>
                    })}
                </Select>
              )}
            </FormItem>
            {/* <FormItem {...tailItemLayout}>
              <div style={{display:'flex', flexDirection:'row', width:'100%', justifyContent:'flex-end'}} >
                <Button  style={{width:'100px', marginRight:'10px'}} onClick={this.handleCancel.bind(this)}>??????</Button>
                <Button type="primary" htmlType='submit' style={{width:'100px', marginRight:'20px'}}>??????</Button>
              </div>
            </FormItem> */}
          </Form>
        </Modal>
      </div>
    )
  }
}

export default  ProtocolDicCommon