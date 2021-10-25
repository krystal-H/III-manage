import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Select, notification, Divider, Modal, Form, Tooltip, DatePicker, Upload } from 'antd';
import TitleTab from '../../../components/TitleTab';
import TableCom from '../../../components/Table';
import { upFile } from '../../../apis/repairOrder'
import { fileHost } from "../../../util/utils";
import './index.less'

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
function Addmodal({ form, addVis, handleCancel, handleOk, optionList, actionData }) {
    const { getFieldDecorator, validateFields, setFieldsValue } = form;
    const [descPic, setDescPic] = useState('') // 简介图片
    const [dataSource, setdataSource] = useState([])
    const [fileList, setFileList] = useState([]);

    const sundata = () => {

    }
    useEffect(() => {
        // setFieldsValue()
        initData()
    }, [])
    const initData = () => {
        setFieldsValue({
            deviceTypeId: actionData.deviceTypeId,
            templateName: actionData.templateName,
            // page1:[{url:actionData.page1}]
        })
        setFileList([{ url: actionData.page1, name: actionData.page1 }])
        setDescPic(actionData.page1)
    }
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };
    const column = [
        {
            title: '功能名称',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '标识符',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '数据类型',
            dataIndex: 'name',
            key: 'name',
        },
    ]
    const handleChange = ({ file, fileList }) => {
        // console.log(file,file.status,file, fileList,'==========44554')
        setFileList([file])
        if (file.status === "done") {
            setDescPic(file.response.data.url)
        } else if (file.status === "error") {
            message.error(`${info.file.name} 上传失败`);
            setDescPic('')
        } else {
            setDescPic('')
        }
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
                <div>
                    <Form {...formItemLayout}>

                        <FormItem label="所属分类">
                            {getFieldDecorator('deviceTypeId')(
                                <Select placeholder="请选择所属分类">
                                    {
                                        optionList.map((item, index) => (
                                            <Select.Option key={item.deviceTypeId} value={item.deviceTypeId} label={item.deviceTypeName}>
                                                {item.deviceTypeName}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="面板名称">
                            {getFieldDecorator('templateName', { rules: [{ required: true }] })(
                                <Input style={{ width: '100%' }} onPressEnter={() => searchList()}></Input>
                            )}
                        </FormItem>
                        <div style={{ padding: '0 80px' }}>
                            <div>物模型如下：</div>
                            {/* <TableCom rowKey={"id"} columns={column} dataSource={dataSource} style={{ padding: '10px 0' }}
                                pager={false} /> */}
                        </div>
                        <FormItem label="封面">
                            {getFieldDecorator('page1', { rules: [{ required: true }], })(
                                <Upload
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    {...uploadConfigs}
                                    fileList={fileList}
                                    onChange={handleChange}
                                    accept=".png,.jpeg,.jpg"
                                >
                                    {descPic ? <img src={descPic} alt="avatar" style={{ width: '100%' }} /> : '上传'}
                                </Upload>
                            )}
                        </FormItem>
                        <FormItem label="上传H5包">
                            {getFieldDecorator('htmlPath', { rules: [{ required: true, message: "请上传图" }], valuePropName: 'fileList', })(
                                <Upload customRequest={customRequest} showUploadList={false}>
                                    <Button type='text'  >上传H5包</Button>
                                </Upload>
                            )}
                        </FormItem>
                        <FormItem label="工程文件地址">
                            {getFieldDecorator('mn', { rules: [{ required: true }] })(
                                <Input style={{ width: '100%' }} onPressEnter={() => searchList()}></Input>
                            )}
                        </FormItem>
                    </Form>
                </div>
            </Modal>
        </div>
    )

}
export default Form.create()(Addmodal)