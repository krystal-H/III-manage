import React , {Component} from 'react'
import {DeviceSubTypeRequest} from '../../../../apis/device'
import {REQUEST_SUCCESS} from '../../../../config/config'
import {Select} from 'antd'
import ProTypes from 'prop-types'
const {Option} = Select

class DeviceThreedSelect extends Component {

  constructor(props){
    super(props);

    this.state = {
      deviceCategoryList:[],
      deviceSubCategoryList:[],
      deviceTypeList:[],

      categoryId:'',
      subCategoryId:'',
      deviceTypeId:'',
      deviceSubTypeId:''
    }
  }

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      onChange({
        deviceSubTypeValue:this.props.value.deviceSubTypeValue,
        deviceTypeValue:this.props.value.deviceTypeValue,
        ...changedValue,
      });
    }
  };

  //********************************* */
  //选择设备一级类目
  deviceCategorySelect(value){
    // console.log("deviceTypeSelect: " + value);
    this.setState({
      subCategoryList: value
    })
  }

  //选择设备二级类目
  deviceSubCategorySelect(value){
    this.setState({
      deviceSubTypeList: value
    })
  }

  deviceTypeListSelect(value){

  }

  requestSubType(params){
    DeviceSubTypeRequest(params).then(res => {
      let code = res.data.code 
      if(code === REQUEST_SUCCESS){
        let data = res.data.data
        this.triggerChange({
          deviceSubTypeValue:data[0].subtypeId,
          deviceTypeValue:params.deviceTypeId
        })
        // 重新获取了子类，刷新子类默认值
        this.setState({
          deviceSubTypeList: data,
          deviceSubTypeValue:data[0].subtypeId,
        })
      }
    })
  }

  componentDidMount(){
    let initDeviceTypeId = this.props.value.deviceTypeValue
    if(initDeviceTypeId){
      DeviceSubTypeRequest({deviceTypeId:initDeviceTypeId}).then(res => {
        let code = res.data.code 
        if(code === REQUEST_SUCCESS){
          let data = res.data.data
          // 重新获取了子类，刷新子类默认值
          this.setState({
            deviceSubTypeList: data,
          })
        }
      })
    }

  }

  render () {
    let deviceCategoryList = this.props.deviceCategoryList || []
    let deviceSubCategoryList = this.state.deviceSubCategoryList 
    let deviceTypeList = this.state.deviceTypeList 

    let defaultDeviceSubTypeValue = this.props.value.deviceSubTypeValue 
    let defaultDevicetypeValue     = this.props.value.deviceTypeValue 


    let deviceSubTypeValueProps= {
      "value":defaultDeviceSubTypeValue
    }
    let  deviceTypeValueProps= {
      "value":defaultDevicetypeValue
    }
    return (
      <div>
        <Select onSelect={this.deviceCategorySelect.bind(this)} placeholder="选择一级类目" style={{width:150}} {...deviceTypeValueProps}>
          {
            deviceCategoryList.map((item,index) => {
              return <Option value={item} key={index}>{item.categoryName}</Option>
            })
          }
        </Select>
        <Select  onSelect={this.deviceSubCategorySelect.bind(this)} placeholder="选择二级类目" style={{width:150}}  {...deviceSubTypeValueProps} >
        {
          deviceSubCategoryList.map((item,index) => {
            return <Option value={item} key={index}>{item.subCategoryName}</Option>
          })
        }
        </Select>
        <Select  onSelect={this.deviceTypeListSelect.bind(this)} placeholder="选择三级类目" style={{width:150}}  {...deviceSubTypeValueProps} >
        {
          deviceTypeList.map((item,index) => {
            return <Option value={item} key={index}>{item.deviceTypeName}</Option>
          })
        }
        </Select>
      </div>
    )
  }
}

export default DeviceThreedSelect