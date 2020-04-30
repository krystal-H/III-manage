import React, { Component, Fragment } from "react";
import { Tooltip, Button, Result, message } from "antd";
import TableComponent from "../../../../components/Table";
import moment from "moment";

export const getTimeStr = function(num) {
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

class Table extends Component {
  //applyDesc: null  createTime: 1571053417000;  developerId: 50081;  email: "330474859@qq.com";  id: 1561;  isSendEnTemplate: null;  productId: 9914;  productName: "大佬，别动！";  readStatus: null;  remark: null;  statu: 1;  statuName: "通过";  type: 11;  typeId: 14487;  typeName: "APP控制服务";
  columns = [
    {
      title: "产品ID",
      dataIndex: "productId",
      key: "productId"
    },
    {
      title: "产品名称",
      dataIndex: "productName",
      key: "productName"
    },
    // {
    //   title: "服务类型",
    //   dataIndex: "type",
    //   key: "type",
    //   render: type => this.props.serverTypeMap[type]
    // },
    {
      title: "提交用户",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "状态",
      dataIndex: "statu",
      key: "statu",
      render: statu => {
        const val = statu === 0 ? "待审核" : "已审核";
        const sty = {
          color: statu === 0 ? "blue" : "green" // 已审核 - 待审核
        };
        return <span style={sty}>{val}</span>;
      }
    },
    {
      title: "申请日期",
      dataIndex: "createTime",
      key: "createTime",
      render: createTime => getTimeStr(createTime)
    },
    {
      title: "操作",
      dataIndex: "id",
      key: "done",
      width: "120px",
      render: (id, data) => {
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
  openModal = data => {
    this.props.getDetailAndOpenModal(data);
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
        rowKey="id"
        onPageChange={this.setPage}
        pager={pager}
        loading={isLoading}
      />
    );
  }
}

export default Table;
