import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Select, message, Radio, Modal, Form, Tooltip, Popconfirm } from 'antd';
import TitleTab from '../../../components/TitleTab';
import { getList } from '../../../apis/upNotice'
import TableCom from '../../../components/Table';
import { DateTool } from '../../../util/utils';
import NoticeModel from './notice'
import './style.scss'
const FormItem = Form.Item
const optionArr = [{ value: 1, label: '待审核' }, { value: 2, label: '已通过' }]

function PanelMn({ form }) {
  const { getFieldDecorator, validateFields, getFieldsValue } = form;
  const [pager, setPager] = useState({ pageIndex: 1, pageRows: 10 }) //分页
  const [totalRows, setTotalRows] = useState(0)
  const [dataSource, setdataSource] = useState([])
  const [loading, setLoading] = useState(false)
  const [noticeVis, setNoticeVis] = useState(false)
  const [actionData, setActionData] = useState({})
  const column = [
    {
      title: '模组型号',
      dataIndex: 'hetModuleTypeName',
      key: 'hetModuleTypeName',
      render: (text) => <span title={text}>{text}</span>
    },
    {
      title: '生产厂家',
      dataIndex: 'brandName',
      key: 'brandName',
      render: (text) => <span title={text}>{text}</span>

    },
    {
      title: '模组IC型号',
      dataIndex: 'productName',
      key: 'productName',
      render: (text) => <span title={text}>{text}</span>
    },
    {
      title: '模组尺寸',
      dataIndex: 'schemeType',
      key: 'schemeType',
      render(text,row) {
        return <span>
          {row.sizeThickness}*{row.sizeWidth}*{row.sizeHeight}mm
        </span>
      }
    },
    {
      title: '更新时间',
      dataIndex: 'modifyTime',
      key: 'modifyTime',
      render(createTime) {
        let text = createTime && DateTool.utcToDev(createTime)
        return <span title={text}>{text}</span>;
      }

    },
    {
      title: '操作',
      key: '',
      render: (_, row) => {
        return <>
          {/* <a style={{ marginRight: '10px' }} onClick={() => openUp(row)} >升级</a> */}
          <a style={{ marginRight: '10px' }}>通知历史</a>
          <a onClick={() => { openNotice(row) }}>更新通知</a>
        </>
      }
    }
  ]
  //
  const openNotice = row => {
    setActionData(row)
    setNoticeVis(true)
  }
  //页码改变
  const pagerChange = (pageIndex, pageRows) => {
    if (pageRows === pager.pageRows) {
      setPager(pre => {
        let obj = JSON.parse(JSON.stringify(pre))
        return Object.assign(obj, { pageIndex, pageRows })
      })
    } else {
      setPager(pre => {
        let obj = JSON.parse(JSON.stringify(pre))
        return Object.assign(obj, { pageIndex: 1, pageRows })
      })
    }

  }
  useEffect(() => {
    getTableData()
  }, [pager.pageRows, pager.pageIndex])
  //列表
  const getTableData = () => {
    let params = {}
    let hetModuleTypeName = getFieldsValue().hetModuleTypeName
    if (hetModuleTypeName && hetModuleTypeName.trim()) {
      params.hetModuleTypeName = hetModuleTypeName.trim()
    }
    params = { ...params, ...pager }
    setLoading(true)
    getList(params).then(res => {
      if (res.data.code == 0) {
        setdataSource(res.data.data.list)
        setTotalRows(res.data.data.pager.totalRows)
      }
    }).finally(() => { setLoading(false) })
  }
  //重置
  const handleReset = () => {
    form.resetFields();
  }
  //搜索
  const searchList = () => {
    if (pager.pageIndex == 1) {
      getTableData()
    } else {
      setPager({ pageIndex: 1, pageRows: 10 })
    }
  }
  const cancelNotice = () => {
    setNoticeVis(false)
  }
  return (
    <div className="panelMn-page" style={{ minWidth: '1200px' }}>
      <TitleTab title="模组升级&通知">
        <Form layout="inline" >
          <FormItem label="关键字">
            {getFieldDecorator('hetModuleTypeName', {
            })(
              <Input placeholder="请输入生产厂商或模组型号" style={{ width: 240 }} allowClear></Input>
            )}
          </FormItem>

          <FormItem  >
            <Button type="primary" onClick={() => searchList()} >查询</Button>
          </FormItem>
          <FormItem >
            <Button onClick={() => handleReset()}>重置</Button>
          </FormItem>
        </Form>
      </TitleTab>
      <Card>
        <TableCom rowKey={"moduleId"} columns={column} dataSource={dataSource}
          loading={loading}
          pagination={{
            defaultCurrent: 1,
            current: pager.pageIndex,
            onChange: pagerChange,
            pageSize: pager.pageRows,
            total: totalRows,
            showQuickJumper: true,
            showTotal: () => <span>共 <a>{totalRows}</a> 条</span>
          }} />
      </Card>
      {
        noticeVis && <NoticeModel noticeVis={noticeVis} handleCancel={cancelNotice} actionData={actionData} />
      }
    </div>
  )
}

export default Form.create()(PanelMn)