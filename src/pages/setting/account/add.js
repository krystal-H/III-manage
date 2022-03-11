import React, { useState, useEffect } from 'react';
import { Card, Input, message, Select, Icon, Divider, Modal, Form, Tooltip, DatePicker, Upload } from 'antd';
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
function Addmodal({ form, addVis, handleCancel, handleOk }) {
    const { getFieldDecorator, validateFields, getFieldValue } = form;
    const sundata = () => {
        validateFields().then(val => {
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
                            {getFieldDecorator('bannerName', { rules: [{ required: true, message: '请输入banner名称' }] })(
                                <div><Input style={{ width: '220px' }} ></Input>
                                    <span style={{ marginLeft: '10px' }}>@clife.cn</span></div>

                            )}
                        </FormItem>
                        <FormItem label="厂商名称">
                            {getFieldDecorator('bannerName', { rules: [{ required: true, message: '请输入banner名称' }] })(
                                <Input style={{ width: '220px' }} ></Input>
                            )}
                        </FormItem>
                        <FormItem label="初始密码">
                            <span>Het@2&</span>
                        </FormItem>
                        <FormItem label="密码发送手机号">
                            {getFieldDecorator('bannerName', { rules: [{ required: true, message: '请输入banner名称' }] })(
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