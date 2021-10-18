import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Select, notification, Divider, Modal, Form, Tooltip } from 'antd';
import TitleTab from '../../../components/TitleTab';
import TableCom from '../../../components/Table';
import TableHOC from '../../../components/TableHOC';
import OperateSchemeModal from './addScheme'
import { schemeManageListRequest, getThirdCategoryRequest } from '../../../apis/schemeManagement'
import { DateTool } from "../../../util/utils";

import './schemeList.less'

const FormItem = Form.Item
const TitleOption = TitleTab.Option

const statusMap = {
  1: '草稿',
  2: '已发布'
}

const schemeTypeMap = {
  1: '免开发',
  2: 'MCU方案',
  3: 'Soc方案'
}

function SchemeList({ form }) {
  const [pager, setPager] = useState({ totalRows: 0, pageIndex: 0 })
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(false) //antd的loading控制
  const [addSchemeModal, setAddSchemeModal] = useState(false)
  const [thirdCategoryList, setThirdCategoryList] = useState([])
  const [deviceTypeId, setDeviceTypeId] = useState('')
  const [status, setStatus] = useState('')

  const column = [
    { title: "修改账号", dataIndex: 'account', key: 'account', render: (text) => <span title={text}>{text}</span> },
    { title: "品类", dataIndex: 'deviceType', key: 'deviceType', render: (text) => <span title={text}>{text}</span> },
    { title: "方案类型", dataIndex: 'type', key: 'type', render: (item) => (<span>{schemeTypeMap[item] || ''}</span>) },
    { title: "方案名称", dataIndex: 'name', key: 'name', render: (text) => <span title={text}>{text}</span> },
    {
      title: "状态",
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color = ["", "green", "gray"];
        return <span style={{ color: `${color[status]}` }}>{status === 1 ? "草稿" : "已发布"}</span>
      }
    },
    {
      title: "更新时间",
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: (updateTime) => {
        let time = DateTool.utcToDev(updateTime);
        return <span title={time}>{time}</span>
      }
    },
    {
      title: "操作", dataIndex: 'productId', key: 'operation', width: 180,
      render: (text, record) => {
        return (
          <div>{generateOperationBtn(record)}</div>
        )
      }
    }
  ]

  // 已发布操作按钮的数据源
  const releaseBtnArr = () => {
    return [
      { title: "查看", icon: "info", key: 'View' },
    ]
  }
  // 未发布操作按钮数据源
  const unReleaseBtnArr = () => {
    return [
      { title: "发布", icon: "cloud-upload", key: 'release' },
      { title: "编辑", icon: "edit", key: 'edit' },
    ]
  }

  // 初始化表格按钮方法1
  const generateOperationBtn = (record) => {
    if (record.status === 2) { // 已发布
      let btnarr = releaseBtnArr();
      return btnarr.map((item, index) => (
        createOperationBtn(item, record)
      ))
    } else { // 草稿
      let btnarr = unReleaseBtnArr();
      return btnarr.map((item, index) => (
        createOperationBtn(item, record)
      ))
    }
  }

  // 初始化表格按钮方法2
  const createOperationBtn = (item, record) => {
    return (
      <Tooltip key={item.key} placement="top" title={item.title}>
        <Button style={{ marginLeft: "10px" }}
          shape="circle"
          size="small"
          icon={item.icon}
          key={item.templateId}
          onClick={() => this.handleOperation(item, record)}
        />
      </Tooltip>)
  }

  // 查询列表
  const getList = () => {
    setLoading(true)
    let params = {
      deviceTypeId,
      status,
      current: 1,
      size: 10
      // pageIndex: 1,
      // pageRows: 10,
    }
    schemeManageListRequest(params).then(res => {
      let data = res.data.data.records;
      // data.map((item, index) => {
      //   item["key"] = item.id;
      // })
      setDataSource(data)
    }).finally(() => { setLoading(false) })
  }

  // 查询品类
  const getThirdCategory = () => {
    getThirdCategoryRequest({}).then(res => {
      setThirdCategoryList(res.data.data)
    })
  }

  useEffect(() => {
    getList()
    getThirdCategory()
  }, [])

  useEffect(() => {
    getList()
  }, [deviceTypeId, status])

  // 重置
  const onReset = () => {
    form.resetFields()
    setDeviceTypeId('')
    setStatus('')
    getList()
  }

  // 翻页
  const onPageChange = (val) => {
    console.log('翻页', val)
  }

  const { getFieldDecorator } = form
  return (
    <div className="schemeList">
      <TitleTab title="方案信息导入">
        <Form layout="inline" className="schemeList-form">
          <div>
            <FormItem label="三级品类">
              {getFieldDecorator('deviceTypeId')(
                <Select
                  showSearch
                  allowClear
                  style={{ width: 240 }}
                  placeholder="搜索产品品类"
                  showSearch optionFilterProp="children"
                  onChange={(val) => setDeviceTypeId(val)}>
                  {
                    thirdCategoryList && thirdCategoryList.length > 0 &&
                    thirdCategoryList.map(item => (
                      <Select.Option key={item.deviceTypeId} value={item.deviceTypeId}>{item.deviceTypeName}</Select.Option>
                    ))
                  }
                </Select>
              )}
            </FormItem>
            <FormItem label="状态">
              {getFieldDecorator('status')(
                <Select style={{ width: 160 }} placeholder="请选择状态" onChange={(val) => setStatus(val)}>
                  {
                    Object.keys(statusMap).map((item, index) => (
                      <Select.Option key={index} value={+item}>
                        {statusMap[item]}
                      </Select.Option>
                    ))
                  }
                </Select>
              )}
            </FormItem>
            <FormItem  >
              <Button type="primary" onClick={() => getList()} >查询</Button>
            </FormItem>
            <FormItem >
              <Button onClick={() => onReset()}>重置</Button>
            </FormItem>
          </div>
          <div>
            <Form.Item>
              <Button type="primary">批量导入</Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={() => setAddSchemeModal(true)}>新增</Button>
            </Form.Item>
          </div>
        </Form>
      </TitleTab>
      <Card>
        <TableCom rowKey="id" columns={column} dataSource={dataSource}
          pager={pager} onPageChange={() => onPageChange()} loading={loading} />
      </Card>
      {/* 新增方案弹窗 */}
      {
        addSchemeModal &&
        <OperateSchemeModal
          visible={addSchemeModal}
          handleOk={() => setAddSchemeModal(false)}
          handleCancel={() => setAddSchemeModal(false)} />
      }
    </div>
  )
}

export default Form.create()(SchemeList)