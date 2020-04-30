import React from 'react'
import {Form,Checkbox,Row,Col, Input, Button,Pagination } from 'antd'


class ObserverEditStepOne extends React.Component {

  state = {
    labelKey:"",
    labelValue:"",
    pageIndex:1,
  }

  componentDidMount(){
    this.props.onRef(this);
  }
  changePage(pageIndex) {
    this.setState({
      pageIndex
    },()=>{
      let {labelKey, labelValue,pageIndex} = this.state;
      this.props.filterLabelAction({labelKey, labelValue,pageIndex})
    })
}

  resetAction = () => {
    this.setState({
      labelKey:'',
      labelValue:'',
      pageIndex:1,
    },this.props.filterLabelAction())
    
  }

  filterAction = () => {
    let {labelKey, labelValue} = this.state;
    let pageIndex = 1;
    let para = {labelKey, labelValue,pageIndex}
    // console.log(para)
    this.props.filterLabelAction(para)
  }

  validataForm = (callback) => {
    this.props.form.validateFieldsAndScroll((err, data) => {
      if(!err){
        this.props.nextStepAction()
        if (callback){
          callback()
        }
      }
    })
  }

  filterKeyAction = (e)  =>{
    let value = e.target.value
    this.setState({
      labelKey:value
    })
  }

  filterValueAction = (e)  =>{
    let value = e.target.value
    this.setState({
      labelValue:value
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const formLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 21 },
    };
    let {labelOptions} = this.props;
    let {pager={},list=[]} = labelOptions;
    let {labelKey,labelValue } = this.state;
    return (
      <div style={{display:'flex', flexDirection:'column', justifyContent:'space-arround'}}>
        <div style={{display: "flex",flexDirection: "row",justifyContent: "center",marginBottom:'30px'}} >
          <Input placeholder="请输入标签Key" style={{width:"150px",margin:"0px 20px"}} value={labelKey} onChange={this.filterKeyAction}></Input>
          <Input placeholder="请输入标签Value" style={{width:"150px",margin:"0px 20px"}} value={labelValue}  onChange={this.filterValueAction}></Input>
          <Button type="primary" htmlType="submit" style={{margin:"0px 20px"}} onClick={this.filterAction}>过滤</Button>
          <Button type="submit" onClick={this.resetAction}>重置</Button>
        </div>
        <Form {...formLayout} >
          <Form.Item label="数据标签">
          {
            getFieldDecorator('observerLabel', {
                rules: [{ required: true, message: '请选择标签' }],
                initialValue:[426],
                
            })(
              <Checkbox.Group style={{width:"100%"}}>
                <Row >
                {
                  list.map(item => {
                    return (<Col xs={{span:8}} key={item.labelId}>
                    <Checkbox checked value={item.labelId} >{item.labelKey}-{item.labelValue}</Checkbox>
                    </Col>)
                  })
                }
                </Row>
              </Checkbox.Group>
            )
          }
          {/*<p>备注：仅可选择此账号下标注过设备的标签。</p>*/}
          </Form.Item>
        </Form>
        {
                                pager && pager.totalRows>0 &&
                                <Pagination className="self-pa"
                                    total={pager.totalRows}
                                    current={pager.pageIndex}
                                    defaultCurrent={1}
                                    defaultPageSize={50}
                                    onChange={(page) => this.changePage(page)}
                                    showTotal={total => <span>共 <a>{total}</a> 条</span>}
                                    showQuickJumper
                                    hideOnSinglePage
                                ></Pagination>
                            }
      </div>
    )
  }
}

const stepOne =  Form.create({
  name:"ObserverEditStepOne",
  onFieldsChange(props , changedFields, allFields){
    props.onChange(changedFields);
  },
  mapPropsToFields(props){
    const { observerLabel , filterKey,filterValue } = props;
    console.log('ToFieldsobserverLabel----',observerLabel);
    let obj = {
      observerLabel: Form.createFormField({
        ...observerLabel,
      }),
      filterKey: Form.createFormField({
        ...filterKey,
      }),
      filterValue: Form.createFormField({
        ...filterValue,
      }),
    };
    return obj
  }
})(ObserverEditStepOne)

export default stepOne;
