import React,{Component} from 'react'
import {connect} from 'react-redux' 
import {withRouter,Link} from 'react-router-dom'
import {Card, Form, Input, Select,Upload, Icon,Checkbox,Radio,message ,Button,Cascader, notification} from 'antd'
import {DeviceBindTypeList} from '../../../apis/device'
import {getProtocolTemplateRequest, protocolTemplateUpdateRequest, protocolTemplateInsertRequest} from '../../../apis/protocolTemplate'
import {REQUEST_SUCCESS} from '../../../config/config'
import ProtocolTablePannel from './Components/ProtocolTablePannel'
import DeviceTypeSelectFormItem from '../../../components/DeviceTypeSelectFormItem/DeviceTypeSelectFormItem'
import {JSTool} from '../../../util/utils'

const FormItem = Form.Item;
const { Option } = Select;

const mapStateToProps = (state) => {
  let deviceType = state.getIn(['globalDeviceInfo','deviceType'])
  let deviceCategoryList = state.getIn(['globalDeviceInfo','deviceCategoryList'])
  let deviceCascaderList = state.getIn(['globalDeviceInfo','deviceCascaderList'])
  return {
    deviceTypeList:deviceType,
    deviceCategoryList,
    deviceCascaderList
  }
}

@connect(mapStateToProps)
@withRouter
@Form.create({ name: 'template' })
class ProtocolTemplateEdit extends Component {

  constructor(props){
    super(props);
    this.state = {
      isEdit:false,
      templateNumber: "0",  //产品模板ID

      bindTypeList:[],  // 技术方案 wifi 蓝牙 nb zigbee
      protocolTempList:[],   //协议list
      protocolTemplateId:'', // 协议模板ID
      templateId:null,    // 上传 excel表存储
      bindTypeIds:[], //技术方案
      templateName:"", //模板名称
      deviceTypeId: undefined, // 设备大类
      deviceSubtypeId: undefined,//设备小类
      templateStatus: "",    //模板状态
      
      remark: "",  //备注
      language: ""   //语言
    }
  }

  handeleUpdate = values => {
    values["protocolTemplateId"]  = this.state.protocolTemplateId
    protocolTemplateUpdateRequest(values).then(res => {
      this.props.history.push("/config/protocoltemplate/list")
    })
  }

  handleAdd = values => {
    protocolTemplateInsertRequest(values).then(res => {
      this.props.history.push("/config/protocoltemplate/list")
    })
  }

  checkDeviceTypeSelect(rule, value, callback){
    if(value.deviceTypeId && value.deviceSubTypeId){
      callback()
      return 
    }
    callback("请选择设备分类")
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if(!values.deviceTypeSelect || !values.deviceTypeSelect.deviceTypeId ){
          notification.warn({
            message: '提示',
            description: '请选择设备类型' 
          })
          return
        }

        let deviceTypeId = values.deviceTypeSelect.deviceTypeId ||  ""; // 设备大类
        let deviceSubtypeId = values.deviceTypeSelect.deviceSubTypeId ||"";//设备小类
        
        let params = {
          templateName: values.templateName || "", //模板名称
          deviceTypeId: deviceTypeId, // 设备大类
          deviceSubtypeId: deviceSubtypeId,//设备小类
          templateStatus:  values.templateStatus ,    //模板状态
          remark: values.remark || "",  //备注
          language: values.language ,   //语言
          bindTypeIds: values.bindTypeIds.join(','),
        }

        if(this.state.templateId){
          params["tempId"] = this.state.templateId
        }

        params = JSTool.filterParam(params)
        if(this.state.isEdit){
          this.handeleUpdate(params)
        }else{
          this.handleAdd(params)
        }
      }
    });
  };

  componentDidMount(){

    DeviceBindTypeList().then(res => {
      let code = res.data.code
      if(code === REQUEST_SUCCESS){
        let data = res.data.data 
        if(!data){
          notification.warn({
            message: '提示',
            description: '获取数据字段为空' 
          })
        }else{
          this.setState({
            bindTypeList:data,
          })
        }

      }
    })

    let params = this.props.match.params
    if(params && params.templateNumber){
      this.setState({
        isEdit:true,
        templateNumber: params.templateNumber
      })
      let templateNumber = params.templateNumber
      getProtocolTemplateRequest(templateNumber).then(res => {
        let code = res.data.code
        if(code === REQUEST_SUCCESS){
          let data = res.data.data
          //字符串数组转换成数字数组
          let bindTypeIdsStr =  data.bindTypeIds||""
          let bindTypeIdsArray  = bindTypeIdsStr.split(",")
          bindTypeIdsArray = bindTypeIdsArray.map(item => {  
            return +item;  
          });

          this.setState({
            templateName: data.templateName || "", //模板名称
            deviceTypeId: data.deviceTypeId ||  "", // 设备大类
            deviceSubtypeId: data.deviceSubtypeId ||"",//设备小类
            catagoryId: data.categoryId ||  "", // 一级分类
            subCategoryId: data.subCategoryId ||"",//二级分类
            templateStatus:  data.templateStatus + "",    //模板状态
            templateNumber: data.templateNumber ,  //产品模板ID
            remark: data.remark || "",  //备注
            language: data.language + "" ,   //语言
            protocolTempList: data.map || [],   //协议list
            protocolTemplateId: data.protocolTemplateId || "", // 协议ID
            bindTypeIds:bindTypeIdsArray || []
          }) 
        }
      })
    }
  }

  handelUploadFile(info){

    console.log("info.file---",info.file)

    if (info.file.status !== 'uploading') {
      // console.log("uploading")
    }
    if (info.file.status === 'done') {
      let response = info.file.response;
      let code = response.code
      if(code=== REQUEST_SUCCESS){
        let data = response.data
        // console.log("responsedata:" ,data)
        this.setState({
          protocolTempList: data.map,
          templateId:data.tempId
        })
        message.success(`${info.file.name} 文件上传成功， 文件ID： ${response.data.tempId}`);
      }else{
        let data = response.data
        message.error(`${info.file.name} 文件上传失败， 原因： ${data}`, 10 );
      }
     
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败`);
    }
  }

  render(){
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 22},
    };
    const { getFieldDecorator } = this.props.form;
    let isEdit = this.state.isEdit || false
    let bindTypeList = this.state.bindTypeList 
    let deviceCategoryList = this.props.deviceCategoryList || []

    let { bindTypeIds, //技术方案 
          templateName, //模板名称
          deviceTypeId, // 设备大类
          deviceSubtypeId,//设备小类
          catagoryId,
          subCategoryId,
          templateStatus,    //模板状态
          remark,  //备注
          language  //语言
        } = this.state
        
       let deviceTypeSelectInitValue =   {initialValue: 
              { categoryId: catagoryId,
               subCategoryId: subCategoryId,
               deviceTypeId: deviceTypeId,
               deviceSubTypeId: deviceSubtypeId} }

    return (
      <div> 
        <Card>
          <div style={{display:"flex",justifyContent:'space-between'}}>
            <p style={{fontSize:'20px',fontWeight:'bold'}}>{isEdit?"编辑协议模板":'新增协议模板'}</p>
            <div ><Link to="/config/protocoltemplate/list" style={{padding:'10px'}}><Icon type="left"/> 返回</Link></div>
          </div>
          
          <Form  {...formItemLayout} onSubmit={this.handleSubmit}>
              <FormItem label="模板名称" >{getFieldDecorator('templateName', { initialValue:templateName ,rules: [{ required: true, message: '模板名称不能为空' }] })(
                  <Input maxLength={30} type="text" style={{width: "300px"}} placeholder="请输入您喜欢的模板名称" />
              )}
              </FormItem>
              <FormItem label="所属分类">{getFieldDecorator('deviceTypeSelect', {...deviceTypeSelectInitValue, 
              rules:[{required: true , message:"请选择所属分类", validator: this.checkDeviceTypeSelect.bind(this)}],})(
                   <DeviceTypeSelectFormItem deviceCategoryList={deviceCategoryList}/>
                   // 无法获取小类ID
                  // <Cascader options={deviceCascaderList} style={{width:300}} placeholder="请选择设备类型" ></Cascader>
              )} 
              </FormItem> 
              <FormItem label="技术方案" > 
              {getFieldDecorator("bindTypeIds", { initialValue:bindTypeIds, rules: [{ required: true, message: '请您选择技术方案' }] })(
                <Checkbox.Group>
                  {
                    bindTypeList.map(item =>  (
                        <Checkbox value={item.bindTypeId} key={item.bindTypeName}>{item.bindTypeName}</Checkbox>
                    ))
                  }
                </Checkbox.Group>
              )}
              </FormItem>
              <Form.Item label="语言版本"> 
                  {getFieldDecorator("language", {   rules: [{ required: true, message: '请选择语言版本' }] , initialValue:language })(
                      <Radio.Group style={{ width: 150 }}  onChange={this.handleSelectDeviceTypeId}>
                        <Radio value="0" key="0">中文</Radio>
                        <Radio value="1" key="1">英文</Radio>
                      </Radio.Group>,
                  )}
              </Form.Item>
              <Form.Item label="状态"> 
                  {getFieldDecorator("templateStatus", { rules: [{ required: true, message: '请选择发布状态' }], initialValue:templateStatus,  })(
                      <Radio.Group style={{ width: 150 }}  onChange={this.handleSelectDeviceTypeId}>
                        <Radio value="1" key="1">正式</Radio>
                        <Radio value="0" key="0">草稿</Radio>
                      </Radio.Group>,
                  )}
              </Form.Item>
              <FormItem label="模板设置" >
              {getFieldDecorator('tempId', { 
                rules: [{ required: isEdit?false:true, message: '选择模板' }]})(
                <div>
                  <Upload 
                    name="uploadJson" 
                    showUploadList={false} 
                    action="/v1/web/manage-open/protocol/template/importJson"
                    onChange={this.handelUploadFile.bind(this)}
                    accept=".json"
                    >
                      <Button>
                        <Icon type="upload" /> 选择模板
                      </Button>
                  </Upload>
                  <div>（仅支持导入json文件类型，文件扩展名：.json，
                        <a href='/v1/web/manage-open/protocol/template/download' style={{color:'#27a9e3'}}>下载模板范本</a>）
                  </div>
                </div>

              )}
              </FormItem>
              <FormItem label="备注">{getFieldDecorator('remark', {initialValue:remark})(
                  <Input.TextArea rows={3} placeholder="请您输入模板的备注内容" maxLength={100}/>
              )}
              </FormItem>
              <FormItem label="数据分类">
                <ProtocolTablePannel protocolList={this.state.protocolTempList} ></ProtocolTablePannel>
              </FormItem>
              <Button  htmlType="submit" style = {{float:'right'}}>提交</Button>
          </Form>

         
      </Card>
    </div>)
  }
}

export default ProtocolTemplateEdit