import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Form, Select, InputNumber, Checkbox, Radio } from 'antd';

import './stepSecond.less'

function StepSecond({ form, setStepCur, netList, protocolList, bindSceneList, moduleCommonObj, editData = {} }, ref) {
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
          initialValue: editData.moduleTypeList,
          rules: [{ required: true, message: "请选择通信方式" }]
        })(
          <Checkbox.Group>
            {moduleCommonObj.moduleTypeList && moduleCommonObj.moduleTypeList.length ?
              moduleCommonObj.moduleTypeList.map(item => (
                <Checkbox value={item.moduleType} key={item.moduleType}>
                  {item.moduleTypeName}
                </Checkbox>
              )) : null}
          </Checkbox.Group>
        )}
      </Form.Item>
      <Form.Item label="配网库">
        {getFieldDecorator("appModuleId", {
          initialValue: editData.appModuleId,
          rules: [{ required: true, message: "请您选择配网库" }]
        })(
          <Select placeholder="请选择配网库" showSearch optionFilterProp="children">
            {netList.map((item, index) => (
              <Select.Option value={item.moduleId} key={item.moduleId}>
                {item.moduleId + " " + item.hetModuleTypeName}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>
      <Form.Item label="配网方式">
        {getFieldDecorator("networkTypeList", {
          initialValue: editData.networkTypeList,
          rules: [{ required: true, message: "请选择配网方式" }]
        })(
          <Checkbox.Group>
            {moduleCommonObj.networkTypeList && moduleCommonObj.networkTypeList.length ?
              moduleCommonObj.networkTypeList.map(item => (
                <Checkbox value={item.networkType} key={item.networkType}>
                  {item.networkTypeName}
                </Checkbox>
              )) : null}
          </Checkbox.Group>
        )}
      </Form.Item>
      {/* <Form.Item label="支持协议">
        {getFieldDecorator("supportProtocolType", {
          initialValue: editData.supportProtocolType,
          rules: [{ required: true, message: "请选择支持协议" }]
        })(
          <Select placeholder="请选择支持协议" showSearch optionFilterProp="children">
            {
              protocolList.supportProtocolList && protocolList.supportProtocolList.map((item, index) => (
                <Select.Option value={item.supportProtocol} key={item.supportProtocol}>
                  {item.supportProtocolName}
                </Select.Option>
              ))
            }
          </Select>
        )}
      </Form.Item> */}
      <Form.Item label="默认通信速率">
        {getFieldDecorator("communicateSpeed", {
          initialValue: editData.communicateSpeed,
          rules: [{ required: true, pattern: new RegExp(/^\+?[1-9][0-9]*$/, "g"), message: "请输入通信速率" }]
        })(
          <InputNumber placeholder="请输入通信速率" style={{ width: "100%" }} maxLength={6} />
        )}
      </Form.Item>
      <Form.Item label="数据长度上限">
        {getFieldDecorator("dataLengthLimit", {
          initialValue: editData.dataLengthLimit,
          rules: [{ required: true, message: "请输入通信速率" }]
        })(
          <Select placeholder="请选择数据长度上限" showSearch optionFilterProp="children">
            {
              protocolList.dataLengthLimitList && protocolList.dataLengthLimitList.map((item, index) => (
                <Select.Option value={item.dataLengthLimit} key={item.dataLengthLimit}>
                  {item.dataLengthLimitName}
                </Select.Option>
              ))
            }
          </Select>
        )}
      </Form.Item>
      <Form.Item label="认证通道">
        {getFieldDecorator("bindSceneType", {
          initialValue: editData.bindSceneType,
          rules: [{ required: true, message: "请选择认证通道" }]
        })(
          <Select placeholder="请选择认证通道" showSearch optionFilterProp="children">
            {bindSceneList.map((item, index) => (
              <Select.Option value={item.sceneTypeId} key={item.sceneTypeId}>
                {item.sceneTypeName}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>
      <Form.Item label="支持文件传输">
        {getFieldDecorator("supportFileTransfer", {
          initialValue: editData.supportFileTransfer,
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
