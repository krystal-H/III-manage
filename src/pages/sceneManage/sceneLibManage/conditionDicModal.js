import React, { useState, useEffect } from 'react'
import { Form, Input, Select, Modal, message, InputNumber, Icon, Button } from 'antd'
import './conditionDicModal.less'
import { saveConditionDicRequest } from '../../../apis/sceneLibList'
import { cloneDeep } from 'lodash'

const { Option } = Select
let newData = []

function ConditionDicModal({
  form,
  visible,
  handleOk,
  handleCancel,
  conditionDicDetailData = {},
  dicConditionType = [],
  unitList = []
}) {
  const { getFieldDecorator, getFieldValue } = form
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [paramStyle, setParamStyle] = useState('') // 类型

  useEffect(() => {
    if (Object.keys(conditionDicDetailData).length) { // 编辑
      setParamStyle(conditionDicDetailData.paramStyleId + '')
    }
  }, [Object.keys(conditionDicDetailData).length])

  // 提交数据
  const confirmSubmit = () => {
    form.validateFields((err, values) => {
      if (!err) {
        setConfirmLoading(true)
        console.log('values', values, typeof paramStyle)
        let params = { ...values }
        if (paramStyle === '1') {// 范围
          params.queryParams = [{ queryParamName: values.rangArr1, queryParamValue: values.rangArr2 }]
          delete params.rangArr1
          delete params.rangArr2
          if (Object.keys(conditionDicDetailData).length) { // 编辑
            params.queryParams[0].queryParamId = conditionDicDetailData.queryParams[0].queryParamId
            params.statusQueryId = conditionDicDetailData.statusQueryId
            params.conditionId = conditionDicDetailData.conditionId
          }
        } else if (paramStyle === '2') { // 枚举
          params.queryParams = cloneDeep(values.configList)
          delete params.configList
          if (Object.keys(conditionDicDetailData).length > 0) { // 编辑
            params.statusQueryId = conditionDicDetailData.statusQueryId
            params.conditionId = conditionDicDetailData.conditionId
            params.queryParams = params.queryParams.map(item => {
              let obj = {}
              if (item.queryParamId) obj.queryParamId = item.queryParamId
              obj.queryParamName = item.queryParamName
              obj.queryParamValue = item.queryParamValue
              return obj
            })
          }
        }

        console.log('add-data', params)
        saveConditionDicRequest(params).then(res => {
          if (res.data.code === 0) {
            message.success(`提交成功`)
            handleOk()
          }
        }).finally(() => setConfirmLoading(false))
      }
    })
  }

  // 选择类型
  const changeType = (val) => {
    console.log('change')
    setParamStyle(val)
  }

  // 枚举新增
  const addParam = () => {
    const keys = getFieldValue('queryParams')
    const nextKeys = keys.concat({})
    form.setFieldsValue({
      queryParams: nextKeys,
    })
  }

  // 枚举删除
  const removeFormItem = (index) => {
    const keys = getFieldValue('queryParams');
    const configList = getFieldValue('configList')
    form.setFieldsValue({
      queryParams: keys.filter((item, key) => key !== index),
      configList: configList.filter((item, key) => key !== index)
    })
  }

  
  if (Object.keys(conditionDicDetailData).length && paramStyle === '2') {
    // 为了兼容老数据
    if (conditionDicDetailData.queryParams[0].queryParamName.indexOf('[') !== -1) {
      newData = []
    } else {
      newData = cloneDeep(conditionDicDetailData.queryParams)
    } 
  }
  getFieldDecorator('queryParams', { initialValue: newData })
  const keys = getFieldValue('queryParams')
  const formItems = keys.map((k, index) => (
    <div className='inline-form-item2' key={index}>
      <Form.Item label="名称" labelCol={{ span: 6 }}>
        {
          getFieldDecorator(`configList[${index}].queryParamName`, {
            initialValue: k.queryParamName,
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{ required: true, whitespace: true, message: "请输入名称" }],
          })(<Input placeholder="请输入名称" />)
        }
      </Form.Item>
      {
        // 专为编辑使用，存id
        Object.keys(conditionDicDetailData).length > 0 &&
        <Form.Item label="" style={{ display: 'none' }} >
          {
            getFieldDecorator(`configList[${index}].queryParamId`, {
              initialValue: k.queryParamId,
            })(<Input style={{ display: 'none' }} />)
          }
        </Form.Item>
      }
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Form.Item label="数值" labelCol={{ span: 6 }}>
        {
          getFieldDecorator(`configList[${index}].queryParamValue`, {
            initialValue: k.queryParamValue,
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{ required: true, whitespace: true, message: "请输入数值", },],
          })(<Input placeholder="请输入数值" />)
        }
      </Form.Item>
      <div className='delete-btn'>
        &nbsp;&nbsp;
        <Icon
          key={index}
          type="minus-circle-o"
          onClick={() => removeFormItem(index)} />&nbsp;&nbsp;(*非负整数)
      </div>
    </div>
  ))

  return (
    <Modal title="添加/编辑条件字典"
      width={800}
      visible={visible}
      onOk={confirmSubmit}
      onCancel={handleCancel}
      maskClosable={false}
      confirmLoading={confirmLoading}
      wrapClassName="condition-dic-modal"
    >
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 18 }} autoComplete="off">
        <Form.Item label="条件字典名称">
          {
            getFieldDecorator('conditionName', {
              initialValue: conditionDicDetailData.conditionName,
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{ required: true, message: '请输入条件字典名称', whitespace: true }],
            })(<Input maxLength={20} placeholder="请输入条件字典名称" />)
          }
        </Form.Item>
        <Form.Item label="条件类型">
          {
            getFieldDecorator('conditionOptionId', {
              initialValue: conditionDicDetailData.conditionOptionId ?
                conditionDicDetailData.conditionOptionId + '' : '',
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{ required: true, message: '请选择条件类型', whitespace: true }]
            })(
              <Select placeholder="请选择条件类型">
                {
                  dicConditionType && dicConditionType.map(item => (
                    <Option key={item.conditionOptionId} value={item.conditionOptionId + ''}>{item.conditionOptionName}</Option>
                  ))
                }
              </Select>
            )
          }
        </Form.Item>
        <Form.Item label="变化频率">
          {
            getFieldDecorator('frequency', {
              initialValue: (conditionDicDetailData.frequency || conditionDicDetailData.frequency === 0) ?
                conditionDicDetailData.frequency + '' : '',
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{ required: true, message: '请输入变化频率', whitespace: true }]
            })(
              <InputNumber min={0} placeholder="请输入变化频率" style={{ width: 448 }} />
            )
          }
          <span className="ant-form-text">小时(*非负整数)</span>
        </Form.Item>
        {/* <Form.Item label="状态">
          {
            getFieldDecorator('approvalStatus', {
              initialValue: (conditionDicDetailData.approvalStatus || conditionDicDetailData.approvalStatus === 0) ?
                conditionDicDetailData.approvalStatus + '' : '',
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{ required: true, message: '请选择状态', whitespace: true }]
            })(
              <Select placeholder="请选择状态">
                <Option value="0">未审核</Option>
                <Option value="1">已审核</Option>
                <Option value="2">未通过</Option>
              </Select>
            )
          }
        </Form.Item> */}
        <Form.Item label="参数单位">
          {
            getFieldDecorator('unitId', {
              initialValue: conditionDicDetailData.unitId ? conditionDicDetailData.unitId + '' : '',
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{ required: true, message: '请选择参数单位', whitespace: true }]
            })(
              <Select placeholder="请选择参数单位">
                {
                  unitList && unitList.map(item => (
                    <Option key={item.unitId} value={item.unitId + ''}>{item.unitName}</Option>
                  ))
                }
              </Select>
            )
          }
        </Form.Item>
        <Form.Item label="条件字典key">
          {
            getFieldDecorator('dataKey', {
              initialValue: conditionDicDetailData.dataKey,
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{ required: true, message: '请输入条件字典key', whitespace: true }]
            })(
              <Input maxLength={20} placeholder="请输入条件字典key" />
            )
          }
        </Form.Item>
        <Form.Item label="类型">
          {
            getFieldDecorator('paramStyleId', {
              initialValue: conditionDicDetailData.paramStyleId ? conditionDicDetailData.paramStyleId + '' : '',
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{ required: true, message: '请选择类型', whitespace: true }]
            })(
              <Select placeholder="请选择类型" onChange={changeType}>
                <Option value="1">范围</Option>
                <Option value="2">枚举</Option>
              </Select>
            )
          }
        </Form.Item>
        {/* 范围 */}
        {
          paramStyle === '1' &&
          <div className='rang-style'>
            <Form.Item label="">
              {
                getFieldDecorator('rangArr1', {
                  // 后端返回的数据格式，将就看吧
                  initialValue: conditionDicDetailData.queryParams ?
                    Array.isArray(JSON.parse(conditionDicDetailData.queryParams[0].queryParamName)) ?
                      JSON.parse(conditionDicDetailData.queryParams[0].queryParamName)[0] + '' :
                      conditionDicDetailData.queryParams[0].queryParamName : '',
                  validateTrigger: ['onChange', 'onBlur'],
                  rules: [{ required: true, whitespace: true, message: "请输入数值", }],
                })(<Input style={{ width: 90, marginRight: 10 }} />)
              }
            </Form.Item>
            <div className='short-line'>-</div>
            <Form.Item label="">
              {
                getFieldDecorator('rangArr2', {
                  // 后端返回的数据格式，将就看吧
                  initialValue: conditionDicDetailData.queryParams ?
                    Array.isArray(JSON.parse(conditionDicDetailData.queryParams[0].queryParamName)) ?
                      JSON.parse(conditionDicDetailData.queryParams[0].queryParamName)[1] + '' :
                      conditionDicDetailData.queryParams[0].queryParamName : '',
                  // conditionDicDetailData.queryParams[0].queryParamValue : '',
                  validateTrigger: ['onChange', 'onBlur'],
                  rules: [{ required: true, whitespace: true, message: "请输入数值", }],
                })(<Input style={{ width: 90, marginRight: 10 }} />)
              }
            </Form.Item>
            <div className='tip'>(*填写整数且后者大于前者)</div>
          </div>
        }
        {/* 枚举 */}
        {
          paramStyle === '2' &&
          <div>
            <Form.Item label="设置参数">
              <Button type="dashed" onClick={() => addParam()} style={{ width: '100%' }}>
                <Icon type="plus" /> 新&nbsp;&nbsp;增
              </Button>
            </Form.Item>
            {formItems}
          </div>
        }
      </Form>
    </Modal>
  )
}

export default Form.create()(ConditionDicModal)
