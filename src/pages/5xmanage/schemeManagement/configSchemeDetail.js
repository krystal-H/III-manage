import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Card, Input, Button, Select, notification, Divider, Modal, Form, Tooltip, Table } from 'antd';

function ConfigSchemeDetail(params) {
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
  ];

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
  ];
  return (
    <div>
      <Form labelCol={{ span: 3 }} wrapperCol={{ span: 19 }}>
        <Form.Item label="方案功能点">
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        </Form.Item>
        <Form.Item label="方案控制面板">
          <div></div>
          <div></div>
        </Form.Item>
        <Form.Item label="对应模组">

        </Form.Item>
      </Form>
    </div>
  )
}

export default ConfigSchemeDetail