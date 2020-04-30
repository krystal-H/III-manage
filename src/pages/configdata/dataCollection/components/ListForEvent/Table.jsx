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
  eventType = ["私有事件", "Web端", "移动端", "全局事件"];
  eventDuration = ["无", "有"];
  red = { color: "red" };
  green = { color: "green" };
  columns = [
    {
      title: "事件ID",
      dataIndex: "eventId",
      key: "eventId",
      width: "90px"
    },
    {
      title: "eventKey",
      dataIndex: "eventKey",
      key: "eventKey",
      render: d => <Popover content={d}>{d}</Popover>
    },
    {
      title: "事件名称",
      dataIndex: "eventName",
      key: "eventName"
    },
    {
      title: "事件类型",
      dataIndex: "eventType",
      key: "eventType",
      render: eventType => this.eventType[eventType]
    },
    {
      title: "时长统计",
      dataIndex: "eventDuration",
      key: "eventDuration",
      render: eventDuration => this.eventDuration[eventDuration]
    },
    {
      title: "所属应用ID",
      dataIndex: "applicationId",
      key: "applicationId"
    },
    {
      title: "应用版本",
      dataIndex: "appVersion",
      key: "appVersion"
    },
    {
      title: "关联应用名",
      dataIndex: "applicationName",
      key: "applicationName",
      render: d => <Popover content={d}>{d}</Popover>
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      render: createTime => getTimeStr(createTime)
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      key: "updateTime",
      render: updateTime => getTimeStr(updateTime)
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: status =>
        status === 0 ? (
          <span style={this.red}>禁用</span>
        ) : (
          <span style={this.green}>启用</span>
        )
    },
    {
      title: "操作",
      dataIndex: "eventId",
      key: "done",
      width: "120px",
      fixed: 'right',
      render: (eventId, data) => {
        const { status, eventName } = data;
        const isDisabled = status === 0;
        const text = isDisabled ? "启用" : "禁用";
        const icon = isDisabled ? "caret-right" : "stop";
        const btnType = isDisabled ? "primary" : "danger";
        return (
          <Fragment>
            <Tooltip title="编辑" placement="top">
              <Button
                shape="circle"
                icon="edit"
                size="small"
                onClick={() => this.edit(data)}
              ></Button>
            </Tooltip>
            &nbsp;
            <Popconfirm
              title={
                <Fragment>
                  您确认要{text}“{eventName}”事件吗？
                </Fragment>
              }
              okText={text}
              okType={btnType}
              cancelText="取消"
              placement="topRight"
              onConfirm={() => this.disableEvent(data)}
            >
              <Tooltip title={text} placement="top">
                <Button shape="circle" icon={icon} size="small"></Button>
              </Tooltip>
            </Popconfirm>
            &nbsp;
            <Popconfirm
              title={<Fragment>您确认要删除“{eventName}”事件吗？</Fragment>}
              okText="删除事件"
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
  edit = data => {
    this.props.openUpdateModalForEvent(data);
  };
  disableEvent = data => {
    this.props.disableEvent(data);
  };
  delete = data => {
    const {
      listForEvent: { list, pager },
      deleteEvent
    } = this.props;
    if (list.length > 1) {
      deleteEvent(data);
    } else {
      // 如果本页只剩下一条记录，则删除成功后页码-1
      const nowPage = pager.pageIndex - 1;
      deleteEvent(data, true, nowPage < 1 ? 1 : nowPage);
    }
  };
  setPage = pageIndex => {
    const {
      listForEvent: {
        pager: { totalPages }
      },
      changeSearchDataForEvent,
      getListForEvent
    } = this.props;
    if (pageIndex > totalPages) {
      message.warning("输入页码超过总页数！");
      return;
    }
    //首先更改搜索条件
    changeSearchDataForEvent({ pageIndex });
    //其次再查询列表
    getListForEvent();
  };
  tryAgain = () => {
    this.props.getListForEvent();
  };
  render() {
    const {
      listForEvent: { list, pager },
      isLoadingForEvent = false,
      isErrorForEvent = false
    } = this.props;
    if (isErrorForEvent) {
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
        rowKey="eventId"
        onPageChange={this.setPage}
        pager={pager}
        loading={isLoadingForEvent}
        scroll={{ x: 1500, y: 'auto' }}
      />
    );
  }
}

export default Table;
