import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Select, notification, Divider, Modal, Form, Tooltip, Popconfirm } from 'antd';
import TitleTab from '../../../components/TitleTab';
import { getList } from '../../../apis/panelMn'
import TableCom from '../../../components/Table';
import { DateTool } from '../../../util/utils';
import AddDia from './add'
import './index.less'

const FormItem = Form.Item
const TitleOption = TitleTab.Option

const modeList = {
  0: '开发中',
  1: '已发布',
  2: '审核中'
}

function PanelMn({ form }) {
  const { getFieldDecorator, validateFields, getFieldsValue } = form;
  const [pager, setPager] = useState({ pageIndex: 1, pageRows: 10 }) //分页
  const [totalRows, setTotalRows] = useState(0)
  const [dataSource, setdataSource] = useState([])
  const [addVis, setAddVis] = useState(false)
  const column = [
    {
      title: '面板ID',
      dataIndex: 'templateId',
      key: 'templateId',
    },
    {
      title: '标准面板名称',
      dataIndex: 'templateName',
      key: 'templateName',
    },
    {
      title: '所属分类',
      dataIndex: 'deviceTypeName ',
      key: 'deviceTypeName ',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render(status) {
        return <span>{status ? '正式' : '草稿'}</span>;
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime) {
        return createTime && DateTool.utcToDev(createTime);
      }
    },
    {
      title: '修改时间',
      dataIndex: 'modifyTime',
      key: 'modifyTime',
      render(modifyTime) {
        return modifyTime && DateTool.utcToDev(modifyTime);
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 180,
      render: (text, record) => (
        <span>
          {
            record.status == 1 ?
              <a onClick={() => { audit(record) }}>更新</a>
              : (<span>
                <a onClick={() => { checkDetail(record) }} style={{ marginRight: '10px' }}>编辑</a>
                {/* <a onClick={() => { relPanel(record) }} style={{ marginRight: '10px' }}>发布</a> */}
              </span>)

          }
        </span>
      ),
    }
  ]
  //发布
  const relPanel = (data) => {
    Modal.confirm({
      title: '确认',
      okText: '确定',
      cancelText: '取消',
      content: '点击确定将发布数据，点击取消可取消发布。',
      onOk: () => {
        relData({ id }).then(res => {

        })
      }
    })
  }
  // 审核
  const audit = () => { }
  // 查看
  const checkDetail = () => { }


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
    if (getFieldsValue().templateName && getFieldsValue().templateName.trim()) {
      params.templateName = getFieldsValue().templateName.trim()
    }
    params = { ...params, ...pager }
    getList(params).then(res => {
      if (res.data.code == 0) {
        setdataSource(res.data.data.list)
        setTotalRows(res.data.data.pager.totalRows)
      }

    })
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

  //=======
  const handleOk = () => {
    setAddVis(false)
  }
  const handleCancel = () => {
    setAddVis(false)
  }
  return (
    <div className="panelMn-page">
      <TitleTab title="平台标准面板管理">
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
          <FormItem label="面板名称">
            {getFieldDecorator('templateName', {})(
              <Input placeholder="请输入面板名称" style={{ width: 240 }} ></Input>
            )}
          </FormItem>
          <FormItem  >
            <Button type="primary" onClick={() => searchList()} >查询</Button>
          </FormItem>
          <FormItem >
            <Button onClick={() => handleReset()}>重置</Button>
          </FormItem>
        </Form>
        <div className="panelMn-title">
          <Button type="primary" onClick={() => { setAddVis(true) }} >新增标准面板</Button>
          <Button  >批量导入</Button>
        </div>
      </TitleTab>
      <Card>
        <TableCom rowKey={"templateId"} columns={column} dataSource={dataSource}
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
        addVis && <AddDia addVis={addVis} handleCancel={handleCancel} handleOk={handleOk} />
      }
    </div>
  )
}

export default Form.create()(PanelMn)