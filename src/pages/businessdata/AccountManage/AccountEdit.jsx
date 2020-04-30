import React from 'react';
import { Button, Form, Input, Cascader } from 'antd';
import TitleTab from '../../../components/TitleTab';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import {actionCreators} from './store';

const FormItem = Form.Item;


class AccountEdit extends React.Component {
  // 返回
  handleBack = () => {
    this.props.history.go(-1);
  }

  // 保存信息
  handleSave = () => {
    const {form} = this.props;
    const value = form.getFieldsValue();
    const { id } = this.props.match.params;
    const [province, city] = value.provinceCity || [];
    delete value.provinceCity;
    this.props.updateAccount({developerId: id, ...value, province, city}).then(res => {
      if(res){
        this.props.history.push(`/businessdata/accountManage/${id}`);
      }
    });
  }

  componentDidMount(){
    const {accountDetail, province} = this.props;
    const { id } = this.props.match.params;
    // 获取省市列表
    if(!!!province.length){
      this.props.getProvince();
    }
    // 获取用户详情
    if(!!!accountDetail.id){
      this.props.getAccountDetail(id);
    }
  }

  loadData = selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    this.props.getCityByProvinceId(targetOption.value);
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 10, offset: 1 },
    };
    const { form, accountDetail, province } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className="account-manage">
        <TitleTab title="编辑用户详情" >
          <Button type="primary" className="btn-back" onClick={this.handleBack}>返回</Button>
        </TitleTab>
        <div className="account-content">
          <Form style={{ width: 800, paddingBottom: 50 }}>
            <FormItem>
              <h2>基本信息</h2>
            </FormItem>
            <FormItem label="账号ID" {...formItemLayout}>
              <span>{accountDetail.id || ""}</span>
            </FormItem>
            <FormItem label="手机号码"  {...formItemLayout}>
              {getFieldDecorator("mobilePhone")(
                <Input placeholder="请输入手机号码" maxLength={11} />
              )}
            </FormItem>
            <FormItem label="电子邮箱"  {...formItemLayout}>
              {getFieldDecorator("email")(
                <Input placeholder="请输入电子邮箱" maxLength={30} />
              )}
            </FormItem>
            <FormItem label="注册时间"  {...formItemLayout}>
              <span>{accountDetail.createTime || ""}</span>
            </FormItem>
            <FormItem>
              <h2>联系信息</h2>
            </FormItem>
            <FormItem label="国家"  {...formItemLayout}>
              <Input disabled value="中国" />
            </FormItem>
            <FormItem label="所在地区"  {...formItemLayout}>
              {getFieldDecorator("provinceCity")(
                <Cascader options={province} placeholder="请选择所在地区"  loadData={this.loadData} onChange={this.handleChange} changeOnSelect/>
              )}
            </FormItem>
            <FormItem label="联系地址"  {...formItemLayout}>
              {getFieldDecorator("contactAddr")(
                <Input placeholder="请输入联系地址" maxLength={60} />
              )}
            </FormItem>
            <FormItem label="联系人"  {...formItemLayout}>
              {getFieldDecorator("contactPerson")(
                <Input placeholder="请输入联系人" maxLength={20} />
              )}
            </FormItem>
            <FormItem label="联系电话"  {...formItemLayout}>
              {getFieldDecorator("contactPhone")(
                <Input placeholder="请输入联系电话" maxLength={20} />
              )}
            </FormItem>
            <FormItem style={{ textAlign: "center" }}>
              <Button type="primary" className="btn-ok" onClick={this.handleSave}>确定</Button>
              <Button type="default" className="btn-cancel" onClick={this.handleBack}>取消</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  accountDetail: state.getIn(["accountManage", "accountDetail"]).toJS(),
  province: state.getIn(["accountManage", "province"]).toJS(),
  city: state.getIn(["accountManage", "city"]).toJS(),
});

const mapDispatchToProps = (dispatch) => ({
  getAccountDetail: (id) => dispatch(actionCreators.getAccountDetail(id)),
  getProvince: () => dispatch(actionCreators.getProvince()),
  getCityByProvinceId: (provinceId) => dispatch(actionCreators.getCityByProvinceId(provinceId)),
  updateAccount: (params) => dispatch(actionCreators.updateAccount(params)),
  modifyAccount: (params) => dispatch(actionCreators.modifyAccount(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({
  mapPropsToFields(props){
    return props.accountDetail ? {
      mobilePhone: Form.createFormField({
        value: props.accountDetail.mobilePhone
      }),
      email: Form.createFormField({
        value: props.accountDetail.email
      }),
      contactAddr: Form.createFormField({
        value: props.accountDetail.contactAddr
      }),
      contactPerson: Form.createFormField({
        value: props.accountDetail.contactPerson
      }),
      contactPhone: Form.createFormField({
        value: props.accountDetail.contactPhone
      }),
      provinceCity: Form.createFormField({
        value: [+props.accountDetail.province, +props.accountDetail.city]
      }),
    } : {};
  },
  onFieldsChange(props, changedFields, allFields){
    for(let i in changedFields){
      if(i !== "provinceCity"){
        props.modifyAccount({
          [i]: changedFields[i].value
        });
      }else{
        const [province, city] = changedFields[i].value;
        props.modifyAccount({
          province, city
        });
      }
    }
  },
})(withRouter(AccountEdit)));