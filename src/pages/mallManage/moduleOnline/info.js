import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Input, message, Select, Form, Button, InputNumber, Spin } from 'antd';
import Wangeditor from '../../../components/WangEdit';
import { getDetailByIdApi, publicCommodityApi, getDetailApi } from '../../../apis/mallProduct'
import { searchModuleRequest, getParentIdRequest, getModuleListRequest, saveModuleInfoRequest } from '../../../apis/mallManage'
import { getList } from '../../../apis/mallClassify'
import UploadCom from '../../../components/uploadCom/index'
import debounce from 'lodash/debounce'
import './index.scss'
const FormItem = Form.Item
const Option = Select.Option

function Addmodal({ form, history, editData = {} }) {
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

    const [resData, setResData] = useState([]) // 接口返回下拉查询数据
    const [fetching, setFetching] = useState(false)
    const [moduleClassify, setModuleClassify] = useState([]) // 模组分类列表

    useEffect(() => {
        getParentIdRequest({ classifyLevel: 1 }).then(res => {
            console.log(res, '23333')
            const temp = res.data.data.filter(item => item.classifyName == "通信模组")
            getModuleListRequest({ parentId: temp && temp.length > 0 ? temp[0].id : '' }).then(res => {
                console.log(res, '模组分类')
                setModuleClassify(res.data.data.list || [])
            })
        })

        if (pageInfo.id) {
            renderDom()
        }

    }, [])

    // const renderDom = () => {
    //     getDetailApi(pageInfo.id).then(res => {
    //         if (res.data.code == 0) {
    //             setOriginData(res.data.data)
    //             let obj = {}
    //             let arr = ['salesPolicy', 'commodityStandard']
    //             let fileArr = ['commodityInstructions', 'commodityPicture']
    //             Object.keys(getFieldsValue()).map(item => {
    //                 if (arr.indexOf(item) > -1) {

    //                 } else if (fileArr.indexOf(item) > -1) {
    //                     if (res.data.data[item]) {
    //                         obj[item] = res.data.data[item].split(',').map((url, index) => {
    //                             return { url, uid: index + 1, name: url }
    //                         })
    //                     }

    //                 } else {
    //                     obj[item] = res.data.data[item]
    //                 }
    //             })
    //             obj.commodityPrice = obj.commodityPrice / 100
    //             obj.commodityRealPrice = obj.commodityRealPrice / 100
    //             setFieldsValue(obj)
    //             if (obj.commodityPicture) {
    //                 $el1.current.setFileList(obj.commodityPicture)
    //             }
    //             if (obj.commodityInstructions) {
    //                 $el2.current.setFileList(obj.commodityInstructions)
    //             }
    //            
    //             $el4.current.renderText(res.data.data.commodityStandard || '')
    //             $el6.current.renderText(res.data.data.salesPolicy || '')
    //         }
    //     })
    // }
    const sundata = () => {
        validateFields().then(val => {
            console.log('验证后---------------', val)
            let fileArr = ['commodityInstructions', 'commodityPicture']
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
            val.commodityStandard = $el4.current.getText()
            val.salesPolicy = $el6.current.getText()
            if (!val.salesPolicy || !val.commodityStandard) {
                message.info('商品详情或规格参数或售后政策未输入内容')
                return
            }
            if (val.hetModuleTypeName && val.hetModuleTypeName.key) {
                val.moduleId = Number(val.hetModuleTypeName.key)
                val.hetModuleTypeName = val.hetModuleTypeName.label
            }
            if (val.commodityOrderValue) {
                val.commodityOrderValue = Number(val.commodityOrderValue)
            }
            val.commodityPrice = val.commodityPrice * 100
            val.commodityRealPrice = val.commodityRealPrice * 100
            val.status = 3
            // if (Object.keys(originData).length) {
            //     val.status = originData.status
            //     val.id = originData.id
            // }
            let objGroup = moduleClassify.find(item => {
                return item.id == val.commodityClassifyId
            })
            if (!objGroup) {
                setFieldsValue({ commodityClassifyId: '' })
                message.info('模组分类未选择')
                return
            }
            val.commodityClassifyName = objGroup.classifyName
            console.log('提交得数据---', val)
            saveModuleInfoRequest(val).then(res => {
                if (res.data.code == 0) {
                    message.success('上传商品成功')
                    history.push(`/mall/moduleOnline`);
                }
            })

        })
    }
    const goSubdata = () => {
        let hetModuleTypeName = getFieldValue('hetModuleTypeName')
        if (!hetModuleTypeName) {
            message.warn('请选择模组型号')
            return
        }
        sundata()
        // searchModuleRequest({ hetModuleTypeName }).then(res => {
        //     if (res.data.code == 0) {
        //         sundata()
        //     }
        // })
    }
    
    //去列表页
    const goList = () => {
        history.push(`/mall/moduleOnline`);
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

    const checkNumber = (rule, value, callback) => {
        if (value < 0) {
            callback("仅允许输入正整数");
            return;
        }
        callback()
    }

    // 搜索调用接口
    let debounceFetcher = (value) => {
        setFetching(true)
        setResData([])
        if (!value) return
        searchModuleRequest({ hetModuleTypeName: value }).then(res => {
            console.log('dededede', res)
            setFetching(false)
            setResData(res.data.data || [])
        }).catch(() => {
            setFetching(false)
            setResData([])
        })
    }

    debounceFetcher = debounce(debounceFetcher, 800)

    const handleChange = moduleObj => {
        console.log('sasdad', moduleObj)
        const temp = resData.filter(item => item.moduleId == moduleObj.key)
        console.log(temp, '------temp')
        const obj = temp && temp.length > 0 ? temp[0] : {}
        setFieldsValue({
            originalModuleTypeName: obj.originalModuleTypeName,
            sizeThickness: obj.sizeThickness,
            sizeWidth: obj.sizeWidth,
            sizeHeight: obj.sizeHeight,
            brandName: obj.brandName,
            applyScope: obj.applyScope
        })
    }

    return (
        <div>
            <div className='mall-detail-page'>
                <Form autoComplete='off'>
                    <FormItem label="模组型号" className='need-warn-wrap'>
                        {getFieldDecorator('hetModuleTypeName')(
                            <Select style={{ width: 200, marginBottom: 0 }}
                                showSearch
                                labelInValue
                                optionFilterProp="children"
                                placeholder="请选择模组型号"
                                notFoundContent={fetching ? <Spin size="small" /> : null}
                                onSearch={val => debounceFetcher(val)}
                                onChange={handleChange}>
                                {
                                    resData.length > 0 && resData.map(d => {
                                        return <Option key={d.moduleId}>{`${d.hetModuleTypeName}`}</Option>
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>
                    <div className='form-wrap'>
                        <FormItem label="模组IC型号">
                            {getFieldDecorator('originalModuleTypeName', { rules: [{ required: true, message: '请输入' }] })(
                                <Input style={{ width: '200px' }} maxLength={100}></Input>
                            )}
                        </FormItem>
                        <FormItem className="moduleSize need-warn-wrap" label="模组尺寸">
                            <FormItem className='size-style'>
                                {getFieldDecorator("sizeThickness", {
                                    rules: [{ required: true, message: '请输入长' }, { validator: checkNumber }]
                                })(
                                    <InputNumber maxLength={3} max={999} style={{ width: '70px' }} />
                                )}
                            </FormItem>
                            <span>&nbsp;-&nbsp;</span>
                            <FormItem className='size-style'>
                                {getFieldDecorator("sizeWidth", {
                                    initialValue: editData.sizeWidth,
                                    rules: [{ required: true, message: '请输入宽' }, { validator: checkNumber }]
                                })(
                                    <InputNumber maxLength={3} max={999} style={{ width: '70px' }} />
                                )}
                            </FormItem>
                            <span>&nbsp;-&nbsp;</span>
                            <FormItem className='size-style'>
                                {getFieldDecorator("sizeHeight", {
                                    initialValue: editData.sizeHeight,
                                    rules: [{ required: true, message: '请输入高' }, { validator: checkNumber }]
                                })(
                                    <InputNumber maxLength={3} max={999} style={{ width: '70px' }} />
                                )}
                            </FormItem>
                            <br />
                            <span>（长*宽*高 mm）</span>
                        </FormItem>
                        <FormItem label="生产厂商">
                            {getFieldDecorator('brandName', { rules: [{ required: true, message: '请输入' }] })(
                                <Input style={{ width: '200px' }} maxLength={100}></Input>
                            )}
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="适用范围">
                            {getFieldDecorator('applyScope', {
                                rules: [{ required: true, message: '请输入' },
                                { type: 'string', max: 50, message: '上限50个字符长度' }]
                            })(
                                <Input style={{ width: '530px' }}></Input>
                            )}
                        </FormItem>
                    </div>
                    <div className='form-wrap'>
                        <FormItem label="模组分类">
                            {getFieldDecorator('commodityClassifyId', { rules: [{ required: true, message: '请输入' }] })(
                                <Select style={{ width: '200px' }}>
                                    {
                                        moduleClassify.map((item, index) => (
                                            <Select.Option key={item.id} value={item.id} label={item.classifyName}>
                                                {item.classifyName}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            )}
                        </FormItem><FormItem label="模组价格">
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
                        <FormItem label="实时价格" style={{ marginLeft: 37 }}>
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
                    <FormItem label="模组简述">
                        {getFieldDecorator('commodityDescription', {})(
                            <Input style={{ width: '600px' }}></Input>
                        )}
                    </FormItem>
                    <FormItem label="模组照片">
                        {getFieldDecorator('commodityPicture', { rules: [{ required: true, message: '请上传模组图片' }] })(
                            <UploadCom
                                ref={$el1}
                                listType="picture-card"
                                isNotImg={false}
                                maxSize={10} />
                        )}
                    </FormItem>
                    <FormItem label="模组规格书" className='need-warn-wrap'>
                        <Wangeditor divId={'wangedit-product-detail'} ref={$el4} />
                    </FormItem>
                    <FormItem label="技术文档">
                        {getFieldDecorator('commodityInstructions', { rules: [{ required: true, message: '请上传文件' }] })(
                            <UploadCom
                                ref={$el2}
                                maxCount={3}
                                format='.pdf'
                                isNotImg={true}
                                maxSize={20}
                            />
                        )}
                    </FormItem>
                    <FormItem label="售后政策" className='need-warn-wrap'>
                        <Wangeditor divId={'wangedit-product-rule'} ref={$el6} />
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
                <div className='item-label'>模组型号</div>
                <div className='item-text'>{dataInfo.hetModuleTypeName}</div>
            </div>
        </div>
        <div className='item-wrap'>
            <div className='item'>
                <div className='item-label'>模组IC型号：</div>
                <div className='item-text'>{dataInfo.originalModuleTypeName}</div>
            </div>
            <div className='item'>
                <div className='item-label'>模组尺寸：</div>
                <div className='item-text'>{dataInfo.commodityModel}</div>
            </div>
            <div className='item'>
                <div className='item-label'>生产厂商：</div>
                <div className='item-text'>{dataInfo.commodityBrand}</div>
            </div>
        </div>
        <div className='item-wrap'>
            <div className='item'>
                <div className='item-label'>模组分类：</div>
                <div className='item-text'>{dataInfo.commodityClassifyName}</div>
            </div>
            <div className='item'>
                <div className='item-label'>模组价格：</div>
                <div className='item-text'>{dataInfo.commodityPrice / 100}</div>
            </div>
            <div className='item'>
                <div className='item-label'>实时价格：</div>
                <div className='item-text'>{dataInfo.commodityRealPrice / 100}</div>
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
                <div className='item-label'>模组描述：：</div>
                <div className='item-text'>{dataInfo.commodityDescription}</div>
            </div>
        </div>
        <div className='item-wrap'>
            <div className='item'>
                <div className='item-label'>模组照片：</div>
                <div className='item-text item-img'>{getImg(dataInfo.commodityPicture)}</div>
            </div>
        </div>
        <div className='item-wrap'>
            <div className='item'>
                <div className='item-label'>模组规格书：</div>
                <div className='item-text item-wang-text'>{showhtml(dataInfo.commodityStandard)}</div>
            </div>
        </div>
        <div className='item-wrap'>
            <div className='item'>
                <div className='item-label'>技术文档：</div>
                <div className='item-text item-img'>{getFile(dataInfo.commodityInstructions)}</div>
            </div>
        </div>
        <div className='item-wrap'>
            <div className='item'>
                <div className='item-label'>售后政策：</div>
                <div className='item-text item-wang-text'>{showhtml(dataInfo.salesPolicy)}</div>
            </div>
        </div>
    </div>
}