import React, { Component } from "react";
import { Result, Button, Empty } from "antd";
import CommECharts from "../../../../../components/CommECharts";
import { createLineOptionForToday } from "../../../util/createECharts";
import { dataProps, TabMap, dataItemProps } from "../../store/types";

interface ChartProps {
  getList: Function;
  tab: TabMap;
  newUsers: dataProps;
  activeUsers: dataProps;
  startUsers: dataProps;
  keepUsers: dataProps;
}

class Chart extends Component<ChartProps> {
  tryAgain = () => {
    const { getList, tab } = this.props;
    getList(tab);
  };
  getList = (list: dataItemProps[]) => {
    let rst: any[] = new Array(24).fill(null);
    list.forEach(({ name, count }) => {
      const idx = +name.slice(-2).replace(/^0+/, "");
      rst[idx] = count;
    });
    return rst;
  };
  public render(): JSX.Element {
    const { tab } = this.props;
    const { isLoading, isError, list: _list } = this.props[tab];
    const list = isLoading ? [] : _list;

    if (isError) {
      return (
        <div className="page-null-wrap">
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
        <div className="page-null-wrap">
          <Empty className="page-null-inner" />
        </div>
      );
    }

    const optionData = isLoading
      ? null
      : createLineOptionForToday(this.getList(list));
    return <CommECharts className="page-data-chart" option={optionData} />;
  }
}

export default Chart;
