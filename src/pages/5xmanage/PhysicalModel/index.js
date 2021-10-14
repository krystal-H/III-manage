import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Select, notification, Divider, Modal, Form, Tooltip } from 'antd';
import TitleTab from '../../../components/TitleTab';
import TableCom from '../../../components/Table';
import AddModal from './add'
import './index.less'

const FormItem = Form.Item
const TitleOption = TitleTab.Option

const modeList = {
  0: '开发中',
  1: '已发布',
  2: '审核中'
}

function PhysicalModel({ form }) {
  const [pager, setpager] = useState({
    totalRows: 0,
    pageIndex: 0
  })
  const [dataSource, setdataSource] = useState([])
  const [addVis, setAddVis] = useState(true)
  const column = [
    {
      title: '物模型ID',
      dataIndex: '',
      key: '',
    },
    {
      title: '物模型名称',
      dataIndex: '',
      key: '',
    },
    {
      title: '语言版本',
      dataIndex: '',
      key: '',
    },
    {
      title: '所属分类',
      dataIndex: '',
      key: '',
    },
    {
      title: '状态',
      dataIndex: '',
      key: '',
    },
    {
      title: '创建时间',
      dataIndex: '',
      key: '',
    },
    {
      title: '修改时间',
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
  //=======
  const handleOk = () => {
    setAddVis(false)
  }
  const handleCancel = () => {
    setAddVis(false)
  }
  return (
    <div className="PhysicalModel-page">
      <TitleTab title="平台物模型管理">
        <Form layout="inline" >

          <FormItem label="所属分类">
            {getFieldDecorator('mode')(
              <Select style={{ width: 160 }} placeholder="请选择所属分类">
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
          <FormItem label="物模型名称">
            {getFieldDecorator('productId', {
              getValueFromEvent: (e) => {
                const val = e.target.value;
                return val.replace(/[^\d]/g, '');
              }
            })(
              <Input placeholder="请输入物模型名称" style={{ width: 240 }} onPressEnter={() => searchList()}></Input>
            )}
          </FormItem>
          <FormItem  >
            <Button type="primary" onClick={() => searchList()} >查询</Button>
          </FormItem>
          <FormItem >
            <Button onClick={() => onReset()}>重置</Button>
          </FormItem>
        </Form>
        <div className="PhysicalModel-title">
          <Button type="primary" onClick={() => { setAddVis(true) }} >新增物模型</Button>
          <Button onClick={() => searchList()} >批量导入</Button>
        </div>
      </TitleTab>
      <Card>
        <TableCom rowKey={"productId"} columns={column} dataSource={dataSource}
          pager={pager} onPageChange={() => onPageChange()} />
      </Card>
      {
        addVis && <AddModal addVis={addVis} handleCancel={handleCancel} handleOk={handleOk} />
      }
    </div>
  )
}

export default Form.create()(PhysicalModel)