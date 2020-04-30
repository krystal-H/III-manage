import React from 'react'
import {Select} from 'antd'
class SelectAll extends React.Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){

  }

  onChange = (key, item) => {
    if(key.includes('all')){
      const value = this.props.value || [];
      if(value.length === this.props.children.length){
        this.triggerChange([])
      }else{
        let keyArr = this.props.children.map(x => {
          return x.props.value
        })
        this.triggerChange(keyArr)
      }
    }else{
      this.triggerChange(key)
    }
  }

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      onChange(
        changedValue
      );
    }
  };

 

  render(){
    return (
      <Select mode="multiple" {...this.props} onChange={this.onChange} showArrow={true}> 
        <Select.Option key="all" style={{backgroundColor:'#eee'}}>
          <span style={{fontWeight:'bold'}}>全选</span>
        </Select.Option>
        {this.props.children}
      </Select>
    )
  }
}
export default SelectAll