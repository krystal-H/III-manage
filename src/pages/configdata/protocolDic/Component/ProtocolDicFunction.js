import React from 'react'
import ProtocolDicBase from './ProtocolDicBase'
import {Form, Input, Button,Popconfirm,notification,Modal,TreeSelect, Select,Tooltip} from 'antd'
import FuncSelectItem from '../Func/FuncSelectItem'
import {
  protocolDicFunctionListGetRequest,
protocolDicFunctionItemGetRequest,
protocolDicFunctionItemSaveRequest,
protocolDicFunctionItemDeleteRequest
} from '../../../../apis/protocolDic'
import {REQUEST_SUCCESS} from '../../../../config/config'
import SelectAll from '../../../../components/MultipleSelect/MultipleSelect'

//功能分类
const funcTypeList = [
  { functionType: 20, functionTypeName: "历史控制数据" },
  { functionType: 8, functionTypeName: "历史运行数据" },
  { functionType: 27, functionTypeName: "状态数据" },
  { functionType: 9, functionTypeName: "红外数据" },
  { functionType: 2, functionTypeName: "控制数据" },
  { functionType: 3, functionTypeName: "运行数据" },
  { functionType: 4, functionTypeName: "故障数据" },
  { functionType: 5, functionTypeName: "配置数据" },

];

const FormItem = Form.Item
const { SHOW_PARENT } = TreeSelect;

@Form.create()
class ProtocolDicFunction extends React.Component 
{
  constructor(props){
    super(props)
    this.state ={
      functionDataType: 1,
      functionDetailList: null,
      commonData: {}
    }
  }

  columns = [
    { title:"ID", dataIndex:"functionId",width:"100px",},
    {title:"功能名（中文）",dataIndex:"functionNameCN",},
    {title:"功能名（英文）",dataIndex:"functionNameEN",},
    {title:"类型",dataIndex:"dataTypeNameList", width: "30%", render: (text) => <span title={text}>{text}</span>},
    {title:"操作",dataIndex:"functionId",key:"0",width:"100px",
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

  handleEdit(itemId){
    
    let _this = this;
    protocolDicFunctionItemGetRequest({functionId:itemId}).then(res => {
      console.log("get detail---",res.data.data)
      let code = res.data.code 
      if(code === REQUEST_SUCCESS){
        let data = res.data.data 
        this.setState({
          functionDataType: data.functionDataType,
          functionDetailList: data.functionDetailList,
          commonData:data,
          visibleModal: true,
          isEdit:true
        }
        , function(){
          
          //设置列表数据
          const functionDetailList = data.functionDetailList;
          let itemData = {},functionDataType = data.functionDataType;

          if(functionDataType<10){
            functionDetailList.map((item,index) => {
              itemData["id_"+index] = item.functionDetailId;
              itemData["field_"+index] = item.functionMark;
              itemData["len_"+index] = item.functionLength;
              itemData["unit_"+index] = item.functionUnit;
            })
          }else if(functionDataType==10){
            itemData['functionMark'] = functionDetailList[0].functionMark;
            itemData['functionDataTypeChild'] = functionDetailList[0].functionDataType;
            itemData['functionLength'] = functionDetailList[0].functionLength;
          }else if(functionDataType==11){
            itemData['functionMark'] = functionDetailList[0].functionMark;
            let childlist = functionDetailList[0].subFunctionDetailList || [];
            childlist.map((item,index) => {
              itemData["functionMark_"+index] = item.functionMark;
              itemData["functionDetailName_"+index] = item.functionDetailName;
              itemData["functionDataType_"+index] = item.functionDataType;
              itemData["functionLength_"+index] = item.functionLength;
            })
          }
          setTimeout( ()=>{
            _this.props.form.setFieldsValue({
              functionNameCN: data.functionNameCN,
              functionNameEN: data.functionNameEN,
              dataTypeList: Array.isArray(data.dataTypeList)?data.dataTypeList:[data.dataTypeList],
              functionDataType: functionDataType,
              ...itemData
            });
          },100)

      })
      }
    }
    )
  }
  
  handleDelete(item){
      console.log("handleDelete: " + item);
      protocolDicFunctionItemDeleteRequest({functionId:item}).then(res => {
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
    return protocolDicFunctionListGetRequest(params)
  }

  handleNewProtocolDic(){
    this.setState({
      visibleModal:true,
      isEdit:false,
      functionDataType: 1,
    }, function() {
      this.props.form.resetFields()
    })
  }
 
  // 保存修改
  handleSubmitSave(value){
    this.props.form.validateFields((err, values) => {
      if(err){
        return;
      } console.log('....values...',values)
      let functionDataType =  values["functionDataType"];
      let requestParams = {};
      requestParams["functionNameCN"] = values["functionNameCN"];
      requestParams["functionNameEN"] = values["functionNameEN"];
      requestParams["dataTypeList"] = values["dataTypeList"];
      requestParams["functionDataType"]= functionDataType;
      if(this.state.isEdit){
        requestParams["functionId"] = this.state.commonData["functionId"]
      }

      //获取列表数据
      let functionDetailList = [];
      
      if(functionDataType == 10){
        functionDetailList[0] = {
          "functionMark": values["functionMark"],
          "functionDataType": values["functionDataTypeChild"],  
          "functionLength":  values["functionLength"]
        }
      }else if(functionDataType==11){
        functionDetailList[0] = {
          "functionMark": values["functionMark"],
          "functionDataType": functionDataType,  
          "subFunctionDetailList":  []
        }
        let childlist = [];
        Object.keys(values).map(item => {
          let temp = item.split('_');
          if(temp.length>1){
            // console.log(temp);
            let _index = temp[1], _key = temp[0], _val = values[item];
            console.log('---',_index,_key,_val,'---');
            if(!childlist[_index]){
              childlist[_index] = {}
            }
            childlist[_index][_key] = _val;
          }   
        })
        functionDetailList[0].subFunctionDetailList = childlist;
      }else if(functionDataType<10){
        const arr = {
          id: "functionDetailId",
          field: "functionMark",
          len: "functionLength",
          unit: "functionUnit"
        }
        Object.keys(values).map(item => {
            if(/^id_|field_|len_|unit_\d$/.test(item)){
                const temp = item.split('_');
                if(!functionDetailList[temp[1]]){
                    functionDetailList[temp[1]] = {};
                }
                functionDetailList[temp[1]][arr[temp[0]]] = values[item]
            }
        })
      }
      
      // functionDetailList.map(item => {item.functionId = functionId})
      requestParams.functionDetailList = functionDetailList;
      protocolDicFunctionItemSaveRequest(requestParams).then(res => {
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
        commonData:{} ,functionDetailList:null//清空编辑数据
      })
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
      commonData: {},functionDetailList:null
    })
  }

  ProtocolDicCallback(callback){
    this.ProtocolDicBaseItemRefreshTable = callback
  }

  render(){
    let {getFieldDecorator} = this.props.form
    const formItemLayout = {
      labelCol: {xs: { span: 24 },sm: { span: 5 },},
      wrapperCol: {xs: { span: 24 },sm: { span: 17 },},
    }
    const tailItemLayout = {
      labelCol:{span: 24},
      wrapperCol:{span:24}
    }

    let functionNameCN= this.state.commonData.functionNameCN || ""
    let functionNameEN= this.state.commonData.functionNameEN || ""
    let dataTypeList = this.state.commonData.dataTypeList || []
    const {functionDataType, functionDetailList} = this.state
    return (
      <div>
        <ProtocolDicBase
           refFunction={ this.ProtocolDicCallback.bind(this) }
          // table 相关数据
          getTableRequest={this.getTableRequest.bind(this)}
          rowKey={"functionId"}
          columns={this.columns}
          deviceCategoryList={this.props.deviceCategoryList}
          filterPannel={[
            {type:"Input",title:"功能名（中文）",paramskey:"functionNameCN",placeholder:"请输入功能名（中文）"}
          ]}

          upload={"/v1/web/manage-open/protocol/dictionary/function/importExcel"}  
          download={"/v1/web/manage-open/protocol/dictionary/function/download"}
          handleNewProtocolDic={this.handleNewProtocolDic.bind(this)}

        ></ProtocolDicBase>
        <Modal
          title={this.state.isEdit?"编辑功能":'新建功能'}
          visible={this.state.visibleModal}
          footer={null}
          onCancel={this.handleCancel.bind(this)}
          width={700}
          // destroyOnClose={true}
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmitSave.bind(this)}>
            <FormItem label="功能-中文">
              {getFieldDecorator("functionNameCN",{rules:[{required:true,message:"请输入功能中文"}], initialValue:functionNameCN})(
                <Input placeholder="20个以内的字符" maxLength={20}></Input>
              )}
            </FormItem>
            <FormItem label="功能-英文">
              {getFieldDecorator("functionNameEN",{rules:[{required:true,message:"请输入功能英文"}], initialValue:functionNameEN})(
                <Input placeholder="40个以内的字符" maxLength={40}></Input>
              )}
            </FormItem>
            <FormItem label="功能分类">
              {getFieldDecorator("dataTypeList",{rules:[{required:true,message:"请输入功能分类"}], initialValue: dataTypeList})(
                <SelectAll showArrow={true} 
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
                  {funcTypeList.map(item => {
                      return <Select.Option value={item.functionType} key={item.functionType}>{item.functionTypeName}</Select.Option>
                    })}
                </SelectAll>
              )}
            </FormItem>
            <FuncSelectItem 
                  visibleModal={this.state.visibleModal}
                  functionDataType={functionDataType}
                  functionDetailList={functionDetailList}
                  form={this.props.form}
            />
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

export default  ProtocolDicFunction