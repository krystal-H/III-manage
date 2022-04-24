import React, { useState, useEffect } from 'react';
import { Card, Input, Modal, Form, message } from 'antd';
import {  editStock } from '../../../apis/mallProduct'
const FormItem = Form.Item
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};
function FirmwareMagement({ form, supplyVis, confirmSupply, cancelSupply, actionData }) {
    const { getFieldDecorator, validateFields, getFieldsValue } = form;
    //确定补给
    const confirmSupply2 = () => {
        validateFields().then(val => {
            let params = {
                id: actionData.id,
                currentStock: Number(actionData.currentStock) + Number(val.classifyValue),
                maxStock: Number(actionData.currentStock) + Number(val.classifyValue) + Number(actionData.selledStock),
                // increaseVal:Number(val.classifyValue)
            }
            editStock(params).then(res => {
                if (res.data.code == 0) {
                    message.success('补给成功')
                    confirmSupply()
                }
            })
        })

    }
    return <Modal
        title='库存信息'
        visible={supplyVis}
        onOk={confirmSupply2}
        onCancel={cancelSupply}
    >
        <Form {...formItemLayout} >
            <FormItem label="产品名称">
                <div>
                    <span style={{ marginRight: '30px' }}>{actionData.commodityName}</span>
                    <span style={{ marginRight: '10px' }}>现有库存</span>
                    <span>{actionData.currentStock}</span>
                </div>

            </FormItem>
            <FormItem label="本次补充">
                {getFieldDecorator('classifyValue', {
                    getValueFromEvent: (e) => {
                        const val = e.target.value;
                        return val.replace(/[^\d]/g, '');
                    }
                })(
                    <Input  ></Input>
                )}
            </FormItem>
        </Form>
    </Modal>
}
export default Form.create()(FirmwareMagement)