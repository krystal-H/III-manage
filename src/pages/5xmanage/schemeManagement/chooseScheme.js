import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Modal, Button, Form, Input, Select, Upload, Icon, message, Radio } from 'antd';

const { Option } = Select

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
}

function ChooseScheme({ form, setStepCur }, ref) {

  // 用于定义暴露给父组件的ref方法
  useImperativeHandle(ref, () => {
    return {
      onFinish: handleSubmit
    }
  })

  const changeRadio = e => {
    console.log('radio checked', e.target.value)
  }

  // 选择三级品类
  const handleSelectChange = () => {

  }

  // 表单验证
  const handleSubmit = () => {
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        setStepCur(1, values)
      }
    })
  }

  const { getFieldDecorator } = form
  return (
    <Form
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 14 }}
      onSubmit={() => handleSubmit()}>
      <Form.Item label="产品三级分类">
        {getFieldDecorator('deviceTypeId', {
          rules: [{ required: true, message: '请选择产品三级分类' }],
        })(
          <Select placeholder="请选择产品三级分类"
            style={{ width: 220 }}
            onChange={() => handleSelectChange()}>
            <Option value="1">冰箱</Option>
            <Option value="2">洗衣机</Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item label="品类可支持方案">
        {
          getFieldDecorator('type', {
            rules: [{ required: true, message: '请选择品类可支持方案' }],
          })(
            <Radio.Group onChange={(e) => changeRadio(e)}>
              <Radio style={radioStyle} value={1}>免开发方案</Radio>
              <Radio style={radioStyle} value={2}>独立MCU方案</Radio>
              <Radio style={radioStyle} value={3}>Soc方案</Radio>
            </Radio.Group>
          )
        }
      </Form.Item>
    </Form>
  )
}

export default Form.create()(forwardRef(ChooseScheme))