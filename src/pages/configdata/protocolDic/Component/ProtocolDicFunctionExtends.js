import React from 'react'
import ProtocolDicBase from './ProtocolDicBase'
import {Form, Input, Button,TreeSelect,Select,Modal,notification, Popconfirm,Tooltip} from 'antd'
import {
  protocolDicFunctionExtendsListGetRequest,
protocolDicFunctionExtendsItemGetRequest,
protocolDicFunctionExtendsItemSaveRequest,
protocolDicFunctionExtendsItemDeleteRequest
} from '../../../../apis/protocolDic'
import {REQUEST_SUCCESS} from '../../../../config/config'
import {connect} from 'react-redux'
import {DeviceCategoryUtils} from '../../../../util/utils'
import SelectAll from '../../../../components/MultipleSelect/MultipleSelect'
import  * as protocolDic from '../../../../store/globalProtocolDicStore/actionCreators'

const { SHOW_PARENT } = TreeSelect;
const FormItem = Form.Item
const Option = Select.Option

const mapStateToProps =(state) => {

  let deviceCategoryTreeSelect = state.getIn(['globalDeviceInfo','deviceCategoryTreeSelect'])
  let deviceCategoryList = state.getIn(['globalDeviceInfo','deviceCategoryList'])
  let functionAllList = state.getIn(['globalProtocolDicInfo', 'functionAllList'])
  return {
    deviceCategoryTreeSelect,
    deviceCategoryList,
    functionAllList
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getFunctionAllList: () => {
      dispatch(protocolDic.FunctionAllListAsyncAction())
    }
  }
}


@connect(mapStateToProps,mapDispatchToProps)
@Form.create()
class ProtocolDicFunctionExtends extends React.Component 
{
  constructor(props){
    super(props)
    this.state ={

    }
  }

  columns = [
    {title:"ID",dataIndex:"functionExtendId",key:"functionExtendId",width:"80px"},
    {title:"功能扩展名（中文）",dataIndex:"functionExtendNameCN",key:"functionExtendNameCN", render: (text) => <span title={text}>{text}</span>},
    {title:"功能扩展名（英文）",dataIndex:"functionExtendNameEN",key:"functionExtendNameEN", render: (text) => <span title={text}>{text}</span>},
    {title:"功能扩展名标识",dataIndex:"functionExtendMark",key:"functionExtendMark", render: (text) => <span title={text}>{text}</span>},
    {title:"关联功能",dataIndex:"functionList",key:"functionList", width: "20%", render: (text) => <span title={text}>{text}</span>},
    {title:"所属分类",dataIndex:"allCategoryNameList",key:"allCategoryNameList", width: "20%", render: (text) => <span title={text}>{text}</span>},
    {title:"操作",dataIndex:"functionExtendId",key:"1",width:"100px",
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
  console.log("get detail")
  protocolDicFunctionExtendsItemGetRequest({functionExtendId:itemId}).then(res => {
    console.log("get detail")
    let code = res.data.code 
    if(code === REQUEST_SUCCESS){
      let data = res.data.data 

      let functionListCNStr = data["functionList"]
      let functionIdList = []
      functionListCNStr.map(item => {
        let functionId = item.functionId
        functionIdList.push(functionId)
      })

      data["functionList"] = functionIdList
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
    protocolDicFunctionExtendsItemDeleteRequest({functionExtendId:item}).then(res => {
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
    this.setState({
      isLoading: true
    })
    return protocolDicFunctionExtendsListGetRequest(params)
  }

  handleNewProtocolDic(){
    this.setState({
      visibleModal:true,
      isEdit:false
    })
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

  componentDidMount(){
    this.props.getFunctionAllList()
  }
  //保存修改
  // 保存修改
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
        let items = {
          "deviceTypeId":item
        }
        deviceTypeList.push(items)
      })
      requestParams["deviceTypeList"] = deviceTypeList
      requestParams["functionExtendNameCN"] = values["functionExtendNameCN"]
      requestParams["functionExtendNameEN"] = values["functionExtendNameEN"]
      requestParams["functionExtendMark"] = values["functionExtendMark"]

      if(this.state.isEdit){
        requestParams["functionExtendId"] = this.state.commonData["functionExtendId"]
      }

      if(values["functionList"]){
        let functionList = values["functionList"]
        let functionListArray = []
        functionList.map(item => {
          let functionItem = {
            functionId:item
          }
          functionListArray.push(functionItem)
        })
        requestParams["functionList"]  = functionListArray
      }

      protocolDicFunctionExtendsItemSaveRequest(requestParams).then(res => {
        let code = res.data.code 
        if(code === REQUEST_SUCCESS){
          console.log("保存： 成功");
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

  render(){
    let {getFieldDecorator} = this.props.form

    const formItemLayout = {
      labelCol: {xs: { span: 24 },sm: { span: 8 },},
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
    style: {
      width: 300,
    },
  };

  let functionAllList = this.props.functionAllList || []
  let isEdit = this.state.isEdit
  let initfunctionExtendNameCN  = isEdit ? (this.state.commonData["functionExtendNameCN"]): undefined
  let initfunctionExtendNameEN = isEdit ? (this.state.commonData["functionExtendNameEN"]) : undefined
  let initfunctionExtendMark = isEdit ? (this.state.commonData["functionExtendMark"]) : undefined
  let initfunctionList = isEdit ? (this.state.commonData["functionList"]) : undefined

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
          // table 相关数据
          getTableRequest={this.getTableRequest.bind(this)}

          rowKey={"functionExtendId"}
          columns={this.columns}
          deviceCategoryList={this.props.deviceCategoryList}
          filterPannel={[
            {type:"Input",title:"功能扩展名（中文）",paramskey:"functionExtendNameCN",placeholder:"请输入功能扩展名"}
          ]}

          upload={"/v1/web/manage-open/protocol/dictionary/functionExtend/importExcel"}
          download={"/v1/web/manage-open/protocol/dictionary/functionExtend/download"}
          handleNewProtocolDic={this.handleNewProtocolDic.bind(this)}
        ></ProtocolDicBase>
        <Modal
          title={this.state.isEdit?"编辑功能扩展名":'新建功能扩展名'}
          visible={this.state.visibleModal}
          footer={null}
          onCancel={this.handleCancel.bind(this)}
          destroyOnClose={true}
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmitSave.bind(this)}>
            <FormItem label="功能扩展名-中文">
              {getFieldDecorator("functionExtendNameCN",{rules:[{required:true,message:"请输入功能扩展名中文"}], initialValue: initfunctionExtendNameCN})(
                <Input placeholder="20个以内的字符" maxLength={20}></Input>
              )}
            </FormItem>
            <FormItem label="功能扩展名-英文">
              {getFieldDecorator("functionExtendNameEN",{rules:[{required:true,message:"请输入功能扩展名英文"}], initialValue: initfunctionExtendNameEN})(
                <Input placeholder="40个以内的字符" maxLength={40}></Input>
              )}
            </FormItem>
            <FormItem label="功能扩展名标识符">
              {getFieldDecorator("functionExtendMark",{rules:[{required:true,message:"请输入功能扩展名标识符"}], initialValue: initfunctionExtendMark})(
                <Input placeholder="20个以内的字符" maxLength={20}></Input>
              )}
            </FormItem>
            <FormItem label="关联功能">
              {getFieldDecorator("functionList",{rules:[{required:true,message:"请输入关联功能"}], initialValue: initfunctionList})(
                  <SelectAll maxTagCount={20} placeholder="请选择关联功能" 
                  showSearch
                  filterOption={(input, option) =>{
                    let childrenValue = option.props.children
                    if(typeof childrenValue == "string"){
                      let calcateValue = childrenValue.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      return calcateValue
                    }else{
                      return false
                    }
                  }}
                  >
                    {
                      functionAllList.map((item, index) => {
                        return <Select.Option value={item.functionId} key={item.functionId}>{item.functionNameCN}</Select.Option>
                      })
                    }
                  </SelectAll>
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

export default  ProtocolDicFunctionExtends