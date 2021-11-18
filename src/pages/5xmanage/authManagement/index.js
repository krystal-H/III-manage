import React, { useState, useEffect } from 'react'
import { Button, Form, message, Select, Card, Input } from 'antd'
import './index.less'
import { getDefaultMenuRequest, addUrlRequest } from '../../../apis/authManagement'

const { Option } = Select;
const { TextArea } = Input

function AuthManage({ form }) {
  const { getFieldDecorator } = form
  const [opeType, setOpeType] = useState('')
  const [initClient_id, setInitClient_id] = useState('open') // 默认平台是open
  const [jsonString, setJsonString] = useState()

  // 提交数据
  const handleSubmit = e => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        if (values.type === 'default-menu') {
          values.resource = JSON.stringify(JSON.parse(values.resource))
        }
        addUrlRequest({ ...values }).then(res => {
          if (res.data.code === 0) {
            message.success(`提交成功`)
          }
          console.log(res, '111111')
          form.resetFields()
          setJsonString([])
        })
        setTimeout(() => { 
          form.resetFields()
          setJsonString([]) }, 1000)
      }
    })
  }

  useEffect(() => {
    getDefaultMenuRequest({ clientId: initClient_id, type: 'default-menu' }).then(res => {
      console.log(res, '9a89ds7ada')
      setJsonString(res.data.resource)
    }, () => setJsonString(JSON.stringify([{ "menuname": "总览", "childmenus": [], "items": [], "checked": true }, { "menuname": "产品", "childmenus": [{ "menuname": "产品管理", "childmenus": [], "items": [{ "item": "基本信息", "checked": true }, { "item": "功能定义", "checked": true }, { "item": "硬件开发", "checked": true }, { "item": "服务配置", "checked": true }, { "item": "调试验证", "checked": true }], "checked": true }, { "menuname": "设备注册", "childmenus": [], "items": [], "checked": true }, { "menuname": "固件升级", "childmenus": [], "items": [], "checked": true }, { "menuname": "规则引擎", "childmenus": [], "items": [], "checked": true }, { "menuname": "云端定时", "childmenus": [], "items": [], "checked": true }, { "menuname": "远程配置", "childmenus": [], "items": [], "checked": true }], "items": [], "checked": true }, { "menuname": "设备", "childmenus": [{ "menuname": "设备管理", "childmenus": [], "items": [{ "item": "基本信息", "checked": true }, { "item": "设备影子", "checked": true }, { "item": "设备标签", "checked": true }, { "item": "远程配置", "checked": true }], "checked": true }, { "menuname": "设备消息", "childmenus": [], "items": [], "checked": true }], "items": [], "checked": true }, { "menuname": "应用", "childmenus": [{ "menuname": "app管理", "childmenus": [], "items": [{ "item": "基本信息", "checked": true }, { "item": "关联产品", "checked": true }, { "item": "版本发布", "checked": true }], "checked": true }], "items": [], "checked": true }, { "menuname": "数据", "childmenus": [{ "menuname": "设备分析", "childmenus": [], "items": [], "checked": true }, { "menuname": "用户分析", "childmenus": [], "items": [], "checked": true }, { "menuname": "数据订阅", "childmenus": [], "items": [], "checked": true }], "items": [], "checked": true }, { "menuname": "项目", "childmenus": [{ "menuname": "项目管理", "childmenus": [], "items": [{ "item": "概述", "checked": true }, { "item": "openAPI", "checked": true }, { "item": "分组", "checked": true }, { "item": "设备", "checked": true }], "checked": true }], "items": [], "checked": true }], null, 4)))
  }, [])

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 14,
        offset: 7,
      },
    },
  }

  return (
    <div className="auth-mag-page">
      <Form labelCol={{ span: 7 }} wrapperCol={{ span: 8 }} onSubmit={handleSubmit}>
        <Form.Item label="平台编码">
          {getFieldDecorator('client_id', {
            initialValue: initClient_id,
            rules: [{ required: true, message: '请输入平台编码', whitespace: true }],
          })(
            <Select placeholder="请选择操作类型">
              <Option value="open">open</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="操作类型">
          {getFieldDecorator('type', {
            rules: [{ required: true, message: '请选择操作类型' }],
          })(
            <Select placeholder="请选择操作类型" onChange={val => setOpeType(val)}>
              <Option value="default-menu">修改平台菜单</Option>
              <Option value="default-url">新增接口url</Option>
            </Select>,
          )}
        </Form.Item>
        {/* 菜单 */}
        {
          opeType === 'default-menu' && <>
            <Form.Item label="当前菜单json">
              {getFieldDecorator('resource', {
                initialValue: jsonString,
                rules: [{ required: true, message: '请输入当前菜单json', whitespace: true }]
              })(
                <TextArea autoSize={{ minRows: 20, maxRows: 20 }}></TextArea>
              )}
            </Form.Item>
          </>
        }
        {/* url */}
        {
          opeType === 'default-url' && <>
            <Form.Item label="接口url">
              {getFieldDecorator('resource', {
                rules: [{ required: true, message: '请输入接口url', whitespace: true }],
              })(<Input placeholder="请输入接口url" />)}
            </Form.Item>
          </>
        }
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" className="submit-button">提交</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Form.create()(AuthManage)
