import React , { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox, Alert } from 'antd';
import {CryptoTool} from '../../util/utils'
import './Login.less'
import logo from '../../assets/images/logo01.png'
import {LoginRequest} from '../../apis/login'
import {withRouter} from 'react-router-dom'
import {connect} from  'react-redux'
import {AuthorizedSuccess} from '../../store/globalAuthorized/actionCreators'

const mapDispatchToProps = (dispatch) => {
  return {
    setLoginSuccess: (data,) => {
      dispatch(AuthorizedSuccess(data))
    }
  }
}

@connect(null,mapDispatchToProps)
@withRouter
class Login extends Component 
{
  constructor(props){
    super(props)
    this.state = {
      account: localStorage.getItem('clifeManageUsername') ? localStorage.getItem('clifeManageUsername') : '',
      password: localStorage.getItem('clifeManagePass') ? CryptoTool.decryption(localStorage.getItem('clifeManagePass')) : '',
      checked: localStorage.getItem('isPassRememberclifeManage') ? localStorage.getItem('isPassRememberclifeManage') : false ,
      loginStatus: "",
      isSubmit:false
    }
  }

  handleSubmit(e){
    e.preventDefault();
    this.setState({
      loginStatus:"",
      isSubmit: true,
    })
    this.props.form.validateFields((err, values) => {
        if(!err){
          //console.log('receive values of form:', values);
          let username = values.username;
          username = username.trim()
          let uncrypassword = values.password;
          let password = CryptoTool.encryption(uncrypassword)
          let checked = values.checked
          LoginRequest({
            username,
            password
          }).then(response => {
            let {data} = response;
            if(data.code === 0){
              localStorage.setItem('clifeManageUsername',username);
              if(checked){
                localStorage.setItem('clifeManagePass',CryptoTool.encryption_base64(uncrypassword));
                localStorage.setItem('isPassRememberclifeManage',checked);
              }else{
                localStorage.removeItem('clifeManagePass');
                localStorage.removeItem('isPassRememberclifeManage');
              }
              this.props.setLoginSuccess(data.data)
              this.props.history.push('/home');
            }else{
                this.setState({
                  loginStatus:"error"
                })
            }
          })
        }
    })
  }

  changeCheckBox(e){
    this.setState({
      checked:e.target.checked
    })
  }

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render(){
    const { getFieldDecorator } = this.props.form;
    let initUserName = this.state.account;
    let initPassword = this.state.password;
    let checked = this.state.checked == "true"
    
    return (
      <div className="container">
        
        <div className="logo">
          <img src={logo}></img>
        </div>
        <div className="title">
          <p>物联网平台管理后台</p>
        </div>
        <div className="main">
          {
            this.state.loginStatus === "error" && this.state.isSubmit === true &&
            this.renderMessage("用户名或密码错误！")
          }
          <Form onSubmit={this.handleSubmit.bind(this)} className='login-form'>
            <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
              initialValue: initUserName
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />
            )}
            </Form.Item>
            <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
              initialValue: initPassword
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />
            )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('checked', {
                valuePropName:'checked',
                initialValue: checked,
              })(<Checkbox onChange={this.changeCheckBox.bind(this)}>Remember me</Checkbox>)}
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);
export default WrappedNormalLoginForm