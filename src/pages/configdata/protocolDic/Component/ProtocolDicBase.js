import React from 'react'
import {Form, Input, Button,Table,Upload,Icon,message, Cascader} from 'antd'
import {REQUEST_SUCCESS} from '../../../../config/config'
import DeviceTypeSelectFormItem from '../../../../components/DeviceTypeSelectFormItem/DeviceTypeSelectFormItem'
import {connect} from 'react-redux'
import TableCom from '../../../../components/Table'
import './ProtocolDicBase.less'

const FormItem = Form.Item

const mapStateToProps =(state) => {
  let deviceCascaderList = state.getIn(['globalDeviceInfo','deviceCascaderList'])
  return {
    deviceCascaderList
  }
}

@connect(mapStateToProps)
@Form.create()
class ProtocolDicBase extends React.Component 
{
  constructor(props){
    super(props)
    this.state ={
      dataSource:[],
      pageIndex:0,
      pageRows:10,
      isLoading:false,
      pager:{},
      searchParams:{}
    }
  }
  
  handelUploadFile(info){
    if (info.file.status !== 'uploading') {
      //console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      let response = info.file.response
      let code = response.code
      if(code == 0){
        message.success(`${info.file.name} 文件上传成功`)
        //成功后刷新table
        this.refreshTable()
      }else{
        message.error(`${response.msg}`);
      }
      
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败.`, 10)
    }
  }

  refreshTable(){
    console.log("refresh Table")
    let params = {
      pageRows:this.state.pageRows,
      pageIndex:this.state.current
    }
    this.getChildTableRequest(params)
  }

  handleSearch(e){
    e.preventDefault();
    this.props.form.validateFields((err, values)=> {
        console.log("value:" +JSON.stringify(values));
        let params = {}
        //过滤formitem 的内容，转换成request的参数
        this.props.filterPannel.map( (item, index) => {
          if(item.type == 'DeviceType'){
            let deviceTypeSelectValue = values['deviceTypeSelect']
            if(deviceTypeSelectValue && deviceTypeSelectValue.length == 3){
              let key = item.paramskey
              let deviceTypeId = deviceTypeSelectValue[2]
              params[key] = deviceTypeId
            }
          }else{
            let key = item.paramskey
            let value = values[key]
            if(value){
              params[key] = value
            }
          }
        })
        this.setState({
          searchParams: params
        })
        this.getChildTableRequest(params)
    })
  }

  
  handlePagination(current){
    this.setState({
      pageIndex:current,
    })
    let params = {
      pageRows:this.state.pageRows,
      pageIndex:current
    }
    params = Object.assign({}, this.state.searchParams, params)
    this.getChildTableRequest(params)
  }

  getFilterPannel(){
    let {getFieldDecorator} = this.props.form
    let deviceCascaderList = this.props.deviceCascaderList
    let pannel= this.props.filterPannel.map((item, index) => {
        if(item.type === 'Input'){
          return (
            <FormItem label={item.title} key={index}>
              {getFieldDecorator(item.paramskey)(
                  <Input placeholder={item.placeholder} maxLength={20} style={{width:"260px"}}></Input>
                )}
          </FormItem>)
        }else if(item.type === 'DeviceType'){
         return (
          <FormItem label={item.title} key={index}>
            {getFieldDecorator("deviceTypeSelect")(
                <Cascader options={deviceCascaderList} placeholder="请选择所属分类" style={{width:"260px"}}></Cascader>
              )}
          </FormItem>) 
        }else{
          return <span></span>
        }
    })

    return pannel
  }

  componentDidMount(){
    this.getChildTableRequest()
    this.props.refFunction(this.refreshTable.bind(this))
  }

  getChildTableRequest(params){
    this.setState({isLoading:true})
    this.props.getTableRequest(params).then(res => {
      this.setState({isLoading:false})
      let code = res.data.code 
      if(code === REQUEST_SUCCESS){
        let data = res.data.data.list 
        let pager = res.data.data.pager
        this.setState({
          dataSource:data,
          isLoading: false,
          pager:pager
        })
      }
    }).catch(err => {
      this.setState({
        isLoading: false
      })
    })
  }

  //新建的事件传递
  handleNewProtocolDic(){
    this.props.handleNewProtocolDic()
  }

  //清除数据
  resetFields(){
    this.setState({
      searchParams: {}
    })
    this.props.form.resetFields();
  }

  render(){
    return (
      <div>
        <div style={{  marginBottom:"10px"}}>
          {/* <div ><Button><a href={this.props.download}><Icon type="download"/>下载模板</a></Button></div>
            <Upload 
              style={{marginLeft:"10px", marginRight:"10px"}}
              name="uploadExcel" 
              showUploadList={false} 
              action={this.props.upload}
              onChange={this.handelUploadFile.bind(this)}
              accept=".xls,.xlsx"
              >
              <Button>
                <Icon type="upload"></Icon>导入模板
              </Button>
            </Upload>  20200402屏蔽模板上传下载 */}
            <Button style={{float:'right'}} type="primary" onClick={this.handleNewProtocolDic.bind(this)}>新建</Button>
        </div>
        <Form layout="inline" onSubmit={this.handleSearch.bind(this)} style={{marginBottom:'10px'}}>
          {this.getFilterPannel()}
          <FormItem >
              <Button htmlType="submit" >查询</Button>
          </FormItem>
          <FormItem >
              <Button onClick={this.resetFields.bind(this)} >重置</Button>
          </FormItem>
        </Form>
        <TableCom
            className="proptcolDicBase"
            bordered
            columns={this.props.columns}
            dataSource={this.state.dataSource}
            rowKey={this.props.rowKey} 
            onPageChange={this.handlePagination.bind(this)}
            pager={this.state.pager}
            loading={this.state.isLoading}
          />
      </div>

    )
  }
}

export default  ProtocolDicBase