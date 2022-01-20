import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Select, notification, message, Modal, Form, Spin } from 'antd';
import { editData, addData, getProduct } from '../../../apis/gateWayMn'
import debounce from 'lodash/debounce';
import './index.less'
const FormItem = Form.Item
const { Option } = Select;
const { Search } = Input;
function fetchData(val) {
    console.log(val, 9999)
}
// fetchUser = debounce(fetchUser, 800);
function Addmodal({ form, addVis, handleCancel, handleOk, modelType, actionData, optionList }) {
    const { getFieldDecorator, validateFields, setFieldsValue, getFieldValue } = form;
    const [productInfo, setProductInfo] = useState({})
    const [productList, setProductList] = useState([])
    const [fetching, setFetching] = useState(false)
    const sundata = () => {
        validateFields().then(val => {
            let params = {}
            params.gatewayType = val.gatewayType
            params.gatewayName = val.gatewayType === 11133 ? 'IOT路由器' : 'ZigBee3.0网关'
            params.productName = productInfo.productName
            params.productCode = productInfo.productCode
            params.brandName = productInfo.brandName
            params.productId = productInfo.productId
            params.productMark = val.productMark
            if (modelType === 'edit') {
                params = {
                    id: actionData.id,
                    productMark: val.productMark
                }
                editData(params).then(res => {
                    if (res.data.code === 0) {
                        message.success('更新成功');
                        handleOk()
                    }
                })
            } else {
                addData(params).then(res => {
                    if (res.data.code === 0) {
                        message.success('新增成功');
                        handleOk()
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
        setProductList([actionData])
        setProductInfo(actionData)
        setFieldsValue({
            gatewayType: actionData.gatewayType,
            productMark: actionData.productMark,
            productId: (actionData.productId).toString(),
        })
    }
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };
    function fetchUser(value) {
        if (!value) {
            return
        }
        let params = {
            productName: value,
        }
        setFetching(true)
        setProductList([])
        getProduct(params).then(res => {
            if (res.data.code === 0) {
                res.data.data.list.forEach(item => {
                    item.productid = item.productId
                })
                setFetching(false)
                setProductList(res.data.data.list || [])
            }
        })
        // console.log('fetching user', value);
        // this.lastFetchId += 1;
        // const fetchId = this.lastFetchId;
        // this.setState({ data: [], fetching: true });
        // fetch('https://randomuser.me/api/?results=5')
        //     .then(response => response.json())
        //     .then(body => {
        //         if (fetchId !== this.lastFetchId) {
        //             // for fetch callback order
        //             return;
        //         }
        //         const data = body.results.map(user => ({
        //             text: `${user.name.first} ${user.name.last}`,
        //             value: user.login.username,
        //         }));
        //         this.setState({ data, fetching: false });
        //     });
    };
    fetchUser = debounce(fetchUser, 800);
    const handleChange = value => {
        let data = productList.find(item => {
            return item.productId == value
        })
        setProductInfo(data)
        setFetching(false)
    };
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
                            {getFieldDecorator('gatewayType', { rules: [{ required: true }] })(
                                <Select disabled={modelType === 'edit' ? true : false}>
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
                            {/* <Search
                                enterButton="搜索"
                                placeholder='请输入产品ID/名称/型号'
                                onSearch={goSearch}
                            /> */}
                            <span>{getFieldValue('gatewayType')}</span>
                            {/* {getFieldDecorator('gatewayType', { rules: [{ required: true }] })(
                                <Input style={{ width: '100%' }} readOnly ></Input>
                            )} */}
                        </FormItem>
                        <FormItem label="产品名称">
                            {getFieldDecorator('productId', { rules: [{ required: true }] })(
                                // <Select  showSearch  filterOption={false} onSearch={fetchUser} notFoundContent={fetching ? <Spin size="small" /> : null}>
                                //     {
                                //         productList.map((item, index) => (
                                //             <Select.Option key={item.productid} productId={item.productid} label={item.productName}>
                                //                 {item.productName}
                                //             </Select.Option>
                                //         ))
                                //     }
                                // </Select>
                                <Select
                                    disabled={modelType === 'edit' ? true : false}
                                    showSearch
                                    placeholder="输入产品名称"
                                    notFoundContent={fetching ? <Spin size="small" /> : null}
                                    filterOption={false}
                                    onSearch={fetchUser}
                                    onChange={handleChange}
                                    style={{ width: '100%' }}
                                >
                                    {productList.map(d => (
                                        <Option key={d.productId}>{d.productName}</Option>
                                    ))}
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="产品型号">
                            <span>{productInfo.productCode}</span>
                        </FormItem>
                        <FormItem label="品牌">
                            <span>{productInfo.brandName}</span>
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