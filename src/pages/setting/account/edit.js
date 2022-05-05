import React, { useState, useEffect } from 'react';
import { Card, Input, message, Modal, Form, Button } from 'antd';
import { resetAccount, sentREset } from '../../../apis/accountMn'
const FormItem = Form.Item
function Addmodal({ form, editVis, handleCancel, handleOk, type, actionData }) {
    const { getFieldDecorator, validateFields, getFieldValue, setFieldsValue } = form;
    const sundata = () => {
        validateFields().then(val => {
            sentREset({ accountName: actionData.accountName, phone: val.phone }).then(res => {
                if (res.data.code === 0) {
                    message.success('提交成功')
                    handleOk()
                }
            })
        })
    }
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };
    const resetPS = () => {
        resetAccount({ id: actionData.id }).then(res => {
            if (res.data.code === 0) {
                message.success('重置成功')
            }
        })
    }
    useEffect(() => {
        if (type !== 'info') {
            setFieldsValue({
                phone: actionData.phone
            })
        }

    }, [])
    return (
        <div>
            <Modal
                title={type === 'info' ? '查看' : '重置密码'}
                visible={editVis}
                // onOk={sundata}
                onCancel={handleCancel}
                width={'700px'}
                footer={type === 'info' ? null : <Button type='primary' onClick={sundata}>发送</Button>}
            >
                <div className='system-modal-edit'>
                    <Form {...formItemLayout}>
                        <FormItem label="账户名">
                            <span className='item-text'>{actionData.userName}</span>
                            {/* <span>@clife.cn</span> */}
                        </FormItem>
                        <FormItem label="厂商名称">
                            <span>{actionData.nickName}</span>
                        </FormItem>
                        <FormItem label="初始密码">
                            <span className='item-text'>Het@2&</span>
                            {type !== 'info' ? <Button type='primary' ghost onClick={resetPS}>重置密码</Button> : ''}
                        </FormItem>
                        <FormItem label="密码发送手机号" >
                            {
                                type === 'info' ? <span>{actionData.phone}</span> : getFieldDecorator('phone', {
                                    rules: [{ required: true, message: '请输入banner名称' }
                                        , { pattern: /^(((\d{3,4}-)?\d{7,8})|(1\d{10}))$/, message: '请输入正确的联系人手机号码', }]
                                })(
                                    <Input style={{ width: '100%' }}  ></Input>
                                )
                            }

                        </FormItem>
                    </Form>
                </div>
            </Modal>
        </div>
    )

}
export default Form.create()(Addmodal)