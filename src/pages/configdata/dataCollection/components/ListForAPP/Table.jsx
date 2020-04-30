import React, { Component, Fragment } from "react";
import { Tooltip, Popover, Button, Popconfirm, Result, message } from "antd";
import moment from "moment";
import TableComponent from "../../../../../components/Table";

const getTimeStr = function(num) {
  if (!num) {
    return null;
  }
  const t = moment(num);
  const s = t
    .add(t.utcOffset() / 60, "h")
    .format("YYYY-MM-DD HH:mm:ss")
    .split(" ");
  return (
    <Fragment>
      {s[0]}
      <br />
      {s[1]}
    </Fragment>
  );
};

class Table extends Component {
  appType = ["Web端", "移动端", "第三方Web端", "小程序"];
  columns = [
    {
      title: "应用ID",
      dataIndex: "applicationId",
      key: "applicationId",
      width: "90px"
    },
    {
      title: "应用名称",
      dataIndex: "applicationName",
      key: "applicationName",
      width: "12%",
      render: (text) => <span title={text}>{text}</span>
    },
    {
      title: "应用类型",
      dataIndex: "applicationType",
      key: "applicationType",
      width: "12%",
      render: applicationType => <span title={this.appType[applicationType]}>{this.appType[applicationType]}</span>
    },
    {
      title: "sessionKey",
      dataIndex: "sessionKey",
      key: "sessionKey",
      width: "12%",
      render: (text) => <span title={text}>{text}</span>
    },
    {
      title: "关联应用ID",
      dataIndex: "appId",
      key: "appId",
    },
    {
      title: "关联应用名",
      dataIndex: "appName",
      key: "appName",
      width: "12%",
      render:  (text) => <span title={text}>{text}</span>
    },
    {
      title: "Token",
      dataIndex: "token",
      key: "token",
      width: "12%",
      render: (text) => <span title={text}>{text}</span>
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      width: "110px",
      render: createTime => getTimeStr(createTime)
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      key: "updateTime",
      width: "110px",
      render: updateTime => getTimeStr(updateTime)
    },
    {
      title: "操作",
      dataIndex: "applicationId",
      key: "done",
      width: "100px",
      fixed: 'right',
      render: (applicationId, data) => {
        return (
          <Fragment>
            <Popconfirm
              title={
                <Fragment>
                  您确认要刷新“{data.applicationName}”应用的Token吗？
                  <br />
                  <span style={{ color: "#aaaaaa" }}>
                    该操作将生成新Token，原Token将不可用，请慎重操作。
                  </span>
                </Fragment>
              }
              okText="刷新Token"
              okType="primary"
              cancelText="取消"
              placement="topRight"
              onConfirm={() => this.refreshToken(data)}
            >
              <Tooltip title="刷新Token" placement="top">
                <Button shape="circle" icon="redo" size="small"></Button>
              </Tooltip>
            </Popconfirm>
            &nbsp;
            <Popconfirm
              title={
                <Fragment>
                  您确认要删除“{data.applicationName}”应用吗？
                  <br />
                  <span style={{ color: "#aaaaaa" }}>
                    该操作将让应用的Token无法使用（不会清除日志数据）。
                  </span>
                </Fragment>
              }
              okText="删除应用"
              okType="danger"
              cancelText="取消"
              placement="topRight"
              onConfirm={() => this.delete(data)}
            >
              <Tooltip title="删除" placement="top">
                <Button icon="delete" shape="circle" size="small"></Button>
              </Tooltip>
            </Popconfirm>
          </Fragment>
        );
      }
    }
  ];
  refreshToken = data => {
    this.props.refreshToken(data);
  };
  delete = data => {
    const {
      listForAPP: { list, pager },
      deleteAPP
    } = this.props;
    if (list.length > 1) {
      deleteAPP(data);
    } else {
      // 如果本页只剩下一条记录，则删除成功后页码-1
      const nowPage = pager.pageIndex - 1;
      deleteAPP(data, true, nowPage < 1 ? 1 : nowPage);
    }
  };
  setPage = pageIndex => {
    const {
      listForAPP: {
        pager: { totalPages }
      },
      changeSearchDataForAPP,
      getListForAPP
    } = this.props;
    if (pageIndex > totalPages) {
      message.warning("输入页码超过总页数！");
      return;
    }
    //首先更改搜索条件
    changeSearchDataForAPP({ pageIndex });
    //其次再查询列表
    getListForAPP();
  };
  tryAgain = () => {
    this.props.getListForAPP();
  };
  render() {
    const {
      listForAPP: { list, pager },
      isLoadingForAPP = false,
      isErrorForAPP = false
    } = this.props;
    if (isErrorForAPP) {
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
        rowKey="applicationId"
        onPageChange={this.setPage}
        pager={pager}
        loading={isLoadingForAPP}
        scroll={{x: 1200, y: 'auto'}}
      />
    );
  }
}

export default Table;
