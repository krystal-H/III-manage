import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Select, notification, message, Modal, Form, Tooltip, DatePicker, Upload,Icon  } from 'antd';
import TitleTab from '../../../components/TitleTab';
import TableCom from '../../../components/Table';
import { upFile } from '../../../apis/repairOrder'
import { getPhyList, getPhyData } from '../../../apis/panelMn'
import { fileHost } from "../../../util/utils";
import './index.less'
// 上传地址
const uploadConfigs = {
    action: fileHost,
    data: file => ({ appId: 31438, domainType: 4 })
}
const FormItem = Form.Item
const TitleOption = TitleTab.Option
const { RangePicker } = DatePicker;
function Addmodal({ form, addVis, handleCancel, handleOk, optionList }) {
    const { getFieldDecorator, validateFields, setFieldsValue, getFieldValue } = form;
    const [dataSource, setdataSource] = useState([])
    const [phyList, setPhyList] = useState([])
    const [descPic, setDescPic] = useState('')
    const sundata = () => {
        console.log(getFieldValue('page1'))
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
            productId: ''
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
        const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            message.error("只能上传JPG或者PNG格式");
        }
        return isJpgOrPng
    }
    const onChangeFile = ({ file, fileList }) => {
        if (file.status === "done") {
            let file = fileList[0];
            // 给最外层添加一个url ,不然upload组件不会点击下载
            file.url = file.response.data.url;
        } else if (file.status === "error") {
            message.error(`上传失败`);
            fileList.length = 0;
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
                            {getFieldDecorator('mode')(
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
                            {getFieldDecorator('productId')(
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
                            pager={false} /></div>

                        <FormItem label="封面">
                            {getFieldDecorator('page1', { rules: [{ required: true }], })(
                                <div>
                                    <Upload
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        {...uploadConfigs}
                                        accept="image/png"
                                        onChange={onChangeFile}
                                        beforeUpload={beforeUpload}
                                    >
                                        {getFieldValue('page1') &&  getFieldValue('page1').length >=1 ? null : <Button>
                                            <Icon type="upload" /> 上传图片
                                        </Button>}
                                    </Upload>
                                </div>

                            )}
                        </FormItem>
                        {/* <FormItem label="上传H5包">
                            {getFieldDecorator('file', { rules: [{ required: true, message: "请上传图" }], valuePropName: 'fileList', })(
                                <Upload customRequest={customRequest} showUploadList={false}>
                                    <Button type='text'  >上传H5包</Button>
                                </Upload>
                            )}
                        </FormItem> */}
                        <FormItem label="工程文件地址">
                            {getFieldDecorator('url1', { rules: [{ required: true }] })(
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