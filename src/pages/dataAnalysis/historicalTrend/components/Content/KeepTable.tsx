import React, { Component, Fragment } from "react";
import { message, Menu } from "antd";
import {
  TabMap,
  KeepTabMap,
  keepDetailProps,
  pagerPorps
} from "../../store/types";
import KeepTableDetail from "./KeepTableDetail";
import { toPercentNumber } from "../../../util/tools";

interface TableProps {
  keepTab: Function;
  keepSetPage: Function;
  tab: TabMap;
  keepDetailForNew: keepDetailProps;
  keepDetailForActive: keepDetailProps;
}

class KeepTable extends Component<TableProps> {
  pageRows = 10; // 每页的数量
  btnSty = { marginTop: "-12px" };
  collapseSty = { color: "#3398DB" };
  toggleTab = (e: any) => {
    this.props.keepTab(e.key);
  };
  setPage = (pageIndex: number) => {
    const { tab, keepDetailForNew, keepDetailForActive } = this.props;
    // 非留存系列
    if (tab !== TabMap.KEEPUSERSFORNEW && tab !== TabMap.KEEPUSERSFORACTIVE) {
      return;
    }

    const { list } =
      tab === TabMap.KEEPUSERSFORNEW ? keepDetailForNew : keepDetailForActive;
    const totalPages = Math.ceil(list.length / this.pageRows);

    if (pageIndex > totalPages) {
      message.warning("输入页码超过总页数！");
      return;
    }
    this.props.keepSetPage(pageIndex);
  };
  export = (event: React.MouseEvent) => {
    event.stopPropagation();
  };
  public render(): JSX.Element | null {
    const { tab, keepDetailForNew, keepDetailForActive } = this.props;
    // 非留存系列tab则不显示该组件内容
    if (tab !== TabMap.KEEPUSERSFORNEW && tab !== TabMap.KEEPUSERSFORACTIVE) {
      return null;
    }

    const { isError, isLoading, tab: _tab, pageIndex, list } =
      tab === TabMap.KEEPUSERSFORNEW ? keepDetailForNew : keepDetailForActive;
    const { pageRows } = this;
    const totalRows = list.length;
    // 加载中、加载失败、空数据则不显示该组件内容
    if (isError || isLoading || totalRows === 0) {
      return null;
    }

    const startRows = (pageIndex - 1) * pageRows;
    const nowList = list.slice(startRows, startRows + pageRows).map(d => {
      const {
        addUser,
        activeUser,
        day1Count,
        day2Count,
        day3Count,
        day4Count,
        day5Count,
        day6Count,
        day7Count,
        day14Count,
        day30Count,
        day1CountRate,
        day2CountRate,
        day3CountRate,
        day4CountRate,
        day5CountRate,
        day6CountRate,
        day7CountRate,
        day14CountRate,
        day30CountRate
      } = d;
      const count = tab === TabMap.KEEPUSERSFORNEW ? addUser : activeUser;
      return _tab === KeepTabMap.PERCENT
        ? {
            ...d,
            count,
            day1: day1CountRate ? toPercentNumber(day1CountRate) + "%" : null,
            day2: day2CountRate ? toPercentNumber(day2CountRate) + "%" : null,
            day3: day3CountRate ? toPercentNumber(day3CountRate) + "%" : null,
            day4: day4CountRate ? toPercentNumber(day4CountRate) + "%" : null,
            day5: day5CountRate ? toPercentNumber(day5CountRate) + "%" : null,
            day6: day6CountRate ? toPercentNumber(day6CountRate) + "%" : null,
            day7: day7CountRate ? toPercentNumber(day7CountRate) + "%" : null,
            day14: day14CountRate
              ? toPercentNumber(day14CountRate) + "%"
              : null,
            day30: day30CountRate ? toPercentNumber(day30CountRate) + "%" : null
          }
        : {
            ...d,
            count,
            day1: day1Count,
            day2: day2Count,
            day3: day3Count,
            day4: day4Count,
            day5: day5Count,
            day6: day6Count,
            day7: day7Count,
            day14: day14Count,
            day30: day30Count
          };
    });
    const pager: pagerPorps = {
      pageIndex: pageIndex,
      totalPages: Math.ceil(totalRows / pageRows),
      totalRows,
      pageRows
    };
    return (
      <Fragment>
        <p className="page-label">所选择时间段各天的数据：</p>
        <Menu onSelect={this.toggleTab} selectedKeys={[_tab]} mode="horizontal">
          <Menu.Item key={KeepTabMap.PERCENT}>留存率</Menu.Item>
          <Menu.Item key={KeepTabMap.DATA}>留存数</Menu.Item>
        </Menu>
        <KeepTableDetail
          tab={tab}
          list={nowList}
          pager={pager}
          setPage={this.setPage}
        />
      </Fragment>
    );
  }
}

export default KeepTable;
