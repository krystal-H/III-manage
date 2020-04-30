import React, { Component, Fragment } from "react";
import { Tooltip, Button, Result, message } from "antd";
import TableComponent from "../../../../components/Table";
import moment from "moment";
import { listItemProps } from "../store/types";
import { pagerPorps } from "../../../../types";

const getTimeStr = function(num: number | null) {
  if (!num) {
    return null;
  }
  const t = moment(num);
  const s = t
    .add(t.utcOffset() / 60, "h")
    // 此处不需要进行0时区转化为当前时区
    .format("YYYY-MM-DD HH:mm:ss");
  return s;
};

interface TableProps {
  changeSearchData: (data: object) => void;
  getList: () => void;
  getDetailAndOpenModal: (data: object) => void;
  checkerMap: object;
  list: Array<listItemProps>;
  pager: pagerPorps;
  isLoading: boolean;
  isError: boolean;
}

class Table extends Component<TableProps> {
  columns = [
    {
      title: "提交用户",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "审核类型",
      dataIndex: "type",
      key: "type",
      render: (type: number) => (type === 12 ? "用户注销" : "未知审核")
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status: number) => {
        const val = this.props.checkerMap[status];
        const sty = {
          color: status === 2 ? "red" : status === 1 ? "green" : "blue"
        };
        return <span style={sty}>{val}</span>;
      }
    },
    {
      title: "申请日期",
      dataIndex: "createTime",
      key: "createTime",
      render: (createTime: number | null) => getTimeStr(createTime)
    },
    {
      title: "操作",
      dataIndex: "id",
      key: "done",
      width: "120px",
      render: (id: number, data: listItemProps) => {
        const { statu } = data;
        const icon = statu === 0 ? "form" : "search",
          tips = statu === 0 ? "审核" : "查看",
          btnType = statu === 0 ? "primary" : undefined;
        return (
          <Fragment>
            <Tooltip title={tips} placement="top">
              <Button
                shape="circle"
                type={btnType}
                icon={icon}
                size="small"
                onClick={() => this.openModal(data)}
              ></Button>
            </Tooltip>
          </Fragment>
        );
      }
    }
  ];
  openModal = (data: object) => {
    this.props.getDetailAndOpenModal(data);
  };
  setPage = (pageIndex: number) => {
    const {
      pager: { totalPages },
      changeSearchData,
      getList
    } = this.props;
    if (pageIndex > totalPages) {
      message.warning("输入页码超过总页数！");
      return;
    }
    //首先更改搜索条件
    changeSearchData({ pageIndex });
    //其次再查询列表
    getList();
  };
  tryAgain = () => {
    this.props.getList();
  };
  render(): JSX.Element {
    const { list, pager, isLoading = false, isError = false } = this.props;
    if (isError) {
      return (
        <Result
          status="error"
          title="查询失败"
          subTitle="请确认网络连接是否正常."
          extra={
            <Button type="primary" onClick={this.tryAgain}>
              重 试
            </Button>
          }
        />
      );
    }
    return (
      <TableComponent
        bordered
        columns={this.columns}
        dataSource={list}
        rowKey="id"
        onPageChange={this.setPage}
        pager={pager}
        loading={isLoading}
      />
    );
  }
}

export default Table;
