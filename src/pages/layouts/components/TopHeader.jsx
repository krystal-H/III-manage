import React, { Component } from "react";
import { Icon, Badge, Button, Menu, Dropdown, Avatar ,notification} from "antd";
import { NavLink,withRouter } from "react-router-dom";
import "../../layouts/components/TopHeader.less";
import {LogoutRequest,ResetPwd} from '../../../apis/login.js'
import TopHeaderMsg from './TopHeaderMsg'
import PasswordReset from './PasswordReset';
import {CryptoTool} from '../../../util/utils';

const accountKey = "account";
const updatePasswordKey = "updatePassword";
const logoutKey = "logout";

@withRouter
class TopHeader extends Component {
  constructor(props) {
    super(props);
    this.handlerUserDropdwon = this.handlerUserDropdwon.bind(this);
    this.handlerUpdatePassword = this.handlerUpdatePassword.bind(this);
  }

  state = {
    resetVisible: false
}

  handlerChangeAccount() {}

  handlerUpdatePassword() {
    this.setState({
      resetVisible: true
    });
  }

  // 重置密码
  handleResetSave = (value) => {
    const { password,verifyCode } = value;
    ResetPwd(CryptoTool.encryption(password),verifyCode).then(res => {
      let code = res.data.code;
      if (code === 0) {
          notification.success({
              message: "修改密码成功，请重新登录",
              duration: 3
          });
          this.handlerLogout()
          this.handleResetCancel();
          
      }else{
        this.refPsd.getCodeImage()
      }
    }).catch( err => {
      console.log(err);
    })

}


  // 关闭重置密码窗口
  handleResetCancel = () => {
    this.setState({
        resetVisible: false
    });
}

  handlerLogout() {
    // 以后还需要处理权限的问题
    LogoutRequest().then(() => {
      // console.log("退出登录成功");
      this.props.history.push("/login");
    }).catch( err => {
      this.props.history.push("/login");
    })
    
  }

  handlerUserDropdwon(value) {
    let key = value.key;
    switch (key) {
      case accountKey:
        this.handlerChangeAccount();
        break;
      case updatePasswordKey:
        this.handlerUpdatePassword();
        break;
      case logoutKey:
        this.handlerLogout();
        break;
      default:
    }
  }

  render() {
    let {resetVisible} = this.state;
    const menu = (
      <Menu onClick={this.handlerUserDropdwon}>
        <Menu.Item key={updatePasswordKey}>
          <Icon type="setting" />
          <span>密码修改</span>
        </Menu.Item>
        <Menu.Item key={logoutKey}>
          <Icon type="logout" />
          <span>安全退出</span>
        </Menu.Item>
      </Menu>
    );
    

    return (
      <div className="topheader">
        <NavLink to="/home">
          <div className="topheader-left">
            <div className="logo" />
            <span className="logoName">物联网平台管理后台</span>
          </div>
        </NavLink>
        <div className="topheader-right">
          <div>
            <Dropdown overlay={menu}>
              <div>
                <Avatar style={{ backgroundColor: "#87d068" }} icon="user" />{" "}
                {localStorage.getItem("clifeManageUsername") || "Admin"} <Icon type="down" />
              </div>
            </Dropdown>
          </div>
          <TopHeaderMsg />
        </div>
      
      {/* 重置密码 */}
      <PasswordReset refMe={(me)=>{this.refPsd = me}} visible={resetVisible} onCancel={this.handleResetCancel} onOk={this.handleResetSave} />
      </div>
    );
  }
}
export default TopHeader;
