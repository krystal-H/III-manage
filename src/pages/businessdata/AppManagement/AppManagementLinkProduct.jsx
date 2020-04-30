import React, {PropTypes, Component} from 'react';
import { connect } from 'react-redux'
import { actionCreators } from './store';
import {Modal, Form, Card, Checkbox, Icon, Cascader, Input, Button, Radio} from 'antd';
import TableCom from '../../../components/Table';

import AppManagement from './AppManagement';
import './style.less'

const FormItem = Form.Item;

@Form.create()
class AppManagementLinkProduct extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: false, //加载
            query: {}, //关联产品查询值
            iosChecked: 1,//this.getAppVersionType(), 
            androidChecked: false,
            isShowMessage: false,

            parentType: [], //父标签类型值
            productIds:[], //勾选集合
        };
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.changeParType = this.changeParType.bind(this);
        this.filter = this.filter.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }
    componentDidMount() {
        this.getRealProductList(); // 获取产品列表
        this.getAppInfo(); //应用管理-获取应用详情
        // this.getProductIdList(); //获取已关联的产品列表 (不分页)

        this.oldSearchStatus = {
          parentType:[], //父标签类型值
      };
    }
    // getAppVersionType(){
    //   let {appInfo} = this.props
    //   let appVersionType = appInfo.appVersionType,
    //       iosChecked = 1;
    //   if(appVersionType==1){iosChecked = 1};
    //   if(appVersionType==2){iosChecked = 2};
    //   if(appVersionType==3){iosChecked = 1};
    //   if(appVersionType==0){iosChecked = ''};

    //   return iosChecked;
    // }
    getProductIdList(){ //获取已关联的产品列表 (不分页)
      let {appId, appType}  = this.props;
      let {iosChecked} = this.state;

      if(appType==2){ //appType:0--移动应用， 2--小程序应用(小程序有没appVersionType)
        iosChecked = ''
      }
      let opts={
        paged: false,
        appId: appId,
        appVersionType: iosChecked,
        version: 1.1
      }
      this.props.getProductIdList(opts).then((res) => {

        let {productIdList} = this.props;
        let list=[];
        for(let i=0; i<productIdList.list.length; i++){
          let {productId} = productIdList.list[i];
          list.push(productId);
        }
        this.setState({ loading: false, productIds:list});
      });
    }
    getRealProductList(pageIndex){  // 查询
        this.setState({ loading: true });
        pageIndex = pageIndex?pageIndex:1;
        let {appId} = this.props;
      
        let {parentType, productName} = this.state.query;
        let deviceTypeId = parentType?parentType[2].slice(0, parentType[2].indexOf(':')):'';
        let deviceSubtypeId = parentType?parentType[2].slice(parentType[2].indexOf(':') + 1):'';
        let opts={ 
          pageIndex:pageIndex, 
          deviceTypeId: deviceTypeId, 
          deviceSubtypeId: deviceSubtypeId, 
          productName:productName, 
          appId:appId, version:1.1
        }
        this.props.getRealProductList(opts).then((res) => {
          this.setState({ loading: false })
        });
    }
    getAppInfo(){
      let {appId} = this.props;
      this.props.GetAppInfo({appId:appId, version:1.1 }).then((res) => {
          if(res){
            // this.setState({iosChecked: this.getAppVersionType()});
            this.getProductIdList();
          }
      });;
    }
    handleCancel(){ //关闭关联产品弹窗
      this.setState({         
        productIds:[], //勾选集合
        parentType: [], //父标签类型值
        iosChecked: 1,//this.getAppVersionType(),
        isShowMessage: false
      },()=>{
        this.props.queryList(1);
        this.props._setParentState({
          visible: false,
        })
      })
    }
    includes = (arr, value)=>{
      let _includes = Array.prototype.includes;
  
      if(_includes){
          return _includes.call(arr, value);
      }
  
      return arr.indexOf(value) >= 0;
    };
  
    onChangeBox(productId){ //勾选
      let {productIds} = this.state;

      if(this.includes(productIds, productId)){
        productIds.forEach(function(item, index, arr) { //删除
            if(item == productId) {
                arr.splice(index, 1);
            }
        });
      }else{
        productIds.push(productId); //添加
      }

      this.setState({productIds});
    }
    onChangeAppTypeBox(e) {
      let val = e.target.value;
      // let {iosChecked} = this.state;

      // let value = e.target.checked;
      // let value = '';
      // if(type === 'iosChecked' && iosChecked==2){value = 1}
      // if(type === 'iosChecked' && iosChecked==1){return}
      // if(type === 'androidChecked' && iosChecked==1){value = 2}
      // if(type === 'androidChecked' && iosChecked==2){return}

      this.setState({iosChecked:val, loading:true, productIds:[]},()=>{
        this.getProductIdList();
      });
    }
    handleOk(){
      let {productIds, iosChecked} = this.state;
      let {appId, appType, appInfo}  = this.props;
      if(productIds.length==0){
        this.setState({
          isShowMessage:true,
        });
        return;
      }
 
      if(appType==2){ //appType:0--移动应用， 2--小程序应用(小程序有没appVersionType)
        iosChecked = null
      }

      // let appVersionType = appInfo.appVersionType;

      // if(appVersionType==0){
      //   iosChecked = 0
      // }
      
      let data={
        productIds: productIds.join(','),
        appId: appId,
        appVersionType: iosChecked,
        // version: 1.1
      }
      this.props.updateRelaPro(data).then((res) => {
        this.handleCancel();
      });;
    }
    changeParType(value) { //三级联动
      this.setState({parentType:value});
    }
    filter(inputValue, path) { //资源标签类型模糊搜索
      return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
    }
    handleFilter(e) { //查询功能
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.setState({ query: values }, () => {
            this.getRealProductList(1);
          })
        }
      })
    }
    handleReset(){
      this.props.form.resetFields(["parentType", "productName"])
      this.setState({ query: {} },()=>{
        this.getRealProductList(1);
      })
    }
    render(){
      let { getFieldDecorator } = this.props.form;
        let {visible, appId, appType, realProductList, realProductPage, appInfo} = this.props;
        let {loading, iosChecked, isShowMessage, productIds} = this.state;
        let column = [
            { title: "选择", dataIndex: 'mode', key: 'mode', width: "10%",render: (i,self)=>(<Checkbox checked={this.includes(productIds, self.productId)} onChange={this.onChangeBox.bind(this,self.productId)}/>)},
            { title: "产品ID", dataIndex: 'productId', key: 'productId', width: "30%"},
            { title: "产品名称", dataIndex: 'productName', key: 'productName', width: "30%" },
            { title: "所属分类", dataIndex: 'allCategoryName', key: 'allCategoryName', width: "30%" },
          ];
        // let checkbox=null;
        // if(appInfo&&appInfo.appVersionType){
        //     if(appInfo.appVersionType==1){
        //      checkbox=<div><Radio checked={iosChecked} onChange={this.onChangeAppTypeBox.bind(this,'iosChecked')}>Android应用</Radio></div>
        //     }
        //     if(appInfo.appVersionType==2){
        //       checkbox=<div><Radio checked={iosChecked} onChange={this.onChangeAppTypeBox.bind(this,'androidChecked')}>iOS应用</Radio></div>
        //     }
        //     if(appInfo.appVersionType==3){
        //       checkbox=<div><Radio checked={iosChecked==1?true:false} onChange={this.onChangeAppTypeBox.bind(this,'iosChecked')}>Android应用</Radio>
        //       <Radio checked={iosChecked==2?true:false} onChange={this.onChangeAppTypeBox.bind(this,'androidChecked')}>iOS应用</Radio></div>
        //     }
        // }
        return (<div>
        <Modal
          title="添加关联产品"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={1100}
          style={{marginTop: "-55px"}}
        > 
          {appType==0?<div className="linkProduct-appType" >
            <p>关联应用类型</p>
            <Radio.Group onChange={this.onChangeAppTypeBox.bind(this)} defaultValue={iosChecked}>
              <Radio.Button value={1}>Android应用</Radio.Button>
              <Radio.Button value={2}>iOS应用</Radio.Button>
            </Radio.Group>
            <div className="showMessage">
              {isShowMessage?<i className="i"><Icon type="exclamation-circle" style={{color:"red", marginRight: "10px"}}/>请选择关联产品和应用</i>:null}
            </div>
          </div>:null}
          <div className="linkProduct-queryItem">
            <Form layout="inline">
              <FormItem label="所属分类">
                {getFieldDecorator('parentType', {})(
                  <Cascader
                    options={this.props.parentTagType}
                    onChange={this.changeParType}
                    showSearch={this.filter}
                    style={{width:"215px"}}
                    placeholder='请选择所属分类'
                    changeOnSelect 
                  />
                )}
              </FormItem>
              <FormItem label="关键字：">
                {getFieldDecorator('productName', {})(
                    <Input placeholder="请输入产品ID或名称" maxLength={20}/>
                )}
              </FormItem>
              <FormItem  >
                <Button type="primary" onClick={this.handleFilter}>查询</Button>
              </FormItem>
              <FormItem >
                <Button onClick={this.handleReset}>重置</Button>
              </FormItem>
            </Form>
          </div>
          <Card bodyStyle={{maxHeight:600}}>
            <TableCom rowKey={"linkProductId"} columns={column} dataSource={realProductList} pager={realProductPage} onPageChange={this.getRealProductList.bind(this)} loading={loading} scroll={{ y: 300 }}/>
          </Card>
        </Modal>
        </div>);
    }
}
const mapStateToProps = (state) => ({
  realProductList: state.getIn(["appManagement","realProductList"]).toJS(),
  realProductPage: state.getIn(["appManagement","realProductPage"]).toJS(),
  appInfo: state.getIn(["appManagement","appInfo"]).toJS(),
  productIdList: state.getIn(["appManagement","productIdList"]).toJS(),
})

const mapDispatchToProps = (dispatch) => ({
  getRealProductList: (pager) => {
    return dispatch(actionCreators.getRealProductList(pager))
  },
  updateRelaPro: (data)=>{
    return dispatch(actionCreators.updateRelaPro(data))
  },
  GetAppInfo: (data)=>{
    return dispatch(actionCreators.GetAppInfo(data))
  },
  getProductIdList: (pager)=>{
    return dispatch(actionCreators.getProductIdList(pager))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(AppManagementLinkProduct);
