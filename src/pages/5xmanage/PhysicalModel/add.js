import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Select, notification, Radio, Modal, Form, Tooltip, DatePicker, Upload } from 'antd';
import TitleTab from '../../../components/TitleTab';
import TableCom from '../../../components/Table';
import { upFile } from '../../../apis/repairOrder'
import './index.less'

const FormItem = Form.Item
const TitleOption = TitleTab.Option
const { RangePicker } = DatePicker;
const { TextArea } = Input;
function Addmodal({ form, addVis, handleCancel, handleOk }) {
    const { getFieldDecorator, validateFields } = form;
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
                            {getFieldDecorator('productId', { rules: [{ required: true }] })(
                                <Input style={{ width: '100%' }} ></Input>
                            )}
                        </FormItem>
                        <Form.Item label="状态">
                            {getFieldDecorator('radio-group', { rules: [{ required: true }] })(
                                <Radio.Group>
                                    <Radio value="a"> 正式</Radio>
                                    <Radio value="b">草稿</Radio>
                                </Radio.Group>,
                            )}
                        </Form.Item>
                        <FormItem label="上传图片">
                            {getFieldDecorator('file', { rules: [{ required: true, message: "请上传图" }], valuePropName: 'fileList', })(
                                <Upload customRequest={customRequest} showUploadList={false}>
                                    <Button type='text'  >选择模板</Button>
                                </Upload>
                            )}
                        </FormItem>
                        <FormItem label="备注">
                            {getFieldDecorator('productId', { rules: [{ required: true }] })(
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