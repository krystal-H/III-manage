import React, { Component, Fragment } from "react";
import { Tooltip, Button, Result, message } from "antd";
import TableComponent from "../../../../components/Table";

class Table extends Component {
  columns = [
    {
      title: "日志ID",
      dataIndex: "log_id",
      key: "log_id"
    },
    {
      title: "所属应用",
      dataIndex: "application_id",
      key: "application_id",
      render: application_id => this.props.allListMap[application_id]
    },
    {
      title: "eventKey",
      dataIndex: "event_key",
      key: "event_key"
    },
    {
      title: "用户",
      dataIndex: "user_id",
      key: "user_id"
    },
    {
      title: "查看日志",
      dataIndex: "log_id",
      key: "done",
      width: "120px",
      render: (log_id, data) => {
        return (
          <Fragment>
            <Tooltip title="查看详情" placement="top">
              <Button
                shape="circle"
                icon="search"
                size="small"
                onClick={() => this.openModal(data)}
              ></Button>
            </Tooltip>
          </Fragment>
        );
      }
    }
  ];
  openModal = data => {
    this.props.openModal(data);
  };
  setPage = pageIndex => {
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
  render() {
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
        className="page-table"
        bordered
        columns={this.columns}
        dataSource={list}
        rowKey="log_id"
        onPageChange={this.setPage}
        pager={pager}
        loading={isLoading}
      />
    );
  }
}

export default Table;
