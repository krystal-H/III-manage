import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Select, Cascader, Divider, Modal, Form, message } from 'antd';
import TitleTab from '../../../components/TitleTab';
import TableCom from '../../../components/Table';
import AddModal from './add'
import './index.less'
import { getList, getOrderType, relData } from '../../../apis/physical'
import { DateTool } from '../../../util/utils';
const FormItem = Form.Item

function PhysicalModel({ form }) {
  const { getFieldDecorator, validateFields, getFieldsValue } = form;
  const [pager, setPager] = useState({ pageIndex: 1, pageRows: 10 }) //分页
  const [dataSource, setdataSource] = useState([])
  const [optionList, setOptionList] = useState([])
  const [addVis, setAddVis] = useState(false)
  const [editId, setEditId] = useState(0)
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const column = [
    {
      title: '物模型ID',
      dataIndex: 'id',
      key: 'id',
      width: '100px'
    },
    {
      title: '物模型名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '语言版本',
      dataIndex: '',
      key: '',
      render() {
        return <span>中文</span>;
      }
    },
    {
      title: '所属分类',
      dataIndex: 'deviceType',
      key: 'deviceType',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render(status) {
        return <span>{status == 1 ? '草稿' : '正式'}</span>;
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
      dataIndex: 'updateTime',
      key: 'updateTime',
      render(updateTime) {
        return updateTime && DateTool.utcToDev(updateTime);
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (text, record) => (
        <span>
          {
            record.status == 1 ?
              <span >
                <a style={{ marginRight: '10px' }} onClick={() => { relPhy(record.id) }}>发布</a>
                <a onClick={() => { editData(record.id) }}>编辑</a>
              </span>
              :
              <a onClick={() => { editData(record.id) }}>更新</a>
          }
        </span>
      ),
    }
  ]
  const relPhy = (id) => {
    Modal.confirm({
      title: '确认',
      okText: '确定',
      cancelText: '取消',
      content: '点击确定将发布数据，点击取消可取消发布。',
      onOk: () => {
        relData({ id }).then(res => {
          message.success('发布成功');
          getData()
        })
      }
    })
  }
  useEffect(() => {

    getOption()
  }, [])
  useEffect(() => {
    getData()
  }, [pager.pageRows, pager.pageIndex])
  //列表

  const getData = () => {
    let params = {}
    if (getFieldsValue().name && getFieldsValue().name.trim()) {
      params.name = getFieldsValue().name.trim()
    }
    if (getFieldsValue().deviceTypeId) {
      params.deviceTypeId = getFieldsValue().deviceTypeId
    }
    params = { ...params, ...pager }
    setLoading(true)
    getList(params).then(res => {
      setdataSource(res.data.data.list)
      setTotalRows(res.data.data.pager.totalRows)
    }).finally(() => { setLoading(false) })
  }
  //下拉
  const getOption = () => {
    getOrderType().then(res => {
      setOptionList(res.data.data)
    })
  }

  //重置
  const onReset = () => {
    form.resetFields();
  }

  //=======
  const openAdd = () => {
    setEditId(0)
    setAddVis(true)
  }
  const handleOk = () => {

    getData()
    setAddVis(false)
  }
  const handleCancel = () => {
    setAddVis(false)
  }
  const editData = (id) => {
    setEditId(id)
    setAddVis(true)
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
  return (
    <div className="PhysicalModel-page">
      <TitleTab title="平台物模型管理">
        <div className='title-space'>
          <Form layout="inline" >

            <FormItem label="所属分类">
              {getFieldDecorator('deviceTypeId', {})(
                <Select style={{ width: 160 }} placeholder="请选择所属分类" allowClear>
                  {
                    optionList.map((item, index) => (
                      <Select.Option key={item.deviceTypeId} value={item.deviceTypeId} label={item.deviceTypeName}>
                        {item.deviceTypeName}
                      </Select.Option>
                    ))
                  }
                </Select>
              )}
            </FormItem>
            <FormItem label="物模型名称">
              {getFieldDecorator('name', {})(
                <Input placeholder="请输入物模型名称" style={{ width: 240 }} allowClear></Input>
              )}
            </FormItem>
            <FormItem  >
              <Button type="primary" onClick={() => getData()} >查询</Button>
            </FormItem>
            <FormItem >
              <Button onClick={() => onReset()}>重置</Button>
            </FormItem>
          </Form>
          <Button type="primary" onClick={() => { openAdd() }} >新增物模型</Button>
        </div>
      </TitleTab>
      <Card>
        <TableCom rowKey={"id"} columns={column} dataSource={dataSource}
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
        addVis && <AddModal addVis={addVis} editId={editId} handleCancel={handleCancel} handleOk={handleOk} optionList={optionList} />
      }
    </div>
  )
}

export default Form.create()(PhysicalModel)