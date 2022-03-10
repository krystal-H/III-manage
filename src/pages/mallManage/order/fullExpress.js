import React, { useState, useEffect } from 'react';
import { Card, Input, message, Modal, Form } from 'antd';
import { fillExpressInfo,getExpressInfo } from '../../../apis/mallOrder'
const FormItem = Form.Item
const { TextArea } = Input;
function Expressmodal({ form, infoVis, handleCancel, handleOk,actionData }) {
    const { getFieldDecorator, validateFields, getFieldValue, setFieldsValue} = form;
    useEffect(()=>{
        getExpressInfo(actionData.orderId).then(res=>{
            if(res.data.code===0){
                let data=res.data.data
                setFieldsValue({
                    expressName:data.expressName,
                    expressNo:data.expressNo,
                    remark:data.remark,
                })
            }
        })
    },[])
    const sundata = () => {
        validateFields().then(val => {
            let params={...val,orderId:actionData.orderId}
            fillExpressInfo(params).then(res=>{
                if(res.data.code===0){
                    message.success('提交成功')
                    handleCancel()
                }
            })
        })
    }
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };
    return (
        <div>
            <Modal
                title="快递信息"
                visible={infoVis}
                onOk={sundata}
                onCancel={handleCancel}
                width={'700px'}
            >
                <div className='full-express-modal'>
                    <Form >
                        <div className='content-item'>
                            <div className='item' style={{ marginRight:'20px'}}>
                                <FormItem label="快递公司">
                                    {getFieldDecorator('expressName', { rules: [{ required: true, message: '请输入快递公司' }] })(
                                        <Input style={{ width: '150px' }} ></Input>
                                    )}
                                </FormItem>
                            </div>
                            <div style={{ flex: 1 }}>
                                <FormItem label="快递单号">
                                    {getFieldDecorator('expressNo', { rules: [{ required: true, message: '请输入快递单号' }] })(
                                        <Input style={{ width: '220px' }} ></Input>
                                    )}
                                </FormItem>
                            </div>
                        </div>
                        <div>
                            <FormItem label="订单处理备注">
                                {getFieldDecorator('remark', {})(
                                    <TextArea style={{ width: '100%' }} autosize={{ minRows: 3 }} />
                                )}
                            </FormItem>
                        </div>
                    </Form>
                </div>
            </Modal>
        </div>
    )

}
export default Form.create()(Expressmodal)