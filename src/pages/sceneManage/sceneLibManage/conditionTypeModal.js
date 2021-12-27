import React, { useState, useEffect } from 'react'
import { Form, Input, Select, Modal, message } from 'antd'
import {addOrUpdateConditionRequest} from '../../../apis/sceneLibList'

const { TextArea } = Input

function ConditionTypeModal({ form, visible, handleOk, handleCancel, conditionTypeDetailData = {} }) {
  const { getFieldDecorator } = form
  const [confirmLoading, setConfirmLoading] = useState(false)

  // 确定提交
  const confirmSubmit = () => {
    form.validateFields((err, values) => {
      if (!err) {
        setConfirmLoading(true)
        let params = {...values}
        if (Object.keys(conditionTypeDetailData).length > 0) { // 编辑
          params.conditionOptionId = conditionTypeDetailData.conditionOptionId
        }
        addOrUpdateConditionRequest(params).then(res => {
          if (res.data.code === 0) {
            message.success(`提交成功`)
            handleOk()
          }
        }).finally(() => setConfirmLoading(false))
      }
    })
  }

  return (
    <Modal title="添加/编辑条件类型"
      width={800}
      visible={visible}
      onOk={confirmSubmit}
      onCancel={handleCancel}
      maskClosable={false}
      confirmLoading={confirmLoading}
      wrapClassName="module-add-scheme"
    >
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 18 }} autocomplete="off">
        <Form.Item label="条件类型名称">
          {getFieldDecorator('conditionOptionName', {
            initialValue: conditionTypeDetailData.conditionOptionName,
            rules: [{ required: true, message: '请输入条件类型名称', whitespace: true }],
          })(<Input maxLength={20} placeholder="请输入条件类型名称" />)}
        </Form.Item>
        <Form.Item label="备注">
          {getFieldDecorator('comments', {
            initialValue: conditionTypeDetailData.comments,
            rules: [{ required: true, message: '请输入备注', whitespace: true }],
          })(<TextArea maxLength={100} autoSize={{ minRows: 5, maxRows: 5 }}></TextArea>)}
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Form.create()(ConditionTypeModal)
