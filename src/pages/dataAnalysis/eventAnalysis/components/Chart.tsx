import React, { Component } from "react";
import { Result, Button, Empty } from "antd";
import {
  createLineBarOption,
  createLineBarEvent
} from "../../util/createECharts";
import CommECharts from "../../../../components/CommECharts";

interface ChartProps {
  tryAgain: Function;
  isLoading: boolean;
  isError: boolean;
  listObj: any;
}

class Chart extends Component<ChartProps> {
  height = 424;
  sty = { height: this.height + "px" };
  tryAgain = () => {
    this.props.tryAgain();
  };
  public render(): JSX.Element {
    const { isLoading, isError, listObj } = this.props;
    const { list = [] } = listObj || {};
    if (isError) {
      return (
        <div className="page-null-wrap" style={this.sty}>
          <Result
            className="page-null-inner"
            status="error"
            title="查询失败"
            subTitle="请确认网络连接是否正常."
            extra={
              <Button type="primary" onClick={this.tryAgain}>
                重 试
              </Button>
            }
          />
        </div>
      );
    }

    if (!isLoading && list.length === 0) {
      return (
        <div className="page-null-wrap" style={this.sty}>
          <Empty className="page-null-inner" />
        </div>
      );
    }
    const optionData = isLoading ? null : createLineBarOption(listObj);
    return (
      <CommECharts
        height={this.height}
        className="page-data-chart"
        option={optionData}
        bindEvent={createLineBarEvent}
      />
    );
  }
}

export default Chart;
