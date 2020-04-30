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
      data: { requertCollect, uplinkCollect, downlinkCollect }
    } = props.headData;
    return (
      <div className="page-analysis-head">
        <Card className="page-analysis-col" title="请求次数（接口服务汇总）">
          <HeadItem
            isLoading={isLoading}
            isError={isError}
            data={requertCollect}
            suffix="次"
            tryAgain={tryAgain}
          />
        </Card>
        <Card className="page-analysis-col" title="消息上行量（汇总）">
          <HeadItem
            isLoading={isLoading}
            isError={isError}
            data={uplinkCollect}
            suffix="次"
            tryAgain={tryAgain}
          />
        </Card>
        <Card className="page-analysis-col" title="消息下行量（汇总）">
          <HeadItem
            isLoading={isLoading}
            isError={isError}
            data={downlinkCollect}
            suffix="次"
            tryAgain={tryAgain}
          />
        </Card>
      </div>
    );
  }
}

export default Head;
