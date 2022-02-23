import React, { useState, useEffect, useMemo } from 'react';
import { Card, Input, Button, Select, message, Radio, Modal, Form, Tooltip, Popconfirm } from 'antd';
import TitleTab from '../../../components/TitleTab';
import { relData } from '../../../apis/firmwareMagement'

const FormItem = Form.Item
const optionArr = [
    { label: 'MCU模块', value: 2 },
    { label: '模组插件', value: 1 }
]
let unlkey = 0
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};
function PanelMn({ form, handleOk, handleCancel, checkVisible, actionData }) {
    const { getFieldDecorator, validateFields, getFieldsValue, getFieldValue } = form;
    const [isPass, setIsPass] = useState(2)
    useEffect(() => {
        unlkey = 0
    }, [])
    const getDom = () => {
        getFieldDecorator('keys', { initialValue: [{unlkey:0,type:1}] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (
            <div key={k.unlkey} className='firm-item'>
                <Form.Item
                    label={k.type == 1 ? '插件名称' : '模块名称'}
                    required={true}

                >
                    {getFieldDecorator(`names[${k.unlkey}].firmwareTypeName`, {
                        rules: [{ required: true, message: '请输入名称' }],
                        initialValue: index == 0 ? `${k.type == 1 ? '插件' : '模块'}名称1` : ''
                    })(<Input maxLength={30}/>)}
                </Form.Item>
                <Form.Item
                    label={k.type == 1 ? '插件编号' : '模块编号'}
                    required={true}
                >
                    {
                        index == 0 && k.type == 1 ? <span>0</span> :
                            getFieldDecorator(`names[${k.unlkey}].firmwareTypeNo`,
                                {
                                    rules: [{
                                        required: true, message: '请输入编号', validator: (_, value) => {

                                            if (value) {
                                                if (parseInt(value) != value || value < 1 || value > 100) {
                                                    return false
                                                }

                                                let isContinue = getFieldValue('names').filter((item, index) => {
                                                    if (value == item.firmwareTypeNo) {
                                                        return item
                                                    }
                                                })
                                                if (isContinue.length > 1) {
                                                    return false
                                                } else {
                                                    return true
                                                }
                                            } else {
                                                return false
                                            }

                                        }
                                    }]
                                })
                                (<Input placeholder='请输入1-100的整数字，模块唯一' type='Number' />)
                    }
                </Form.Item>
                {
                    index != 0 && <a onClick={() => { delItem(k.unlkey) }}>删除</a>
                }
            </div>
        ));
        return formItems
    }
    const delItem = (k) => {
        const keys = form.getFieldValue('keys');
        if (keys.length === 1) {
            return;
        }
        form.setFieldsValue({
            keys: keys.filter(key => key.unlkey !== k),
        });
    }
    const addItem = () => {
        const keys = form.getFieldValue('keys');
        if (keys && keys.length > 4) {
            message.info('最多添加5个')
            return
        }
        unlkey++
        const nextKeys = keys.concat({ unlkey, type: form.getFieldValue('mode') });
        form.setFieldsValue({
            keys: nextKeys,
        });
    }
    const checkChange = val => {
        console.log(val.target.value)
        setIsPass(val.target.value)
    }
    //提交
    const subFata = () => {
        console.log(getFieldsValue())
        validateFields((err, values) => {
            if (!err) {
                const { names, keys } = values;
                // if (status === 3) {
                //     let params1 = {
                //         status: status,
                //         id: actionData.id,
                //     }
                //     relData(params1).then(res => {
                //         if (res.data.code === 0) {
                //             message.success('审核成功')
                //             handleOk()
                //         }
                //     })
                //     return
                // }
                if (!names || !names.length) {
                    message.info('至少添加一个模组/固件')
                    return
                }
                let arr = []
                let data = names.filter(item => {
                    if (item) {
                        return item
                    }
                })
                data.forEach((item, index) => {
                    arr.push({
                        deviceVersionType: keys[index].type,
                        firmwareTypeNo: item.firmwareTypeNo || 0,
                        firmwareTypeName: item.firmwareTypeName,
                        productId: actionData.productId,
                        firmwareTypeMark: ''
                    })
                })
                let params = {
                    status: 2,
                    id: actionData.id,
                    productFirmwareTypeList: arr
                }
                relData(params).then(res => {
                    if (res.data.code === 0) {
                        message.success('审核成功')
                        handleOk()
                    }
                })
            }
        });
    }
    return (
        <div >
            <Modal
                title="固件审核"
                visible={checkVisible}
                onOk={subFata}
                onCancel={handleCancel}
                width='600px'
                maskClosable={false}
            >
                <div className='firm-model-wrap'>
                    <Form {...formItemLayout} >
                        {/* <FormItem label="审核结果">
                            {getFieldDecorator('status', { initialValue: 2 })(
                                <Radio.Group buttonStyle="solid" onChange={checkChange}>
                                    <Radio.Button value={2}>通过</Radio.Button>
                                    <Radio.Button value={3}>不通过</Radio.Button>
                                </Radio.Group>
                            )}
                        </FormItem> */}
                        {
                            isPass === 2 && <FormItem label="选择模块" >
                                {getFieldDecorator('mode', { rules: [{ required: true, message: '请选择模块' }], initialValue: 1 })(
                                    <Select style={{ width: '100%' }} >
                                        {
                                            optionArr.map((item, index) => (
                                                <Select.Option key={item.value} value={item.value} label={item.label}>
                                                    {item.label}
                                                </Select.Option>
                                            ))
                                        }
                                    </Select>
                                )}
                            </FormItem>
                        }

                        {
                            isPass === 2 && getDom()
                        }
                        {
                            isPass === 2 && <a onClick={addItem} className='add-btn'>新增</a>
                        }
                    </Form>

                </div>
            </Modal>
        </div>
    )
}

export default Form.create()(PanelMn)