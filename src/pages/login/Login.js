import React , { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox, Alert } from 'antd';
import {CryptoTool} from '../../util/utils'
import './Login.less'
import logo from '../../assets/images/logo01.png'
import {LoginRequest} from '../../apis/login'
import {withRouter} from 'react-router-dom'
import {connect} from  'react-redux'
import {AuthorizedSuccess} from '../../store/globalAuthorized/actionCreators'

import axios from '../../util/api.request';

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
      isSubmit:false,

      phone:'',
      getagain:false,
      counttime:0,
      modPage:1,
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
              let uniqueId = localStorage.getItem('uniqueId');
              axios.Get('/manage-open/common/sms/check/uniqueId',{uniqueId:uniqueId}).then((res) => { //uniqueId校验，成功则不需要再手机短信码验证
                res = res.data;
                if(res.code==0){
                  this.props.history.push('/home');
                }else{
                  this.setState({modPage:2},()=>{
                    axios.Get('/manage-open/common/sms/obtain/current/user/info').then((res) => {
                      let result = res.data
                      if(result.code==0){
                        this.setState({phone:result.data.phone})
                        
                      }
                    });
                  })
                }
              });
              
              
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

  getCode=()=>{
		const { getFieldValue } = this.props.form;
		let tel = getFieldValue('telnumber');
		let error = '';
		if(!tel){
			error = '请填写手机号';
		}else if(!/^1\d{10}$/.test(tel)){
			error = '请填写正确格式的手机号';
		}
		if(!!error){
		alert(error)
			return false;
		}
		this.setState({
			getagain:true,
			counttime:60,
		},()=>{
			let inter = setInterval(()=>{
				let counttime = this.state.counttime;
				if(counttime>0){
					this.setState({counttime:counttime-1})
				}else{
					clearInterval(inter)
				}
			},1000)
		})


		axios.Get('/manage-open/common/sms/send/sms',{phone:tel}).then((res) => {});

  }
  
  phoneCode=(e)=>{
    e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
			    let _values = {...values};
          axios.Get('/manage-open/common/sms/check/randomcode',{randomCode:_values.code}).then((res) => {
            res = res.data;
            if(res.code==0){
              localStorage.setItem('uniqueId',res.data)
              this.props.history.push('/home');

            

            }

          });	
		  }
		});

  }



  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render(){
    const { getFieldDecorator } = this.props.form;
    let initUserName = this.state.account;
    let initPassword = this.state.password;
    let checked = this.state.checked == "true";
    let {modPage,phone,counttime,getagain} =this.state;
    let timestr = counttime>0&&` (${counttime})`||'';
    
    return (
      <div className="container">
        
        <div className="logo">
          <img src={logo}></img>
        </div>
        <div className="title">
          <p>物联网平台管理后台</p>
        </div>

        {
          modPage==1 &&
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

          || <div className="main" style={{color:'rgba(0, 0, 0, 0.65)',width:'400px',padding:'20px 20px 0'}}>

        <Form className="" onSubmit={this.phoneCode}>
          <Form.Item label='手机号'>
            {getFieldDecorator('telnumber', {
              rules: [{ required: true, message: '请输入手机号' },{ pattern: /^1\d{10}$/ , message: '手机号格式不正确'}],
              initialValue:phone
            })(
              <Input placeholder="请输入手机号" disabled={!!phone}/>,
            )}
          </Form.Item>
          <Form.Item label='验证码'>
            {getFieldDecorator('code', {
            rules: [{ required: true, message: '请输入验证码' }],
            
                })(
            <Input placeholder="请输入验证码" style={{'width':'220px'}}/>,
            )}

              <Button style={{'width':'130px','float':'right',marginTop:'4px'}} 
              onClick={this.getCode}
              disabled={counttime>0}

            >发送验证码{timestr}</Button>
          </Form.Item>
		  
		 
          <Form.Item className="login-form-button">
            <Button type="primary" htmlType="submit" disabled={!getagain} style={{float:'right',width:'100px'}}>
              确认
            </Button>
          </Form.Item>
        </Form>


          </div>

				}	



      </div>
    )
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);
export default WrappedNormalLoginForm