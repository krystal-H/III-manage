import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Select, notification, message, Modal, Form, Tooltip, DatePicker, Upload, Icon } from 'antd';
import TableCom from '../../../components/Table';
import { getPhyList, getPhyData, relData } from '../../../apis/panelMn'
import { fileHost } from "../../../util/utils";
import './index.less'
// 上传地址
const uploadConfigs = {
    action: fileHost,
    data: file => ({ appId: 31438, domainType: 4 })
}
const FormItem = Form.Item
function Addmodal({ form, addVis, handleCancel, handleOk, optionList, modelType, actionData }) {
    const { getFieldDecorator, validateFields, setFieldsValue, getFieldValue } = form;
    const [dataSource, setdataSource] = useState([])
    const [phyList, setPhyList] = useState([])
    const [initImg, setInitImg] = useState([])
    const [initImg2, setInitImg2] = useState([])
    const sundata = () => {
        validateFields().then(val => {
            let params = { ...val, isFree: 1 }
            if (modelType == 'edit') {
                params.status = actionData.status
                params.templateId = actionData.templateId
            }
            delete params.filePath
            delete params.deviceSubtypeId2
            params.deviceSubtypeId = 0
            relData(params).then(res => {
                if (res.data.code == 0) {
                    message.success('新增成功');
                    handleOk()
                }
            })
        })
    }
    useEffect(() => {
        if (modelType == 'edit') {
            initEditData()
        }
    }, [])
    //编辑初始化
    const initEditData = () => {
        form.setFieldsValue({
            filePath: actionData.htmlPath,
            deviceTypeId: actionData.deviceTypeId,
            templateName: actionData.templateName,
            page1: actionData.page1,
            htmlPath: actionData.htmlPath,
        })
        setInitImg([{ url: actionData.page1, uid: 1, name: 'id' }])
        setInitImg2([{ url: actionData.htmlPath, uid: 2, name: 'H5包' }])
        getPhyList(actionData.deviceTypeId).then(res => {
            if (res.data.code == 0) {
                setPhyList(res.data.data)
            }
        })
    }
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };
    const column = [
        {
            title: '功能类型',
            dataIndex: 'funcTypeCN',
            key: 'funcTypeCN',
        },
        {
            title: '功能点名称',
            dataIndex: 'funcName',
            key: 'funcName',
        },
        {
            title: '标识符',
            dataIndex: 'funcIdentifier',
            key: 'funcIdentifier',
        },
    ]
    const typeChange = (val) => {
        setFieldsValue({
            deviceSubtypeId2: ''
        })
        setdataSource([])
        getPhyList(val).then(res => {
            if (res.data.code == 0) {
                setPhyList(res.data.data)
            }
        })
    }
    const getableFn = (id) => {
        getPhyData({ id }).then(res => {
            if (res.data.code == 0) {
                setdataSource(res.data.data.standard)
            }
        })
    }
    const beforeUpload = (file) => {
        // const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
        // if (!isJpgOrPng) {
        //     message.error("只能上传JPG或者PNG格式");
        // }
        // return isJpgOrPng
    }
    const onChangeFile = ({ file, fileList }) => {

        if (file.status === "done") {
            if (file.response.code == 0) {
                let file = fileList[0];
                // 给最外层添加一个url ,不然upload组件不会点击下载
                file.url = file.response.data.url;
                form.setFieldsValue({ page1: file.response.data.url })
            } else {
                message.error(`上传失败`);
                fileList = []
            }

        } else if (file.status === "error") {
            message.error(`上传失败`);
        } else if (file.status === "removed") {
            form.setFieldsValue({ page1: '' })
        }
    }
    const beforeUpload2 = (file) => {
        // const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
        // if (!isJpgOrPng) {
        //     message.error("只能上传JPG或者PNG格式");
        // }
        // return isJpgOrPng
    }
    const onChangeFile2 = ({ file, fileList }) => {
        if (file.status === "done") {
            if (file.response.code == 0) {
                let file = fileList[0];
                // 给最外层添加一个url ,不然upload组件不会点击下载
                file.url = file.response.data.url;
                form.setFieldsValue({ htmlPath: file.response.data.url })
                form.setFieldsValue({ filePath: file.response.data.url })
            } else {
                message.error(`上传失败`);
                fileList = []
            }

        } else if (file.status === "error") {
            message.error(`上传失败`);
        } else if (file.status === "removed") {
            form.setFieldsValue({ htmlPath: '' })
            form.setFieldsValue({ filePath: '' })
        }
    }
    return (
        <div>
            <Modal
                title={modelType == 'edit' ? '编辑' : '新增'}
                visible={addVis}
                onOk={sundata}
                onCancel={handleCancel}
                width={'700px'}
            >
                <div>
                    <Form {...formItemLayout}>

                        <FormItem label="所属分类">
                            {getFieldDecorator('deviceTypeId')(
                                <Select placeholder="请选择所属分类" onChange={typeChange}>
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
                        <FormItem label="物模型选择">
                            {getFieldDecorator('deviceSubtypeId2')(
                                <Select placeholder="请选择" onChange={getableFn}>
                                    {
                                        phyList.map((item, index) => (
                                            <Select.Option key={item.id} value={item.id} label={item.name}>
                                                {item.name}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            )}
                        </FormItem>
                        <div style={{ paddingLeft: '162px', marginBottom: '20px' }}><TableCom rowKey={"funcIdentifier"} columns={column} dataSource={dataSource}
                            scroll={{ y: 340 }} pager={false} /></div>

                        <FormItem label="封面" extra="支持格式：png、jpg 尺寸：247px * 439px,170*302px">
                            {getFieldDecorator('page1', { rules: [{ required: true }], })(
                                <div>
                                    <Upload
                                        className="avatar-uploader"
                                        {...uploadConfigs}
                                        accept=".png,.jpg"
                                        onChange={onChangeFile}
                                        listType="picture-card"
                                        beforeUpload={beforeUpload}
                                        defaultFileList={initImg}
                                    >
                                        {getFieldValue('page1') ? null : <span>
                                            <Icon type="upload" /> 上传图片
                                        </span>}
                                    </Upload>
                                </div>

                            )}
                        </FormItem>
                        <FormItem label="上传H5包">
                            {getFieldDecorator('htmlPath', { rules: [{ required: true }], })(
                                <div>
                                    <Upload
                                        className="avatar-uploader"
                                        {...uploadConfigs}
                                        accept=".zix"
                                        onChange={onChangeFile2}
                                        beforeUpload={beforeUpload2}
                                        defaultFileList={initImg2}
                                    >
                                        {getFieldValue('htmlPath') ? null : <Button>
                                            <Icon type="upload" /> 上传H5包
                                        </Button>}
                                    </Upload>
                                </div>
                            )}
                        </FormItem>
                        <FormItem label="工程文件地址">
                            {getFieldDecorator('filePath', {})(
                                <Input readOnly style={{ width: '100%' }} ></Input>
                            )}
                        </FormItem>
                    </Form>
                </div>
            </Modal>
        </div>
    )

}
export default Form.create()(Addmodal)