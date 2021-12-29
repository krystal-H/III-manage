import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Select, notification, message, Modal, Form, Tooltip, DatePicker, Upload, Icon } from 'antd';
import { editData, addData, getProduct } from '../../../apis/gateWayMn'
import './index.less'
const FormItem = Form.Item
const { Search } = Input;
function Addmodal({ form, addVis, handleCancel, handleOk, modelType, actionData, optionList }) {
    const { getFieldDecorator, validateFields, setFieldsValue, getFieldValue } = form;
    const [productInfo, setProductInfo] = useState({})
    const sundata = () => {
        validateFields().then(val => {
            let params = {}
            params.gatewayType = val.gatewayType
            params.gatewayName = val.gatewayType === 1 ? 'IOT路由器' : 'ZigBee3.0网关'
            params.productId = productInfo.productId
            params.productName = productInfo.productName
            params.productCode = productInfo.productCode
            params.brand_code = productInfo.brand_code
            params.productId = productInfo.productId
            params.productMark = val.productMark
            if (modelType === 'edit') {
                editData(params).then(res => {
                    if (res.data.code === 0) {

                    }
                })
            } else {
                addData(params).then(res => {
                    if (res.data.code === 0) {

                    }
                })
            }
        })
    }
    useEffect(() => {
        if (modelType === 'edit') {
            initEditData()
        }
    }, [])
    //编辑初始化
    const initEditData = () => {

    }
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };
    const goSearch = val => {
        let params = {
            pageIndex: 1,
            pageRows: 10,
            productId: val,
            mode: 1,
        }
        setProductInfo({})
        getProduct(params).then(res => {
            if (res.data.code === 0) {
                if (res.data.data.list && res.data.data.list.length) {
                    setProductInfo(res.data.data.list[0])
                }
            }
        })
    }
    return (
        <div>
            <Modal
                title={modelType === 'edit' ? '编辑' : '新增'}
                visible={addVis}
                onOk={sundata}
                onCancel={handleCancel}
                width={'700px'}
                maskClosable={false}
            >
                <div className='gateWay-modal'>
                    <Form {...formItemLayout}>

                        <FormItem label="网关名称">
                            {getFieldDecorator('gatewayType')(
                                <Select>
                                    {
                                        optionList.map((item, index) => (
                                            <Select.Option key={item.value} value={item.value} label={item.label}>
                                                {item.label}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="网关ID">
                            {getFieldDecorator('templateName', { rules: [{ required: true, message: '请输入产品ID/名称/型号' }] })(
                                <Search
                                    enterButton="搜索"
                                    placeholder='请输入产品ID/名称/型号'
                                    onSearch={goSearch}
                                />
                            )}
                        </FormItem>
                        <FormItem label="产品名称">
                            <span>{productInfo.productName}</span>
                        </FormItem>
                        <FormItem label="产品型号">
                            <span>{productInfo.productName}</span>
                        </FormItem>
                        <FormItem label="品牌">
                            <span>{productInfo.productName}</span>
                        </FormItem>
                        <FormItem label="产品ID">
                            <span>{productInfo.productId}</span>
                        </FormItem>
                        <FormItem label="产品标识">
                            {getFieldDecorator('productMark', {})(
                                <Input style={{ width: '100%' }} ></Input>
                            )}
                        </FormItem>
                    </Form>
                </div>
            </Modal>
        </div>
    )

}
export default Form.create()(Addmodal)