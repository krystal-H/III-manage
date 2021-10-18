import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Modal, Button, Steps, Form, Tabs, Input, Select, InputNumber, Checkbox, Radio } from 'antd';

function StepSecond({ form, setStepCur }, ref) {
  const [communicationMethodList, setCommunicationMethodList] = useState([])
  const [networkMethodList, setnetworkMethodList] = useState([])

  // 多选框改变
  const checkboxOnChange = checkedValues => {

  }

  // 表单提交
  const validData = () => {
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        setStepCur(2, values)
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
      <Form.Item label="通信方式">
        {getFieldDecorator("moduleTypeList", {
          rules: [{ required: true, message: "请选择通信方式" }]
        })(
          <Checkbox.Group onChange={checkboxOnChange}>
            {communicationMethodList && communicationMethodList.length ? communicationMethodList.map(item => (
              <Checkbox value={item.moduleType} key={item.moduleType}>
                {item.moduleTypeName}
              </Checkbox>
            )) : null}
          </Checkbox.Group>
        )}
      </Form.Item>
      <Form.Item label="配网库">
        {getFieldDecorator("appModuleId", {
          rules: [{ required: true, message: "请您选择配网库" }]
        })(
          <Select placeholder="请选择配网库">
            <Option value="1">1</Option>
            <Option value="2">2</Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item label="配网方式">
        {getFieldDecorator("networkTypeList", {
          rules: [{ required: true, message: "请选择配网方式" }]
        })(
          <Checkbox.Group>
            {networkMethodList && networkMethodList.length ? networkMethodList.map(item => (
              <Checkbox value={item.networkType} key={item.networkType}>
                {item.networkTypeName}
              </Checkbox>
            )) : null}
          </Checkbox.Group>
        )}
      </Form.Item>
      <Form.Item label="支持协议">
        {getFieldDecorator("supportProtocolType", {
          rules: [{ required: true, message: "请选择支持协议" }]
        })(
          <Select placeholder="请选择支持协议">
            <Option value="1">1</Option>
            <Option value="2">2</Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item label="默认通信速率">
        {getFieldDecorator("communicateSpeed", {
          rules: [{ required: true, message: "请输入通信速率" }]
        })(
          <InputNumber
            placeholder="请输入通信速率"
            style={{ width: "100%" }}
            maxLength={6}
          />
        )}
      </Form.Item>
      <Form.Item label="数据长度上限">
        {getFieldDecorator("dataLengthLimit", {
          rules: [{ required: true, message: "请输入通信速率" }]
        })(
          <Select placeholder="请选择数据长度上限">
            <Option value="1">1</Option>
            <Option value="2">2</Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item label="认证通道">
        {getFieldDecorator("bindSceneType", {
          rules: [{ required: true, message: "请选择认证通道" }]
        })(
          <Select placeholder="请选择认证通道">
            <Option value="1">1</Option>
            <Option value="2">2</Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item label="支持文件传输">
        {getFieldDecorator("supportFileTransfer", {
          rules: [{ required: true, message: "请选择是否支持文件传输" }]
        })(
          <Radio.Group>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </Radio.Group>
        )}
        <br />
        <span>限制2M大小</span>
      </Form.Item>
    </Form>
  )
}

export default Form.create()(forwardRef(StepSecond))
