import React from 'react'
import {Select} from 'antd'
import FuncType from '../Func/FuncType'
import FuncTypeBit from '../Func/FuncTypeBit'
import {Col, Row, Form, Input} from "antd";

const FormItem = Form.Item;

const Option = Select.Option


//数据类型
const protocolTypes = [
  { id: 1, name: "字符", content: [{ placeholder: "", defaultLen: 1, defaultUnit: 1 }] },
  { id: 2, name: "数值", content: [{ placeholder: "", defaultLen: 1, defaultUnit: 1 }] },
  { id: 3, name: "枚举", content: [{ placeholder: "", defaultLen: 1, defaultUnit: 1 }] },
  { id: 4, name: "布尔", content: [{ placeholder: "", defaultLen: 1, defaultUnit: 1 }] },
  { id: 5, name: "绝对时间", content: [{ placeholder: "时间戳数据位", defaultLen: 13, defaultUnit: 1 }] },
  {
      id: 6, name: "相对时间", content: [
          { placeholder: "\"天\"数据位", defaultLen: 1, defaultUnit: 1 },
          { placeholder: "\"时\"数据位", defaultLen: 1, defaultUnit: 1 },
          { placeholder: "\"分\"数据位", defaultLen: 1, defaultUnit: 1 }
      ]
  },
  {
      id: 7, name: "循环时间", content: [
          { placeholder: "\"天\"数据位", defaultLen: 1, defaultUnit: 1 },
          { placeholder: "\"周\"数据位", defaultLen: 1, defaultUnit: 1 },
          { placeholder: "\"时\"数据位", defaultLen: 1, defaultUnit: 1 },
          { placeholder: "\"分\"数据位", defaultLen: 1, defaultUnit: 1 }
      ]
  },
  {
      id: 8, name: "RGB颜色", content: [
          { placeholder: "\"红色\"数据位", defaultLen: 1, defaultUnit: 1 },
          { placeholder: "\"黄色\"数据位", defaultLen: 1, defaultUnit: 1 },
          { placeholder: "\"蓝色\"数据位", defaultLen: 1, defaultUnit: 1 }
      ]
  },
  { id: 9, name: "二进制", content: [{ placeholder: "", defaultLen: 1, defaultUnit: 1 }] },
  { id: 10, name: "数组", content: [{ placeholder: "\"天\"数据位", defaultLen: 1, defaultUnit: 1 }] },
  { id: 11, name: "结构体", content: [{ placeholder: "\"天\"数据位", defaultLen: 1, defaultUnit: 1 }] },


]


class FuncSelectItem extends React.Component 
{
  constructor(props){
    super(props)

    this.state = {
      functionDetailList: null,
      childfunclist:[{
        functionDetailName:'',
        functionMark:'',
        functionDataType:1,
        functionLength:''
      }],
      protocolType:  protocolTypes[this.props.functionDataType - 1] || protocolTypes[0]
    }
  }

handleChange = (val) => {
    this.setState({
        protocolType: protocolTypes[val - 1]
    }, function () {
        if(val<10){
            const len = protocolTypes[val - 1].content.length;
            let arr = [];
            for (var i = 0; i < len; i++) {
                arr.push("id_" + i);
                arr.push("field_" + i);
                arr.push("len_" + i);
                arr.push("unit_" + i);
            }
            this.props.form.resetFields(arr);

        }
        
    })
}

  componentWillReceiveProps(nextProps) {
     
        const { functionDataType, visibleModal,functionDetailList } = this.props;
        console.log('....Props..functionDetailList---',functionDetailList,nextProps.functionDetailList);
        if (functionDataType != nextProps.functionDataType || visibleModal != nextProps.visibleModal ) {
            this.setState({
                protocolType: protocolTypes[nextProps.functionDataType - 1],
                functionDetailList: nextProps.functionDetailList
                
            })
            if(nextProps.functionDataType==11){
              let childlist = nextProps.functionDetailList&&nextProps.functionDetailList[0]&&nextProps.functionDetailList[0].subFunctionDetailList || [];
              if (childlist.length == 0){
                childlist.push({
                  functionDetailName:'',
                  functionMark:'',
                  functionDataType:1,
                  functionLength:''
                });
              }
              console.log(111,nextProps.functionDetailList);
    
              this.setState({childfunclist: childlist});
            }
            
        }

        
        
  }

  handleAdd = () => {
      let {childfunclist} = this.state;
      let addlist = JSON.parse(JSON.stringify(childfunclist));
      addlist.push({
            functionDetailName:'',
            functionMark:'',
            functionDataType:'',
            functionLength:''
          })
      this.setState({
          childfunclist: addlist
      })
  }


  handleAdd = () => {
    let {childfunclist} = this.state;
    let addlist = JSON.parse(JSON.stringify(childfunclist));
    addlist.push({
          functionDetailName:'',
          functionMark:'',
          functionDataType:'',
          functionLength:''
        })
    this.setState({
        childfunclist: addlist
    })
}

handleDel = (index) => {
  let {childfunclist} = this.state;
  let sublist = JSON.parse(JSON.stringify(childfunclist));
  sublist.splice(index,1);
  this.setState({
      childfunclist: sublist
  })
}


  render(){
    const { protocolType,functionDetailList,childfunclist} = this.state;
    console.log('...childfunclist...',childfunclist);
    
    const { form} = this.props;
    const {getFieldDecorator} = form;
    const formItemLayout = {
      labelCol: {xs: { span: 24 },sm: { span: 5 },},
      wrapperCol: {xs: { span: 24 },sm: { span: 17 },},
    }
    const childformItemLayout = {
        labelCol: {xs: { span: 24 },sm: { span: 7 },},
        wrapperCol: {xs: { span: 24 },sm: { span: 16 },},
      }
    let contmod = <div></div>;
    if(protocolType.id==9){
        contmod = <FuncTypeBit functionDetailList={functionDetailList} form={this.props.form} /> 
    }else if(protocolType.id==10){
        contmod = <div>
            <FormItem label="数据标识" {...childformItemLayout}>
              {getFieldDecorator("functionMark",{rules:[{required:true,message:"数据标识不能为空"}] })(
                <Input placeholder="50个以内的字符" maxLength={50} ></Input>
              )}
            </FormItem>
            <FormItem label="元素类型" {...childformItemLayout}>
              {getFieldDecorator("functionDataTypeChild",{rules:[{required:true,message:"元素类型不能为空"}],initialValue:1})(
                <Select placeholder="选择元素类型">
                    <Option value={1} >字符型</Option>
                    <Option value={2} >数值型</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label="元素字节长度" {...childformItemLayout}>
              {getFieldDecorator("functionLength",{rules:[{required:true,message:"元素字节长度"}]})(
                <Input placeholder="最大不超过1000" maxLength={4} ></Input>
              )}
            </FormItem>
        </div>
    }else if(protocolType.id==11){
        contmod = <div>
           
            <FormItem label="数据标识" {...formItemLayout} style={{marginBottom:"0"}}>
              {getFieldDecorator("functionMark",{rules:[{required:true,message:"数据标识不能为空"}] })(
                <Input placeholder="50个以内的字符" maxLength={50} ></Input>
              )}
            </FormItem>
            <FormItem label="JSON对象" {...formItemLayout} style={{marginBottom:"0"}}>
              {getFieldDecorator("JSONobj",{rules:[{required:true,message:""}],initialValue:123  },)(
                <Input  type='hidden' ></Input>
              )}
            </FormItem>
            <Row ><Col span={6}><span>参数名称</span></Col>
                  <Col span={6}><span>数据标识</span></Col>
                  <Col span={5}><span>数据类型</span></Col>
                  <Col span={4}><span>字节长度</span></Col>
                  <Col span={3} style={{textAlign: "right"}}><span>操作</span></Col>
            </Row>
            {
              childfunclist.map((item,index) => {
                return <Row gutter={4} key={'childfunc_'+index} >
                  <Col span={6}>
                    <FormItem style={{marginBottom:"0"}}>
                        {getFieldDecorator('functionDetailName_'+index, {
                            initialValue: item.functionDetailName || "",
                            rules: [{ required: true, message: '字段不能为空'}]
                        })(
                            <Input placeholder='参数名称' maxLength={50} size="small"/>
                        )}
                    </FormItem>
                  </Col>
                  <Col span={6}>
                    <FormItem style={{marginBottom:"0"}}>
                        {getFieldDecorator('functionMark_'+index, {
                            initialValue: item.functionMark || "",
                            rules: [{ required: true, message: '字段不能为空'}]
                        })(
                            <Input placeholder='数据标识' maxLength={50} size="small"/>
                        )}
                    </FormItem>
                  </Col>
                  <Col span={5}>
                    <FormItem style={{marginBottom:"0"}}>
                        {getFieldDecorator('functionDataType_'+index, {
                            initialValue: item.functionDataType || 1,
                            rules: [{ required: true, message: '字段不能为空'}]
                        })(
                          <Select placeholder="选择数据类型" size="small">
                              <Option value={1} >字符型</Option>
                              <Option value={2} >数值型</Option>
                              <Option value={3} >枚举型</Option>
                              <Option value={4} >布尔型</Option>
                          </Select>
                        )}
                    </FormItem>
                  </Col>
                  <Col span={4}>
                    <FormItem style={{marginBottom:"0"}}>
                        {getFieldDecorator('functionLength_'+index, {
                            initialValue: item.functionLength || "",
                            rules: [{ required: true, message: '字段不能为空'}]
                        })(
                            <Input placeholder='字节长度' maxLength={4} size="small"/>
                        )}
                    </FormItem>
                  </Col>
                  <Col span={3} style={{textAlign: "right"}}>
                      {index > 0 ? <a onClick={this.handleDel.bind(this, index)}>删除</a> : <p>&nbsp;</p>}
                  </Col>
                </Row>
              })

            }
            <Row >
                    <Col span={24} style={{textAlign:"right"}}>
                        <a onClick={this.handleAdd}>添加</a>
                    </Col>
                </Row>
        </div>

    }else{
        contmod = <FuncType protocolType={protocolType} form={this.props.form} />
    }

    return      ( 
        <FormItem  {...formItemLayout} label="协议类型" >
          {getFieldDecorator('functionDataType', {
              initialValue: 1,
              rules: [{ required: true, message: "请选择协议类型" }],
          })(
              <Select
                  placeholder="选择协议类型"
                  onChange={this.handleChange}
              >
                  {
                      protocolTypes.map((item) => {
                          return <Option value={item.id} key={item.id}>
                              {item.name}
                          </Option>
                      })
                  }
              </Select>
          )}
          {contmod}

          

        </FormItem>
        )
  }
}

export default FuncSelectItem