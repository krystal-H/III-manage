import React, { Component } from "react";
import { Card, Tabs } from "antd";
import ConnectSearchForUser from "../../../comm/Search";
import Content from "./Content";
import { applicationProps } from "../../store/types";

interface AppContentProps {
  changeSearchData: (data: object, key: string) => void;
  getTabDataForApplication: () => void;
  application: applicationProps;
}

class AppContent extends Component<AppContentProps> {
  onSearch = (data: object) => {
    const { changeSearchData, getTabDataForApplication } = this.props;
    changeSearchData(data, "application");
    getTabDataForApplication();
  };
  tryAgain = () => {
    this.props.getTabDataForApplication();
  };
  render() {
    const { tryAgain } = this;
    const {
      isLoading,
      isError,
      data: { userRegister, userLogin, userStart, userActive }
    } = this.props.application;
    const isAllEmpty =
      userRegister.length === 0 &&
      userLogin.length === 0 &&
      userStart.length === 0 &&
      userActive.length === 0;
    return (
      <Card>
        <h2 className="page-title">应用数据</h2>
        <ConnectSearchForUser onSearch={this.onSearch} loading={isLoading} />
        <div className="page-interval" />
        <Tabs tabBarGutter={10} animated={!isError && !isAllEmpty}>
          <Tabs.TabPane tab="启动次数" key="1">
            <Content
              title="启动次数"
              isLoading={isLoading}
              isError={isError}
              list={userStart}
              tryAgain={tryAgain}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="登录用户数" key="2">
            <Content
              title="登录用户数"
              isLoading={isLoading}
              isError={isError}
              list={userLogin}
              tryAgain={tryAgain}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="注册用户数" key="3">
            <Content
              title="注册用户数"
              isLoading={isLoading}
              isError={isError}
              list={userRegister}
              tryAgain={tryAgain}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="活跃用户数" key="4">
            <Content
              title="活跃用户数"
              isLoading={isLoading}
              isError={isError}
              list={userActive}
              tryAgain={tryAgain}
            />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    );
  }
}

export default AppContent;
