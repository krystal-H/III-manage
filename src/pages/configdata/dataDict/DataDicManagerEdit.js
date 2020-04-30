import React,{Component} from 'react'
import {connect} from 'react-redux' 
import {withRouter,Link} from 'react-router-dom'
import {Card, Form, Input, Select,Upload, Icon,Checkbox,Radio,message ,Button,Tabs} from 'antd'
import {dataDictionaryItemRequest,dataDictionaryItemAddRequest, dataDictionaryItemUpdateRequest} from '../../../apis/datadicmanager'
import {REQUEST_SUCCESS} from '../../../config/config'


import {JSTool} from '../../../util/utils'


const FormItem = Form.Item;
const { Option } = Select;

const mapStateToProps = (state) => {
  let deviceType = state.getIn(['globalDeviceInfo','deviceType'])
  return {
    deviceTypeList:deviceType
  }
}

@connect(mapStateToProps)
@withRouter
@Form.create({ name: 'template' })
class DataDicManagerEdit extends Component {

  constructor(props){
    super(props);
    this.state = {
      isEdit:false,
      paramId: "",  //参数ID
      dicname:"", //模板名称
      dicstatus:"",    //模板状态
      dicdesc:"",  //备注
      dicvalue:""
    }
  }

  handeleUpdate = values => {
    // console.log("handeleUpdate: " + JSON.stringify(values))
    values["paramId"] = this.state.paramId
    dataDictionaryItemUpdateRequest(values).then(res => {
      this.props.history.push("/config/datadic/list")
    })
  }

  handleAdd = values => {
    // console.log("handleAdd: " + JSON.stringify(values))
    dataDictionaryItemAddRequest(values).then(res => {
      this.props.history.push("/config/datadic/list")
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        let params = {
          name:values.dicname, //模板名称
          status:values.dicstatus,    //模板状态
          desc:values.dicdesc,  //备注
          value:values.dicvalue
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

    let params = this.props.match.params
    if(params && params.paramId){
      this.setState({
        isEdit:true,
        paramId: params.paramId
      })
      let paramId = params.paramId
      dataDictionaryItemRequest(paramId).then(res => {
        let code = res.data.code
        if(code === REQUEST_SUCCESS){
          let data = res.data.data

          this.setState({
            paramId: data.paramId,  //参数ID
            dicname:data.name, //模板名称
            dicstatus:data.status + "" ,   //模板状态
            dicdesc:data.desc,  //备注
            dicvalue:data.value
          }) 
        }
      })
    }

  }

  render(){
    const formItemLayout = {
      labelCol: {xs: { span: 16 },sm: { span: 4 },},
      wrapperCol: {xs: { span: 24 },sm: { span: 16 },},
    };
    const tailFormItemLayout = {
      wrapperCol: {xs: {span: 24,offset: 0,},
        sm: {
          span: 16,
          offset: 4,
        },
      },
    };
    const { getFieldDecorator } = this.props.form;
    let isEdit = this.state.isEdit || false
    let { 
      dicname, //模板名称
      dicstatus,    //模板状态
      dicdesc,  //备注
      dicvalue
        } = this.state

    return (
      <div> 
        <Card>
          <div style={{display:"flex",justifyContent:'space-between'}}>
            <p style={{fontSize:'20px',fontWeight:'bold'}}>{isEdit?"编辑数据字典":'新增数据字典'}</p>
            <div ><Link to="/config/datadic/list" style={{padding:'10px'}}><Icon type="left"/> 返回</Link></div>
          </div>
        </Card>

        <Card style={{marginTop:'20px'}}>
          <Form  {...formItemLayout} onSubmit={this.handleSubmit}>
              <FormItem label="名称" >{getFieldDecorator('dicname', { initialValue:dicname ,rules: [{ required: true, message: '模板名称不能为空' }] })(
                  <Input type="text" style={{width: "300px"}} maxLength={30} placeholder="请输入您喜欢的模板名称,长度不超过30" />
              )}
              </FormItem>
              <FormItem label="参数值" >{getFieldDecorator('dicvalue', { initialValue:dicvalue ,rules: [{ required: true, message: '参数值不能为空' }] })(
                   <Input.TextArea rows={7} placeholder="请输入参数值,限制内容长度5000" maxLength={5000}/>
              )}
              </FormItem>
              <Form.Item label="状态"> 
                  {getFieldDecorator("dicstatus", { rules: [{ required: true, message: '请选择状态' }], initialValue:dicstatus,  })(
                      <Radio.Group style={{ width: 150 }}  >
                        <Radio value="1" >有效</Radio>
                        <Radio value="0" >无效</Radio>
                      </Radio.Group>
                  )}
              </Form.Item>
            
              <FormItem label="描述">{getFieldDecorator('dicdesc', {rules: [{ required: true, message: '请输入描述' }],initialValue:dicdesc})(
                  <Input.TextArea rows={3} placeholder="请您输入模板的备注内容,限制内容长度50" maxLength={50}/>
              )}
              </FormItem>
              <FormItem {...tailFormItemLayout} >
                <Button  type="primary" htmlType="submit">{isEdit?"保存":"添加"}</Button>
              </FormItem>
          </Form>
      </Card>
    </div>)
  }
}

export default DataDicManagerEdit