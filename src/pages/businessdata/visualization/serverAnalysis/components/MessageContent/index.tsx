import React, { Component } from "react";
import { Card, Tabs, Alert } from "antd";
import ConnectSearchForUser from "../../../comm/Search";
import Content from "./Content";
import { messageProps } from "../../store/types";

interface MessageContentProps {
  changeSearchData: (data: object, key: string) => void;
  getTabDataForMessage: () => void;
  message: messageProps;
}

class MessageContent extends Component<MessageContentProps> {
  onSearch = (data: object) => {
    const { changeSearchData, getTabDataForMessage } = this.props;
    changeSearchData(data, "message");
    getTabDataForMessage();
  };
  tryAgain = () => {
    this.props.getTabDataForMessage();
  };
  render() {
    const { tryAgain } = this;
    const {
      isLoading,
      isError,
      data: { uplink, downlink }
    } = this.props.message;
    const isAllEmpty = uplink.length === 0 && downlink.length === 0;
    return (
      <Card>
        <h2 className="page-title">消息数据</h2>
        <ConnectSearchForUser
          noRegion={true}
          onSearch={this.onSearch}
          loading={isLoading}
        />
        <div className="page-interval" />
        <Tabs tabBarGutter={10} animated={!isError && !isAllEmpty}>
          <Tabs.TabPane tab="消息上行量" key="1">
            {/* {isError || isAllEmpty ? null : ( */}
            <Alert
              className="page-visualization-alert"
              message="备注：设备TCP连接的运行数据等上行请求量。"
              type="info"
              showIcon
            />
            {/* )} */}
            <Content
              title="请求次数(次)"
              isLoading={isLoading}
              isError={isError}
              list={uplink}
              tryAgain={tryAgain}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="消息下行量" key="2">
            {/* {isError || isAllEmpty ? null : ( */}
            <Alert
              className="page-visualization-alert"
              message="备注：云端对设备进行控制的下行数据。"
              type="info"
              showIcon
            />
            {/* )} */}
            <Content
              title="请求次数(次)"
              isLoading={isLoading}
              isError={isError}
              list={downlink}
              tryAgain={tryAgain}
            />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    );
  }
}

export default MessageContent;
