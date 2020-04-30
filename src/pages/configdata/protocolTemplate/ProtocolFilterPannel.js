import React, {Component} from 'react'
import PropTypes from "prop-types";
import {notification, Form, Button, Select, Input, Cascader} from 'antd'
import {DeviceSubTypeRequest} from '../../../apis/device'
import {REQUEST_SUCCESS} from '../../../config/config'
import {connect} from 'react-redux'
import DeviceTypeSelectFormItem from '../../../components/DeviceTypeSelectFormItem/DeviceTypeSelectFormItem'


const { Option } = Select;
const mapStateToProps = (state) => {
  let deviceType = state.getIn(['globalDeviceInfo','deviceType'])
  let deviceCategoryList = state.getIn(['globalDeviceInfo','deviceCategoryList'])
  let deviceCascaderList = state.getIn(['globalDeviceInfo','deviceCascaderList'])
  return {
    deviceCategoryList,
    deviceType,
    deviceCascaderList
  }
}


@connect(mapStateToProps)
@Form.create({name:'horizontal_pannel'})
class ProtocolFilterPannel extends Component {

  constructor(props){
    super(props)
    this.state = {
      deviceSubType:[],
    }
  }
  //查询
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        console.log(values)
        let deviceTypeSelectValue = values['deviceTypeSelect']
        let templateName = values['templateName']
        if(deviceTypeSelectValue && deviceTypeSelectValue.length == 3){
          let deviceTypeId = deviceTypeSelectValue[2]
           this.props.filterPannelOperation({
                deviceTypeId: deviceTypeId,
                templateName:templateName
            })
        }else{
          this.props.filterPannelOperation({
            templateName:templateName
        })
        }

        // if(values.deviceTypeSelect && values.deviceTypeSelect.deviceTypeId){
        //   this.props.filterPannelOperation({
        //     deviceTypeId: values.deviceTypeSelect.deviceTypeId
        //   })
        // }
      }
    })
  }
  //选择设备大类
  deviceTypeSelect(value){
    // console.log("deviceTypeSelect: " + value);
    DeviceSubTypeRequest({deviceTypeId:value}).then(res => {
      let code = res.data.code 
      if(code === REQUEST_SUCCESS){
        let data = res.data.data
        this.props.form.resetFields(['deviceSubType'])
        this.setState({
          deviceSubType: data
        })
      }
    })
  }

  deviceSubTypeSelect(value){
    console.log("deviceSubTypeSelect: " + value);
  }

  resetContent(){
    this.props.form.resetFields();
    this.props.filterPannelOperation({
      deviceTypeId: undefined
  })
    // this.props.form.setFieldsValue({
    //   deviceTypeSelect: {
    //     categoryId: undefined,     //一级分类
    //     subCategoryId: undefined,  // 二级分类
    //     deviceTypeId: undefined,   // 设备大类
    //     deviceSubTypeId:undefined, // 设备小类
    //   },
    // })
  }


  render(){
    const {getFieldDecorator} = this.props.form;
    let deviceCategoryList = this.props.deviceCategoryList 
    let deviceCascaderList = this.props.deviceCascaderList

    return (
      <div>
         <Form layout="inline" onSubmit={this.handleSubmit.bind(this)} >
         <Form.Item label="所属分类" >
          {getFieldDecorator("deviceTypeSelect")(
              // <Input placeholder={item.placeholder} ></Input>
              // <DeviceTypeSelectFormItem deviceCategoryList={deviceCategoryList}/>
              <Cascader  options={deviceCascaderList}  placeholder="请选择所属分类"  style={{ width: 260 }}></Cascader>
            )}
          </Form.Item>
          {/** 接口没有模板名称*/}
          <Form.Item label="模板名称">
          {
              getFieldDecorator('templateName')(
                <Input
                  type="text"
                  onChange={this.handleNumberChange}
                  style={{ width: 200 }}
                  placeholder="输入模板名称"
                />
              )
          }
          </Form.Item>
          <Form.Item >
            <Button type="primary" htmlType="submit">查询</Button>
            <span> </span>
            <Button type="primary" onClick={this.resetContent.bind(this)}>重置</Button>
          </Form.Item>
         </Form>
       </div>
    )
  }

}

ProtocolFilterPannel.prototype = {
  filterPannelOperation: PropTypes.func
}

export default ProtocolFilterPannel