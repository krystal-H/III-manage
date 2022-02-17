import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Input, message, Select, Form, Button,InputNumber  } from 'antd';
import Wangeditor from '../../../components/WangEdit';
import { getDetailByIdApi, publicCommodityApi, getDetailApi } from '../../../apis/mallProduct'
import { getList } from '../../../apis/mallClassify'
import UploadCom from '../../../components/uploadCom/index'
import './index.scss'
const FormItem = Form.Item

function Addmodal({ form, history }) {
    let id = useMemo(() => {
        let infoId = history.location.pathname.split('/').slice(-1)
        return parseInt(infoId)
    }, [])
    if (!isNaN(id)) {
        return <ProductInfo id={id} />
    }
    const { getFieldDecorator, validateFields, getFieldValue, setFieldsValue } = form;
    const [optionList, setOptionList] = useState([])
    const $el1 = useRef(null)
    const $el2 = useRef(null)
    const $el3 = useRef(null)
    const $el4 = useRef(null)
    const $el5 = useRef(null)
    const $el6 = useRef(null)
    useEffect(() => {
        getList({ pageIndex: 1, pageRows: 1000 }).then(res => {
            if (res.data.code == 0) {
                setOptionList(res.data.data.records)
            }
        })
    }, [])
    const sundata = () => {
        validateFields().then(val => {
            let fileArr = ['testReport', 'commodityInstructions', 'commodityPicture']
            fileArr.forEach(item => {
                if (val[item] && val[item].length) {
                    val[item] = val[item].reduce((total, currentValue) => {
                        return total += currentValue.url+','
                    }, '')
                } else {
                    val[item] = ''
                }
            })
            val.commodityDetail = $el4.current.getText()
            val.commodityStandard = $el5.current.getText()
            val.salesPolicy = $el6.current.getText()
            if (val.productId) {
                val.productId = Number(val.productId)
            }
            if (val.commodityOrderValue) {
                val.commodityOrderValue = Number(val.commodityOrderValue)
            }
            val.status = 3
            if(val.commodityClassifyId){
                let objGroup=optionList.find(item=>{
                    return item.id=val.commodityClassifyId
                })
                val.commodityClassifyName= objGroup.classifyName
            }
            publicCommodityApi(val).then(res => {
                if (res.data.code == 0) {
                    message.success('上传商品成功')
                    history.push(`/mall/productMn`);
                }
            })

        })
    }
    //搜索
    const goSearch = () => {
        let id=getFieldValue('productId')
        if(!id) return
        getDetailByIdApi(id).then(res => {
            if (res.data.code == 0) {
                setFieldsValue({
                    commodityName: res.data.data.commodityName,
                    commodityModel: res.data.data.commodityModel,
                    commodityBrand: res.data.data.commodityBrand,
                })

            }
        })
    }
    //去列表页
    const goList = () => {
        history.push(`/mall/productMn`);
    }
    return (
        <div>
            <div className='mall-detail-page'>
                <Form >
                    <FormItem label="平台产品ID">
                        {getFieldDecorator('productId', {
                            getValueFromEvent: (e) => {
                                const val = e.target.value;
                                return val.replace(/[^\d]/g, '');
                            }
                        })(
                            <Input style={{ width: '200px' }}></Input>
                        )}
                        <Button type='primary' onClick={goSearch}>搜索</Button>
                    </FormItem>
                    <div className='form-wrap'>
                        <FormItem label="商品名称">
                            {getFieldDecorator('commodityName', {})(
                                <Input style={{ width: '200px' }}></Input>
                            )}
                        </FormItem><FormItem label="商品型号">
                            {getFieldDecorator('commodityModel', {})(
                                <Input style={{ width: '200px' }}></Input>
                            )}
                        </FormItem><FormItem label="品牌">
                            {getFieldDecorator('commodityBrand', {})(
                                <Input style={{ width: '200px' }}></Input>
                            )}
                        </FormItem>
                    </div>
                    <div className='form-wrap'>
                        <FormItem label="商品分类">
                            {getFieldDecorator('commodityClassifyId', {})(
                                <Select style={{ width: '200px' }}>
                                    {
                                        optionList.map((item, index) => (
                                            <Select.Option key={item.id} value={item.id} label={item.classifyName}>
                                                {item.classifyName}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            )}
                        </FormItem><FormItem label="商品价格">
                            {getFieldDecorator('commodityPrice', {
                            })(
                                <InputNumber min={0}  style={{ width: '200px' }}></InputNumber >
                            )}
                        </FormItem>
                        <FormItem label="实时价格">
                            {getFieldDecorator('commodityRealPrice', {
                            })(
                                <InputNumber min={0} style={{ width: '200px' }}></InputNumber >
                            )}
                        </FormItem>
                    </div>
                    <div className='form-wrap'>
                        <FormItem label="排序值">
                            {getFieldDecorator('commodityOrderValue', {
                                getValueFromEvent: (e) => {
                                    const val = e.target.value;
                                    return val.replace(/[^\d]/g, '');
                                }
                            })(
                                <Input style={{ width: '200px' }}></Input>
                            )}
                        </FormItem>
                        <FormItem label="负责人">
                            {getFieldDecorator('directorName', {})(
                                <Input style={{ width: '200px' }}></Input>
                            )}
                        </FormItem>
                    </div>
                    <FormItem label="商品简述">
                        {getFieldDecorator('commodityDescription', {})(
                            <Input style={{ width: '600px' }}></Input>
                        )}
                    </FormItem>
                    <FormItem label="商品照片">
                        {getFieldDecorator('commodityPicture', {})(
                            <UploadCom
                                ref={$el1}
                                listType="picture-card"
                                maxCount={6}
                                isNotImg={false}
                                maxSize={10} />
                        )}
                    </FormItem>
                    <FormItem label="商品详情">
                        <Wangeditor divId={'wangedit-product-detail'} ref={$el4} />
                    </FormItem>
                    <FormItem label="规格参数">
                        <Wangeditor divId={'wangedit-product-config'} ref={$el5} />
                    </FormItem>
                    <FormItem label="售后政策">
                        <Wangeditor divId={'wangedit-product-rule'} ref={$el6} />
                    </FormItem>
                    <FormItem label="说明书">
                        {getFieldDecorator('commodityInstructions', {})(
                            <UploadCom
                                ref={$el2}
                                maxCount={1}
                                format='.pdf'
                                isNotImg={true}
                                maxSize={10} />
                        )}
                    </FormItem>
                    <FormItem label="测试报告">
                        {getFieldDecorator('testReport', {})(
                            <UploadCom
                                ref={$el3}
                                maxCount={1}
                                format='.xls,.xlsx'
                                isNotImg={true}
                                maxSize={10} />
                        )}
                    </FormItem>
                </Form>
                <div className='mall-info-footer'>
                    <Button type='primary' onClick={sundata}>保存</Button>
                    <Button onClick={goList}>取消</Button>
                </div>

            </div>
        </div>
    )

}
export default Form.create()(Addmodal)
function ProductInfo({ id }) {
    const [dataInfo, setDataInfo] = useState({})
    useEffect(() => {
        getDetailApi(id).then(res => {
            if (res.data.code == 0) {
                setDataInfo(res.data.data)
            }
        })
    }, [])
    const getImg = (data) => {
        if (data) {
            return data.split(',').map((item, index) => {
                return <img src={item} key={index} />
            })
        }
        return ''
    }
    const downFile = (item) => {
        window.open(item)
    }
    const getFile = data => {
        if (data) {
            return data.split(',').map((item, index) => {
                return <a src={item} onClick={() => { downFile(item) }} key={index}>{item}</a>
            })
        }
        return ''
    }
    function showhtml(htmlString){
        var html = {__html:htmlString};
        return   <div dangerouslySetInnerHTML={html}></div> ;
    }
    return <div className='productInfo-content-page'>
        <div className='item-wrap'>
            <div className='item'>
                <div className='item-label'>平台产品ID：</div>
                <div className='item-text'>{dataInfo.productId}</div>
            </div>
        </div>
        <div className='item-wrap'>
            <div className='item'>
                <div className='item-label'>商品名称：</div>
                <div className='item-text'>{dataInfo.commodityName}</div>
            </div>
            <div className='item'>
                <div className='item-label'>商品型号：</div>
                <div className='item-text'>{dataInfo.commodityModel}</div>
            </div>
            <div className='item'>
                <div className='item-label'>品牌：</div>
                <div className='item-text'>{dataInfo.commodityBrand}</div>
            </div>
        </div>
        <div className='item-wrap'>
            <div className='item'>
                <div className='item-label'>商品分类：</div>
                <div className='item-text'>{dataInfo.commodityClassifyName}</div>
            </div>
            <div className='item'>
                <div className='item-label'>商品价格：</div>
                <div className='item-text'>{dataInfo.commodityPrice}</div>
            </div>
            <div className='item'>
                <div className='item-label'>实时价格：</div>
                <div className='item-text'>{dataInfo.commodityRealPrice}</div>
            </div>
        </div>
        <div className='item-wrap'>
            <div className='item'>
                <div className='item-label'>排序值：</div>
                <div className='item-text'>{dataInfo.commodityOrderValue}</div>
            </div>
            <div className='item'>
                <div className='item-label'>负责人：</div>
                <div className='item-text'>{dataInfo.directorName}</div>
            </div>
        </div>
        <div className='item-wrap'>
            <div className='item'>
                <div className='item-label'>商品简述：</div>
                <div className='item-text'>{dataInfo.commodityDescription}</div>
            </div>
        </div>
        <div className='item-wrap'>
            <div className='item'>
                <div className='item-label'>商品照片：</div>
                <div className='item-text item-img'>{getImg(dataInfo.commodityPicture)}</div>
            </div>
        </div>
        <div className='item-wrap'>
            <div className='item'>
                <div className='item-label'>商品详情：</div>
                <div className='item-text item-wang-text'>{showhtml(dataInfo.commodityDetail)}</div>
            </div>
        </div>
        <div className='item-wrap'>
            <div className='item'>
                <div className='item-label'>规格参数：</div>
                <div className='item-text item-wang-text'>{showhtml(dataInfo.commodityStandard)}</div>
            </div>
        </div>
        <div className='item-wrap'>
            <div className='item'>
                <div className='item-label'>售后政策：</div>
                <div className='item-text item-wang-text'>{ showhtml(dataInfo.salesPolicy)}</div>
            </div>
        </div>
        <div className='item-wrap'>
            <div className='item'>
                <div className='item-label'>说明书：</div>
                <div className='item-text item-img'>{getFile(dataInfo.commodityInstructions)}</div>
            </div>
        </div>
        <div className='item-wrap'>
            <div className='item'>
                <div className='item-label'>测试报告：</div>
                <div className='item-text item-img'>{getFile(dataInfo.testReport)}</div>
            </div>
        </div>
    </div>
}