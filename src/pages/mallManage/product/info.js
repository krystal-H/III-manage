import React, { useState, useEffect } from 'react';
import { Card, Input, message, Select, Icon, Divider, Modal, Form, Tooltip, DatePicker, Upload, Button } from 'antd';
import TitleTab from '../../../components/TitleTab';
import { addData } from '../../../apis/bannerMn'
import { fileHost } from "../../../util/utils";
import moment from "moment";
import './index.scss'
const FormItem = Form.Item
const TitleOption = TitleTab.Option
const { RangePicker } = DatePicker;
// 上传地址
const uploadConfigs = {
    action: fileHost,
    data: file => ({ appId: 31438, domainType: 4 })
}
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function Addmodal({ form }) {
    const { getFieldDecorator, validateFields, getFieldValue } = form;
    const [fileList, setFileList] = useState([])
    const [previewImage, setPreviewImage] = useState('')
    const [previewVisible, setPreviewVisible] = useState(false)
    const sundata = () => {
        validateFields().then(val => {
        })
    }
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
    const beforeUpload = (file, type) => {
        return new Promise((resolve, reject) => {
            let isFormal = type.indexOf(file.name.split('.').slice(-1)[0]) > -1
            if (!isFormal) {
                message.error(`只能上传${type.join(',')}格式`);
                return reject(false)
            }
            return resolve(true)
        })
    }
    const normFile = e => {
        // console.log('Upload event:', e);
        // if (Array.isArray(e)) {
        //     return e;
        // }
        // return e && e.fileList;
    };
    const uploadButton = (
        <div>
            <Icon type="plus" />
        </div>
    );
    const handleCancel = () => setPreviewVisible(false)

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview)
        setPreviewVisible(true)
    };

    const handleChange = ({ fileList }) => setFileList(fileList);
    return (
        <div>
            <div className='mall-detail-page'>
                <Form >
                    <FormItem label="平台产品ID">
                        {getFieldDecorator('bannerName', { rules: [{ required: true, message: '请输入banner名称' }] })(
                            <Input style={{ width: '200px' }}></Input>
                        )}
                        <Button type='primary'>搜索</Button>
                    </FormItem>
                    <div className='form-wrap'>
                        <FormItem label="商品名称">
                            {getFieldDecorator('showStartTime', { rules: [{ required: true, message: '请选择开始时间' }] })(
                                <Input style={{ width: '200px' }}></Input>
                            )}
                        </FormItem><FormItem label="商品型号">
                            {getFieldDecorator('showStartTime', { rules: [{ required: true, message: '请选择开始时间' }] })(
                                <Input style={{ width: '200px' }}></Input>
                            )}
                        </FormItem><FormItem label="品牌">
                            {getFieldDecorator('showStartTime', { rules: [{ required: true, message: '请选择开始时间' }] })(
                                <Input style={{ width: '200px' }}></Input>
                            )}
                        </FormItem>
                    </div>
                    <div className='form-wrap'>
                        <FormItem label="商品分类">
                            {getFieldDecorator('showStartTime', { rules: [{ required: true, message: '请选择开始时间' }] })(
                                <Input style={{ width: '200px' }}></Input>
                            )}
                        </FormItem><FormItem label="商品价格">
                            {getFieldDecorator('showStartTime', { rules: [{ required: true, message: '请选择开始时间' }] })(
                                <Input style={{ width: '200px' }}></Input>
                            )}
                        </FormItem>
                        <FormItem label="实时价格">
                            {getFieldDecorator('showStartTime', { rules: [{ required: true, message: '请选择开始时间' }] })(
                                <Input style={{ width: '200px' }}></Input>
                            )}
                        </FormItem>
                    </div>
                    <div className='form-wrap'>
                        <FormItem label="排序值">
                            {getFieldDecorator('showStartTime', { rules: [{ required: true, message: '请选择开始时间' }] })(
                                <Input style={{ width: '200px' }}></Input>
                            )}
                        </FormItem>
                        <FormItem label="负责人">
                            {getFieldDecorator('showStartTime', { rules: [{ required: true, message: '请选择开始时间' }] })(
                                <Input style={{ width: '200px' }}></Input>
                            )}
                        </FormItem>
                    </div>
                    <FormItem label="商品简述">
                        {getFieldDecorator('showStartTime', { rules: [{ required: true, message: '请选择开始时间' }] })(
                            <Input style={{ width: '600px' }}></Input>
                        )}
                    </FormItem>
                    <FormItem label="商品照片" extra="支持格式：png、jpg 尺寸：1440x * 1334px">
                        <Upload
                            {...uploadConfigs}
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                        >
                            {fileList.length >= 8 ? null : uploadButton}
                        </Upload>
                    </FormItem>
                    <FormItem label="跳转URL">
                        {getFieldDecorator('url', { rules: [{ required: true, message: '请输入跳转URL' }] })(
                            <Input style={{ width: '100%' }} ></Input>
                        )}
                    </FormItem>
                </Form>

                <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>

            </div>
        </div>
    )

}
export default Form.create()(Addmodal)