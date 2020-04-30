import React, { Component } from "react";
import { Card, Tabs, Alert } from "antd";
import ConnectSearchForUser from "../../../comm/Search";
import Content from "./Content";
import { deviceProps } from "../../store/types";

interface DeviceContentProps {
  changeSearchData: (data: object, key: string) => void;
  getTabDataForDevice: () => void;
  device: deviceProps;
}

class DeviceContent extends Component<DeviceContentProps> {
  onSearch = (data: object) => {
    const { changeSearchData, getTabDataForDevice } = this.props;
    changeSearchData(data, "device");
    getTabDataForDevice();
  };
  tryAgain = () => {
    this.props.getTabDataForDevice();
  };
  render() {
    const { tryAgain } = this;
    const {
      isLoading,
      isError,
      data: { product, addDevice, activeDevice, onlineDevice, errorDevice }
    } = this.props.device;
    const isAllEmpty =
      product.length === 0 &&
      addDevice.length === 0 &&
      activeDevice.length === 0 &&
      onlineDevice.length === 0 &&
      errorDevice.length === 0;
    const alertMsg = ( // 统一显示，不论状态
      // isError || isAllEmpty ? null : (
      <Alert
        className="page-visualization-alert"
        message="备注：此数据暂不支持查看地域维度。"
        type="info"
        showIcon
      />
    );
    return (
      <Card>
        <h2 className="page-title">产品/设备数据</h2>
        <ConnectSearchForUser onSearch={this.onSearch} loading={isLoading} />
        <div className="page-interval" />
        <Tabs tabBarGutter={10} animated={!isError && !isAllEmpty}>
          <Tabs.TabPane tab="创建产品数" key="1">
            {alertMsg}
            <Content
              title="创建产品数"
              isLoading={isLoading}
              isError={isError}
              list={product}
              tryAgain={tryAgain}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="新增设备数" key="2">
            {alertMsg}
            <Content
              title="新增设备数"
              isLoading={isLoading}
              isError={isError}
              list={addDevice}
              tryAgain={tryAgain}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="激活设备数" key="3">
            {alertMsg}
            <Content
              title="激活设备数"
              isLoading={isLoading}
              isError={isError}
              list={activeDevice}
              tryAgain={tryAgain}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="在线数据数(仅WIFI)" key="4">
            <Content
              title="在线数据数(仅WIFI)"
              isLoading={isLoading}
              isError={isError}
              list={onlineDevice}
              tryAgain={tryAgain}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="故障设备数" key="5">
            <Content
              title="故障设备数"
              isLoading={isLoading}
              isError={isError}
              list={errorDevice}
              tryAgain={tryAgain}
            />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    );
  }
}

export default DeviceContent;
