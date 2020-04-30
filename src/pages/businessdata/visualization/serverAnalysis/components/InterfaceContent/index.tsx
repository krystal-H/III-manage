import React, { Component } from "react";
import { Card, Tabs, Alert } from "antd";
import ConnectSearchForUser from "../../../comm/Search";
import Content from "./Content";
import { serverProps } from "../../store/types";

interface InterfaceContentProps {
  changeSearchData: (data: object, key: string) => void;
  getTabDataForServer: () => void;
  server: serverProps;
}

class InterfaceContent extends Component<InterfaceContentProps> {
  onSearch = (data: object) => {
    const { changeSearchData, getTabDataForServer } = this.props;
    changeSearchData(data, "server");
    getTabDataForServer();
  };
  tryAgain = () => {
    this.props.getTabDataForServer();
  };
  render() {
    const { tryAgain } = this;
    let {
      isLoading,
      isError,
      data: { appResponse, appFlow, appSucess, appRequest }
    } = this.props.server;
    const isAllEmpty =
      appResponse.app.length === 0 &&
      appResponse.service.length === 0 &&
      appFlow.app.length === 0 &&
      appFlow.service.length === 0 &&
      appSucess.app.length === 0 &&
      appSucess.service.length === 0 &&
      appRequest.app.length === 0 &&
      appRequest.service.length === 0;
    return (
      <Card>
        <h2 className="page-title">接口服务数据</h2>
        <ConnectSearchForUser
          noRegion={true}
          onSearch={this.onSearch}
          loading={isLoading}
        />
        <div className="page-interval" />
        <Tabs tabBarGutter={10} animated={!isError && !isAllEmpty}>
          <Tabs.TabPane tab="请求次数(次)" key="1">
            <Content
              title="请求次数(次)"
              isLoading={isLoading}
              isError={isError}
              list={appRequest}
              tryAgain={tryAgain}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="流量大小(MB)" key="2">
            <Content
              title="流量大小(MB)"
              isLoading={isLoading}
              isError={isError}
              list={appFlow}
              isUseMB={true}
              tryAgain={tryAgain}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="成功率" key="3">
            {/* {isError || isAllEmpty ? null : ( */}
            <Alert
              className="page-visualization-alert"
              message="备注：接口调用200成功占总调用的次数*100%。"
              type="info"
              showIcon
            />
            {/* )} */}
            <Content
              title="成功率(%)"
              isLoading={isLoading}
              isError={isError}
              list={appSucess}
              tryAgain={tryAgain}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="平均响应时间(ms)" key="4">
            {/* {isError || isAllEmpty ? null : ( */}
            <Alert
              className="page-visualization-alert"
              message="备注：接口服务响应次数的响应时间总和/响应次数。"
              type="info"
              showIcon
            />
            {/* )} */}
            <Content
              title="平均响应时间(ms)"
              isLoading={isLoading}
              isError={isError}
              list={appResponse}
              tryAgain={tryAgain}
            />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    );
  }
}

export default InterfaceContent;
