import React from 'react'
import {Form,Checkbox,Row,Col, Radio, Input } from 'antd'


class ObserverEditStepThree extends React.Component {
  
  validataForm = () => {
    this.props.form.validateFieldsAndScroll((err, data) => {
      // console.log("ObserverEditStepThree")
      if(!err){
        // this.props.nextStepAction()
        this.props.onSubmit();
      }
    })
  }

  componentDidMount(){
    this.props.onRef(this);
  }

  getTypeFeild(type){
    const {getFieldDecorator} = this.props.form
    let httpType = (
      <div>
        <Form.Item required label="数据订阅URL">
          {
            getFieldDecorator('observerHttpURL',{
              rules: [{ required: true, message: '填写数据订阅服务器URL' }],
            })(
              <Input placeholder="填写数据订阅服务器URL" style={{width:'80%'}}></Input>
            )
          }
          <p>备注：供C-Life云推送服务给第三方云推送数据,仅支持http方式。</p>
        </Form.Item>
        
        <Form.Item required label="Token">
          {
            getFieldDecorator('observerHttpToken',{
              rules: [{ required: true, message: '填写验证token' }],
            })(
              <Input placeholder="填写验证token" style={{width:'80%'}}></Input>
            )
          }
          <p>备注：第三方云服务接口对接C-Life云推送服务的凭证,用来验证厂商服务接口的合法性。</p>
        </Form.Item>
      </div>   
    )
    let mqttType = (
      <div style={{textAlign:'center'}}>
        <a>查看帮助文档</a>
      </div>
    )
    return type==="0"?httpType:mqttType
  }


  render() {
    const {getFieldDecorator} = this.props.form
    const observerTypeValue = this.props.observerType.value
    const formLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }
    // console.log("observerType: " + observerTypeValue)

    return (
      <div  >
        <div>
          <Form {...formLayout}>
            <Form.Item required label="请选择订阅方式">
              {
                getFieldDecorator('observerType',{
                  rules: [{ required: true, message: '请选择订阅方式' }],
                } )(
                  <Radio.Group>
                    <Radio value="0">选择push数据订阅</Radio>
                    <Radio value="1">选择MQTT主题订阅</Radio>
                  </Radio.Group>
                )
              }
            </Form.Item>
            {
              this.getTypeFeild(observerTypeValue)
            }
          </Form>

        </div>
      </div>
    )
  }
}

const stepThree =  Form.create({
  name:"ObserverEditStepThree",
  onFieldsChange:(props , fields , allFields)=>{
    props.onChange(fields);
  },
  mapPropsToFields:(props)=> {
    const {observerType, observerHttpURL, observerHttpToken } = props
    return {
      observerType: Form.createFormField({
        ...observerType,
      }),
      observerHttpToken: Form.createFormField({
        ...observerHttpToken,
      }),
      observerHttpURL: Form.createFormField({
        ...observerHttpURL,
      }), 

    };
  }
})(ObserverEditStepThree)

export default stepThree;
