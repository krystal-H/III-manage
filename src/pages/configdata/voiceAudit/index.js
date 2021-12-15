import React, { useState, useEffect } from 'react'
import { Card, Form, Button, Select, Tooltip, message, Input } from 'antd'
import TitleTab from '../../../components/TitleTab'
import TableCom from '../../../components/Table'
import { cloneDeep } from "lodash"
import { DateTool } from "../../../util/utils"
import AuditDetail from './auditDetail'
import { getVoiceListRequest } from '../../../apis/voiceAudit'

const modeList = {
  0: '开发中',
  1: '已发布',
  2: '审核中'
}

function VoiceAudit({ form }) {
  const { getFieldDecorator, getFieldsValue } = form
  const [pager, setPager] = useState({ pageIndex: 1, pageRows: 10 }) //分页
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(false) //antd的loading控制
  const [totalRows, setTotalRows] = useState(0)
  const [auditDetailModal, setAuditDetailModal] = useState(false)
  const [productId, setProductId] = useState('')
  const [opeType, setOpeType] = useState('') // 操作类型

  const column = [
    { title: "产品名称", dataIndex: 'productName', key: 'productName', width: "20%", render: (text) => <span title={text}>{text}</span> },
    { title: "产品ID", dataIndex: 'productId', key: 'productId', width: "10%" },
    { title: "所属分类", dataIndex: 'allCategoryName', key: 'allCategoryName', width: "20%", render: (text) => <span title={text}>{text}</span> },
    { title: "状态", dataIndex: 'mode', key: 'mode', width: "102px", render: (item) => (<span>{modeList[item] || ''}</span>) },
    { title: "创建账号", dataIndex: 'email', key: 'email', render: (text) => <span title={text}>{text}</span> },
    {
      title: "创建时间", dataIndex: 'createTime', key: 'createTime', width: 180,
      render: (item) => {
        let timeStr = DateTool.utc2beijing(item, "yyyy-MM-dd hh:mm:ss")
        return <span title={timeStr}>{timeStr}</span>
      }
    },
    {
      title: "审核状态", dataIndex: 'status', key: 'status',
      render: (text) => {
        const colorMap = ['', '#0000ff', '']
        return <span style={{ color: colorMap[text] }}>{text === 1 ? '已审核' : text === 2 ? '待审核' : '-'}</span>
      }
    },
    {
      title: "操作", dataIndex: 'operation', key: 'operation', width: 180,
      render: (text, record) => {
        return (
          <div>
            {
              record.status === 0 && '-'
            }
            {
              record.status === 1 &&
              <Tooltip placement="top" title="查看">
                <Button icon="info" shape="circle" size="small"
                  onClick={() => handleAudit(record, 'detail')} />
              </Tooltip>
            }
            {
              record.status === 2 &&
              <Tooltip placement="top" title="审核">
                <Button icon="file-done" shape="circle" size="small" type="primary"
                  onClick={() => handleAudit(record, 'approve')} />
              </Tooltip>
            }
          </div>
        )
      }
    }
  ]

  // 审核/详情
  const handleAudit = (record, type) => {
    setAuditDetailModal(true)
    setOpeType(type)
    setProductId(record.productId)
  }

  // 查询
  const searchClick = () => {
    if (pager.pageIndex === 1) {
      getTableData()
    } else {
      setPager({ pageIndex: 1, pageRows: 10 })
    }
  }

  // 重置
  const onReset = () => {
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

  // 获取table数据
  const getTableData = () => {
    setLoading(true)
    let { productId, mode } = getFieldsValue()
    const params = {
      productId: productId ? Number(productId) : '',
      mode: mode || '',
      ...pager
    }
    getVoiceListRequest({ ...params }).then(res => {
      setDataSource(res.data.data.list)
      setTotalRows(res.data.data.pager.totalRows)
    }).finally(() => { setLoading(false) })
  }

  useEffect(() => {
    getTableData()
  }, [pager.pageRows, pager.pageIndex])

  return (
    <div>
      <TitleTab title="语音方案审核">
        <Form layout="inline">
          <Form.Item label="产品ID">
            {getFieldDecorator('productId', {
              getValueFromEvent: (e) => {
                const val = e.target.value;
                return val.replace(/[^\d]/g, '');
              }
            })(
              <Input placeholder="请输入产品ID" style={{ width: 240 }}></Input>
            )}
          </Form.Item>
          <Form.Item label="状态">
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
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={() => searchClick()}>查询</Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={() => onReset()}>重置</Button>
          </Form.Item>
        </Form>
      </TitleTab>
      <Card>
        <TableCom
          rowKey="productId"
          columns={column}
          dataSource={dataSource}
          pager={pager}
          loading={loading}
          pagination={{
            defaultCurrent: 1,
            current: pager.pageIndex,
            onChange: pagerChange,
            pageSize: pager.pageRows,
            total: totalRows,
            showQuickJumper: true,
            pageSizeOptions: ["10"],
            showTotal: () => <span>共 <a>{totalRows}</a> 条</span>
          }} />
      </Card>
      {/* 审核、详情 */}
      {
        auditDetailModal &&
        <AuditDetail
          opeType={opeType}
          productId={productId}
          visible={auditDetailModal}
          handleOk={() => {
            setAuditDetailModal(false)
            getTableData()
          }}
          handleCancel={() => { setAuditDetailModal(false) }} />
      }
    </div>
  )
}

export default Form.create()(VoiceAudit)
