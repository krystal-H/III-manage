import React, { Component } from "react";
import { Tooltip, Button, Result, message } from "antd";
import TableComponent from "../../../../components/Table";
import moment from "moment";

const getTimeStr = function(num) {
  if (!num) {
    return null;
  }
  const t = moment(num);
  const s = t.add(t.utcOffset() / 60, "h").format("YYYY-MM-DD HH:mm:ss");
  return <>{s}</>;
};

class Table extends Component {
  columns = [
    {
      title: "文件名称",
      dataIndex: "fileName",
      key: "fileName"
    },
    {
      title: "文件路径",
      dataIndex: "filePath",
      key: "filePath"
    },
    {
      title: "上传时间",
      dataIndex: "uploadTime",
      key: "uploadTime",
      render: updateTime => getTimeStr(updateTime)
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
    const {
      list,
      pager,
      isLoading = false,
      isError = false,
      download
    } = this.props;
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
      <>
        <Button icon="export" type="primary" onClick={download}>
          导出Excel
        </Button>
        <div className="page-interval" />
        <TableComponent
          bordered
          columns={this.columns}
          dataSource={list}
          rowKey="fileId"
          onPageChange={this.setPage}
          pager={pager}
          loading={isLoading}
        />
      </>
    );
  }
}

export default Table;
