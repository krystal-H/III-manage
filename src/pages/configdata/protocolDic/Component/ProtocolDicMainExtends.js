import React from 'react'
import ProtocolDicBase from './ProtocolDicBase'
import {Form, Input, Button,TreeSelect,notification,Popconfirm, Modal,Tooltip} from 'antd'
import {protocolDicSubjectExtendsListGetRequest,
  protocolDicMainExtendsItemGetRequest,
  protocolDicMainExtendsItemSaveRequest,
  protocolDicMainExtendsItemDeleteRequest} from '../../../../apis/protocolDic'
import {REQUEST_SUCCESS} from '../../../../config/config'
import {connect} from 'react-redux'
import {DeviceCategoryUtils} from '../../../../util/utils'

const FormItem = Form.Item
const { SHOW_PARENT } = TreeSelect;

const mapStateToProps =(state) => {
  let deviceCategoryList = state.getIn(['globalDeviceInfo','deviceCategoryList'])
  let deviceCategoryTreeSelect = state.getIn(['globalDeviceInfo','deviceCategoryTreeSelect'])
  return {
    deviceCategoryList,
    deviceCategoryTreeSelect
  }
}

@connect(mapStateToProps)
@Form.create()
class ProtocolDicMainExtends extends React.Component 
{
  constructor(props){
    super(props)
    this.state ={
      visibleModal:false
    }
  }

  columns = [
    {title:"ID",dataIndex:"subjectExtendId",key:"subjectExtendId",width:"80px"},
    {title:"主体扩展名（中文）",dataIndex:"subjectExtendNameCN",key:"subjectExtendNameCN"},
    {title:"主体扩展名（英文）",dataIndex:"subjectExtendNameEN",key:"subjectExtendNameEN"},
    {title:"主体扩展名标识",dataIndex:"subjectExtendMark",key:"subjectExtendMark"},
    {title:"匹配所属分类",dataIndex:"allCategoryNameList",key:"allCategoryNameList",width:'30%', render: (text) => <span title={text}>{text}</span>},
    {title:"操作",dataIndex:"subjectExtendId",key:'1',width:"100px",
      render:(item) => {
        return (
          <div>
            <Tooltip title="编辑" placement="top">
              <Button onClick={this.handleEdit.bind(this,item)} shape="circle" icon="edit" size="small"></Button>
            </Tooltip>
            &nbsp;&nbsp;
            <Popconfirm
              title="确认要删除吗"
              onConfirm={this.handleDelete.bind(this,item)}
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

// 编辑数据
handleEdit(itemId){
  protocolDicMainExtendsItemGetRequest({"subjectExtendId":itemId}).then(res => {
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
    protocolDicMainExtendsItemDeleteRequest({"subjectExtendId":item}).then(res => {
      let code = res.data.code 
      if(code === REQUEST_SUCCESS){
        console.log("删除： " + item + " 成功");
        notification.success({
          message: '提示',
          description: '删除成功' 
        })
        this.setState({
          visibleModal:false,
          commonData:{} //清空编辑数据
        })
        if(this.ProtocolDicBaseItemRefreshTable){
          this.ProtocolDicBaseItemRefreshTable()
        }
      }
    })
}


getTableRequest(params){
  return protocolDicSubjectExtendsListGetRequest(params)
}

handleNewProtocolDic(){
  this.setState({
    visibleModal:true,
    isEdit: false
  })
}
 
  // 保存修改
  handleSubmitSave(value){
    this.props.form.validateFields((err, values) => {

      if(err){
        return;
      }
      let selectDeviceType = values["selectDeviceType"]
      let requestParams = {}
      let deviceTypeList = []
      let userSelectDeviceType = DeviceCategoryUtils.getDeviceTypeFromSelectList(selectDeviceType, this.props.deviceCategoryList)
      userSelectDeviceType.map((item,index) => {
        let items = {
          "deviceTypeId":item
        }
        deviceTypeList.push(items)
      })
      requestParams["deviceTypeList"] = deviceTypeList
      requestParams["subjectExtendNameCN"] = values["subjectExtendNameCN"]
      requestParams["subjectExtendNameEN"] = values["subjectExtendNameEN"]
      requestParams["subjectExtendMark"] = values["subjectExtendMark"]
  
      if(this.state.isEdit){
        requestParams["subjectExtendId"] = this.state.commonData["subjectExtendId"]
      }
      protocolDicMainExtendsItemSaveRequest(requestParams).then(res => {
        let code = res.data.code 
        if(code === REQUEST_SUCCESS){
          notification.success({
            message: '提示',
            description: '保存成功' 
          })
          if(this.ProtocolDicBaseItemRefreshTable){
            this.ProtocolDicBaseItemRefreshTable()
          }
        }
      })
      
      this.setState({
        visibleModal:false,
        commonData:{} //清空编辑数据
      })
      
    })
  }

  ProtocolDicCallback(callback){
    this.ProtocolDicBaseItemRefreshTable = callback
  }

  // modal 视图
  handleOk(){
    this.setState({
      visibleModal:false,
      commonData: {}
    })
  }

  handleCancel(){
    this.setState({
      visibleModal:false,
      commonData: {}
    })
  }

  render(){
    const formItemLayout = {
      labelCol: {xs: { span: 24 },sm: { span: 6 },},
      wrapperCol: {xs: { span: 24 },sm: { span: 16 },},
    }

   const tailItemLayout = {
      labelCol:{span: 24},
      wrapperCol:{span:24}
    }

    const tProps = {
      treeData: this.props.deviceCategoryTreeSelect || [],
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: '请选择管理设备类型',
      style: {width: 300,},
    };

    let isEdit = this.state.isEdit
    let initsubjectExtendNameCN   =  isEdit ? (this.state.commonData["subjectExtendNameCN"]): undefined
    let initsubjectExtendNameEN   =  isEdit ? (this.state.commonData["subjectExtendNameEN"]) : undefined
    let initsubjectExtendMark     =  isEdit ? (this.state.commonData["subjectExtendMark"]) : undefined
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

    let {getFieldDecorator} = this.props.form
    return (
      <div>
        <ProtocolDicBase
           refFunction={ this.ProtocolDicCallback.bind(this) }
          // table 相关数据
          getTableRequest={this.getTableRequest.bind(this)}
          rowKey={"subjectExtendId"}
          columns={this.columns}
          deviceCategoryList={this.props.deviceCategoryList}
          filterPannel={[
            {
              type:"Input",
              title:"主体扩展名（中文）",
              paramskey:"subjectExtendNameCN",
              placeholder:"请输入主体扩展名（中文）"
            },
            {
              type:"DeviceType",
              title:"所属分类",
              paramskey:"deviceTypeId",
              placeholder:"请输入所属分类"
            },
          ]}

          upload={"/v1/web/manage-open/protocol/dictionary/subjectExtend/importExcel"}
          download={"/v1/web/manage-open/protocol/dictionary/subjectExtend/download"}
          handleNewProtocolDic={this.handleNewProtocolDic.bind(this)}
        ></ProtocolDicBase>
        <Modal
          title={this.state.isEdit ? "编辑主体扩展": "新建主体扩展"}
          visible={this.state.visibleModal}
          footer={null}
          onCancel={this.handleCancel.bind(this)}
          destroyOnClose={true}
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmitSave.bind(this)}>
            <FormItem label="主体扩展名-中文">
              {getFieldDecorator("subjectExtendNameCN",{rules:[{required:true,message:"请输入主体扩展名中文"}],initialValue: initsubjectExtendNameCN})(
                <Input placeholder="20个以内的字符" maxLength={20}></Input>
              )}
            </FormItem>
            <FormItem label="主体扩展名-英文">
              {getFieldDecorator("subjectExtendNameEN",{rules:[{required:true,message:"请输入主体扩展名英文"}],initialValue: initsubjectExtendNameEN})(
                <Input placeholder="40个以内的字符" maxLength={40}></Input>
              )}
            </FormItem>
            <FormItem label="主体扩展名识符">
              {getFieldDecorator("subjectExtendMark",{rules:[{required:true,message:"请主体扩展名识符"}],initialValue: initsubjectExtendMark})(
                <Input placeholder="20个以内的字符" maxLength={20}></Input>
              )}
            </FormItem>
            <FormItem label="关联所属分类">
                {getFieldDecorator("selectDeviceType",{rules:[{required:false,message:"请关联所属分类"}], initialValue: initSelectDeviceType})(
                <TreeSelect {...tProps} ></TreeSelect>
              )}
            </FormItem>
            <FormItem {...tailItemLayout}>
              <div style={{display:'flex', flexDirection:'row', width:'100%', justifyContent:'flex-end'}} >
                <Button  style={{width:'100px', marginRight:'10px'}} onClick={this.handleCancel.bind(this)}>取消</Button>
                <Button type="primary" htmlType='submit' style={{width:'100px', marginRight:'20px'}}>确认</Button>
              </div>
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default  ProtocolDicMainExtends