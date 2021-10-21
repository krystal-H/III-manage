import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Select, Icon, Radio, Modal, Form, Tabs, DatePicker, Upload, message } from 'antd';
import TableCom from './TableCom';
import { upFile,newData } from '../../../apis/physical'
import './index.less'

const FormItem = Form.Item
const { TextArea } = Input;
const { TabPane } = Tabs;
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
    const { getFieldDecorator, validateFields } = form;
    const [currentTab, setCurrentTab] = useState('1')
    const [tableData, setTableData] = useState([])
    const [showData, setShowData] = useState([])
    const sundata = () => {
        validateFields().then(val => {
            console.log(val,'提交的wenj')
            newData(val).then(res=>{
                if(res.data.code == 0){
                    message.success('新增成功');
                }
            })
        })
    }
    //导入
    const customRequest = (option) => {
        upFile({ file: option.file }).then(res => {
            if (res.data.code == 0) {
                let data = delaData(res.data.data.standard || [])
                setTableData(data)

                tabcallback('1', data)
            }

        })
    }
    const formItemLayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 22 },
    };


    const tabcallback = (val, data) => {
        data = data || tableData
        setCurrentTab(val)
        let funcType = ['properties', 'events', 'services']
        let arr = data.filter(item => {
            if (item.funcType == funcType[val - 1]) {
                return item
            }
        })
        setShowData(arr)
    }
    const beforeUpload = (file) => {
        return true
    }
    const normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    const onRemove =file=>{
        setTableData([])
        setShowData([])
    }
    return (
        <div>
            <Modal
                title="新增物模型"
                visible={addVis}
                onOk={sundata}
                onCancel={handleCancel}
                width={'1200px'}
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
                            {getFieldDecorator('file', { rules: [{ required: true }], valuePropName: 'fileList', getValueFromEvent: normFile, })(
                                <Upload customRequest={customRequest} beforeUpload={beforeUpload} listType="picture" onRemove ={onRemove }>
                                    <Icon type="upload" /> 选择模板
                                </Upload>
                            )}
                        </FormItem>
                        <FormItem label="备注">
                            {getFieldDecorator('remark', { rules: [{ required: true }] })(
                                <TextArea style={{ width: '100%' }} ></TextArea>
                            )}
                        </FormItem>
                        <FormItem label="物模型详情">
                            <div>
                                <Tabs activeKey={currentTab} onChange={tabcallback}>
                                    <TabPane tab="属性" key="1">
                                    </TabPane>
                                    <TabPane tab="事件" key="2">
                                    </TabPane>
                                    <TabPane tab="服务" key="3">
                                    </TabPane>
                                </Tabs>
                                <div>
                                    <TableCom dataSource={showData} pagination={false} />
                                </div>
                            </div>
                        </FormItem>
                    </Form>
                </div>
            </Modal>
        </div>
    )

}
export default Addmodal = Form.create()(Addmodal)