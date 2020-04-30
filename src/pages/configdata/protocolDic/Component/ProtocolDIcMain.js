import React from 'react'
import ProtocolDicBase from './ProtocolDicBase'
import {Form, Input, Button,notification,Popconfirm,Modal,Tooltip, Select} from 'antd'
import {protocolDicMainListGetRequest,protocolDicMainItemGetRequest,protocolDicMainItemSaveRequest,protocolDicMainItemDeleteRequest} from '../../../../apis/protocolDic'

import {REQUEST_SUCCESS} from '../../../../config/config'
import {connect} from 'react-redux'
import SelectAll from '../../../../components/MultipleSelect/MultipleSelect'
import  * as protocolDic from '../../../../store/globalProtocolDicStore/actionCreators'

const FormItem = Form.Item

const mapStateToProps =(state) => {
  let functionAllList = state.getIn(['globalProtocolDicInfo', 'functionAllList'])
  return {
    functionAllList,
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
class ProtocolDicMain extends React.Component 
{
  constructor(props){
    super(props)
    this.state ={
      commonData:{},
      visibleModal: false,
      isEdit:false
    }
  }

  columns = [
    {title:"ID",dataIndex:"subjectId",key:"subjectId",width:"100px",},
    {title:"主体（中文）",dataIndex:"subjectNameCN",key:"subjectNameCN"},
    {title:"主体（英文)",dataIndex:"subjectNameEN",key:"subjectNameEN"},
    {title:"主体标识",dataIndex:"subjectMark",key:"subjectMark"},
    {title:"关联功能",dataIndex:"functionList",key:"functionList", width: "30%", render:(text) => <span title={text}>{text}</span>},
    {title:"操作",dataIndex:"subjectId",key:'1',width:"100px",
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

  protocolDicMainItemGetRequest({subjectId:itemId}).then(res => {

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
    protocolDicMainItemDeleteRequest({"subjectId":item}).then(res => {
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

  ProtocolDicCallback(callback){
    this.ProtocolDicBaseItemRefreshTable = callback
  }

  getTableRequest(params){
    return protocolDicMainListGetRequest(params)
  }
  // 新建
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
  
// 保存修改
handleSubmitSave(value){
  this.props.form.validateFields((err, values) => {
    if(err){
      return;
    }
    console.log("validateFields: " + values);
 
    let requestParams = {}

    requestParams["subjectNameCN"] = values["subjectNameCN"]
    requestParams["subjectNameEN"] = values["subjectNameEN"]
    requestParams["subjectMark"] = values["subjectMark"]

    if(this.state.isEdit){
      requestParams["subjectId"] = this.state.commonData["subjectId"]
    }
    if(values["functionList"]){
      let functionList = values["functionList"]
      let functionListArray = []
      functionList.map(item => {
        let functionItem = {functionId:item}
        functionListArray.push(functionItem)
      })
      requestParams["functionList"]  = functionListArray
    }

    protocolDicMainItemSaveRequest(requestParams).then(res => {
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

  onChange = checkedList => {
    let plainOptions = this.props.functionAllList
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length,
    });
  };

  onCheckAllChange = e => {
    let plainOptions = this.props.functionAllList
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  componentDidMount(){
    this.props.getFunctionAllList()
  }
  render(){

    const formItemLayout = {
      labelCol: {
       xs: { span: 24 },
       sm: { span: 6 },
     },
     wrapperCol: {
       xs: { span: 24 },
       sm: { span: 16 },
     },
   }

    const tailItemLayout = {
      labelCol:{span: 24},
      wrapperCol:{span:24}
    }

    let functionAllList = this.props.functionAllList || []

    let isEdit = this.state.isEdit
    let initsubjectNameCN  = isEdit ? (this.state.commonData["subjectNameCN"]): undefined
    let initsubjectNameEN = isEdit ? (this.state.commonData["subjectNameEN"]) : undefined
    let initsubjectMark = isEdit ? (this.state.commonData["subjectMark"]) : undefined
    let initfunctionList = isEdit ? (this.state.commonData["functionList"]) : undefined

    let {getFieldDecorator} = this.props.form
    return (
      <div>
        <ProtocolDicBase
          refFunction={ this.ProtocolDicCallback.bind(this) }
          // table 相关数据
          getTableRequest={this.getTableRequest.bind(this)}
          rowKey={"subjectId"}
          columns={this.columns}
          deviceCategoryList={this.props.deviceCategoryList}
          filterPannel={[
            {
              type:"Input",
              title:"主体",
              paramskey:"subjectNameCN",
              placeholder:"请输入主体名（中文）"
            }
          ]}

          upload={"/v1/web/manage-open/protocol/dictionary/subject/importExcel"}
          download={"/v1/web/manage-open/protocol/dictionary/subject/download"}
          handleNewProtocolDic={this.handleNewProtocolDic.bind(this)}
        ></ProtocolDicBase>
        <Modal
          title={this.state.isEdit ? "编辑主体": "新建主体"}
          visible={this.state.visibleModal}
          footer={null}
          onCancel={this.handleCancel.bind(this)}
          destroyOnClose={true}
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmitSave.bind(this)}>
            <FormItem label="主体-中文">
              {getFieldDecorator("subjectNameCN",{rules:[{required:true,message:"请输入主体中文"}],initialValue: initsubjectNameCN })(
                <Input placeholder="20个以内的字符" maxLength={20}></Input>
              )}
            </FormItem>
            <FormItem label="主体-英文">
              {getFieldDecorator("subjectNameEN",{rules:[{required:true,message:"请输入主体英文"}],initialValue: initsubjectNameEN })(
                <Input placeholder="40个以内的字符" maxLength={40}></Input>
              )}
            </FormItem>
            <FormItem label="主体识符">
              {getFieldDecorator("subjectMark",{rules:[{required:true,message:"请输入主体识符"}],initialValue: initsubjectMark })(
                <Input placeholder="20个以内的字符" maxLength={20}></Input>
              )}
            </FormItem>
            <FormItem label="关联功能">
              {getFieldDecorator("functionList",{rules:[{required:false,message:"请输入关联功能"}], initialValue: initfunctionList})(
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
                    {functionAllList.map((item, index) => {
                        return <Select.Option value={item.functionId} key={item.functionId}>{item.functionNameCN}</Select.Option>
                      })}
                  </SelectAll>
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

export default  ProtocolDicMain