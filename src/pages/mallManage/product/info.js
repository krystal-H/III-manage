import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Input, message, Select, Form, Button, InputNumber } from 'antd';
import Wangeditor from '../../../components/WangEdit';
import { getDetailByIdApi, publicCommodityApi, getDetailApi } from '../../../apis/mallProduct'
import { getList } from '../../../apis/mallClassify'
import UploadCom from '../../../components/uploadCom/index'
import './index.scss'
import axios from '../../../util/api.request';
const FormItem = Form.Item

function Addmodal({ form, history }) {
    let pageInfo = useMemo(() => {
        let obj = {}
        let urlinfo = history.location.search
        if (urlinfo) {
            urlinfo.slice(1).split('&&').forEach(item => {
                let arr = item.split('=')
                obj[arr[0]] = arr[1]
            })
        }
        return obj
    }, [])
    if (pageInfo.id && pageInfo.isEdit === 'false') {
        return <ProductInfo id={pageInfo.id} />
    }
    const { getFieldDecorator, validateFields, getFieldValue, setFieldsValue, getFieldsValue } = form;
    const [optionList, setOptionList] = useState([])
    const [originData, setOriginData] = useState({})
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
        if (pageInfo.id) {
            renderDom()
        }

    }, [])
    const renderDom = () => {
        getDetailApi(pageInfo.id).then(res => {
            if (res.data.code == 0) {
                setOriginData(res.data.data)
                let obj = {}
                let arr = ['salesPolicy', 'commodityStandard', 'commodityDetail']
                let fileArr = ['testReport', 'commodityInstructions', 'commodityPicture']
                Object.keys(getFieldsValue()).map(item => {
                    if (arr.indexOf(item) > -1) {

                    } else if (fileArr.indexOf(item) > -1) {
                        if (res.data.data[item]) {
                            obj[item] = res.data.data[item].split(',').map((url, index) => {
                                return { url, uid: index + 1, name: url }
                            })
                        }

                    } else {
                        obj[item] = res.data.data[item]
                    }
                })
                obj.commodityPrice = obj.commodityPrice / 100
                obj.commodityRealPrice = obj.commodityRealPrice / 100
                setFieldsValue(obj)
                if (obj.commodityPicture) {
                    $el1.current.setFileList(obj.commodityPicture)
                }
                if (obj.commodityInstructions) {
                    $el2.current.setFileList(obj.commodityInstructions)
                }
                if (obj.testReport) {
                    $el3.current.setFileList(obj.testReport)
                }
                $el4.current.renderText(res.data.data.commodityDetail || '')
                $el5.current.renderText(res.data.data.commodityStandard || '')
                $el6.current.renderText(res.data.data.salesPolicy || '')
            }
        })
    }
    const sundata = () => {
        validateFields().then(val => {
            let fileArr = ['testReport', 'commodityInstructions', 'commodityPicture']
            fileArr.forEach(item => {
                if (val[item] && val[item].length) {
                    val[item] = val[item].reduce((total, currentValue) => {
                        return total += currentValue.url + ','
                    }, '')
                    val[item] = val[item].slice(0, -1)
                } else {
                    val[item] = ''
                }
            })
            val.commodityDetail = $el4.current.getText()
            val.commodityStandard = $el5.current.getText()
            val.salesPolicy = $el6.current.getText()
            if (!val.salesPolicy || !val.commodityStandard || !val.commodityDetail) {
                message.info('商品详情或规格参数或售后政策未输入内容')
                return
            }
            if (val.productId) {
                val.productId = Number(val.productId)
            }
            if (val.commodityOrderValue) {
                val.commodityOrderValue = Number(val.commodityOrderValue)
            }
            val.commodityPrice = val.commodityPrice * 100
            val.commodityRealPrice = val.commodityRealPrice * 100
            val.status = 3
            if (Object.keys(originData).length) {
                val.status = originData.status
                val.id = originData.id
            }
            let objGroup = optionList.find(item => {
                return item.id == val.commodityClassifyId
            })
            if (!objGroup) {
                setFieldsValue({ commodityClassifyId: '' })
                message.info('商城分类未选择')
                return
            }
            val.commodityClassifyName = objGroup.classifyName
            publicCommodityApi(val).then(res => {
                if (res.data.code == 0) {
                    message.success('上传商品成功')
                    history.push(`/mall/productMn`);
                }
            })

        })
    }
    const goSubdata = () => {
        let id = getFieldValue('productId')
        if (!id) {
            message.info('输入产品id')
            return
        }
        getDetailByIdApi(id).then(res => {
            if (res.data.code == 0) {
                sundata()
            }
        })
    }
    //搜索
    const goSearch = () => {
        let id = getFieldValue('productId')
        if (!id) return
        getDetailByIdApi(id).then(res => {
            if (res.data.code == 0) {
                setFieldsValue({
                    commodityName: res.data.data.commodityName,
                    commodityModel: res.data.data.commodityModel,
                    commodityBrand: res.data.data.commodityBrand,
                })

            } else {
                setFieldsValue({ productId: '' })
            }
        })
    }
    //去列表页
    const goList = () => {
        history.push(`/mall/productMn`);
    }
    // 大于0，且最多2个小数
    // 处理输入框小数点两位问题
    const clearNoNumTwo = (obj) => {
        obj = obj.replace(/[^\d.]/g, ''); //清除“数字”和“.”以外的字符
        obj = obj.replace(/\.{2,}/g, '.'); //只保留第一个. 清除多余的
        obj = obj.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
        obj = obj.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
        if (obj.indexOf('.') < 0 && obj != '') {
            //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
            obj = parseFloat(obj);
        }
        let strObj = obj.toString();
        if (strObj.indexOf('.') > -1 && strObj === '0.00') {
            obj = parseFloat(obj).toFixed(1);
        }
        return obj;
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
                            },
                            rules: [{ required: true, message: '请输入' }]
                        })(
                            <Input style={{ width: '200px' }}></Input>
                        )}
                        <Button type='primary' onClick={goSearch}>搜索</Button>
                    </FormItem>
                    <div className='form-wrap'>
                        <FormItem label="商品名称">
                            {getFieldDecorator('commodityName', { rules: [{ required: true, message: '请输入' }] })(
                                <Input style={{ width: '200px' }} maxLength={100}></Input>
                            )}
                        </FormItem><FormItem label="商品型号">
                            {getFieldDecorator('commodityModel', { rules: [{ required: true, message: '请输入' }] })(
                                <Input style={{ width: '200px' }} maxLength={100}></Input>
                            )}
                        </FormItem><FormItem label="品牌">
                            {getFieldDecorator('commodityBrand', { rules: [{ required: true, message: '请输入' }] })(
                                <Input style={{ width: '200px' }} maxLength={100}></Input>
                            )}
                        </FormItem>
                    </div>
                    <div className='form-wrap'>
                        <FormItem label="商品分类">
                            {getFieldDecorator('commodityClassifyId', { rules: [{ required: true, message: '请输入' }] })(
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
                                rules: [{ required: true, message: '请输入' }],
                                getValueFromEvent: (e) => {
                                    let obj = e.target.value;
                                    return clearNoNumTwo(obj)
                                }
                            })(
                                <Input style={{ width: '200px' }}></Input >
                            )}
                        </FormItem>
                        <FormItem label="实时价格">
                            {getFieldDecorator('commodityRealPrice', {
                                rules: [{ required: true, message: '请输入' }],
                                getValueFromEvent: (e) => {
                                    let obj = e.target.value;
                                    return clearNoNumTwo(obj)
                                }
                            })(
                                <Input style={{ width: '200px' }} ></Input >
                            )}
                        </FormItem>
                    </div>
                    <div className='form-wrap'>
                        <FormItem label="排序值">
                            {getFieldDecorator('commodityOrderValue', {
                                rules: [{ required: true, message: '请输入' }],
                                getValueFromEvent: (e) => {
                                    const val = e.target.value;
                                    return val.replace(/[^\d]/g, '');
                                }
                            })(
                                <Input style={{ width: '200px' }}></Input>
                            )}
                        </FormItem>
                        <FormItem label="负责人">
                            {getFieldDecorator('directorName', { rules: [{ required: true, message: '请输入' }] })(
                                <Input style={{ width: '200px' }} maxLength={20}></Input>
                            )}
                        </FormItem>
                    </div>
                    <FormItem label="商品简述">
                        {getFieldDecorator('commodityDescription', {})(
                            <Input style={{ width: '600px' }}></Input>
                        )}
                    </FormItem>
                    <FormItem label="商品照片">
                        {getFieldDecorator('commodityPicture', { rules: [{ required: true, message: '请上传文件' }] })(
                            <UploadCom
                                ref={$el1}
                                listType="picture-card"
                                maxCount={6}
                                isNotImg={false}
                                maxSize={10} />
                        )}
                    </FormItem>
                    <FormItem label="商品详情" className='need-warn-wrap'>
                        <Wangeditor divId={'wangedit-product-detail'} ref={$el4} />
                    </FormItem>
                    <FormItem label="规格参数" className='need-warn-wrap'>
                        <Wangeditor divId={'wangedit-product-config'} ref={$el5} />
                    </FormItem>
                    <FormItem label="售后政策" className='need-warn-wrap'>
                        <Wangeditor divId={'wangedit-product-rule'} ref={$el6} />
                    </FormItem>
                    <FormItem label="说明书">
                        {getFieldDecorator('commodityInstructions', { rules: [{ required: true, message: '请上传文件' }] })(
                            <UploadCom
                                ref={$el2}
                                maxCount={1}
                                format='.pdf'
                                isNotImg={true}
                                maxSize={10} />
                        )}
                    </FormItem>
                    <FormItem label="测试报告">
                        {getFieldDecorator('testReport', { rules: [{ required: true, message: '请上传文件' }] })(
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
                    <Button type='primary' onClick={goSubdata}>保存</Button>
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
        const a = document.createElement('a')
        const url = item.replace('http', 'https') // 完整的url则直接使用
        // 这里是将url转成blob地址，
        fetch(url).then(res => res.blob()).then(blob => { // 将链接地址字符内容转变成blob地址
            a.href = URL.createObjectURL(blob)
            console.log(a.href)
            a.download = '文件' // 下载文件的名字
            // a.download = url.split('/')[url.split('/').length -1] //  // 下载文件的名字
            document.body.appendChild(a)
            a.click()

            //在资源下载完成后 清除 占用的缓存资源
            window.URL.revokeObjectURL(a.href);
            document.body.removeChild(a);
        })
        // window.open(item)
    }
    const getFile = data => {
        if (data) {
            return data.split(',').map((item, index) => {
                return <a src={item} onClick={() => { downFile(item) }} key={index}>{item}</a>
            })
        }
        return ''
    }
    function showhtml(htmlString) {
        var html = { __html: htmlString };
        return <div dangerouslySetInnerHTML={html}></div>;
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
                <div className='item-text'>{dataInfo.commodityPrice/100}</div>
            </div>
            <div className='item'>
                <div className='item-label'>实时价格：</div>
                <div className='item-text'>{dataInfo.commodityRealPrice/100}</div>
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
                <div className='item-text item-wang-text'>{showhtml(dataInfo.salesPolicy)}</div>
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