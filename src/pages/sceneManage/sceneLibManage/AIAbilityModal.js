import React, { useState, useEffect } from 'react'
import { Form, Input, Select, Modal, message, InputNumber, Icon, Button } from 'antd'
import { saveConditionDicRequest } from '../../../apis/sceneLibList'
import { cloneDeep } from 'lodash'
import './AIAbilityModal.less'

const { TextArea } = Input
const { Option } = Select

let uniquekey = 0

function AIAbilityModal({ form, visible, handleCancel, handleOk }) {
  const [confirmLoading, setConfirmLoading] = useState(false)
  const { getFieldDecorator, getFieldValue } = form

  // 提交数据
  const confirmSubmit = () => {
    form.validateFields((err, values) => {
      console.log('====', values)
    })
  }

  const changeType = (val, pid) => {
    console.log(val, typeof val, pid)
  }

  // 新增--内层
  const addInnerForm = (index) => {
    const innerList = getFieldValue(`innerList${index}`)
    uniquekey++
    const nextList = innerList.concat({ uniquekey })
    form.setFieldsValue({
      [`innerList${index}`]: nextList,
    })
  }

  // 删除--内层
  const removeInnerForm = (index1, uniquekey) => {
    const innerList = getFieldValue(`innerList${index1}`)
    const configList = getFieldValue(`configList`)

    form.setFieldsValue({
      [`innerList${index1}`]: innerList.filter((item, key) => item.uniquekey !== uniquekey),
      configList: configList[index1].innerList.filter((item, key) => item.uniquekey !== uniquekey)
    })
  }

  const createInnerHtml = (name, index1, item) => {

    getFieldDecorator(`innerList${index1}`, { initialValue: [] })
    const innerList = getFieldValue(`innerList${index1}`)
    console.log('渲染的innerList', innerList)

    const html2 = innerList.map((item, index2) => (
      <div className='inline-form-item2' key={index2}>
        <Form.Item label="名称" labelCol={{ span: 6 }}>
          {
            getFieldDecorator(`${name}[${item.uniquekey}].queryParamName`, {
              initialValue: item.queryParamName,
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{ required: true, whitespace: true, message: "请输入名称" }],
            })(<Input placeholder="请输入名称" />)
          }
        </Form.Item>
        <Form.Item label="数值" labelCol={{ span: 6 }}>
          {
            getFieldDecorator(`${name}[${item.uniquekey}].queryParamValue`, {
              initialValue: item.queryParamValue,
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{ required: true, whitespace: true, message: "请输入数值", },],
            })(<Input placeholder="请输入数值" />)
          }
        </Form.Item>
        <div className='delete-btn'>
          &nbsp;&nbsp;
          <Icon
            key={index2}
            type="minus-circle-o"
            onClick={() => removeInnerForm(index1, item.uniquekey)} />&nbsp;&nbsp;(*非负整数)
        </div>
      </div>
    ))
    return [html2]
  }



  // 新增--外层
  const addParam = () => {
    const keys = getFieldValue('queryParams')
    const nextKeys = keys.concat({})
    form.setFieldsValue({
      queryParams: nextKeys,
    })
  }

  // 删除--外层
  const deleteParam = index => {
    const queryParams = getFieldValue('queryParams')
    const configList = getFieldValue('configList')
    form.setFieldsValue({
      queryParams: queryParams.filter((item, key) => key !== index),
      configList: configList.filter((item, key) => key !== index)
    })
  }

  getFieldDecorator('queryParams', { initialValue: [] })
  const keys = getFieldValue('queryParams')
  // 外层---form-item
  const formItems = keys.map((item, index) => (
    <div className='form-item-block' key={index}>
      <Form.Item label="输入key">
        {
          getFieldDecorator(`configList[${index}].key`, {
            initialValue: item.queryParamName,
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{ required: true, whitespace: true, message: "请输入输入key" }],
          })(<Input placeholder="请输入输入key" />)
        }
      </Form.Item>
      <Form.Item label="类型">
        {
          getFieldDecorator(`configList[${index}].paramStyleId`, {
            initialValue: '',
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{ required: true, message: '请选择类型', whitespace: true }]
          })(
            <Select placeholder="请选择类型" onChange={(val) => changeType(val, `configList[${index}].paramStyleId`)}>
              <Option value="1">范围</Option>
              <Option value="2">枚举</Option>
            </Select>
          )
        }
      </Form.Item>
      <div className="ai-del-btn" key={index} onClick={() => deleteParam(index)}>删除</div>
      {/* 数值 */}
      {
        getFieldValue(`configList[${index}].paramStyleId`) == '1' &&
        <div className='rang-style'>
          <Form.Item label="">
            {
              getFieldDecorator(`configList[${index}].queryParamName`, {
                initialValue: '',
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{ required: true, whitespace: true, message: "请输入数值", }],
              })(<Input style={{ width: 90, marginRight: 10 }} />)
            }
          </Form.Item>
          <div className='short-line'>-</div>
          <Form.Item label="">
            {
              getFieldDecorator(`configList[${index}].queryParamValue`, {
                initialValue: '',
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
        getFieldValue(`configList[${index}].paramStyleId`) == '2' &&
        <div>
          <Form.Item label="设置参数">
            <Button type="dashed" onClick={() => addInnerForm(index)} >
              <Icon type="plus" /> 新&nbsp;&nbsp;增
            </Button>
          </Form.Item>
          {createInnerHtml(`configList[${index}].innerList`, index, item)}
        </div>
      }
    </div>
  ))

  return (
    <Modal title="添加/编辑AI能力"
      width={700}
      visible={visible}
      onOk={confirmSubmit}
      onCancel={handleCancel}
      maskClosable={false}
      confirmLoading={confirmLoading}
      wrapClassName="ai-ability-modal"
    >
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 18 }} autoComplete="off">
        <Form.Item label="接口地址">
          {
            getFieldDecorator('conditionName', {
              initialValue: '',
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{ required: true, message: '请输入接口地址', whitespace: true }],
            })(<Input maxLength={20} placeholder="请输入接口地址" />)
          }
        </Form.Item>
        <Form.Item label="备注">
          {getFieldDecorator('comments', {
            initialValue: '',
            rules: [{ required: true, message: '请输入备注', whitespace: true }],
          })(<TextArea maxLength={100} autoSize={{ minRows: 3, maxRows: 3 }}></TextArea>)}
        </Form.Item>
        <Form.Item label="输入">
          <Button type="dashed" onClick={() => addParam()}>
            <Icon type="plus" /> 新&nbsp;&nbsp;增
          </Button>
        </Form.Item>
        {formItems}
      </Form>
    </Modal>
  )
}

export default Form.create()(AIAbilityModal)
