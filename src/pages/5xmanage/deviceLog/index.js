import React, { useState, useEffect } from 'react'
import { Card, Form, Input, Button, Select, Tooltip, Modal, message, DatePicker } from 'antd'
import TitleTab from '../../../components/TitleTab'
import TableCom from '../../../components/Table'
import './index.less'

const { Option } = Select
const { RangePicker } = DatePicker

function DeviceLog({ form }) {
  const { getFieldDecorator, getFieldsValue } = form
  const [pager, setPager] = useState({ pageIndex: 1, pageRows: 10 }) //分页
  const [totalRows, setTotalRows] = useState(0)
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(false) //antd的loading控制
  const column = [
    {
      title: "序号",
      key: "num",
      dataIndex: "num",
      render: (text) => <span title={text}>{text}</span>
    },
    {
      title: "时间",
      key: "",
      dataIndex: "",
      render: (text) => <span title={text}>{text}</span>
    },
    {
      title: "设备事件",
      key: "",
      dataIndex: "",
      render: (text) => <span title={text}>{text}</span>
    },
    {
      title: "设备ID",
      key: "",
      dataIndex: "",
      render: (text) => <span title={text}>{text}</span>
    },
    {
      title: "事件名称",
      key: "",
      dataIndex: "",
      render: (text) => <span title={text}>{text}</span>
    },
    {
      title: "事件详情",
      key: "",
      dataIndex: "",
      render: (text) => <span title={text}>{text}</span>
    },
    {
      title: "来源",
      key: "",
      dataIndex: "",
      render: (text) => <span title={text}>{text}</span>
    },
  ]

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  }
  
  // 获取模组列表
  const getTableData = () => {
    // setLoading(true)
    console.log(getFieldsValue(), '1111111111111111111')
    let { moduleName, moduleType } = getFieldsValue()
    const params = {
      moduleName: moduleName ? moduleName.trim() : '',
      moduleType: moduleType ? moduleType : '',
      ...pager
    }
    // ModuleListRequest(params).then(res => {
    //   if (res.data.code === 0) {
    //     setDataSource(res.data.data.list)
    //     setTotalRows(res.data.data.pager.totalRows)
    //   }
    // }).finally(() => { setLoading(false) })
  }

  useEffect(() => {
    getTableData()
  }, [pager.pageRows, pager.pageIndex])

  // 搜索按钮触发,默认请求第一页的数据
  const searchClick = () => {
    if (pager.pageIndex === 1) {
      getTableData()
    } else {
      setPager({ pageIndex: 1, pageRows: 10 })
    }
  }

  // 重置按钮触发
  const reset = () => {
    form.resetFields()
    searchClick()
  }

  // 翻页
  const pagerChange = (pageIndex, pageRows) => {
    setPager(pre => {
      let obj = cloneDeep(pre)
      return Object.assign(obj, { pageIndex: pageRows === pager.pageRows ? pageIndex : 1, pageRows })
    })
  }

  return (
    <div className='device-log-page'>
      <TitleTab title="设备日志列表">
        <Form layout="inline" className="schemeList-form" autoComplete="off">
          <div>
            <Form.Item label='产品名称'>
              {getFieldDecorator('productName', {})(
                <Input placeholder="请输入产品名称" />,
              )}
            </Form.Item>
            <div className='inline-form-item'>
              <Form.Item label='设备' className='form-item'>
                {getFieldDecorator('opeType', {})(
                  <Select style={{ width: 130, marginBottom: 0 }} placeholder="请选择条件"
                    showSearch
                    optionFilterProp="children">
                    <Option value="did">设备did</Option>
                    <Option value="mac">设备mac</Option>
                    <Option value="IMEI">IMEI</Option>
                    <Option value="ptojectName">项目名称</Option>
                    <Option value="bindUeser">设备绑定用户</Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item label=''>
                {getFieldDecorator('msg', {})(
                  <Input placeholder="请输入选择条件信息" style={{ width: 200 }} />,
                )}
              </Form.Item>
            </div>
            <Form.Item label='设备事件'>
              {getFieldDecorator('deviceThing', {})(
                <Select style={{ width: 150, marginBottom: 0 }} placeholder="请选择设备事件"
                  showSearch
                  optionFilterProp="children">

                </Select>
              )}
            </Form.Item>
            <Form.Item label="时间">
              {
                getFieldDecorator('time', {})(
                  <RangePicker onChange={onChange} />
                )
              }
            </Form.Item>

            <Form.Item>
              <Button type="primary" onClick={() => searchClick()} >查询</Button>
            </Form.Item>
            <Form.Item>
              <Button onClick={() => reset()}>重置</Button>
            </Form.Item>
          </div>
        </Form>
      </TitleTab>

      <Card style={{ marginTop: 10 }}>
        <TableCom rowKey="moduleId" bordered
          columns={column}
          dataSource={dataSource}
          loading={loading}
          pagination={{
            defaultCurrent: 1,
            current: pager.pageIndex,
            onChange: pagerChange,
            pageSize: pager.pageRows,
            total: totalRows,
            showQuickJumper: true,
            pageSizeOptions: ['10'],
            showTotal: () => <span>共 <a>{totalRows}</a> 条</span>
          }}
        />
      </Card>
    </div>
  )
}

export default Form.create()(DeviceLog)
