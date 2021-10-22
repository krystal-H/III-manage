import React, { useState, useEffect } from 'react';
import { Card, Input, message, Select, Icon, Divider, Modal, Form, Tooltip, DatePicker, Upload } from 'antd';
import TitleTab from '../../../components/TitleTab';
import { upFile } from '../../../apis/repairOrder'
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
    const { getFieldDecorator, validateFields } = form;
    const sundata = () => {
        validateFields().then(val => {
            console.log(val, '======')
            let params = { ...val, imageUrl: descPic }
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
    const [descPic, setDescPic] = useState('') // 简介图片
    const handleChange = (info, type) => {
        console.log('上传的info', info)
        const { file, fileList } = info;
        if (file.status === "done") {
            setDescPic(file.response.data.url)
        } else if (file.status === "error") {
            message.error(`${info.file.name} 上传失败`);
            setDescPic('')
        } else {
            setDescPic('')
        }
    }
    const normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    const onRemove = file => {
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
                        <FormItem label="上传图片">
                            {getFieldDecorator('imageUrl', { rules: [{ required: true, message: "请上传图" }], })(
                                // <Upload customRequest={customRequest} name="avatar"
                                //     listType="picture-card" accept=".png,.jpeg,.jpg" showUploadList={false}>
                                //     <span>上传</span>
                                // </Upload>
                                // <Upload
                                //     {...uploadConfigs}
                                //     listType="picture"
                                //     accept=".png,.jpeg,.jpg"
                                //     className="avatar-uploader"
                                //     showUploadList={false}
                                //     onRemove ={onRemove }
                                //     onChange={(info) => handleChange(info, 'modulePicture')}
                                // >
                                //     {
                                //         descPic ? <div> <img src={descPic}  style={{ maxWidth: '380px' }}/></div> : <div>
                                //             <Icon type='plus' />
                                //             <div className="ant-upload-text">Upload</div>
                                //         </div>
                                //     }

                                // </Upload>
                                <Upload
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    {...uploadConfigs}
                                    onChange={handleChange}
                                    accept=".png,.jpeg,.jpg"
                                >
                                    {descPic ? <img src={descPic} alt="avatar" style={{ width: '100%' }} /> : '上传'}
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