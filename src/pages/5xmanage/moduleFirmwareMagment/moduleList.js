import React, { useState, useEffect } from 'react'
import { Card, Form, Input, Button, Select, Tooltip, Modal, message } from 'antd'
import TableCom from '../../../components/Table'
import TitleTab from '../../../components/TitleTab'
import { DateTool } from "../../../util/utils"
import OperateSchemeModal from './addScheme'
import { cloneDeep } from "lodash"
import { ModuleListRequest, getModuleTypeMenuRequest } from '../../../apis/moduleFirmwareMagment'
import { ModuleDeleteRequest } from '../../../apis/moduleManager';
import './moduleList.less'

const { Option } = Select
const { confirm } = Modal

function ModuleList({ form }) {
  const [pager, setPager] = useState({ pageIndex: 1, pageRows: 10 }) //分页
  const [totalRows, setTotalRows] = useState(0)
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(false) //antd的loading控制
  const [addSchemeModal, setAddSchemeModal] = useState(false)
  const { getFieldDecorator, getFieldsValue } = form
  const [moduleCommonObj, setModuleCommonObj] = useState({})
  const columns = [
    {
      title: "模组型号",
      key: "hetModuleTypeName",
      dataIndex: "hetModuleTypeName",
      render: (text) => <span title={text}>{text}</span>
    },
    {
      title: "模组名称",
      key: "moduleName",
      dataIndex: "moduleName",
      render: (text) => <span title={text}>{text}</span>
    },
    {
      title: "支持通信",
      width: "15%",
      key: "moduleTypeStr",
      dataIndex: "moduleTypeStr",
      render: (text) => <span title={text}>{text}</span>
    },
    {
      title: "生产厂商",
      key: "brandName",
      dataIndex: "brandName"
    },
    {
      title: "状态",
      key: "completeStatus",
      dataIndex: "completeStatus",
      render: (completeStatus) => {
        const color = ["green", "gray"]
        return <span style={{ color: `${color[completeStatus]}` }}>{completeStatus == '1' ? "已发布" : "草稿"}</span>
      }
    },
    {
      title: "更新时间",
      key: "modifyTime",
      dataIndex: "modifyTime",
      render: (modifyTime) => {
        let time = DateTool.utcToDev(modifyTime)
        return <span title={time}>{time}</span>
      }
    },
    {
      title: "操作",
      width: "180px",
      key: "operation",
      dataIndex: "operation",
      render: (text, record) => {
        return (
          <div>{generateOperationBtn(record)}</div>
        )
      }
    }
  ]

  // 模组公共列表
  const getCommonList = () => {
    getModuleTypeMenuRequest().then(res => {
      setModuleCommonObj(res.data.data)
    })
  }

  useEffect(() => {
    getCommonList()
  }, [])

  // 初始化表格按钮方法1
  const generateOperationBtn = (record) => {
    let btnarr = []
    record.completeStatus === 1 ? btnarr = releaseBtnArr() : btnarr = unReleaseBtnArr()
    return btnarr.map((item, index) => (
      createOperationBtn(item, record)
    ))
  }

  // 已上线操作按钮的数据源
  const releaseBtnArr = () => {
    return [
      { title: "查看", icon: "info", key: 'View' },
      { title: "下线", icon: "cloud-download", key: 'Offline' },
    ]
  }

  // 未发布操作按钮数据源
  const unReleaseBtnArr = () => {
    return [
      { title: "发布", icon: "cloud-upload", key: 'release' },
      { title: "编辑", icon: "edit", key: 'edit' },
      { title: "删除", icon: "delete", key: 'delete' }
    ]
  }

  // 列表中的按钮点击触发
  const handleOperation = (item, record) => {
    switch (item.key) {
      case "View":
        // this.props.getModuleInfoPreview(record.moduleId, "view");
        break;
      case "Offline":
        confirm({
          title: '下线模组?',
          content: '确认下线后，模组将同步从开放平台下线，确定要这样做吗？',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk: () => {
            // this.OfflineOperataion(record.moduleId, 0);
          },
          onCancel() { },
        })
        break;
      case "release":
        console.log(record.completeStatus);
        record.completeStatus === 0 ? confirm({
          title: '发布模组',
          content: '当前模组信息不完整，请完善后提交发布',
          okText: '确定',
          cancelText: '取消',
          onOk() { },
          onCancel() { },
        }) :
          confirm({
            title: '发布模组',
            content: '确认发布后，模组信息将会同步到开放平台,确定要这样做吗？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
              // this.releaseOperation(record.moduleId, 1);
            },
            onCancel() { },
          })
        break;
      case "edit":
        let moduleId = record.moduleId;
        // this.props.history.push({ pathname: `/config/ModuleManager/edit/${moduleId}` })
        break;
      case "delete":
        confirm({
          title: '删除模组',
          content: '删除后，模组信息将同步删除，无法撤销，确定要这样做吗？',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk: () => {
            deleteOperation(record.moduleId);
          },
          onCancel() { },
        });
        break;

      default:
        break;
    }
  }

  // 删除操作
  const deleteOperation = (moduleId) => {
    ModuleDeleteRequest(moduleId).then(res => {
      if (res.data.code === 0) {
        message.success(`删除成功`)
        getTableData()
      }
    })
  }

  // 初始化表格按钮方法2
  const createOperationBtn = (item, record) => {
    return (
      <Tooltip key={item.key} placement="top" title={item.title}>
        <Button style={{ marginLeft: "10px" }}
          shape="circle"
          size="small"
          icon={item.icon}
          key={item.key}
          onClick={() => handleOperation(item, record)}
        />
      </Tooltip>
    )
  }

  // 获取模组列表
  const getTableData = () => {
    setLoading(true)
    let { moduleName, moduleType } = getFieldsValue()
    const params = {
      moduleName: moduleName ? moduleName.trim() : '',
      moduleType: moduleType ? moduleType : '',
      ...pager
    }
    ModuleListRequest(params).then(res => {
      if (res.data.code === 0) {
        setDataSource(res.data.data.list)
        setTotalRows(res.data.data.pager.totalRows)
      }
    }).finally(() => { setLoading(false) })
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

  // 初始化通信方式的子选项
  const generateOptions = (moduleTypeList) => {
    if (!moduleTypeList) return
    return moduleTypeList.map((item, index) => (
      <Option value={item.moduleType} key={item.moduleType}>{item.moduleTypeName}</Option>
    ))
  }

  return (
    <div className="module-firmware-page">
      <TitleTab title="模组&固件管理">
        <Form layout="inline">
          <Form.Item label='关键字'>
            {getFieldDecorator('moduleName', {})(
              <Input placeholder="请输入生产厂商或模组型号" style={{ width: 260 }} maxLength={20} />,
            )}
          </Form.Item>
          <Form.Item label='通信方式'>
            {getFieldDecorator('moduleType', { initialValue: undefined })(
              <Select style={{ width: 200, marginBottom: 0 }} placeholder="请选择通信方式"
                showSearch
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {generateOptions(moduleCommonObj.moduleTypeList)}
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={() => searchClick()}>查询</Button>
          </Form.Item>
          <Form.Item>
            <Button type="default" onClick={() => reset()}>重置</Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={() => setAddSchemeModal(true)}>添加模组</Button>
          </Form.Item>
        </Form>
      </TitleTab>

      <Card className='ModuleManagerListTable' style={{ marginTop: 10 }}>
        <TableCom rowKey="moduleId" bordered
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          pagination={{
            defaultCurrent: 1,
            current: pager.pageIndex,
            onChange: pagerChange,
            pageSize: pager.pageRows,
            total: totalRows,
            showQuickJumper: false,
            showTotal: () => <span>共 <a>{totalRows}</a> 条</span>
          }}
        />
      </Card>

      {/* 添加模组 */}
      {
        addSchemeModal &&
        <OperateSchemeModal
          visible={addSchemeModal}
          moduleCommonObj={moduleCommonObj}
          getTableData={getTableData}
          handleCancel={() => setAddSchemeModal(false)} />
      }
    </div>
  )
}

export default Form.create()(ModuleList)
