import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Select, Icon, Radio, Modal, Form, Tabs, DatePicker, Upload, message } from 'antd';
import TableCom from './TableCom';
import { upFile, newData, getDetailTable, getDetailInfo, editData,getFileUrl } from '../../../apis/physical'
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
function Addmodal({ form, addVis, handleCancel, handleOk, optionList, editId }) {
    const { getFieldDecorator, validateFields, setFieldsValue, getFieldValue, getFieldsValue } = form;
    const [fileList, setFileList] = useState([])
    const [currentTab, setCurrentTab] = useState('1')
    const [tableData, setTableData] = useState([])
    const [showData, setShowData] = useState([])
    const [fileListS, setFileListS] = useState([])
    useEffect(() => {
        if (editId) {
            initData()
        }
    }, [])
    const initData = () => {
        getDetailInfo({ id: editId }).then(res => {
            if (res.data.code == 0) {
                setFieldsValue({
                    name: res.data.data.name,
                    deviceTypeId: res.data.data.deviceTypeId,
                    status: res.data.data.status,
                    remark: res.data.data.remark
                })

            }
        })
        getDetailTable({ id: editId }).then(res => {
            if (res.data.code == 0) {
                let data = delaData(res.data.data.standard || [])
                setTableData(data)
                tabcallback('1', data)
            }
        })
    }
    const sundata = () => {
        if (editId) {
            validateFields().then(val => {
                let params = { ...val, file: getFieldValue('file')[0].originFileObj, id: editId }
                editData(params).then(res => {
                    if (res.data.code == 0) {
                        message.success('编辑成功');
                        handleOk()
                    }
                })
            })
        } else {
            validateFields().then(val => {
                let params = { ...val, file: getFieldValue('file')[0].originFileObj }
                newData(params).then(res => {
                    if (res.data.code == 0) {
                        message.success('新增成功');
                        handleOk()
                    }
                })
            })
        }

    }

    //导入
    const customRequest = (option) => {
        if (getFieldValue('file') && getFieldValue('file').length) {
            message.info('只能上传一个文件')
            return
        }
        upFile({ file: option.file }).then(res => {
            if (res.data.code == 0) {
                form.setFieldsValue({ file: [''] })
                let data = delaData(res.data.data.standard || [])
                setTableData(data)
                tabcallback('1', data)
            } else {
                setFileListS([])
                form.setFieldsValue({ file: '' })
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
    const beforeUpload = (file, fileList, type) => {
        return new Promise((resolve, reject) => {
            let isFormal = type.indexOf(file.name.split('.').slice(-1)[0]) > -1
            if (!isFormal) {
                message.error(`只能上传${type.join(',')}格式`);
                return reject(false)
            }
            const lenMax = getFieldValue('file') && getFieldValue('file').length
            if (lenMax) {
                message.error(`请删除原文件再上传`);
                return reject(false)
            }
            return resolve(true)
        })
    }
    const normFile = e => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    const handleChange = ({ file, fileList }) => {
        // if (getFieldValue('file') && getFieldValue('file').length) {
        //     fileList.splice(1)
        // }
        setFileListS(fileList)
        // if (file.status === "done") {
        //     if (file.response.code == 0) {
        //         let file = fileList[0];
        //         // 给最外层添加一个url ,不然upload组件不会点击下载
        //         // file.url = file.response.data.url;
        //         // form.setFieldsValue({ page1: file.response.data.url })
        //     } else {
        //         alert(1)
        //         message.error(`上传失败`);
        //         fileList.splice(0)
        //     }

        // } else if (file.status === "error") {
        //     message.error(`上传失败`);
        // } else if (file.status === "removed") {
        //     // form.setFieldsValue({ page1: '' })
        // } else if (!file.status) {
        //     fileList.splice(0)

        // }
        // if (fileList.length > 1) {
        //     fileList.splice(1)
        // }
    };
    const downFile=()=>{
        window.open('http://skintest.hetyj.com/31438/f8ef83719a7deb1428ef75add5631fa9.json')
    }
    return (
        <div>
            <Modal
                title={editId ? "编辑物模型" : "新增物模型"}
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
                            {getFieldDecorator('file', { rules: [{ required: true }], getValueFromEvent: normFile, })(
                                <Upload customRequest={customRequest} listType="picture" accept='.json,.xlsx'
                                    beforeUpload={(file, fileList) => { return beforeUpload(file, fileList, ['json', 'xlsx']) }}
                                    onChange={handleChange}
                                    fileList={fileListS}>
                                    <Button>
                                        <Icon type="upload" /> 选择模板
                                    </Button>
                                    
                                </Upload>
                            )}
                        </FormItem>
                        <FormItem label="备注">
                            {getFieldDecorator('remark', { rules: [{ required: true }] })(
                                <TextArea style={{ width: '100%' }} ></TextArea>
                            )}
                        </FormItem>
                        {
                            tableData.length ? <FormItem label="物模型详情">
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
                            </FormItem> : null
                        }
                    </Form>
                </div>
            </Modal>
        </div>
    )

}
export default Addmodal = Form.create()(Addmodal)