import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Select, notification, Divider, Modal, Form, Tooltip, DatePicker, Upload } from 'antd';
import TitleTab from '../../../components/TitleTab';
import TableCom from '../../../components/Table';
import { upFile } from '../../../apis/repairOrder'
import { getList } from '../../../apis/bannerMn'
import './index.less'

const FormItem = Form.Item
const TitleOption = TitleTab.Option
const { RangePicker } = DatePicker;
function Addmodal({ form, addVis, handleCancel, handleOk, optionList }) {
    const { getFieldDecorator, validateFields } = form;
    const [dataSource, setdataSource] = useState([])
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
                            {getFieldDecorator('productId', { rules: [{ required: true }] })(
                                <Input style={{ width: '100%' }} onPressEnter={() => searchList()}></Input>
                            )}
                        </FormItem>
                        <div style={{ padding: '0 60px' }}>
                            <div>此三级品类关联的物模型如下：</div>
                            <TableCom rowKey={"id"} columns={column} dataSource={dataSource} style={{ padding: '10px 0' }}
                                pager={false} />
                        </div>
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
                            {getFieldDecorator('productId', { rules: [{ required: true }] })(
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