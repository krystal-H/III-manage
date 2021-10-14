import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Card, Input, Button, Select, notification, Divider, Modal, Form, Tooltip, Table } from 'antd';
import './configSchemeDetail.less'

function ConfigSchemeDetail({ form }, ref) {
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
    {
      key: '11',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '21',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
    {
      key: '1111',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2222',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ]

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ]

  // 选择三级品类
  const handleSelectChange = () => {

  }

  useImperativeHandle(ref, () => ({
    onFinish: onSubmit
  }))

  // 表单提交
  const onSubmit = () => {
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  const { getFieldDecorator, validateFields } = form;
  return (
    <div className="config-scheme-detail">
      <Form labelCol={{ span: 3 }} wrapperCol={{ span: 19 }} onSubmit={() => onSubmit()}>
        <Form.Item label="方案功能点">
          此三级品类关联的物模型如下
          <Table
            className="config-table"
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            scroll={{ y: 140 }}
            pagination={false} />
        </Form.Item>
        <Form.Item label="方案控制面板">
          此三级品类关联的控制面板如下
          <div className="control-panel-box">
            <div className="panel-item">
              <div className="panel-item-pic"></div>
              <div className="panel-item-tip">控制面板01</div>
            </div>
            <div className="panel-item">
              <div className="panel-item-pic"></div>
              <div className="panel-item-tip">控制面板02</div>
            </div>
          </div>
        </Form.Item>
        <Form.Item label="对应模组">
          {
            getFieldDecorator('select', {
              rules: [{ required: true, message: '请选择对应模组' }],
            })(
              <Select placeholder="请选择对应支持模组"
                style={{ width: 220 }}
                onChange={() => handleSelectChange()}>
                <Option value="1">冰箱</Option>
                <Option value="2">洗衣机</Option>
              </Select>
            )
          }
        </Form.Item>
      </Form>
    </div>
  )
}

export default Form.create()(forwardRef(ConfigSchemeDetail))