import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Select, Table, Tooltip, Modal, message } from 'antd';
import TableCom from '../../../components/Table';
import TitleTab from '../../../components/TitleTab';
import { DateTool } from "../../../util/utils";
import OperateSchemeModal from './addScheme'
import { ModuleListRequest } from '../../../apis/moduleFirmwareMagment'

import './moduleList.less'

const { Option } = Select;

function ModuleList({ form }) {
  const [pager, setPager] = useState({ totalRows: 0, pageIndex: 0 })
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(false) //antd的loading控制
  const [addSchemeModal, setAddSchemeModal] = useState(false)

  const [communicationMethodList, setCommunicationMethodList] = useState([]) // 通信方式列表

  const columns = [
    {
      title: "模组型号",
      width: "15%",
      key: "hetModuleTypeName",
      dataIndex: "hetModuleTypeName",
      render: (text) => <span title={text}>{text}</span>
    },
    {
      title: "模组名称",
      width: "15%",
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
      width: "15%",
      key: "brandName",
      dataIndex: "brandName"
    },
    {
      title: "状态",
      width: "65px",
      key: "releaseStatus",
      dataIndex: "releaseStatus",
      render: (status) => {
        const color = ["green", "gray"];
        return <span style={{ color: `${color[status]}` }}>{status === 1 ? "已发布" : "草稿"}</span>
      }
    },
    {
      title: "更新时间",
      width: "15%",
      key: "modifyTime",
      dataIndex: "modifyTime",
      render: (modifyTime) => {
        let time = DateTool.utcToDev(modifyTime)
        return <span title={time}>{time}</span>
      }
    },
    {
      title: "操作",
      width: "80px",
      key: "operation",
      dataIndex: "operation",
      render: (text, record) => {
        return (
          <div>{generateOperationBtn(record)}</div>
        );
      }
    }

  ]

  // 初始化表格按钮方法1
  const generateOperationBtn = (record) => {
    if (record.releaseStatus === 1) {
      let btnarr = releaseBtnArr()
      return btnarr.map((item, index) => (
        createOperationBtn(item, record)
      ))
    } else {
      let btnarr = unReleaseBtnArr()
      return btnarr.map((item, index) => (
        createOperationBtn(item, record)
      ))
    }
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
        });

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
            // this.deleteOperation(record.moduleId);
          },
          onCancel() { },
        });
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    getModuleList()
  }, [])

  // 获取模组列表
  const getModuleList = (params) => {
    setLoading(true)

    ModuleListRequest({}).then(res => {
      if (res.data.code === 0) {
        let data = res.data.data;
        // data.map((item, index) => {
        //   item["key"] = item.moduleId;
        // })
        setDataSource(data)
      }
    }).finally(() => { setLoading(false) })
  }

  // 搜索按钮触发,默认请求第一页的数据
  const searchClick = () => {
    form.validateFields((err, values) => {
      // console.log("搜索请求参数：",params)
    })
  }

  // 重置按钮触发
  const reset = () => {
    form.resetFields();
  }

  // 翻页
  const paginationChange = () => {
    console.log('翻页')
  }

  // 初始化通信方式的子选项
  const generateOptions = (communicationMethodList) => {
    if (!communicationMethodList) return
    return communicationMethodList.map((item, index) => (
      <Option value={item.moduleType} key={item.moduleType}>{item.moduleTypeName}</Option>
    ))
  }
  const { getFieldDecorator } = form
  return (
    <div className="module-firmware-page">
      <TitleTab title="模组&固件管理">
        <Form layout="inline">
          <Form.Item label='关键字'>
            {getFieldDecorator('hetModuleTypeName', {})(
              <Input placeholder="请输入生产厂商或模组型号" style={{ width: 260 }} maxLength={20} />,
            )}
          </Form.Item>
          <Form.Item label='通信方式'>
            {getFieldDecorator('moduleType', { initialValue: undefined })(
              <Select style={{ width: 200, marginBottom: 0 }} placeholder="请选择通信方式">
                {generateOptions(communicationMethodList)}
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={() => searchClick}>查询</Button>
          </Form.Item>
          <Form.Item>
            <Button type="default" onClick={() => reset}>重置</Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={() => setAddSchemeModal(true)}>添加模组</Button>
          </Form.Item>
        </Form>
      </TitleTab>

      <Card className='ModuleManagerListTable' style={{ marginTop: 10 }}>
        <TableCom rowKey="moduleId" bordered columns={columns} dataSource={dataSource} pager={pager}
          onPageChange={paginationChange} loading={loading} />
      </Card>

      {/* 添加模组 */}
      {
        addSchemeModal &&
        <OperateSchemeModal
          visible={addSchemeModal}
          handleCancel={() => setAddSchemeModal(false)} />
      }
    </div>
  )
}

export default Form.create()(ModuleList)
