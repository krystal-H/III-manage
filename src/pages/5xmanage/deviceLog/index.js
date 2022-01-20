import React, { useState, useEffect } from 'react'
import { Card, Form, Input, Button, Select, Tooltip, Modal, message, DatePicker } from 'antd'
import TitleTab from '../../../components/TitleTab'
import TableCom from '../../../components/Table'
import { getDeviceLogRequest } from '../../../apis/deviceLog'
import { DateTool, addKeyToTableData } from '../../../util/utils';
import { cloneDeep } from 'lodash'
import moment from 'moment'
import './index.less'

const { Option } = Select
const { RangePicker } = DatePicker
const dateFormat = 'YYYY/MM/DD'
const deviceEvents = ['上线', '离线', '设备控制', '设备配网', '设备上报', '设备绑定', '设备解绑', '场景执行', '设备重启', '固件升级']

function disabledDate(current) {
  // Can not select days before today and today
  return current && current > moment().endOf('day');
}

function DeviceLog({ form }) {
  const { getFieldDecorator, getFieldsValue } = form
  const [pager, setPager] = useState({ pageIndex: 1, pageRows: 10 }) //分页
  const [totalRows, setTotalRows] = useState(0)
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(false) //antd的loading控制
  const [startTime, setStartTime] = useState()
  const [endTime, setEndTime] = useState()

  const column = [
    // {
    //   title: "序号",
    //   key: "num",
    //   dataIndex: "num",
    //   render: (text) => <span title={text}>{text}</span>
    // },
    {
      title: "时间",
      key: "executeTime",
      dataIndex: "executeTime",
      render: (text) => {
        return <span>{DateTool.formateDate(text + '', 'yyyy-MM-dd hh:mm:ss', 8)}</span>
      }
    },
    {
      title: "设备事件",
      key: "eventType",
      dataIndex: "eventType",
      render: (text) => <span title={text}>{text}</span>
    },
    {
      title: "设备ID",
      key: "did",
      dataIndex: "did",
      render: (text) => <span title={text}>{text}</span>
    },
    {
      title: "事件名称",
      key: "eventName",
      dataIndex: "eventName",
      render: (text) => <span title={text}>{text}</span>
    },
    {
      title: "事件详情",
      key: "eventDetail",
      dataIndex: "eventDetail",
      render: (text) => <span title={text}>{text}</span>
    },
    {
      title: "事件状态",
      key: "eventStatus",
      dataIndex: "eventStatus",
      render: (text) => <span title={text}>{text || ''}</span>
    },
    {
      title: "来源",
      key: "source",
      dataIndex: "source",
      render: (text) => <span title={text}>{text}</span>
    },
  ]

  const onChange = (date, dateString) => {
    if (dateString && dateString.length) {
      setStartTime((new Date(dateString[0])).getTime()) // 开始时间  选择时间的0点
      setEndTime((new Date(dateString[1])).getTime() + 24 * 60 * 60 * 1000) // 结束时间为选择时间次日0点
    }
  }

  // 获取模组列表
  const getTableData = () => {
    setLoading(true)
    const { msg, productName, eventType, opeType } = getFieldsValue()
    let params = {
      startTime,
      endTime,
      [`${opeType}`]: msg,
      productName: productName || '',
      eventType: eventType || '',
      ...pager
    }
    getDeviceLogRequest(params).then(res => {
      if (res.data.code === 0 && res.data.data) {
        setDataSource(addKeyToTableData(res.data.data.list))
        setTotalRows(res.data.data.pager.totalRows)
      }
    }).finally(() => { setLoading(false) })
  }

  useEffect(() => {
    if ((form.getFieldValue('productName') || form.getFieldValue('opeType')) && form.getFieldValue('time')) {
      getTableData()
    }
  }, [pager.pageRows, pager.pageIndex])

  // 搜索按钮触发,默认请求第一页的数据
  const searchClick = () => {
    if (pager.pageIndex === 1) {
      if (!form.getFieldValue('productName') && !form.getFieldValue('opeType')) {
        message.warning('产品名称、设备条件必选其一')
      } else if (!form.getFieldValue('time')) {
        message.warning('请选择时间')
      } else {
        getTableData()
      }
    } else {
      setPager({ pageIndex: 1, pageRows: 10 })
    }
  }

  // 重置按钮触发
  const reset = () => {
    form.resetFields()
    setStartTime()
    setEndTime()
    setDataSource([])
    setTotalRows(0)
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
              {getFieldDecorator('productName')(
                <Input placeholder="请输入产品名称" />,
              )}
            </Form.Item>
            <div className='inline-form-item'>
              <Form.Item label='设备条件' className='form-item'>
                {getFieldDecorator('opeType')(
                  <Select style={{ width: 130, marginBottom: 0 }} placeholder="请选择条件" allowClear>
                    <Option value="did">设备did</Option>
                    <Option value="macAddress">设备mac</Option>
                    <Option value="physicalAddr">物理地址</Option>
                    <Option value="imei">IMEI</Option>
                    {/* <Option value="ptojectName">项目名称</Option> */}
                    {/* <Option value="bindUeser">设备绑定用户</Option> */}
                  </Select>
                )}
              </Form.Item>
              <Form.Item label=''>
                {getFieldDecorator('msg')(
                  <Input placeholder="请输入选择条件信息" style={{ width: 200 }} />,
                )}
              </Form.Item>
            </div>
            <Form.Item label='设备事件'>
              {getFieldDecorator('eventType')(
                <Select style={{ width: 150, marginBottom: 0 }} placeholder="请选择设备事件" allowClear>
                  {
                    deviceEvents.map((item, index) => (
                      <Option value={item} key={index}>{item}</Option>
                    ))
                  }
                </Select>
              )}
            </Form.Item>
            <Form.Item label="时间">
              {
                getFieldDecorator('time')(
                  <RangePicker onChange={onChange} format={dateFormat} disabledDate={disabledDate} />
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
        <TableCom rowKey="key" bordered
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
