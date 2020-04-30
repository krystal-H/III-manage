import React , {Component} from 'react'
import {DeviceSubTypeRequest} from '../../apis/device'
import {REQUEST_SUCCESS} from '../../config/config'
import {Select} from 'antd'
import ProTypes from 'prop-types'
const {Option} = Select


const deviceCategoryCacheObject={}  //分类对象缓存
const deviceSubCategoryCacheObject={}//二级分类对象缓存
const deviceTypeCacheObject={} //设备大类

class DeviceThreedSelect extends Component {

  constructor(props){
    super(props);


    let initValue = this.props.value || {}
    // console.log("initVale:  " + JSON.stringify(initValue))

    this.state = {
      // deviceCategoryList:[],     //一级List
      deviceSubCategoryList:[],  //二级List
      deviceTypeList:[],         //设备大类List
      isCalculate: false,
    }
  }

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      if(this.props.value){
        onChange({
          categoryId: this.props.value.categoryId,
          subCategoryId: this.props.value.subCategoryId,
          deviceTypeId:this.props.value.deviceTypeId,
          deviceSubTypeId:this.props.value.deviceSubTypeId,
          ...changedValue,
        });
      }else{
        onChange({
          ...changedValue,
        });
      }
  
    }
  };

  //********************************* */
  //选择设备一级类目
  deviceCategorySelect(value){
    // console.log("deviceTypeSelect: " + value);
    // "categoryId":"1",
    // "categoryName":"智慧生活",
    // "subCategoryList":
    if(deviceCategoryCacheObject[value]){
      let subCategoryList = deviceCategoryCacheObject[value];
      this.setState({
        deviceSubCategoryList: subCategoryList
      })
    }
   
    this.triggerChange({
      "categoryId":value,
      "subCategoryId":undefined,
      "deviceTypeId": undefined,
      "deviceSubTypeId": undefined
    })
  }

  //选择设备二级类目
  deviceSubCategorySelect(value){
    if(deviceSubCategoryCacheObject[value]){
      let  deviceTypeList = deviceSubCategoryCacheObject[value]
      this.setState({
        deviceTypeList: deviceTypeList
      })
    }
    this.triggerChange({
      "subCategoryId":value,
      "deviceTypeId": undefined,
      "deviceSubTypeId": undefined
    })
  }

  //选择设备三级类目
  deviceTypeListSelect(value){
    if(deviceTypeCacheObject[value]){
      let defaultDeviceSubtype =  deviceTypeCacheObject[value].defaultDeviceSubtype
      let deviceSubTypeId = defaultDeviceSubtype["deviceSubtypeId"]
      this.triggerChange({
        "deviceTypeId": deviceTypeCacheObject[value].deviceTypeId,
        "deviceSubTypeId":  deviceSubTypeId
      })
    }
  }

  componentDidMount(){
    let deviceCategoryList = this.props.deviceCategoryList || []
    // console.log("deviceCategoryList: " + JSON.stringify(deviceCategoryList))
  }


  componentWillUpdate(nextProps,nextState){

    if((!this.state.isCalculate && nextProps.value && nextProps.deviceCategoryList && nextProps.deviceCategoryList.length > 0)){

      let categoryId =  nextProps.value.categoryId
      let subCategoryId = nextProps.value.subCategoryId 
      if(!categoryId  || !subCategoryId){
        return
      }
      let deviceCategoryList = nextProps.deviceCategoryList
      deviceCategoryList.map((item, index) => {
        deviceCategoryCacheObject[item.categoryId] = item.subCategoryList

        //二级目录
        if(item.categoryId == categoryId){
          let subCategoryList = item.subCategoryList
          this.setState({
            deviceSubCategoryList:subCategoryList
          })

          subCategoryList.map((item, index) => {
            deviceSubCategoryCacheObject[item.subCategoryId] = item.deviceTypeList
            //三级目录
            if(item.subCategoryId == subCategoryId){
              let deviceTypeList = item.deviceTypeList
              this.setState({
                deviceTypeList:deviceTypeList
              })
              deviceTypeList.map((item, index) => {
                deviceTypeCacheObject[item.deviceTypeId] = item
              })
            }
          })
        }
      })

      this.setState({
        isCalculate:true
      })
    }
  }

  render () {
    let deviceCategoryList = this.props.deviceCategoryList || []
    let deviceSubCategoryList = this.state.deviceSubCategoryList 
    let deviceTypeList = this.state.deviceTypeList 


    let deviceCategoryProps = {}
    let deviceSubCategoryProps = {}
    let deviceTypeValueProps = {}
    if(this.props.value !== undefined){
      let defaultSubCategoryValue = this.props.value.subCategoryId 
      let defaultCategoryValue     = this.props.value.categoryId  
      let defaultDeviceSubTypeValue = this.props.value.deviceSubTypeId 
      let defaultDevicetypeValue     = this.props.value.deviceTypeId  
  
      deviceCategoryProps = {
        value:defaultCategoryValue
      }
      deviceSubCategoryProps = {
        value:defaultSubCategoryValue
      }
      deviceTypeValueProps= {
        value:defaultDevicetypeValue
      }
    }


    return (
      <div>
        <Select onSelect={this.deviceCategorySelect.bind(this)} placeholder="选择一级类目"    style={{width:150}}   {...deviceCategoryProps}>
          {
            deviceCategoryList.map((item,index) => {
              deviceCategoryCacheObject[item.categoryId] = item.subCategoryList
              return <Option value={item.categoryId} key={index}>{item.categoryName}</Option>
            })
          }
        </Select>
        <Select  onSelect={this.deviceSubCategorySelect.bind(this)} placeholder="选择二级类目" style={{width:150}}   {...deviceSubCategoryProps} >
        {
          deviceSubCategoryList.map((item,index) => {
            deviceSubCategoryCacheObject[item.subCategoryId] = item.deviceTypeList
            return <Option value={item.subCategoryId} key={index}>{item.subCategoryName}</Option>
          })
        }
        </Select>
        <Select  onSelect={this.deviceTypeListSelect.bind(this)} placeholder="选择三级类目"     style={{width:150}}   {...deviceTypeValueProps} >
        {
          deviceTypeList.map((item,index) => {
            deviceTypeCacheObject[item.deviceTypeId] = item
            return <Option value={item.deviceTypeId} key={index}>{item.deviceTypeName}</Option>
          })
        }
        </Select>
      </div>
    )
  }
}

export default DeviceThreedSelect