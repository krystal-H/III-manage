import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Modal, Button, Steps, Form, Tabs, Input, Select, InputNumber } from 'antd';


const { Option } = Select

function StepFirst({ form, setStepCur }, ref) {
  const checkNumber = (rule, value, callback) => {
    if (value < 0) {
      callback("仅允许输入正整数");
      return;
    }
    callback()
  }

  // 表单提交
  const validData = () => {
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        setStepCur(1, values)
      }
    })
  }

  // 用于定义暴露给父组件的ref方法
  useImperativeHandle(ref, () => {
    return {
      onFinish: validData
    }
  })

  const { getFieldDecorator } = form
  return (
    <Form labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
      <Form.Item label="模组名称">
        {getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入方案名称', whitespace: true }],
        })(<Input placeholder="请输入方案名称" />)}
      </Form.Item>
      <Form.Item label="模组生产厂家" hasFeedback>
        {getFieldDecorator('protocol', {
          rules: [{ required: true, message: '请选择通信协议' }],
        })(
          <Select placeholder="请选择通信协议">
            <Option value="china">China</Option>
            <Option value="usa">U.S.A</Option>
          </Select>,
        )}
      </Form.Item>
      <Form.Item label="模组型号">
        {getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入方案名称', whitespace: true }],
        })(<Input placeholder="请输入方案名称" />)}
      </Form.Item>
      <Form.Item label="模组IC型号">
        {getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入方案名称', whitespace: true }],
        })(<Input placeholder="请输入方案名称" />)}
      </Form.Item>
      <Form.Item label="适用范围" >
        {getFieldDecorator("applyScope", {
          rules:
            [{ required: true, message: '请输入模组适用范围' }, { type: 'string', max: 50, message: '上限50个字符长度' }]
        })(
          <Input type="text" placeholder="请输入模组适用范围，如：家电产品" maxLength={50} />
        )}
      </Form.Item>
      <Form.Item className="moduleSize" label="模组尺寸">
        <Form.Item label="" style={{ display: 'inline-block', width: '100px', marginBottom: 0 }} >
          {getFieldDecorator("sizeWidth", { initialValue: '', rules: [{ required: true, message: '请输入宽' }, { validator: checkNumber }] })(
            <InputNumber maxLength={3} max={999} />
          )}
        </Form.Item>
        <span>&nbsp;-&nbsp;&nbsp;&nbsp;</span>
        <Form.Item style={{ display: 'inline-block', width: '100px', marginBottom: 0 }} >
          {getFieldDecorator("sizeHeight", { initialValue: '', rules: [{ required: true, message: '请输入高' }, { validator: checkNumber }] })(
            <InputNumber maxLength={3} max={999} />
          )}
        </Form.Item>
        <span>&nbsp;-&nbsp;&nbsp;&nbsp;</span>
        <Form.Item style={{ display: 'inline-block', width: '100px', marginBottom: 0 }}>
          {getFieldDecorator("sizeThickness", { initialValue: '', rules: [{ required: true, message: '请输入厚' }, { validator: checkNumber }] })(
            <InputNumber maxLength={3} max={999} />
          )}
        </Form.Item>
        <br />
        <span>（长*宽*高 mm）</span>
      </Form.Item>

    </Form>
  )
}

export default Form.create()(forwardRef(StepFirst))
