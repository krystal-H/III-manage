import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Select, Form, Table } from 'antd';
import './configSchemeDetail.less'
import { getObjectModalRequest, getFuncListRequest, getModuleByModuleTypeRequest } from '../../../apis/schemeManagement'
import { getList } from '../../../apis/panelMn.js'

const typeMap = {
  'r': '可上报',
  'w': '可下发',
  'rw': '可下发可上报'
}

function ConfigSchemeDetail({ form, commitAll, editData = {}, opeType }, ref) {
  const [objectModalList, setObjectModalList] = useState([]) // 物模型列表
  const [funcList, setFuncList] = useState([]) // 功能列表
  const [moduleIdsList, setModuleIdsList] = useState([]) // 模组列表
  const [panelList, setPanelList] = useState([]) // 面板列表
  const columns = [
    {
      title: '功能名称',
      dataIndex: 'funcName',
      key: 'funcName',
    },
    {
      title: '标识符',
      dataIndex: 'funcIdentifier',
      key: 'funcIdentifier',
    },
    {
      title: '数据传输类型',
      dataIndex: 'funcParamList',
      key: 'funcParamList',
      render: (record) => {
        return <span>{typeMap[record[0].accessMode]}</span>
      }
    }
  ]

  useImperativeHandle(ref, () => ({
    onFinish: onSubmit
  }))

  // 表单提交
  const onSubmit = () => {
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        values.moduleIds = values.moduleIds.join('#')
        values.panelId = -1
        commitAll(values)
      }
    })
  }

  // 选择物模型
  const handleSelectChange = (val) => {
    getFuncList(val)
  }

  // 根据品类id查物模型列表
  const getObjectModal = () => {
    const categoryId = sessionStorage.getItem('categoryId') || editData.deviceTypeId
    getObjectModalRequest(categoryId).then(res => {
      if (res.data.data) {
        setObjectModalList(res.data.data)
      }
    })
  }

  // 根据物模型id查功能列表
  const getFuncList = (id) => {
    getFuncListRequest({ id }).then(res => {
      if (res.data.data) {
        setFuncList(res.data.data)
      }
    })
  }

  // 根据通信方式查找模组
  const getModuleByModuleType = () => {
    const val = sessionStorage.getItem('communicationType')
    getModuleByModuleTypeRequest(val ? val.split('') : editData.protocol.toString().split(''))
      .then(res => {
        if (res.data.data) {
          setModuleIdsList(res.data.data)
        }
      })
  }

  // 获取面板列表
  const getPanelList = () => {
    const params = {
      deviceTypeId: sessionStorage.getItem('categoryId') || editData.deviceTypeId || '',
      templateName: '',
      pageIndex: 1,
      pageRows: 5
    }
    getList(params).then(res => {
      if (res.data.data) {
        setPanelList(res.data.data.list)
      }
    })
  }

  useEffect(() => {
    getObjectModal()
    getModuleByModuleType()
    getPanelList()
    opeType === 'edit' && getFuncList(editData.physicalModelId)
  }, [])

  const { getFieldDecorator, validateFields } = form;
  return (
    <div className="config-scheme-detail">
      <Form labelCol={{ span: 3 }} wrapperCol={{ span: 19 }} onSubmit={() => onSubmit()}>
        <Form.Item label="方案功能点">
          {/* 此三级品类关联的物模型如下 */}
          {
            getFieldDecorator('physicalModelId', {
              initialValue: editData.physicalModelId,
              rules: [{ required: true, message: '请选择此三级品类关联的物模型' }],
            })(
              <Select placeholder="请选择此三级品类关联的物模型"
                style={{ width: 250, marginBottom: 10 }}
                showSearch
                optionFilterProp="children"
                onChange={(val) => handleSelectChange(val)}>
                {
                  objectModalList && objectModalList.map(item => (
                    <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                  ))
                }
              </Select>
            )}
          <Table
            className="config-table"
            dataSource={funcList.standard}
            rowKey="funcIdentifier"
            columns={columns}
            pagination={false}
            scroll={{ y: 140 }}
            pagination={false} />
        </Form.Item>
        <Form.Item label="方案控制面板">
          此三级品类关联的控制面板如下
          <div className="control-panel-box">
            {
              panelList && panelList.map(item => (
                <div className="panel-item" key={item.templateId}>
                  <div className="panel-item-pic">
                    <img src={item.page1} alt="pic" />
                  </div>
                  <div className="panel-item-tip">{item.templateName}</div>
                </div>
              ))
            }
          </div>
        </Form.Item>
        <Form.Item label="对应模组">
          {
            getFieldDecorator('moduleIds', {
              initialValue: editData.moduleIds ? editData.moduleIds.split('#').map(item => { return item - 0 }) : [],
              rules: [{ required: true, message: '请选择对应模组' }],
            })(
              <Select placeholder="请选择对应支持模组"
                style={{ width: 250 }}
                mode="multiple"
                showSearch
                optionFilterProp="children">
                {
                  moduleIdsList && moduleIdsList.map(item => (
                    <Select.Option value={item.moduleId} key={item.moduleId}>{item.moduleName}</Select.Option>
                  ))
                }
              </Select>
            )
          }
        </Form.Item>
      </Form>
    </div>
  )
}

export default Form.create()(forwardRef(ConfigSchemeDetail))