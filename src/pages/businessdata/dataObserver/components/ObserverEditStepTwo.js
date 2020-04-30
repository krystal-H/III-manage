import React from 'react'
import {Form,Checkbox,Row,Col } from 'antd'


class ObserverEditStepTwo extends React.Component {

  componentDidMount(){
    this.props.onRef(this);
  }

  validataForm = () => {
    this.props.form.validateFieldsAndScroll((err, data) => {
      if(!err){
        this.props.nextStepAction()
      }
    })
  }
  render() {
    const {getFieldDecorator} = this.props.form
    const formLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    }
    const {protocolType, productList} = this.props
    return (
      <div>
        <Form {...formLayout} >
        <Form.Item label="标签/设备关联产品">
          {
            getFieldDecorator('protocolList', {

            })(
              <Row>
              {
                productList.map(item => {
                  return (
                  <Col span={6} key={item.productId}>
                    <span >{item.productName}</span>
                  </Col>)
                })
              }
              </Row>
            )
          }
          </Form.Item>
          <Form.Item required label="数据类型">
          {
            getFieldDecorator('observerDataType', 
              {
                rules: [{ required: true, message: '请选择数据类型' }],
              } 
            )(
              <Checkbox.Group>
                <Row>
                {
                  protocolType.map(item => {
                    return (<Col span={8} key={item.key}>
                    <Checkbox value={item.key} >{item.value}</Checkbox>
                    </Col>)
                  })
                }
                </Row>
              </Checkbox.Group>
            )
          }
          </Form.Item>
        </Form>
      </div>
    )
  }
}

const stepTwo =  Form.create({
  name:"ObserverEditStepTwo",
  onFieldsChange:(props , fields , allFields)=>{
    props.onChange(fields);
  }
  ,
  mapPropsToFields:(props)=> {
    const { observerDataType } = props;
    return {
      observerDataType: Form.createFormField({
        ...observerDataType,
      })
    };
  }
})(ObserverEditStepTwo)

export default stepTwo;
