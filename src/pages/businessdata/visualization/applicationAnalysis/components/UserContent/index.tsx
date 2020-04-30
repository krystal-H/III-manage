import React, { Component } from "react";
import { Card, Tabs, Alert } from "antd";
import ConnectSearchForUser from "../../../comm/Search";
import Content from "./Content";
import { userProps } from "../../store/types";

interface UserContentProps {
  changeSearchData: (data: object, key: string) => void;
  getTabDataForUser: () => void;
  user: userProps;
}

class UserContent extends Component<UserContentProps> {
  onSearch = (data: object) => {
    const { changeSearchData, getTabDataForUser } = this.props;
    changeSearchData(data, "user");
    getTabDataForUser();
  };
  tryAgain = () => {
    this.props.getTabDataForUser();
  };
  render() {
    const { tryAgain } = this;
    const {
      isLoading,
      isError,
      data: { register, accessCount, userLogin, userAccess }
    } = this.props.user;
    const isAllEmpty =
      register.length === 0 &&
      accessCount.length === 0 &&
      userLogin.length === 0 &&
      userAccess.length === 0;
    const accessAlertMsg = ( // 统一显示，不论状态
      // isError || isAllEmpty ? null : (
      <Alert
        className="page-visualization-alert"
        message="备注：访问用户数是通过访问IP去重统计的。"
        type="info"
        showIcon
      />
    );
    const countAlertMsg = ( // 统一显示，不论状态
      // isError || isAllEmpty ? null : (
      <Alert
        className="page-visualization-alert"
        message="备注：访问次数是通过页面接口请求统计（剔除图片请求，JS，CSS请求）。"
        type="info"
        showIcon
      />
    );
    return (
      <Card>
        <h2 className="page-title">站点数据</h2>
        <ConnectSearchForUser onSearch={this.onSearch} loading={isLoading} />
        <div className="page-interval" />
        <Tabs tabBarGutter={10} animated={!isError && !isAllEmpty}>
          <Tabs.TabPane tab="注册用户数" key="1">
            <Content
              title="注册用户数"
              isLoading={isLoading}
              isError={isError}
              list={register}
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
          <Tabs.TabPane tab="访问用户数" key="3">
            {accessAlertMsg}
            <Content
              title="访问用户数"
              isLoading={isLoading}
              isError={isError}
              list={userAccess}
              tryAgain={tryAgain}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="访问次数" key="4">
            {countAlertMsg}
            <Content
              title="访问次数"
              isLoading={isLoading}
              isError={isError}
              list={accessCount}
              tryAgain={tryAgain}
            />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    );
  }
}

export default UserContent;
