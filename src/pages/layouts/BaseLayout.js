// 这是项目的根组件
import React, { Component } from "react";
// 导入路由组件
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
// 导入需要的 Ant Design 组件
import { Layout, Breadcrumb } from "antd";
import SiderMenu from "./components/SiderMenu.jsx";
import NavHeader from "./components/TopHeader.jsx";
import Home from "../home/Home";
import {RouteWithSubRoutes} from '../../routes/PrivateRoute';
// 路由
import { routes } from "../../routes/routes";
import AuthorizedCheck from './components/AuthorizedCheck';
// actionCreator
import {getDeviceType, getDeviceCategoryAsyncAction, getAuthModule} from '../../store/globalDeviceStore/actionCreators';

const { Header, Content, Sider, Footer } = Layout;
import Exception404 from "../exception/404";
import ErrorBoundary from "./components/ErrorBoundary";
import Bread from "./components/Breadcrumb";

import TagList from "../configdata/protocolTag/TagList";

class App extends Component {
  componentDidMount() {
    //获取设备信息
    this.props.getDeviceType();
    this.props.getDeviceCategoryList();
    // 获取权限模块
    this.props.getAuthModule();

  }

  shouldComponentUpdate(nextProps){
    let flag = JSON.stringify(nextProps.authRoutes) !== JSON.stringify(this.props.authRoutes);
    return flag; 
  }

  render() {
    const {authRoutes} = this.props;
   
    return (
      <Layout style={{ height: "100%", minWidth: "1300px" }}>
        <Header><NavHeader /></Header>
        <Layout>
          <Sider width={230} className="slide-menu">
            <SiderMenu menuList={authRoutes} />
          </Sider>
          {/* 中间的 内容区域 */}
          <Layout style={{ padding: "0 24px 0 24px"}}>
			      <Bread />
            <Content
              style={{
                // background: "#fff",
                // padding: 24,
                margin: 0,
                minHeight: 280
              }}
              className="layout-content"
            >
              <ErrorBoundary>
                  <Switch>
                    {authRoutes.map((route, i) => (
                      <RouteWithSubRoutes key={i} {...route} />
                    ))}
                    <Redirect exact from="/" to="/home" />
                    <Route path="/home" component={Home}/>
                    <Route path="/protocoltag" component={TagList}/>
                    <Route component={Exception404} />
                  </Switch>
              </ErrorBoundary>
              <AuthorizedCheck />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  authRoutes: state.getIn(["globalDeviceInfo", "authRoutes"]).toJS(),
});

const mapDispatchToProps = dispatch => {
  return {
    getDeviceType: () => {
      dispatch(getDeviceType());
    },
    getDeviceCategoryList: ()=> {
      dispatch(getDeviceCategoryAsyncAction());
    },
    getAuthModule: () => dispatch(getAuthModule()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
