import React, { useState, useEffect } from 'react';
import { Card, Input, message, Select, Icon, Divider, Modal, Form, Tooltip, DatePicker, Upload } from 'antd';
import { addAccount } from '../../../apis/accountMn'
const FormItem = Form.Item
const { TextArea } = Input;
function Addmodal({ form, addVis, handleCancel, handleOk }) {
    const { getFieldDecorator, validateFields } = form;
    const sundata = () => {
        validateFields().then(val => {
            let parmas = {
                ...val,
                accountName: val.accountName + '@clife.cn'
            }
            addAccount(parmas).then(res => {
                if (res.data.code == 0) {
                    message.success('新增成功')
                    handleOk()
                }
            })
        })
    }
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };
    return (
        <div>
            <Modal
                title="新建"
                visible={addVis}
                onOk={sundata}
                onCancel={handleCancel}
                width={'700px'}
            >
                <div className='banner-modal-add'>
                    <Form {...formItemLayout}>
                        <FormItem label="账户名">
                            {getFieldDecorator('accountName', { rules: [{ required: true, message: '请输入账户名称' },
                            {
                                max: 30,
                                message: '场景名称不能超过30个字符',
                            }] })(
                                <div><Input style={{ width: '220px' }} ></Input>
                                    <span style={{ marginLeft: '10px' }}>@clife.cn</span>
                                </div>

                            )}
                        </FormItem>
                        <FormItem label="厂商名称">
                            {getFieldDecorator('manufacturerName', {
                                rules: [{ required: true, message: '请输入厂商名称' },
                                {
                                    max: 30,
                                    message: '场景名称不能超过30个字符',
                                },]
                            })(
                                <Input style={{ width: '220px' }} ></Input>
                            )}
                        </FormItem>
                        <FormItem label="初始密码">
                            <span>Het@2&</span>
                        </FormItem>
                        <FormItem label="密码发送手机号">
                            {getFieldDecorator('phoneNumber', {
                                rules: [{ required: true, message: '请输入手机号' },
                                { pattern: /^(((\d{3,4}-)?\d{7,8})|(1\d{10}))$/, message: '请输入正确的联系人手机号码', }]
                            })(
                                <Input style={{ width: '100%' }} ></Input>
                            )}
                        </FormItem>
                    </Form>
                </div>
            </Modal>
        </div>
    )

}
export default Form.create()(Addmodal)