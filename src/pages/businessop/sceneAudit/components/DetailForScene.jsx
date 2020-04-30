import React, { Component, Fragment } from "react";
import { Descriptions, Form, Table, Radio, Input } from "antd";
import { getTimeStr } from "./Table";

class DetailForScene extends Component {
  redSty = { color: "red" };
  greenSty = { color: "green" };

  tableScroll = { y: 240 };
  columns = [
    {
      title: "序号",
      dataIndex: "deviceCmdId",
      key: "deviceCmdId",
      width: 60,
      render: (id, data, index) => index + 1
    },
    {
      title: "功能名称",
      dataIndex: "name",
      width: 200,
      key: "name",
      render: v => {
        const sty = { width: "183px" };
        return (
          <div className="page-ellipsis" style={sty} title={v}>
            {v}
          </div>
        );
      }
    },
    {
      title: "类型",
      dataIndex: "cmdType",
      key: "cmdType",
      width: 80,
      render: cmdType => this.props.sceneType[cmdType]
    },
    {
      title: "触发协议",
      dataIndex: "protocolName",
      key: "protocolName",
      width: 200,
      render: v => {
        const sty = { width: "183px" };
        return (
          <div className="page-ellipsis" style={sty} title={v}>
            {v}
          </div>
        );
      }
    },
    {
      title: "触发参数",
      dataIndex: "triggerParam",
      width: 200,
      key: "triggerParam",
      render: v => {
        const val = v || "-";
        const sty = { width: "183px" };
        return (
          <div className="page-ellipsis" style={sty} title={val}>
            {val}
          </div>
        );
      }
    },
    {
      title: "审核操作",
      dataIndex: "deviceCmdId",
      key: "done",
      render: (deviceCmdId, data) => {
        const { status } = data;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const key = "statu-" + deviceCmdId;
        const val = getFieldValue(key);
        return status === 0 ? (
          <Form.Item>
            {getFieldDecorator(key, {
              rules: [{ required: true, message: "请选择审核意见" }]
            })(
              <Radio.Group>
                <Radio value={1}>
                  <span style={val === 1 ? this.greenSty : null}>通过</span>
                </Radio>
                <Radio value={2}>
                  <span style={val === 2 ? this.redSty : null}>不通过</span>
                </Radio>
              </Radio.Group>
            )}
          </Form.Item>
        ) : status === 1 ? (
          <span style={this.greenSty}>通过</span>
        ) : (
          <span style={this.redSty}>不通过</span>
        );
      }
    }
  ];
  getPopupContainer = triggerNode => {
    return triggerNode.parentNode;
  };
  render() {
    const {
      detailData,
      form: { getFieldDecorator, getFieldValue }
    } = this.props;
    const {
      status,
      remark,
      sceneFunctionList: _sceneFunctionList,
      typeName,
      productName,
      prevDetailData: { email, createTime, updateTime } = {}
    } = detailData || {};
    const isCheck = status === 0 && status !== undefined; // 当前是否需要审核
    const isCheckWithError = status === 2; // 当前是否审核不通过
    const sceneFunctionList = _sceneFunctionList || [];
    const nowStatusList = sceneFunctionList.map(({ deviceCmdId }) => {
      return getFieldValue("statu-" + deviceCmdId);
    });
    const useScroll = sceneFunctionList.length > 4;
    const needRemark = nowStatusList.indexOf(2) > -1;
    return (
      <Fragment>
        <Descriptions title="基础信息" column={2} size="small">
          <Descriptions.Item label="产品名称">{productName}</Descriptions.Item>
          <Descriptions.Item label="所属分类">{typeName}</Descriptions.Item>
          <Descriptions.Item label="服务类型">场景联动服务</Descriptions.Item>
          <Descriptions.Item label="申请账号">{email}</Descriptions.Item>
          <Descriptions.Item label="申请时间">
            {getTimeStr(createTime)}
          </Descriptions.Item>
          {!isCheck && updateTime ? (
            <Descriptions.Item label="处理时间">
              {getTimeStr(updateTime)}
            </Descriptions.Item>
          ) : null}
        </Descriptions>
        <Descriptions title="审核内容" size="small"></Descriptions>
        <Table
          bordered
          className="page-server-table"
          size="small"
          columns={this.columns}
          dataSource={sceneFunctionList}
          rowKey="deviceCmdId"
          pagination={false}
          scroll={useScroll ? this.tableScroll : undefined}
          // pager={null}
          // loading={isLoading}
        />
        <div className="page-interval" />
        {isCheck && needRemark ? (
          <Fragment>
            <Descriptions title="驳回说明" size="small"></Descriptions>
            <Form.Item>
              {getFieldDecorator("remark", {
                // rules: [{ required: true, message: "请补充驳回说明" }]
              })(
                <Input.TextArea
                  rows={3}
                  maxLength={500}
                  placeholder="请输入驳回说明"
                />
              )}
            </Form.Item>
          </Fragment>
        ) : null}
        {isCheckWithError ? (
          <Descriptions title="驳回说明" size="small">
            <Descriptions.Item span={3}>{remark}</Descriptions.Item>
          </Descriptions>
        ) : null}
      </Fragment>
    );
  }
}

export default DetailForScene;
