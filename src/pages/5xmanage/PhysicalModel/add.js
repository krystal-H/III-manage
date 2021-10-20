import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Select, Icon, Radio, Modal, Form, Tooltip, DatePicker, Upload } from 'antd';
import TitleTab from '../../../components/TitleTab';
import TableCom from '../../../components/Table';
import { upFile } from '../../../apis/physical'
import './index.less'

const FormItem = Form.Item
const { TextArea } = Input;
function Addmodal({ form, addVis, handleCancel, handleOk, optionList }) {
    const { getFieldDecorator, validateFields } = form;
    const sundata = () => {
        validateFields().then(val=>{

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
                title="新增物模型"
                visible={addVis}
                onOk={sundata}
                onCancel={handleCancel}
                width={'700px'}
            >
                <div>
                    <Form {...formItemLayout}>
                        <FormItem label="模型名称">
                            {getFieldDecorator('name', { rules: [{ required: true }] })(
                                <Input style={{ width: '100%' }} ></Input>
                            )}
                        </FormItem>
                        <FormItem label="所属分类">
                            {getFieldDecorator('deviceTypeId', { rules: [{ required: true }] })(
                                <Select style={{ width: '100%' }} placeholder="请选择所属分类" allowClear>
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
                        <Form.Item label="状态">
                            {getFieldDecorator('status', { rules: [{ required: true }] })(
                                <Radio.Group>
                                    <Radio value={2}> 正式</Radio>
                                    <Radio value={1}>草稿</Radio>
                                </Radio.Group>,
                            )}
                        </Form.Item>
                        <FormItem label="模板设置">
                            {getFieldDecorator('file', { rules: [{ required: true}], valuePropName: 'fileList', })(
                                <Upload customRequest={customRequest} showUploadList={false}>
                                    <Icon type="upload" /> 选择模板
                                </Upload>
                            )}
                        </FormItem>
                        <FormItem label="备注">
                            {getFieldDecorator('remark', { rules: [{ required: true }] })(
                                <TextArea style={{ width: '100%' }} ></TextArea>
                            )}
                        </FormItem>
                    </Form>
                </div>
            </Modal>
        </div>
    )

}
export default Addmodal = Form.create()(Addmodal)