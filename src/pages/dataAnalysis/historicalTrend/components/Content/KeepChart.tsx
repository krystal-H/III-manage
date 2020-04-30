import React, { Component, Fragment } from "react";
import { Result, Button, Empty, Menu } from "antd";
import CommECharts from "../../../../../components/CommECharts";
import { createLineOption } from "../../../util/createECharts";
import { toPercentNumber } from "../../../util/tools";
import {
  TabMap,
  KeepChartTabMap,
  KeepChartReverseTabMap,
  KeepChartTextTabMap,
  KeepTabMap,
  keepDetailProps
} from "../../store/types";

interface ChartProps {
  getList: Function;
  keepChartTab: Function;
  tab: TabMap;
  keepDetailForNew: keepDetailProps;
  keepDetailForActive: keepDetailProps;
}

class Chart extends Component<ChartProps> {
  toggleTab = (e: any) => {
    this.props.keepChartTab(e.key);
  };
  tryAgain = () => {
    const { tab, getList } = this.props;
    getList(tab);
  };
  public render(): JSX.Element | null {
    const { tab, keepDetailForNew, keepDetailForActive } = this.props;

    // 如果不是留存系列切换，则采用其他
    if (tab !== TabMap.KEEPUSERSFORNEW && tab !== TabMap.KEEPUSERSFORACTIVE) {
      return null;
    }

    const { isError, isLoading, chartTab, list } =
      tab === TabMap.KEEPUSERSFORNEW ? keepDetailForNew : keepDetailForActive;

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

    const nowList = list
      .filter(d => d[chartTab] || d[chartTab] === 0)
      .map(d => ({ name: d.name, count: toPercentNumber(d[chartTab]) }));

    const isNull = !isLoading && nowList.length === 0;

    const optionData = isLoading
      ? null
      : createLineOption(
          nowList,
          KeepChartTextTabMap[KeepChartReverseTabMap[chartTab]],
          true
        );
    return (
      <Fragment>
        <p className="page-label">趋势：</p>
        <Menu
          onSelect={this.toggleTab}
          selectedKeys={[chartTab]}
          mode="horizontal"
        >
          <Menu.Item key={KeepChartTabMap.DAY1}>
            {KeepChartTextTabMap.DAY1}
          </Menu.Item>
          <Menu.Item key={KeepChartTabMap.DAY2}>
            {KeepChartTextTabMap.DAY2}
          </Menu.Item>
          <Menu.Item key={KeepChartTabMap.DAY3}>
            {KeepChartTextTabMap.DAY3}
          </Menu.Item>
          <Menu.Item key={KeepChartTabMap.DAY4}>
            {KeepChartTextTabMap.DAY4}
          </Menu.Item>
          <Menu.Item key={KeepChartTabMap.DAY5}>
            {KeepChartTextTabMap.DAY5}
          </Menu.Item>
          <Menu.Item key={KeepChartTabMap.DAY6}>
            {KeepChartTextTabMap.DAY6}
          </Menu.Item>
          <Menu.Item key={KeepChartTabMap.DAY7}>
            {KeepChartTextTabMap.DAY7}
          </Menu.Item>
          <Menu.Item key={KeepChartTabMap.DAY14}>
            {KeepChartTextTabMap.DAY14}
          </Menu.Item>
          <Menu.Item key={KeepChartTabMap.DAY30}>
            {KeepChartTextTabMap.DAY30}
          </Menu.Item>
        </Menu>
        {isNull ? (
          <div className="page-null-wrap page-data-chart-nomt">
            <Empty className="page-null-inner" />
          </div>
        ) : (
          <CommECharts
            className="page-data-chart page-data-chart-nomt"
            option={optionData}
          />
        )}
      </Fragment>
    );
  }
}

export default Chart;
