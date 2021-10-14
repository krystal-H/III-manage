import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Select, notification, Divider, Modal, Form, Tooltip } from 'antd';
import TitleTab from '../../../components/TitleTab';
import TableCom from '../../../components/Table';
import './index.less'

const FormItem = Form.Item
const TitleOption = TitleTab.Option

const modeList = {
  0: '开发中',
  1: '已发布',
  2: '审核中'
}

function FirmwareMagement({ form }) {
  const [pager, setpager] = useState({
    totalRows: 0,
    pageIndex: 0
  })
  const [dataSource, setdataSource] = useState([])
  const column = [
    {
      title: '提交账号',
      dataIndex: '',
      key: '',
    },
    {
      title: '提交时间',
      dataIndex: '',
      key: '',
    },
    {
      title: '归属产品',
      dataIndex: '',
      key: '',
    },
    {
      title: '方案',
      dataIndex: '',
      key: '',
    },
    {
      title: '模组名称',
      dataIndex: '',
      key: '',
    },
    {
      title: '上传的固件名称',
      dataIndex: '',
      key: '',
    },
    {
      title: '固件标识',
      dataIndex: '',
      key: '',
    },
    {
      title: '固件版本',
      dataIndex: '',
      key: '',
    },
    {
      title: '状态',
      dataIndex: '',
      key: '',
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (text, record) => (
        <span>
          {
            record.status !== 1 ?
              <a onClick={() => { audit(record) }}>审核</a>
              :
              <a onClick={() => { checkDetail(record) }}>查看</a>
          }
        </span>
      ),
    }
  ]

  // 审核
  const audit = () => { }
  // 查看
  const checkDetail = () => { }

  const searchList = () => {

  }

  const onReset = () => {

  }

  const onPageChange = () => {

  }

  const { getFieldDecorator, validateFields } = form;
  return (
    <div className="firmwareMagement-page">
      <TitleTab title="用户免开发固件上传信息">
        <Form layout="inline" className="firmwareMagement-page-form">
          <FormItem label="产品ID">
            {getFieldDecorator('productId', {
              getValueFromEvent: (e) => {
                const val = e.target.value;
                return val.replace(/[^\d]/g, '');
              }
            })(
              <Input placeholder="请输入产品ID" style={{ width: 240 }} onPressEnter={() => searchList()}></Input>
            )}
          </FormItem>
          <FormItem label="状态">
            {getFieldDecorator('mode')(
              <Select style={{ width: 160 }} placeholder="请选择状态">
                {
                  Object.keys(modeList).map((item, index) => (
                    <Select.Option key={index} value={+item}>
                      {modeList[item]}
                    </Select.Option>
                  ))
                }
              </Select>
            )}
          </FormItem>
          <FormItem  >
            <Button type="primary" onClick={() => searchList()} >查询</Button>
          </FormItem>
          <FormItem >
            <Button onClick={() => onReset()}>重置</Button>
          </FormItem>
        </Form>
      </TitleTab>
      <Card>
        <TableCom rowKey={"productId"} columns={column} dataSource={dataSource}
          pager={pager} onPageChange={() => onPageChange()} />
      </Card>
    </div>
  )
}

export default Form.create()(FirmwareMagement)