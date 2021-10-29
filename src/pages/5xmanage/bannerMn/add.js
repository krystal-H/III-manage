import React, { useState, useEffect } from 'react';
import { Card, Input, message, Select, Icon, Divider, Modal, Form, Tooltip, DatePicker, Upload } from 'antd';
import TitleTab from '../../../components/TitleTab';
import { addData } from '../../../apis/bannerMn'
import { fileHost } from "../../../util/utils";
import moment from "moment";

import './index.less'

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
            let params = { ...val }
            params.showStartTime = moment(params.showStartTime).format('YYYY-MM-DD HH:mm:ss')
            params.showEndTime = moment(params.showEndTime).format('YYYY-MM-DD HH:mm:ss')
            addData(params).then(res => {
                if (res.data.code == 0) {
                    message.success('新增成功');
                    handleOk()
                }
            })
        })
    }
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };
    const onChangeFile = ({ file, fileList }) => {
        if (file.status === "done") {
            let file = fileList[0];
            // 给最外层添加一个url ,不然upload组件不会点击下载
            file.url = file.response.data.url;
            form.setFieldsValue({ imageUrl: file.response.data.url })
        } else if (file.status === "error") {
            message.error(`上传失败`);
        } else if (file.status === "removed") {
            form.setFieldsValue({ imageUrl: '' })
        }
    }
    const beforeUpload = (file) => {
    }
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
                        <FormItem label="上传图片" extra="支持格式：png、jpg 尺寸：1440x * 1334px">
                            {/* {getFieldDecorator('imageUrl', { rules: [{ required: true }], })(
                                <Upload
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    {...uploadConfigs}
                                    onChange={handleChange}
                                    accept=".png,.jpg"
                                    beforeUpload={beforeUpload}
                                >
                                    {form.getFieldValue('imageUrl') && form.getFieldValue('imageUrl').length? null : <span>
                                        <Icon type="upload" /> 上传图片
                                    </span>}
                                </Upload>
                            )} */}
                            {getFieldDecorator('imageUrl', { rules: [{ required: true }], })(
                                <div>
                                    <Upload
                                        className="avatar-uploader"
                                        {...uploadConfigs}
                                        accept=".png,.jpeg,.jpg"
                                        onChange={onChangeFile}
                                        listType="picture-card"
                                        beforeUpload={beforeUpload}
                                    >
                                        {getFieldValue('imageUrl') ? null : <span>
                                            <Icon type="upload" /> 上传图片
                                        </span>}
                                    </Upload>
                                </div>

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