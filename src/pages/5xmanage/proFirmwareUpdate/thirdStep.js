import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Form, Input, Radio } from 'antd';
const { TextArea } = Input;
function StepFirst({ form, commitAll }, ref) {
    const { getFieldDecorator } = form
    const $el1 = useRef(null)
    // 表单提交
    const validData = () => {
        form.validateFields((err, values) => {
            if (!err) {
                commitAll(values)
            }
        })
    }

    // 用于定义暴露给父组件的ref方法
    useImperativeHandle(ref, () => {
        return {
            onFinish: validData
        }
    },[])


    return (
        <div style={{ padding: '0 100px' }}>
            <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} className="basic-params">
                <Form.Item label="短信文案">
                    <span>短信通知</span>
                </Form.Item>
                <Form.Item label="短信文案">
                    {getFieldDecorator('moduleName', {})(<TextArea  rows={4}
                    placeholder='尊敬的客户您好：clife平台已升级通信模组 {模组名称} ，您关联使用的产品 {产品名称}，可进行设备模组固件升级，敬请留意~'/>)}
                </Form.Item>
            </Form>
        </div>

    )
}

export default Form.create()(forwardRef(StepFirst))
