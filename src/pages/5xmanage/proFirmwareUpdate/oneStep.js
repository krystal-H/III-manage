import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Form, Input, Radio } from 'antd';
import UploadCom from '../../../components/uploadCom/index'

function StepFirst({ form, setStepCur, actionData }, ref) {
    const { getFieldDecorator, validateFields } = form
    const $el1 = useRef(null)
    // 表单提交
    const validData = () => {
        form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let params = {
                    deviceVersionName: values.deviceVersionName,//插件名称
                    filePath: values.filePath,//上传的文件
                    totalVersion: values.totalVersion, //硬件版本号
                    extVersion: actionData.burnFileVersion,//当前软件版本号
                    deviceVersionType: values.deviceVersionType,//待上传软件版本号
                    ///以下不知道什么参数
                    firmwareVersionType: '',
                    mainVersion: '',
                    deviceVersionId: '',

                }
                setStepCur(1, params)
            }
        })
    }

    // 用于定义暴露给父组件的ref方法
    useImperativeHandle(ref, () => {
        return {
            onFinish: validData
        }
    }, [])
    const cbFn=()=>{
        console.log(form.getFieldValue('filePath2'))
        form.setFieldsValue({filePath:form.getFieldValue('filePath2')[0].url})
    }
    return (
        <div style={{ padding: '0 100px' }}>
            <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} className="basic-params" colon={false} >
                <Form.Item label="插件名称：">
                    {getFieldDecorator('deviceVersionName', {
                        rules: [{ required: true, whitespace: true, message: '请输入插件名称' }],
                    })(<Input maxLength={30} />)}
                </Form.Item>
                <Form.Item label="插件编号：">
                    <span>0</span>
                </Form.Item>
                <Form.Item label="硬件版本号：">
                    {getFieldDecorator('totalVersion', {})(<Input />)}
                </Form.Item>
                <Form.Item label="当前软件版本号：">
                    <span>{actionData.burnFileVersion}</span>
                </Form.Item>
                <Form.Item label="待上传软件版本号：">
                    {getFieldDecorator('deviceVersionType', { rules: [{ required: true, message: '请输入待上传软件版本号' }] })(<Input maxLength={30} />)}
                </Form.Item>
                <Form.Item label="固件程序：">
                    {getFieldDecorator('filePath', {})(<Input placeholder="请输入下载URL或者上传附件" />)}
                </Form.Item>
                <Form.Item label=" ">
                    {getFieldDecorator('filePath2', {})(
                        <UploadCom
                            ref={$el1}
                            maxCount={1}
                            cb={cbFn}
                            format='.bin,.hex,.zip,.cyacd,.apk,.dpkg'
                            isNotImg={true}
                            maxSize={200} />
                    )}
                </Form.Item>
            </Form>
        </div>

    )
}

export default Form.create()(forwardRef(StepFirst))
