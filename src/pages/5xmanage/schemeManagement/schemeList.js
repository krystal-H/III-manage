import React, { useState, useEffect } from 'react'
import TitleTab from '../../../components/TitleTab'
import TableCom from '../../../components/Table'
import OperateSchemeModal from './addScheme'
import { DateTool } from "../../../util/utils"
import { cloneDeep } from "lodash"
import { Card, Form, Button, Select, Tooltip, Modal, message } from 'antd'
import { getModuleTypeMenuRequest } from '../../../apis/moduleFirmwareMagment'
import { publishSchemeRequest } from '../../../apis/schemeManagement'
import {
  schemeManageListRequest,
  getThirdCategoryRequest,
  getSchemeDetailRequest
} from '../../../apis/schemeManagement'
import ViewScheme from './viewScheme'
import './schemeList.less'
const { confirm } = Modal

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
  const [pager, setPager] = useState({ pageIndex: 1, pageRows: 10 }) //分页
  const [totalRows, setTotalRows] = useState(0)
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(false) //antd的loading控制
  const [addSchemeModal, setAddSchemeModal] = useState(false)
  const [thirdCategoryList, setThirdCategoryList] = useState([])
  const { getFieldDecorator, getFieldsValue } = form
  const [moduleCommonObj, setModuleCommonObj] = useState({})
  const [detailSchemeModal, setDetailSchemeModal] = useState(false)
  const [editSchemeModal, setEditSchemeModal] = useState(false) // 编辑
  const [editData, setEditData] = useState(false) // 编辑数据

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
        return <span style={{ color: `${color[status]}` }}>{statusMap[status]}</span>
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

  // 已发布——按钮显示
  const releaseBtnArr = () => {
    return [
      { title: "查看", icon: "info", key: 'view' },
    ]
  }
  // 未发布——按钮显示
  const unReleaseBtnArr = () => {
    return [
      { title: "发布", icon: "cloud-upload", key: 'release' },
      { title: "编辑", icon: "edit", key: 'edit' },
    ]
  }

  // 初始化表格按钮方法1
  const generateOperationBtn = (record) => {
    let btnarr = []
    record.status === 2 ? btnarr = releaseBtnArr() : btnarr = unReleaseBtnArr()
    return btnarr.map((item, index) => (
      createOperationBtn(item, record)
    ))
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
          onClick={() => handleOperation(item, record)}
        />
      </Tooltip>)
  }

  // 获取模组详情
  const getSchemeDetail = (id, type) => {
    getSchemeDetailRequest({ id }).then(res => {
      if (res.data.data) {
        setEditData(res.data.data)
        if (type === 'view') {
          setDetailSchemeModal(true)
        } else {
          setEditSchemeModal(true)
        } 
      } else {
        message.warning('返回数据不存在')
      }
    })
  }

  // 列表操作
  const handleOperation = (item, record) => {
    console.log(item.key)
    switch (item.key) {
      case 'release':
        confirm({
          title: '发布方案',
          content: '确认发布后，方案信息将会同步到开放平台,确定要这样做吗？',
          okText: '确定',
          cancelText: '取消',
          onOk() {
            publishScheme(record)
          },
          onCancel() { },
        })
        break;
      case 'view':
        getSchemeDetail(record.id, 'view')
        break;
      case 'edit':
        getSchemeDetail(record.id, 'edit')
      default:
        break;
    }
  }

  // 发布方案
  const publishScheme = (record) => {
    publishSchemeRequest({id:record.id}).then(res => {
      if (res.data.code === 0) {
        message.success(`发布成功`)
        getTableData()
      }
    })
  }

  // 查询
  const searchClick = () => {
    if (pager.pageIndex === 1) {
      getTableData()
    } else {
      setPager({ pageIndex: 1, pageRows: 10 })
    }
  }

  // 获取table数据
  const getTableData = () => {
    setLoading(true)
    let { deviceTypeId, status } = getFieldsValue()
    const params = {
      deviceTypeId: deviceTypeId ? deviceTypeId : '',
      status: status ? status : '',
      ...pager
    }
    schemeManageListRequest(params).then(res => {
      if (res.data.code === 0) {
        setDataSource(res.data.data.list)
        setTotalRows(res.data.data.pager.totalRows)
      }
    }).finally(() => { setLoading(false) })
  }

  useEffect(() => {
    getTableData()
  }, [pager.pageRows, pager.pageIndex])

  // 获取三级品类list
  const getThirdCategory = () => {
    getThirdCategoryRequest({}).then(res => {
      setThirdCategoryList(res.data.data)
    })
  }

  // 模组公共列表
  const getCommonList = () => {
    getModuleTypeMenuRequest().then(res => {
      setModuleCommonObj(res.data.data)
    })
  }

  useEffect(() => {
    getThirdCategory()
    getCommonList()
  }, [])

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

  return (
    <div className="schemeList">
      <TitleTab title="方案信息导入">
        <Form layout="inline" className="schemeList-form">
          <div>
            <Form.Item label="三级品类">
              {getFieldDecorator('deviceTypeId')(
                <Select
                  allowClear
                  style={{ width: 240 }}
                  placeholder="搜索产品品类"
                  showSearch
                  optionFilterProp="children"
                >
                  {
                    thirdCategoryList && thirdCategoryList.length > 0 &&
                    thirdCategoryList.map(item => (
                      <Select.Option key={item.deviceTypeId} value={item.deviceTypeId}>{item.deviceTypeName}</Select.Option>
                    ))
                  }
                </Select>
              )}
            </Form.Item>
            <Form.Item label="状态">
              {getFieldDecorator('status')(
                <Select style={{ width: 160 }} placeholder="请选择状态">
                  {
                    Object.keys(statusMap).map((item, index) => (
                      <Select.Option key={index} value={+item}>{statusMap[item]}</Select.Option>
                    ))
                  }
                </Select>
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={() => searchClick()} >查询</Button>
            </Form.Item>
            <Form.Item>
              <Button onClick={() => onReset()}>重置</Button>
            </Form.Item>
          </div>
          <div>
            <Form.Item><Button type="primary">批量导入</Button></Form.Item>
            <Form.Item><Button type="primary" onClick={() => setAddSchemeModal(true)}>新增</Button></Form.Item>
          </div>
        </Form>
      </TitleTab>
      <Card>
        <TableCom rowKey="id"
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
            showQuickJumper: false,
            showTotal: () => <span>共 <a>{totalRows}</a> 条</span>
          }} />
      </Card>
      {/* 新增方案弹窗 */}
      {
        addSchemeModal &&
        <OperateSchemeModal
          opeType="add"
          visible={addSchemeModal}
          thirdCategoryList={thirdCategoryList}
          communicationMethodsList={moduleCommonObj.moduleTypeList}
          getTableData={getTableData}
          handleOk={() => setAddSchemeModal(false)}
          handleCancel={() => setAddSchemeModal(false)} />
      }

      {/* 编辑 */}
      {
        editSchemeModal &&
        <OperateSchemeModal
          opeType="edit"
          editData={editData}
          visible={editSchemeModal}
          thirdCategoryList={thirdCategoryList}
          communicationMethodsList={moduleCommonObj.moduleTypeList}
          getTableData={getTableData}
          handleOk={() => setEditSchemeModal(false)}
          handleCancel={() => setEditSchemeModal(false)} />
      }

      {/* 查看详情 */}
      {
        detailSchemeModal &&
        <ViewScheme
          visible={detailSchemeModal}
          editData={editData}
          thirdCategoryList={thirdCategoryList}
          communicationMethodsList={moduleCommonObj.moduleTypeList}
          handleOk={() => setDetailSchemeModal(false)}
          handleCancel={() => setDetailSchemeModal(false)} />
      }
    </div>
  )
}

export default Form.create()(SchemeList)