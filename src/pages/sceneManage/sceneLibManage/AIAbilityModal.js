import React, { useState, useEffect } from 'react'
import { Form, Input, Select, Modal, message, InputNumber, Icon, Button } from 'antd'
import { saveAIbilityRequest } from '../../../apis/sceneLibList'
import { cloneDeep } from 'lodash'
import './AIAbilityModal.less'

const { TextArea } = Input
const { Option } = Select

let uniquekey = 0 // 输入
let uniquekey_2 = 0 // 输出

function AIAbilityModal({ form, visible, handleCancel, handleOk, aiAbilityDetail = {} }) {
  const { getFieldDecorator, getFieldValue } = form
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [newDataIn, setNewDataIn] = useState([]) // 输入数据
  const [newDataOut, setNewDataOut] = useState([]) // 输出数据

  useEffect(() => {
    if (Object.keys(aiAbilityDetail).length > 0) {
      // 输入列表
      aiAbilityDetail.aiInParamList && aiAbilityDetail.aiInParamList.forEach(item => {
        if (item.type == 1) {// 枚举
          item.enums = item.enums.map(i => {
            uniquekey++
            return {
              name: i.name,
              value: i.value,
              uniquekey
            }
          })
        }
      })
      setNewDataIn(aiAbilityDetail.aiInParamList)
      // console.log('newDataIn---', newDataIn)

      // 输出列表
      aiAbilityDetail.aiOutParamList && aiAbilityDetail.aiOutParamList.forEach(item => {
        if (item.type == 1) {// 枚举
          item.enums = item.enums.map(i => {
            uniquekey_2++
            return {
              name: i.name,
              value: i.value,
              uniquekey_2
            }
          })
        }
      })
      setNewDataOut(aiAbilityDetail.aiOutParamList)
      // console.log('newDataOut---', newDataOut)
    }
  }, [aiAbilityDetail])

  const filterData = (arr) => {
    const tempArr = arr.map(item => {
      if (item.type == '1' && item.enums) { // 枚举
        item.enums = item.enums.filter(item2 => item2)
        return item
      }
      return item
    })
    return tempArr
  }

  // 提交数据
  const confirmSubmit = () => {
    form.validateFields((err, values) => {
      // console.log('====', values)
      let params = {
        aiName: values.aiName.trim(),
        aiUrl: values.aiUrl.trim(),
        aiDesc: values.aiDesc.trim(),
      }
      if (values.aiInParamList) { // 假如有----输入
        params.aiInParamList = filterData(values.aiInParamList)
      }
      if (values.aiOutParamList) { // 假如有----输出
        params.aiOutParamList = filterData(values.aiOutParamList)
      }
      if (Object.keys(aiAbilityDetail).length > 0) { // 编辑
        params.aiId = aiAbilityDetail.aiId
      }
      console.log('submit==', params)
      saveAIbilityRequest(params).then(res => {
        if (res.data.code === 0) {
          message.success(`提交成功`)
          handleOk()
        }
      }).finally(() => setConfirmLoading(false))
    })
  }

  // 输入-------------------------------------------
  // 输入-新增--内层
  const addInnerForm = (index) => {
    const innerList = getFieldValue(`innerList${index}`)
    uniquekey++
    const nextList = innerList.concat({ uniquekey })
    form.setFieldsValue({
      [`innerList${index}`]: nextList,
    })
  }

  // 输入-删除--内层
  const removeInnerForm = (index1, uniquekey) => {
    const innerList = getFieldValue(`innerList${index1}`)
    const aiInParamList = getFieldValue(`aiInParamList`)
    form.setFieldsValue({
      [`innerList${index1}`]: innerList.filter((item, key) => item.uniquekey !== uniquekey),
      aiInParamList: aiInParamList[index1].enums.filter((item, key) => item.uniquekey !== uniquekey)
    })
  }

  // 输入-内层-html
  const createInnerHtml = (name, index1, item) => {
    getFieldDecorator(`innerList${index1}`, { initialValue: item.enums || [] })
    const innerList = getFieldValue(`innerList${index1}`)
    console.log('innerList', innerList)

    const html2 = innerList.map((item, index2) => (
      <div className='inline-form-item2' key={index2}>
        <Form.Item label="名称" labelCol={{ span: 6 }}>
          {
            getFieldDecorator(`${name}[${item.uniquekey}].name`, {
              initialValue: item.name,
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{ required: true, whitespace: true, message: "请输入名称" }],
            })(<Input placeholder="请输入名称" />)
          }
        </Form.Item>
        <Form.Item label="数值" labelCol={{ span: 6 }}>
          {
            getFieldDecorator(`${name}[${item.uniquekey}].value`, {
              initialValue: item.value,
              validateTrigger: ['onChange', 'onBlur'],
              rules: [
                { required: true, whitespace: true, message: "请输入数值", },
                { pattern: /^\d+$/, message: '请输入非负整数' }
              ],
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

  // 输入-新增--外层
  const addParam = () => {
    const keys = getFieldValue('queryParams')
    const nextKeys = keys.concat({})
    form.setFieldsValue({
      queryParams: nextKeys,
    })
  }

  // 输入-删除--外层
  const deleteParam = index => {
    const queryParams = getFieldValue('queryParams')
    const aiInParamList = getFieldValue('aiInParamList')
    form.setFieldsValue({
      queryParams: queryParams.filter((item, key) => key !== index),
      aiInParamList: aiInParamList.filter((item, key) => key !== index)
    })
  }

  // let initData = []
  // if (Object.keys(aiAbilityDetail).length > 0) { // 编辑
  //   initData = aiAbilityDetail.aiInParamList
  // }

  getFieldDecorator('queryParams', { initialValue: newDataIn || [] })
  const keys = getFieldValue('queryParams')
  // 输入-外层---form-item
  const formItems = keys.map((item, index) => (
    <div className='form-item-block' key={index}>
      <Form.Item label="输入key">
        {
          getFieldDecorator(`aiInParamList[${index}].key`, {
            initialValue: item.key,
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{ required: true, whitespace: true, message: "请输入输入key" }],
          })(<Input placeholder="请输入输入key" />)
        }
      </Form.Item>
      <Form.Item label="类型">
        {
          getFieldDecorator(`aiInParamList[${index}].type`, {
            initialValue: item.type ? item.type + '' : '',
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{ required: true, message: '请选择类型', whitespace: true }]
          })(
            // onChange={(val) => changeType(val, `aiInParamList[${index}].type`)}
            <Select placeholder="请选择类型">
              <Option value="2">范围</Option>
              <Option value="1">枚举</Option>
            </Select>
          )
        }
      </Form.Item>
      <div className="ai-del-btn" key={index} onClick={() => deleteParam(index)}>删除</div>
      {/* 范围 */}
      {
        getFieldValue(`aiInParamList[${index}].type`) == '2' &&
        <div className='rang-style'>
          <Form.Item label="">
            {
              getFieldDecorator(`aiInParamList[${index}].range.min`, {
                initialValue: item.range && item.range.min,
                validateTrigger: ['onChange', 'onBlur'],
                rules: [
                  {
                    validator: (_, value, callback) => {
                      const reg = /^-?[0-9]\d*$/
                      if (!value) {
                        callback('请输入数值')
                      } else if (!reg.test(value)) {
                        callback('请输入整数')
                      } else {
                        callback()
                      }
                    }
                  }
                ],
              })(<Input style={{ width: 159, marginRight: 10 }} />)
            }
          </Form.Item>
          <div className='short-line'>-</div>
          <Form.Item label="">
            {
              getFieldDecorator(`aiInParamList[${index}].range.max`, {
                initialValue: item.range && item.range.max,
                validateTrigger: ['onChange', 'onBlur'],
                rules: [
                  {
                    validator: (_, value, callback) => {
                      const reg = /^-?[0-9]\d*$/
                      if (!value) {
                        callback('请输入数值')
                      } else if (!reg.test(value)) {
                        callback('请输入整数')
                      } else
                        if (value && Number(getFieldValue(`aiInParamList[${index}].range.min`)) < Number(value)) {
                          callback()
                        } else {
                          callback('填写整数且后者大于前者')
                        }
                    }
                  }
                ],
              })(<Input style={{ width: 196, marginRight: 10 }} />)
            }
          </Form.Item>
          <div className='tip'>(*填写整数且后者大于前者)</div>
        </div>
      }
      {/* 枚举 */}
      {
        getFieldValue(`aiInParamList[${index}].type`) == '1' &&
        <div>
          <Form.Item label="设置参数">
            <Button type="dashed" onClick={() => addInnerForm(index)} >
              <Icon type="plus" />
            </Button>
          </Form.Item>
          {createInnerHtml(`aiInParamList[${index}].enums`, index, item)}
        </div>
      }
    </div>
  ))

  // 输出-------------------------------------------

  // 输出-内层-新增
  const addInnerOutForm = (index) => {
    const outerList = getFieldValue(`outerList${index}`)
    uniquekey_2++
    const nextList = outerList.concat({ uniquekey_2 })
    form.setFieldsValue({
      [`outerList${index}`]: nextList,
    })
  }

  // 输出-内层-删除
  const removeInnerForm2 = (index1, uniquekey_2) => {
    const outerList = getFieldValue(`outerList${index1}`)
    const aiOutParamList = getFieldValue(`aiOutParamList`)
    form.setFieldsValue({
      [`outerList${index1}`]: outerList.filter((item, key) => item.uniquekey_2 !== uniquekey_2),
      aiOutParamList: aiOutParamList[index1].enums.filter((item, key) => item.uniquekey_2 !== uniquekey_2)
    })
  }

  // 输出-内层-html
  const createInnerHtml2 = (name, index1, item) => {
    getFieldDecorator(`outerList${index1}`, { initialValue: item.enums || [] })
    const outerList = getFieldValue(`outerList${index1}`)
    console.log('outerList', outerList)

    const html2 = outerList.map((item, index2) => (
      <div className='inline-form-item2' key={index2}>
        <Form.Item label="名称" labelCol={{ span: 6 }}>
          {
            getFieldDecorator(`${name}[${item.uniquekey_2}].name`, {
              initialValue: item.name,
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{ required: true, whitespace: true, message: "请输入名称" }],
            })(<Input placeholder="请输入名称" />)
          }
        </Form.Item>
        <Form.Item label="数值" labelCol={{ span: 6 }}>
          {
            getFieldDecorator(`${name}[${item.uniquekey_2}].value`, {
              initialValue: item.value,
              validateTrigger: ['onChange', 'onBlur'],
              rules: [
                { required: true, whitespace: true, message: "请输入数值", },
                { pattern: /^\d+$/, message: '请输入非负整数' }
              ],
            })(<Input placeholder="请输入数值" />)
          }
        </Form.Item>
        <div className='delete-btn'>
          &nbsp;&nbsp;
          <Icon
            key={index2}
            type="minus-circle-o"
            onClick={() => removeInnerForm2(index1, item.uniquekey_2)} />&nbsp;&nbsp;(*非负整数)
        </div>
      </div>
    ))
    return [html2]
  }

  // 输出-外层-新增
  const addOutParam = () => {
    const outParams = getFieldValue('outParams')
    const nextKeys = outParams.concat({})
    form.setFieldsValue({
      outParams: nextKeys
    })
  }

  // 输出-外层-删除
  const deleteOutParam = (index) => {
    const outParams = getFieldValue('outParams')
    const aiOutParamList = getFieldValue('aiOutParamList')
    form.setFieldsValue({
      outParams: outParams.filter((item, key) => key !== index),
      aiOutParamList: aiOutParamList.filter((item, key) => key !== index)
    })
  }

  getFieldDecorator('outParams', { initialValue: newDataOut || [] })
  const outParamsKeys = getFieldValue('outParams')
  // console.log('waicengwaiceng--------', outParamsKeys)
  // 输出--外层---form-item
  const outFormItems = outParamsKeys.map((item, index) => (
    <div className='form-item-block' key={index}>
      <Form.Item label="输出key">
        {
          getFieldDecorator(`aiOutParamList[${index}].key`, {
            initialValue: item.key,
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{ required: true, whitespace: true, message: "请输入输出key" }],
          })(<Input placeholder="请输入输出key" />)
        }
      </Form.Item>
      <Form.Item label="类型">
        {
          getFieldDecorator(`aiOutParamList[${index}].type`, {
            initialValue: item.type ? item.type + '' : '',
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{ required: true, message: '请选择类型', whitespace: true }]
          })(
            <Select placeholder="请选择类型">
              <Option value="2">范围</Option>
              <Option value="1">枚举</Option>
            </Select>
          )
        }
      </Form.Item>
      <div className="ai-del-btn" key={index} onClick={() => deleteOutParam(index)}>删除</div>
      {/* 范围 */}
      {
        getFieldValue(`aiOutParamList[${index}].type`) == '2' &&
        <div className='rang-style'>
          <Form.Item label="">
            {
              getFieldDecorator(`aiOutParamList[${index}].range.min`, {
                initialValue: item.range && item.range.min,
                validateTrigger: ['onChange', 'onBlur'],
                // rules: [{ required: true, whitespace: true, message: "请输入数值", }],
                rules: [
                  {
                    validator: (_, value, callback) => {
                      const reg = /^-?[0-9]\d*$/
                      if (!value) {
                        callback('请输入数值')
                      } else if (!reg.test(value)) {
                        callback('请输入整数')
                      } else {
                        callback()
                      }
                    }
                  }
                ],
              })(<Input style={{ width: 159, marginRight: 10 }} />)
            }
          </Form.Item>
          <div className='short-line'>-</div>
          <Form.Item label="">
            {
              getFieldDecorator(`aiOutParamList[${index}].range.max`, {
                initialValue: item.range && item.range.max,
                validateTrigger: ['onChange', 'onBlur'],
                // rules: [{ required: true, whitespace: true, message: "请输入数值", }],
                rules: [
                  {
                    validator: (_, value, callback) => {
                      const reg = /^-?[0-9]\d*$/
                      if (!value) {
                        callback('请输入数值')
                      } else if (!reg.test(value)) {
                        callback('请输入整数')
                      } else
                        if (value && Number(getFieldValue(`aiOutParamList[${index}].range.min`)) < Number(value)) {
                          callback()
                        } else {
                          callback('填写整数且后者大于前者')
                        }
                    }
                  }
                ],
              })(<Input style={{ width: 196, marginRight: 10 }} />)
            }
          </Form.Item>
          <div className='tip'>(*填写整数且后者大于前者)</div>
        </div>
      }
      {/* 枚举 */}
      {
        getFieldValue(`aiOutParamList[${index}].type`) == '1' &&
        <div>
          <Form.Item label="设置参数">
            <Button type="dashed" onClick={() => addInnerOutForm(index)} >
              <Icon type="plus" />
            </Button>
          </Form.Item>
          {createInnerHtml2(`aiOutParamList[${index}].enums`, index, item)}
        </div>
      }
    </div>
  ))

  return (
    <Modal title="添加/编辑AI能力"
      width={787}
      visible={visible}
      onOk={confirmSubmit}
      onCancel={handleCancel}
      maskClosable={false}
      confirmLoading={confirmLoading}
      wrapClassName="ai-ability-modal"
    >
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 18 }} autoComplete="off">
        <Form.Item label="能力名称">
          {
            getFieldDecorator('aiName', {
              initialValue: aiAbilityDetail.aiName,
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{ required: true, message: '请输入能力名称', whitespace: true }],
            })(<Input maxLength={50} placeholder="请输入能力名称" />)
          }
        </Form.Item>
        <Form.Item label="接口地址">
          {
            getFieldDecorator('aiUrl', {
              initialValue: aiAbilityDetail.aiUrl,
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{ required: true, message: '请输入接口地址', whitespace: true }],
            })(<Input maxLength={50} placeholder="请输入接口地址" />)
          }
        </Form.Item>
        <Form.Item label="描述">
          {getFieldDecorator('aiDesc', {
            initialValue: aiAbilityDetail.aiDesc,
            rules: [{ required: true, message: '请输入备注', whitespace: true }],
          })(<TextArea maxLength={100} autoSize={{ minRows: 3, maxRows: 3 }}></TextArea>)}
        </Form.Item>
        <Form.Item label="输入">
          <Button type="dashed" onClick={() => addParam()}>
            <Icon type="plus" /> 新&nbsp;&nbsp;增
          </Button>
        </Form.Item>
        {formItems}
        <div className='divider'></div>
        {/* 输出 */}
        <Form.Item label="输出" style={{ marginTop: '15px' }}>
          <Button type="dashed" onClick={() => addOutParam()}>
            <Icon type="plus" /> 新&nbsp;&nbsp;增
          </Button>
        </Form.Item>
        {outFormItems}
      </Form>
    </Modal>
  )
}

export default Form.create()(AIAbilityModal)
