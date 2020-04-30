import React, { Component } from "react";
import { Card } from "antd";
import HeadItem from "./HeadItem";
import { headDataProps } from "../store/types";

interface HeadProps {
  headData: headDataProps;
  getHeadData: Function;
}

class Head extends Component<HeadProps> {
  tryAgain = () => {
    this.props.getHeadData();
  };
  render() {
    const { tryAgain, props } = this;
    const {
      isLoading,
      isError,
      data: { addDeviceCollect, activeDeviceCollect, errorDeviceCollect }
    } = props.headData;

    return (
      <div className="page-analysis-head">
        <Card className="page-analysis-col" title="新增设备数（汇总）">
          <HeadItem
            isLoading={isLoading}
            isError={isError}
            data={addDeviceCollect}
            tryAgain={tryAgain}
          />
          <span className="page-analysis-col-msg">
            备注：产品下新创建的设备统计
          </span>
        </Card>
        <Card className="page-analysis-col" title="激活设备数（汇总）">
          <HeadItem
            isLoading={isLoading}
            isError={isError}
            data={activeDeviceCollect}
            tryAgain={tryAgain}
          />
          <span className="page-analysis-col-msg">
            备注：联网绑定的设备统计
          </span>
        </Card>
        <Card className="page-analysis-col" title="故障设备数（汇总）">
          <HeadItem
            isLoading={isLoading}
            isError={isError}
            data={errorDeviceCollect}
            tryAgain={tryAgain}
          />
        </Card>
      </div>
    );
  }
}

export default Head;
