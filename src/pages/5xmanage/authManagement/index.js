import React, { useState, useEffect } from 'react'
import { Button, Form, message, Select, Card, Input, Spin } from 'antd'
import './index.less'
import { getDefaultMenuRequest, addUrlRequest } from '../../../apis/authManagement'

const { Option } = Select;
const { TextArea } = Input

function AuthManage({ form }) {
  const { getFieldDecorator } = form
  const [opeType, setOpeType] = useState('')
  const [initClient_id, setInitClient_id] = useState('open') // 默认平台是open
  const [jsonString, setJsonString] = useState()

  // 判断是否为json格式字符串数据
  const isJSON = (str) => {
    if (typeof str == 'string') {
      try {
        var obj = JSON.parse(str)
        if (typeof obj == 'object' && obj) {
          return true
        } else {
          return false
        }
      } catch (e) {
        console.log('error：' + str + '!!!' + e)
        return false
      }
    }
    console.log('It is not a string!')
  }


  // 提交数据
  const handleSubmit = e => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        if (values.type === 'default-menu') {
          if (isJSON(values.resource)) {
            values.resource = JSON.stringify(JSON.parse(values.resource))
          } else {
            message.error('json格式有误！请仔细检查，尤其是多余的符号！')
            return
          }
        }
        console.log('submit', values)
        addUrlRequest(values).then(res => {
          if (res.data.code === 0) {
            message.success(`提交成功`)
            form.resetFields()
            setJsonString([])
            setOpeType('')
          }
        })
      } else {
        console.log('err----', err)
      }
    })
  }

  const changeOpetype = (val) => {
    setOpeType(val)
  }

  useEffect(() => {
    if (opeType === 'default-menu') {
      setJsonString([])
      getDefaultMenuRequest({ clientId: initClient_id, type: 'default-menu' }).then(res => {
        // setJsonString(res.data.data.resource ? JSON.stringify(JSON.parse(res.data.data.resource), null, 2) : [])
        setJsonString(res.data.data.resource)
      })
    } else {
      setJsonString('')
    }
  }, [opeType])
  useEffect(() => { console.log(opeType, 'aaaaaaaaaaaaaa') }, [opeType])

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
          {getFieldDecorator('clientId', {
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
            <Select placeholder="请选择操作类型" onSelect={val => changeOpetype(val)}>
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
                initialValue: jsonString,
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
