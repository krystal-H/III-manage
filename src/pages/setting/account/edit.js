import React, { useState, useEffect } from 'react';
import { Card, Input, message, Select, Icon, Divider, Modal, Form, Tooltip, DatePicker, Upload, Button } from 'antd';
import TitleTab from '../../../components/TitleTab';
import { addData } from '../../../apis/bannerMn'
import { fileHost } from "../../../util/utils";
import moment from "moment";

const FormItem = Form.Item
const TitleOption = TitleTab.Option
const { RangePicker } = DatePicker;
// 上传地址
const uploadConfigs = {
    action: fileHost,
    data: file => ({ appId: 31438, domainType: 4 })
}
function Addmodal({ form, editVis, handleCancel, handleOk, type }) {
    const { getFieldDecorator, validateFields, getFieldValue } = form;
    const sundata = () => {
        validateFields().then(val => {
        })
    }
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };
    const goSub = () => {

    }
    return (
        <div>
            <Modal
                title={type === 'info' ? '查看' : '重置密码'}
                visible={editVis}
                onOk={sundata}
                onCancel={handleCancel}
                width={'700px'}
                footer={type === 'info' ? null : <Button type='primary' onClick={goSub}>发送</Button>}
            >
                <div className='system-modal-edit'>
                    <Form {...formItemLayout}>
                        <FormItem label="账户名">
                            <span className='item-text'>账户名</span>
                            <span>@clife.cn</span>
                        </FormItem>
                        <FormItem label="厂商名称">
                            <span>厂商名称</span>
                        </FormItem>
                        <FormItem label="初始密码">
                            <span className='item-text'>Het@2&</span>
                            {type !== 'info' ? <Button type='primary' ghost>重置密码</Button> : ''} 
                        </FormItem>
                        <FormItem label="密码发送手机号">
                            {
                                type === 'info' ? <span>15012705630</span> : getFieldDecorator('bannerName', { rules: [{ required: true, message: '请输入banner名称' }] })(
                                    <Input style={{ width: '100%' }} placeholder='请输入接收密码的手机号码'></Input>
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