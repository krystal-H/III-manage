import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Select, Form, Table } from 'antd';
import './configSchemeDetail.less'

function ConfigSchemeDetail({ form, commitAll }, ref) {
  const [dataSource, setDataSource] = useState([])
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
        values.moduleIds = values.moduleIds.join('#')
        commitAll(values)
      }
    })
  }

  const { getFieldDecorator, validateFields } = form;
  return (
    <div className="config-scheme-detail">
      <Form labelCol={{ span: 3 }} wrapperCol={{ span: 19 }} onSubmit={() => onSubmit()}>
        <Form.Item label="方案功能点">
          {/* 此三级品类关联的物模型如下 */}
          {
            getFieldDecorator('physicalModelId', {
              rules: [{ required: true, message: '请选择此三级品类关联的物模型' }],
            })(
              <Select placeholder="请选择此三级品类关联的物模型"
                style={{ width: 250, marginBottom: 10 }}
                onChange={() => handleSelectChange()}>
                <Select.Option value="1">物模型01</Select.Option>
                <Select.Option value="2">物模型02</Select.Option>
              </Select>
            )
          }
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
            getFieldDecorator('moduleIds', {
              rules: [{ required: true, message: '请选择对应模组' }],
            })(
              <Select placeholder="请选择对应支持模组"
                style={{ width: 250 }}
                mode="multiple"
                onChange={() => handleSelectChange()}>
                <Select.Option value="1">冰箱</Select.Option>
                <Select.Option value="2">洗衣机</Select.Option>
              </Select>
            )
          }
        </Form.Item>
      </Form>
    </div>
  )
}

export default Form.create()(forwardRef(ConfigSchemeDetail))