import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Select, notification, Divider, Modal, Form, Tooltip, DatePicker, Upload } from 'antd';
import TitleTab from '../../../components/TitleTab';
import { upFile } from '../../../apis/repairOrder'
import { addData } from '../../../apis/bannerMn'
import './index.less'

const FormItem = Form.Item
const TitleOption = TitleTab.Option
const { RangePicker } = DatePicker;
function Addmodal({ form, addVis, handleCancel, handleOk }) {
    const { getFieldDecorator, validateFields } = form;
    const sundata = () => {
        validateFields().then(val => {
            console.log(val, '======')
        })
    }
    //导入
    const customRequest = (option) => {
        upFile({ file: option.file }).then(res => {

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
                <div>
                    <Form {...formItemLayout}>
                        <FormItem label="banner名称">
                            {getFieldDecorator('bannerName', { rules: [{ required: true }] })(
                                <Input style={{ width: '100%' }} ></Input>
                            )}
                        </FormItem>
                        <FormItem label="计划展示开始时间">
                            {getFieldDecorator('showStartTime', { rules: [{ required: true }] })(
                                <DatePicker showTime style={{ width: '100%' }} />
                            )}
                        </FormItem>
                        <FormItem label="计划展示结束时间">
                            {getFieldDecorator('showEndTime', { rules: [{ required: true }] })(
                                <DatePicker showTime style={{ width: '100%' }} />
                            )}
                        </FormItem>
                        <FormItem label="上传图片">
                            {getFieldDecorator('file', { valuePropName: 'fileList', })(
                                <Upload customRequest={customRequest} showUploadList={false}>
                                    <Button type='text'  >上传图片</Button>
                                </Upload>
                            )}
                        </FormItem>
                        <FormItem label="跳转URL">
                            {getFieldDecorator('url', { rules: [{ required: true }] })(
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