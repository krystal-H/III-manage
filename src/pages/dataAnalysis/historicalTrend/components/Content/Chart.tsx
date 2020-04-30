import React, { Component } from "react";
import { Result, Button, Empty } from "antd";
import CommECharts from "../../../../../components/CommECharts";
import { createLineOption } from "../../../util/createECharts";
import {
  dataProps,
  TabMap,
  TabTextMap,
  TabReverseMap
} from "../../store/types";

interface ChartProps {
  getList: Function;
  tab: TabMap;
  newUsers: dataProps;
  activeUsers: dataProps;
  startUsers: dataProps;
  keepUsersForNew: dataProps;
  keepUsersForActive: dataProps;
  timeForPerPerson: dataProps;
  crash: dataProps;
}

class Chart extends Component<ChartProps> {
  tryAgain = () => {
    const { getList, tab } = this.props;
    getList(tab);
  };
  public render(): JSX.Element | null {
    const { tab } = this.props;
    const { isLoading, isError, list: _list } = this.props[tab];
    const list = isLoading ? [] : _list;
    // 如果是留存系列切换，则采用其他
    if (tab === TabMap.KEEPUSERSFORNEW || tab === TabMap.KEEPUSERSFORACTIVE) {
      return null;
    }
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

    const isTime = TabMap.TIMEFORPERPERSON === tab;
    const optionData = isLoading
      ? null
      : createLineOption(list, TabTextMap[TabReverseMap[tab]], false, isTime);
    return <CommECharts className="page-data-chart" option={optionData} />;
  }
}

export default Chart;
