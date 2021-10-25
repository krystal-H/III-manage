import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Select, notification, Divider, Modal, Form, Tooltip, DatePicker, Upload } from 'antd';
import TitleTab from '../../../components/TitleTab';
import TableCom from '../../../components/Table';
import { upFile } from '../../../apis/repairOrder'
import { getPhyList, getPhyData } from '../../../apis/panelMn'
import './index.less'

const FormItem = Form.Item
const TitleOption = TitleTab.Option
const { RangePicker } = DatePicker;
//处理数据
function delaData(data) {
    let newData = []
    data.forEach(item => {
        if (!item.funcParamList || !item.funcParamList.length) return
        item.funcParamList.forEach(item2 => {
            let newItem = JSON.parse(JSON.stringify(item))
            newData.push({ ...newItem, ...item2 })
        })
    })
    newData.forEach((item, index) => {
        item.key = index
    })
    return newData
}
function Addmodal({ form, addVis, handleCancel, handleOk, optionList }) {
    const { getFieldDecorator, validateFields, setFieldsValue } = form;
    const [dataSource, setdataSource] = useState([])
    const [phyList, setPhyList] = useState([])
    const sundata = () => {

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
                        <div style={{ paddingLeft: '162px',marginBottom:'20px' }}><TableCom rowKey={"funcIdentifier"} columns={column} dataSource={dataSource}
                            pager={false} /></div>

                        <FormItem label="封面">
                            {getFieldDecorator('file', { rules: [{ required: true, message: "请上传图" }], valuePropName: 'fileList', })(
                                <Upload customRequest={customRequest} name="avatar"
                                    listType="picture-card" accept=".png,.jpeg,.jpg">
                                    <span>上传</span>
                                </Upload>
                            )}
                        </FormItem>
                        <FormItem label="上传H5包">
                            {getFieldDecorator('file', { rules: [{ required: true, message: "请上传图" }], valuePropName: 'fileList', })(
                                <Upload customRequest={customRequest} showUploadList={false}>
                                    <Button type='text'  >上传H5包</Button>
                                </Upload>
                            )}
                        </FormItem>
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