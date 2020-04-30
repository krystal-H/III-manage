import React, { Component } from "react";
import { Collapse, Button, Icon, message, ConfigProvider } from "antd";
import TableComponent from "../../../../../components/Table";
import {
  dataProps,
  pagerPorps,
  dataItemProps,
  TabMap
} from "../../store/types";
import timeUtil from "../../../util/timeUtil";
import { toPercentNumber } from "../../../util/tools";
import { nullTag } from "../../../store/params";

interface TableProps {
  setPage: Function;
  toggleTableList: Function;
  getList: Function;
  isShowTableList: boolean;
  pageIndex: number;
  newUsers: dataProps;
  activeUsers: dataProps;
  startUsers: dataProps;
  keepUsersForNew: dataProps;
  keepUsersForActive: dataProps;
  timeForPerPerson: dataProps;
  crash: dataProps;
}

class Table extends Component<TableProps> {
  pageRows = 10; // 每页的数量
  smallSty = { padding: 0 };
  btnSty = { marginTop: "-12px" };
  collapseSty = { color: "#3398DB" };
  loadingSty = { fontSize: "16px", color: "#1890ff" };
  loadingCom = (<Icon type="sync" spin style={this.loadingSty} />);
  hideCom = (
    <span style={this.collapseSty}>
      收起明细数据
      <Icon type="down" className="page-ml" />
    </span>
  );
  showCom = (
    <span style={this.collapseSty}>
      展开明细数据
      <Icon type="up" className="page-ml" />
    </span>
  );
  columns = [
    {
      title: "日期",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "新增用户",
      dataIndex: "newUsers",
      key: "newUsers",
      render: (val: any = nullTag) => this.checkLoading(TabMap.NEWUSERS, val)
    },
    {
      title: "活跃用户",
      dataIndex: "activeUsers",
      key: "activeUsers",
      render: (val: any = nullTag) => this.checkLoading(TabMap.ACTIVEUSERS, val)
    },
    {
      title: "启动次数",
      dataIndex: "startUsers",
      key: "startUsers",
      render: (val: any = nullTag) => this.checkLoading(TabMap.STARTUSERS, val)
    },
    {
      title: "新增用户次日留存",
      dataIndex: "keepUsersForNew",
      key: "keepUsersForNew",
      render: (val: number) =>
        this.checkLoading(
          TabMap.KEEPUSERSFORNEW,
          val !== undefined ? toPercentNumber(val) + "%" : nullTag
        )
    },
    {
      title: "活跃用户次日留存",
      dataIndex: "keepUsersForActive",
      key: "keepUsersForActive",
      render: (val: number) =>
        this.checkLoading(
          TabMap.KEEPUSERSFORACTIVE,
          val !== undefined ? toPercentNumber(val) + "%" : nullTag
        )
    },
    {
      title: "人均使用时长",
      dataIndex: "timeForPerPerson",
      key: "timeForPerPerson",
      render: (val: any) =>
        this.checkLoading(
          TabMap.TIMEFORPERPERSON,
          val !== undefined ? timeUtil.secondToHours(val) : nullTag
        )
    },
    {
      title: "崩溃数",
      dataIndex: "crash",
      key: "crash",
      render: (val: any = nullTag) => this.checkLoading(TabMap.CRASH, val)
    }
  ];

  tryAgain = (tab: TabMap) => {
    this.props.getList(tab);
  };

  // 检测当前是否在加载中
  checkLoading = (nowTab: TabMap, value: any) => {
    const { loadingCom, smallSty, tryAgain } = this;
    const { isLoading, isError } = this.props[nowTab];
    return isLoading ? (
      loadingCom
    ) : isError ? (
      <ConfigProvider autoInsertSpaceInButton={false}>
        <Button
          type="link"
          onClick={() => tryAgain(nowTab)}
          size="small"
          style={smallSty}
        >
          重试
        </Button>
      </ConfigProvider>
    ) : (
      value
    );
  };

  // 获取当前列表
  getList = () => {
    const {
      newUsers: { list: newUsersList },
      activeUsers: { list: activeUsersList },
      startUsers: { list: startUsersList },
      keepUsersForNew: { list: keepUsersForNewList },
      keepUsersForActive: { list: keepUsersForActiveList },
      timeForPerPerson: { list: timeForPerPersonList },
      crash: { list: crashList }
    } = this.props;
    let dates = new Set(),
      maps = {},
      list: dataItemProps[] = [];
    const setMap = ({ name, count }: dataItemProps, tab: string) => {
      dates.add(name);
      !maps[name] && (maps[name] = { name });
      maps[name][tab] = count;
    };
    const gn = (d: string) => +d.replace(/-/g, "");
    newUsersList.forEach((d: dataItemProps) => setMap(d, TabMap.NEWUSERS));
    activeUsersList.forEach((d: dataItemProps) =>
      setMap(d, TabMap.ACTIVEUSERS)
    );
    startUsersList.forEach((d: dataItemProps) => setMap(d, TabMap.STARTUSERS));
    keepUsersForNewList.forEach((d: dataItemProps) =>
      setMap(d, TabMap.KEEPUSERSFORNEW)
    );
    keepUsersForActiveList.forEach((d: dataItemProps) =>
      setMap(d, TabMap.KEEPUSERSFORACTIVE)
    );
    timeForPerPersonList.forEach((d: dataItemProps) =>
      setMap(d, TabMap.TIMEFORPERPERSON)
    );
    crashList.forEach((d: dataItemProps) => setMap(d, TabMap.CRASH));
    list = Array.from(dates)
      .sort((a: string, b: string) => gn(b) - gn(a))
      .map((d: string) => maps[d]);
    return list;
  };
  setPage = (pageIndex: number) => {
    const { pageRows } = this;
    const allList = this.getList();
    const totalPages = Math.ceil(allList.length / pageRows);

    if (pageIndex > totalPages) {
      message.warning("输入页码超过总页数！");
      return;
    }
    this.props.setPage(pageIndex);
  };
  onToggle = () => {
    this.props.toggleTableList();
  };
  export = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  download = (
    <Button type="link" style={this.btnSty} onClick={this.export}>
      <Icon type="export" />
      导出
    </Button>
  );
  public render(): JSX.Element | null {
    const { isShowTableList, pageIndex } = this.props;
    const allList = this.getList();
    const { pageRows } = this;
    const totalRows = allList.length;
    if (totalRows === 0) {
      return null; // 空数据也不显示任何内容
    }
    const activeKey = isShowTableList ? ["1"] : [];
    const titDom = isShowTableList ? this.hideCom : this.showCom;
    const startRows = (pageIndex - 1) * pageRows;
    const list = allList.slice(startRows, startRows + pageRows);
    const pager: pagerPorps = {
      pageIndex,
      totalPages: Math.ceil(totalRows / pageRows),
      totalRows,
      pageRows
    };
    return (
      <>
        <div className="page-solid" />
        <Collapse
          className="page-collapse-noBB"
          bordered={false}
          activeKey={activeKey}
          onChange={this.onToggle}
        >
          <Collapse.Panel
            header={titDom}
            showArrow={false}
            key="1"
            extra={this.download}
          >
            <TableComponent
              className="page-table-small"
              bordered
              columns={this.columns}
              dataSource={list}
              rowKey="name"
              onPageChange={this.setPage}
              pager={pager}
              pagination={
                pager.totalPages <= 1 ? { hideOnSinglePage: true } : false
              }
            />
          </Collapse.Panel>
        </Collapse>
      </>
    );
  }
}

export default Table;
