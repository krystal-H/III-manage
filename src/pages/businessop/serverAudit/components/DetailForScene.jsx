import React, { Component, Fragment } from "react";
import { Descriptions, Form, Table, Radio, Input } from "antd";

class DetailForScene extends Component {
  columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 60
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
      width: 80,
      render: type => this.props.sceneType[type]
    },
    {
      title: "自动化名称",
      dataIndex: "name",
      width: 120,
      ellipsis: true,
      key: "name"
    },
    {
      title: "触发协议",
      dataIndex: "a",
      width: 100,
      ellipsis: true,
      key: "a",
      render: () => "室内温度"
    },
    {
      title: "关系符号",
      dataIndex: "b",
      width: 160,
      ellipsis: true,
      key: "b",
      render: () => "范围（A<X<B）"
    },
    {
      title: "触发数值",
      dataIndex: "c",
      width: 100,
      key: "c",
      render: () => "10~20"
    },
    {
      title: "备注",
      dataIndex: "remark",
      width: 160,
      ellipsis: true,
      key: "remark",
      render: remark => {
        let s = String(remark);
        if (s.length > 8) {
          return <span title={s}>{s.slice(0, 8) + "..."}</span>;
        }
        return s;
      }
    },
    {
      title: "审核操作",
      dataIndex: "id",
      key: "done",
      render: (id, data) => {
        const { statu } = data;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const key = "statu-" + id;
        const val = getFieldValue(key);
        return statu === 0 ? (
          <Form.Item>
            {getFieldDecorator(key, {
              rules: [{ required: true, message: "请选择审核意见" }]
            })(
              <Radio.Group>
                <Radio value={1}>
                  <span style={val === 1 ? this.greenSty : null}>审核通过</span>
                </Radio>
                <Radio value={2}>
                  <span style={val === 2 ? this.redSty : null}>审核不通过</span>
                </Radio>
              </Radio.Group>
            )}
          </Form.Item>
        ) : statu === 1 ? (
          <span style={this.greenSty}>通过</span>
        ) : (
          <span style={this.redSty}>不通过</span>
        );
      }
    }
  ];
  redSty = { color: "red" };
  greenSty = { color: "green" };
  tableScroll = { y: 240 };
  getPopupContainer = triggerNode => {
    return triggerNode.parentNode;
  };
  render() {
    const {
      detailData,
      form: { getFieldDecorator }
    } = this.props;
    const { appProject, prevDetailData, flowCheck, product } = detailData || {};
    const { type, statu = 0 } = prevDetailData || {};
    const isCheck = statu === 0;

    let data = [];
    for (let i = 0; i < 15; i++) {
      data.push({
        id: i,
        type: i % 2,
        statu: i % 3,
        name: `Test ${i}`,
        remark:
          "室内温度过高室内温度过高室内温度过高室内温度过高室内温度过高室内温度过高室内温度过高室内温度过高"
      });
    }
    return (
      <Fragment>
        <Descriptions title="基础信息" column={2} size="small">
          <Descriptions.Item label="产品名称">智能冰箱</Descriptions.Item>
          <Descriptions.Item label="所属分类">
            家居生活-大家电-冰箱
          </Descriptions.Item>
          <Descriptions.Item label="服务类型">场景联动服务</Descriptions.Item>
          <Descriptions.Item label="申请账号">18233918829</Descriptions.Item>
          <Descriptions.Item label="申请时间">
            2019-12-12 12:00:00
          </Descriptions.Item>
          {isCheck ? null : (
            <Descriptions.Item label="处理时间">
              2019-12-12 18:00:00
            </Descriptions.Item>
          )}
        </Descriptions>
        <Descriptions title="审核内容" size="small"></Descriptions>
        <Table
          bordered
          className="page-server-table"
          size="small"
          columns={this.columns}
          dataSource={data}
          rowKey="id"
          pagination={false}
          scroll={this.tableScroll}
          // pager={null}
          // loading={isLoading}
        />
        <div className="page-interval" />
        {isCheck ? (
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
        ) : (
          <Descriptions title="驳回说明" size="small">
            <Descriptions.Item span={3}>
              ID为10004的场景定义范围值超过协议范围
            </Descriptions.Item>
          </Descriptions>
        )}
      </Fragment>
    );
  }
}

export default DetailForScene;
