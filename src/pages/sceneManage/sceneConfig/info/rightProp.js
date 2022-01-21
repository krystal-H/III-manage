import React, { useState, useEffect, useContext } from 'react';
import { Tabs, Form, Input, Upload, Icon, Select, Checkbox, Button, InputNumber, message, TimePicker, notification } from 'antd';
import {
    getMenuList, getProductList, getfactorByProduct, getfactor, getAvtiveByProduct, getAIPropsList,
    getRuleLabelList, addRule, getRuleList, getRuleDetail, getActiveProductList, updateActive
} from '../../../../apis/ruleSet'
import { Context } from "./index";
import { cloneDeep, isEqual } from "lodash"
import actionImg from '../../../../assets/images/ruleImage/action.png';
import touchImg from '../../../../assets/images/ruleImage/touch.png';
import userEventImg from '../../../../assets/images/ruleImage/userEvent.png';
import userPropsImg from '../../../../assets/images/ruleImage/userProps.png';
import temperatureImg from '../../../../assets/images/ruleImage/temperature.png';
import humidityImg from '../../../../assets/images/ruleImage/humidity.png';
import weatherImg from '../../../../assets/images/ruleImage/weather.png';
import quarterImg from '../../../../assets/images/ruleImage/quarter.png';
import orImg from '../../../../assets/images/ruleImage/or.png';
import andImg from '../../../../assets/images/ruleImage/and.png';
import pmImg from '../../../../assets/images/ruleImage/pm.png';
import defaultImg from '../../../../assets/images/ruleImage/default.png';
import moment from 'moment';
const { TabPane } = Tabs;
const { TextArea } = Input;
const FormItem = Form.Item
const InputGroup = Input.Group;
const { Option } = Select;
const timeWeek = [{ label: '周一', value: 'MON' },
{ label: '周二', value: 'TUE' },
{ label: '周三', value: 'WED' },
{ label: '周四', value: 'THU' },
{ label: '周五', value: 'FRI' },
{ label: '周六', value: 'SAT' },
{ label: '周日', value: 'SUN' }]
let unlkey = 0
function RightCom({ form }) {
    const { getFieldDecorator, validateFields, getFieldValue, getFieldsValue, setFieldsValue, resetFields } = form;
    const { state, dispatch, wholeScenceId } = useContext(Context);
    const [ruleInfo, setRuleInfo] = useState({})
    const [productList, setProductList] = useState([])//设备触发-产品列表
    const [productList2, setProductList2] = useState([])//设备动作-产品列表
    const [productDom, setProductDom] = useState([])//设备触发的选项
    const [productActiveOP, setProductActiveOP] = useState([])//设备动作的选项
    const [ruleLabel, setRuleLabel] = useState([]) //标签列表
    const [domData, setDomData] = useState({}) //获取条件
    const [isNoting, setIsNoting] = useState(false) //是否立即开启（一个条件都没有）
    const [aiPropsList, setAiPropsList] = useState([]) //ai字段列表
    const [subSceneIndex, setSubSceneIndex] = useState(0)
    // if (state.currentRule === 0) {
    //     return <div></div>
    // }
    const getImg = info => {
        if (info.conditionTypeId == 1) {
            return touchImg
        }
        if (info.conditionTypeName === '用户事件') {
            return userEventImg
        }
        if (info.conditionTypeName === '用户属性') {
            return userPropsImg
        }
        if (info.conditionName === '湿度') {
            return humidityImg
        }
        if (info.conditionName === '温度') {
            return temperatureImg
        }
        if (info.conditionName === '季节') {
            return quarterImg
        }
        if (info.conditionName === '天气') {
            return weatherImg
        }
        if (info.conditionName === 'PM2.5') {
            return pmImg
        }
        return defaultImg
    }
    useEffect(() => {
        //设备触发-产品列表
        getProductList(1).then(res => {
            if (res.data.code === 0) {
                setProductList(res.data.data)
            }
        })
        //设备动作-产品列表
        getActiveProductList({ inoutTypeId: 2 }).then(res => {
            if (res.data.code === 0) {
                setProductList2(res.data.data)
            }
        })
        //获取ai字段
        if (state.wholeInfo.aiId) {
            getAIPropsList(state.wholeInfo.aiId).then(res => {
                if (res.data.code === 0) {
                    let arr = res.data.data.aiOutParamList || []
                    arr.unshift({ key: '无' })
                    setAiPropsList(arr)
                }
            })
        }
        //规则标签
        // let params = {
        //     attributeTagType: 2,
        //     paged: false
        // }
        // getRuleLabelList(params).then(res => {
        //     if (res.data.code === 0) {
        //         let data = res.data.data.map(item => {
        //             return {
        //                 label: item.attributeTagName,
        //                 value: item.attributeTagId
        //             }
        //         })
        //         setRuleLabel(data)
        //     }
        // })
    }, [])
    // useEffect(() => {
    //     dispatch({ type: "saveCheck", payload: getFieldsValue })
    // }, [state.showTab])
    //刷新规则tab
    const refreshRule = () => {
        let params = getFieldsValue()
        params.times = params.times || []
        if (!params.times.length || !params.ruleName) {
            notification.info({
                message: '提示',
                description: '信息不完善',
            });
            return
        }
        for (let key in params) {
            if (typeof params[key] == 'undefined') {
                delete params[key]
            }
        }
        params.sceneId = wholeScenceId
        params.enableTime = params.times.join(',') + ';' + params.timer[0].format('HH:mm') + '-' + params.timer[1].format('HH:mm')
        if (state.currentRule > 0) {
            params.ruleId = state.currentRule
        }
        addRule(params).then(res => {
            if (res.data.code == 0) {
                getRuleList(wholeScenceId).then(res2 => {
                    if (state.currentRule > 0) {
                        notification.success({
                            message: '提示',
                            description: '更新成功',
                        });
                        dispatch({ type: "reRule", payload: res2.data.data })
                    } else {
                        notification.success({
                            message: '提示',
                            description: '新增成功',
                        });
                        dispatch({ type: "addReRule", payload: { list: res2.data.data, id: res.data.data.ruleId } })
                    }

                })
            }
            // dispatch({ type: "reRuleTab", payload: res.data.data.ruleId })
        })
    }
    //保存
    const saveData = () => {
        if (state.theme === 'Tab') {
            refreshRule()
        } else if (state.theme === 'Node') {
            if (state.formDom.nodeType === 1) {
                saveFactor()
            } else if (state.formDom.nodeType === 3) {
                saveActiveData()
            }
        }
    }
    //保存提交节点
    const saveFactor = () => {
        let data = getFieldsValue()

        if (state.formDom.data.conditionTypeId == 1) {
            let productItem = productList.find(item => {
                return item.conditionOptionId = data.conditionOptionId
            })
            data.conditionOptionName = productItem.deviceTypeName

            data.conditionExpression = ''
            let factorSource = productDom.find(item => {
                return item.conditionId == data.conditionId
            })
            data.conditionExpression = factorSource.conditionName
            factorSource.operators.forEach(item => {
                if (item.operatorId == data.operatorId) {
                    data.conditionExpression += item.operatorCode
                }
            })
            if (factorSource.paramStyleId == 1) {
                data.conditionExpression += data.conditionValue
            } else {
                factorSource.queryParams.forEach(item => {
                    if (item.queryParamValue == data.conditionValue) {
                        data.conditionExpression += item.queryParamName
                    }
                })
            }
        } else {
            if (isNoting) {
                let data2 = {
                    conditionExpression: '是',
                    conditionValue: "true",
                    operatorId: 1,
                }
                dispatch({ type: "saveItem", payload: data2 })
                return
            }
            data.conditionExpression = ''
            let factorSource = domData
            data.conditionExpression = factorSource.conditionName
            factorSource.operators.forEach(item => {
                if (item.operatorId == data.operatorId) {
                    data.conditionExpression += item.operatorCode
                }
            })
            if (factorSource.paramStyleId == 1) {
                data.conditionExpression += data.conditionValue
            } else {
                factorSource.queryParams.forEach(item => {
                    if (item.queryParamValue == data.conditionValue) {
                        data.conditionExpression += item.queryParamName
                    }
                })
            }
        }
        dispatch({ type: "saveItem", payload: data })
    }
    //提交设备动作数据
    const saveActiveData = () => {
        let data = getFieldsValue()
        const { names } = data;
        if (!names || !names.length) {
            notification.info({
                message: '提示',
                description: '至少填写一个功能点',
            });
            return
        }
        let arr = []
        let functionList = names.filter(item => {
            if (item) {
                return item
            }
        })
        functionList.forEach((item, index) => {
            let functionParamId
            let listS = productActiveOP.find(item2 => {
                return item2.deviceFunctionId == item.deviceFunctionId
            })
            if (listS.paramStyleId == 1 || item.light != '无') {
                functionParamId = listS.functionParams[0].functionParamId
            } else {
                listS.functionParams.forEach(item3 => {
                    if (item3.functionParamValue == item.actionParamValue) {
                        functionParamId = item3.functionParamId
                    }
                })
            }

            if (item.light == '无') {
                arr.push({
                    actionParamValue: item.actionParamValue,
                    deviceFunctionId: item.deviceFunctionId,
                    functionParamId,
                })
            } else {
                arr.push({
                    deviceFunctionId: item.deviceFunctionId,
                    actionParamValue: 'clifeai,' + state.wholeInfo.aiId + ',' + item.light,
                    functionParamId,
                })
            }

        })
        let params = {
            delayTime: data.delayTime,
            deviceTypeId: data.deviceTypeId,
            factorIds: [],
            factorNames: [],
            ruleId: state.currentRule,
            sceneId: wholeScenceId,
            subSceneIndex,
            actionsItems: arr
        }
        if (state.formDom.data.actionsId) {
            params.actionsId = state.formDom.data.actionsId
        }
        updateActive(params).then(res => {
            if (res.data.code == 0) {
                notification.success({
                    message: '提示',
                    description: '更新设备动作成功',
                });
                dispatch({ type: "saveActive" })
            }
        })
    }
    //设备触发-产品改变
    const productChange = (val) => {
        getfactorByProduct(val).then(res => {
            if (res.data.code === 0) {
                res.data.data.forEach(item => {
                    //兼容设备触发
                    if (item.queryParams.length == 1 && item.queryParams[0].queryParamValue.indexOf(',') > -1) {
                        item.queryParams[0].queryParamValue = item.queryParams[0].queryParamValue.replace('(', '[')
                        item.queryParams[0].queryParamValue = item.queryParams[0].queryParamValue.replace(')', ']')
                    }
                })
                setProductDom(res.data.data)
            }
        })
    }
    useEffect(() => {
        resetFields()
        unlkey = 0
        if (state.currentRule && state.theme === 'Node') {
            if (state.formDom.nodeType === 1) {
                if (state.formDom.data.conditionTypeId != 1) {
                    getfactor(state.formDom.data.conditionOptionId).then(val => {
                        let data = val.data.data.find(item => {
                            return item.conditionId === state.formDom.data.conditionId
                        })
                        setIsNoting(val.data.data.length ? false : true)
                        setDomData(data)
                    })
                    if (state.formDom.conditionExpression) {

                    }
                    setFieldsValue({
                        operatorId: state.formDom.data.operatorId,
                        conditionValue: state.formDom.data.conditionValue,
                    })
                } else {
                    if (state.formDom.data.conditionExpression) {
                        productChange(state.formDom.data.conditionOptionId)
                        setFieldsValue({
                            conditionOptionId: state.formDom.data.conditionOptionId,
                            conditionId: state.formDom.data.conditionId,
                            operatorId: state.formDom.data.operatorId,
                            conditionValue: state.formDom.data.conditionValue,
                        })
                    }


                }
            } else if (state.formDom.nodeType === 3) {
                if (state.formDom.data.actionsId) {
                    let arr1 = [], arr2 = []
                    // arr2.length=1
                    state.formDom.data.actionsItems.forEach(item => {
                        unlkey++
                        arr1.push({ unlkey })
                        if (item.actionParamValue.indexOf('clifeai,') > -1) {
                            arr2.push({
                                deviceFunctionId: item.deviceFunctionId,
                                light: item.actionParamValue.split(',')[2],
                                unlkey
                            })
                        } else {
                            arr2.push({
                                deviceFunctionId: item.deviceFunctionId,
                                actionParamValue: item.actionParamValue,
                                unlkey
                            })
                        }
                        // arr2.push({
                        //     deviceFunctionId: item.deviceFunctionId,
                        //     actionParamValue: item.actionParamValue,
                        //     unlkey
                        // })
                    })
                    // form.setFieldsValue({

                    // });
                    productActiveChange(state.formDom.data.deviceTypeId)
                    setFieldsValue({
                        deviceTypeId: state.formDom.data.deviceTypeId,
                        delayTime: state.formDom.data.delayTime,
                        keys: arr2,
                    })
                }

            }
        }
        if (state.currentRule > 0 && state.theme === 'Tab' && state.activePropsId === -1) {
            getRuleInfo()
        }
    }, [state.activePropsId])
    useEffect(() => {
        resetFields()
        if (state.currentRule > 0 && state.theme === 'Tab') {
            getRuleInfo()
        }
        if (state.currentRule > 0) {
            state.pannelTab.forEach((item, index) => {
                if (item.ruleId == state.currentRule) {
                    setSubSceneIndex(index)
                }
            })
        }
    }, [state.currentRule])
    //获取规则详情
    const getRuleInfo = () => {
        getRuleDetail(state.currentRule).then(res => {
            if (res.data.code == 0) {
                setRuleInfo(res.data.data)
                let data = res.data.data || {}
                let times = data.enableTime.split(';')[0].split(',')
                let timer = data.enableTime.split(';')[1]
                setFieldsValue({
                    ruleName: data.ruleName,
                    summary: data.summary,
                    times,
                    timer,
                })
            }
        })
    }
    //设备动作-产品改变
    const productActiveChange = val => {
        let params = { deviceTypeId: val }
        getAvtiveByProduct(params).then(res => {
            setProductActiveOP(res.data.data)
        })
    }
    const productActiveChange2 = val => {
        let params = { deviceTypeId: val }
        getAvtiveByProduct(params).then(res => {
            setProductActiveOP(res.data.data)
        })
        setFieldsValue({
            keys: []
        })
    }
    //新增功能点
    const addItem = () => {
        const keys = form.getFieldValue('keys');
        if (keys && keys.length > 4) {
            message.info('最多添加5个')
            return
        }
        unlkey++
        const nextKeys = keys.concat({ unlkey });
        form.setFieldsValue({
            keys: nextKeys,
        });
    }
    //删除功能点
    const delItem = (k) => {
        const keys = form.getFieldValue('keys');
        // if (keys.length === 1) {
        //     return;
        // }
        form.setFieldsValue({
            keys: keys.filter(key => key.unlkey !== k),
        });
    }
    //渲染功能点dom
    const getFunctionDom = () => {
        getFieldDecorator('operatorId', {});
        getFieldDecorator('conditionValue', {});
        let data = productDom.find(item => {
            return item.conditionId == getFieldValue('conditionId')
        })
        data = data || {}
        data.operators = data.operators || []
        data.paramStyleId = data.paramStyleId || 1
        data.queryParams = data.queryParams || []
        return <Form.Item style={{ marginBottom: 0 }}>
            <Form.Item
                style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
            >
                {getFieldDecorator('operatorId', {})(
                    <Select>
                        {
                            data.operators.map((item, index) => (
                                <Select.Option key={item.operatorId} value={item.operatorId} label={item.operatorName}>
                                    {item.operatorName}
                                </Select.Option>
                            ))
                        }
                    </Select>
                )}
            </Form.Item>
            <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>-</span>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                {getFieldDecorator('conditionValue')(
                    data.paramStyleId == 1 ?
                        <InputNumber min={data.queryParams.length && JSON.parse(data.queryParams[0].queryParamValue)[0]}
                            max={data.queryParams.length && JSON.parse(data.queryParams[0].queryParamValue)[1]}
                            style={{ width: '100%' }} /> :
                        <Select>
                            {data.queryParams.map((item, index) => (
                                <Select.Option key={item.queryParamValue} value={item.queryParamValue} label={item.queryParamName}>
                                    {item.queryParamName}
                                </Select.Option>
                            ))}
                        </Select>
                )}
            </Form.Item>
        </Form.Item>

    }
    //设备动作，切换条件
    const transClear = (key) => {
        let obj = {}
        obj[key] = ''
        setFieldsValue(obj)
    }
    //设备动作dom
    const getActiveDom = () => {
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (
            <div key={k.unlkey} className='function-item-wrap'>
                <div className='title'>
                    <div>选择功能点</div>
                    <a onClick={() => { delItem(k.unlkey) }}>删除</a>
                </div>
                <Form.Item
                    label='功能字段'

                >
                    {getFieldDecorator(`names[${k.unlkey}].deviceFunctionId`, {
                        initialValue: k.deviceFunctionId ? k.deviceFunctionId + '' : ''
                    })(
                        <Select onChange={() => { transClear(`names[${k.unlkey}].actionParamValue`) }}>
                            {
                                productActiveOP.map((item, index) => (
                                    <Select.Option key={item.deviceFunctionId} value={item.deviceFunctionId + ''} label={item.deviceFunctionName}>
                                        {item.deviceFunctionName}
                                    </Select.Option>
                                ))
                            }
                        </Select>
                    )}
                </Form.Item>
                <Form.Item
                    label='AI字段'
                >
                    {getFieldDecorator(`names[${k.unlkey}].light`, { initialValue: k.light ? k.light + '' : '无' })(
                        <Select>
                            {
                                aiPropsList.map((item, index) => (
                                    <Select.Option key={item.key} value={item.key} label={item.key}>
                                        {item.key}
                                    </Select.Option>
                                ))
                            }
                        </Select>
                    )}
                </Form.Item>
                <Form.Item
                    label='功能参数'
                    style={{ display: getFieldValue(`names[${k.unlkey}].light`) != '无' ? 'none' : 'block' }}
                >
                    {
                        getFieldDecorator(`names[${k.unlkey}].actionParamValue`,
                            { initialValue: k.actionParamValue ? k.actionParamValue + '' : '' })(
                                function () {
                                    let data = productActiveOP.find(item => {
                                        return item.deviceFunctionId == getFieldValue(`names[${k.unlkey}].deviceFunctionId`)
                                    })
                                    console.log(data, '===data', getFieldValue(`names[${k.unlkey}].light`))
                                    data = data || {}
                                    if (getFieldValue(`names[${k.unlkey}].light`) != '无') {
                                        data = {}
                                    }
                                    data.paramStyleId = data.paramStyleId || 1
                                    data.functionParams = data.functionParams || []
                                    if (data.paramStyleId === 1) {
                                        return <InputNumber min={data.functionParams.length && JSON.parse(data.functionParams[0].functionParamValue)[0]}
                                            max={data.functionParams.length && JSON.parse(data.functionParams[0].functionParamValue)[1]} style={{ width: "100%" }} />
                                    } else {
                                        return <Select>
                                            {data.functionParams.map((item, index) => (
                                                <Select.Option key={item.functionParamValue} value={item.functionParamValue} label={item.functionParamName}>
                                                    {item.functionParamName}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    }
                                    return ''
                                }()

                            )
                    }
                </Form.Item>

            </div>
        ));
        return formItems
    }
    //触发条件-非设备
    const factorNoDeviceDom = () => {
        getFieldDecorator('operatorId', {});
        getFieldDecorator('conditionValue', {});
        let domDataCopy = cloneDeep(domData)
        domDataCopy = domDataCopy || {}
        domDataCopy.operators = domDataCopy.operators || []
        domDataCopy.paramStyleId = domDataCopy.paramStyleId || 1
        domDataCopy.queryParams = domDataCopy.queryParams || []
        return <>
            <div className='props-title' style={{ display: isNoting ? 'block' : 'none' }}><img src={defaultImg} /> {state.formDom.data.conditionName}</div>
            <div style={{ display: !isNoting ? 'block' : 'none' }}>
                <div className='props-title'><img src={getImg(domDataCopy)} /> {domDataCopy.conditionName}</div>
                {
                    <Form.Item label={`设置${domDataCopy.conditionName}`} style={{ marginBottom: 0 }}>
                        <Form.Item
                            style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
                        >
                            {getFieldDecorator('operatorId', {})(
                                <Select>
                                    {
                                        domDataCopy.operators.map((item, index) => (
                                            <Select.Option key={item.operatorId} value={item.operatorId} label={item.operatorName}>
                                                {item.operatorName}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            )}

                        </Form.Item>
                        <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>-</span>
                        <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                            {getFieldDecorator('conditionValue')(
                                domDataCopy.paramStyleId == 1 ?
                                    <InputNumber min={domDataCopy.queryParams.length && JSON.parse(domDataCopy.queryParams[0].queryParamValue)[0]}
                                        max={domDataCopy.queryParams.length && JSON.parse(domDataCopy.queryParams[0].queryParamValue)[1]} /> :
                                    <Select>
                                        {domDataCopy.queryParams.map((item, index) => (
                                            <Select.Option key={item.queryParamValue} value={item.queryParamValue} label={item.queryParamName}>
                                                {item.queryParamName}
                                            </Select.Option>
                                        ))}
                                    </Select>
                            )}
                        </Form.Item>
                    </Form.Item>
                }
            </div>
        </>
    }
    //触发条件-设备
    const factorDeviceDom = () => {
        let clearFun = () => {
            setFieldsValue({
                operatorId: '',
                conditionValue: ''
            })
        }
        getFieldDecorator('operatorId', {});
        getFieldDecorator('conditionValue', {});
        return <>
            <div className='props-title'><img src={touchImg} /> 设备触发</div>
            <div>请选择您的产品来完成对设备触发条件的设置</div>
            <Form.Item label='选择产品'>
                {getFieldDecorator('conditionOptionId', {})(
                    <Select onChange={productChange}>
                        {
                            productList.map((item, index) => (
                                <Select.Option key={item.conditionOptionId} value={item.conditionOptionId} label={item.deviceTypeName}>
                                    {item.deviceTypeName}
                                </Select.Option>
                            ))
                        }
                    </Select>
                )}
            </Form.Item>
            <Form.Item label='选择功能点' style={{ marginBottom: '10px' }}>
                <span style={{ display: 'inline-block', width: '70px' }}>功能字段</span>
                <Form.Item style={{ display: 'inline-block', width: 'calc(100% - 70px)' }}>
                    {getFieldDecorator('conditionId', {})(
                        <Select onChange={clearFun}>
                            {
                                productDom.map((item, index) => (
                                    <Select.Option key={item.conditionId} value={item.conditionId} label={item.conditionName}>
                                        {item.conditionName}
                                    </Select.Option>
                                ))
                            }
                        </Select>
                    )}
                </Form.Item>
            </Form.Item>
            {
                getFunctionDom()
            }

        </>
    }
    //规则编辑/新增
    const ruleDom = () => {
        return <>
            <FormItem label="规则名称">
                {getFieldDecorator('ruleName', { rules: [{ required: true, message: '场景名称' }] })(
                    <Input style={{ width: '100%' }} ></Input>
                )}
            </FormItem>
            <FormItem label="规则描述描述">
                {getFieldDecorator('summary', {})(
                    <TextArea style={{ width: '100%' }} ></TextArea>
                )}
            </FormItem>
            {/* <FormItem label="规则标签" >
                {getFieldDecorator('attributeTagIds')(
                    <Checkbox.Group options={ruleLabel} />
                )}
            </FormItem> */}
            <FormItem label="生效日期" >
                {getFieldDecorator('times', { initialValue: ['TUE', 'MON', 'WED', 'FRI', 'THU', 'SAT', 'SUN'] })(
                    <Checkbox.Group options={timeWeek} />
                )}
            </FormItem>
            <FormItem label="生效时间" >
                <Form.Item
                    style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
                >
                    {getFieldDecorator('timer.0', { initialValue: moment('00:00', 'HH:mm') })(<TimePicker format='HH:mm' allowClear={false} />)}
                </Form.Item>
                <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>-</span>
                <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                    {getFieldDecorator('timer.1', { initialValue: moment('23:59', 'HH:mm') })(<TimePicker format='HH:mm' allowClear={false} />)}
                </Form.Item>
            </FormItem>
        </>
    }
    //触发动作
    const activeDom = () => {
        return <>
            <div className='props-title'><img src={actionImg} /> 设备动作</div>
            <div>请选择您的产品来完成对设备动作条件的设置</div>
            <Form.Item label='选择产品'>
                {getFieldDecorator('deviceTypeId', {})(
                    <Select onChange={productActiveChange2}>
                        {
                            productList2.map((item, index) => (
                                <Select.Option key={item.deviceTypeId} value={item.deviceTypeId} label={item.deviceTypeName}>
                                    {item.deviceTypeName}
                                </Select.Option>
                            ))
                        }
                    </Select>
                )}
            </Form.Item>
            {
                getActiveDom()
            }
            <a onClick={addItem} className='add-btn'>新增</a>
            <Form.Item label='延时设置(秒)'>
                {getFieldDecorator('delayTime', {})(
                    <InputNumber style={{ width: '100%' }} min={0} />
                )}
            </Form.Item>
        </>
    }
    //逻辑符
    const renderLogic = () => {
        return <>
            <div className='props-title' ><img src={state.activePropsId == "AND" ? andImg : orImg} /> {state.activePropsId}</div>
            <div>{state.activePropsId === 'AND' ? '逻辑与，当此功能条件左连接的多个触发条件同时满足的时候，会触发此功能条件右连接的动作动作' : '逻辑或，当此功能条件左连接的多个触发条件满足任意一个的时候，会触发此功能条件右连接的动作动作。'}</div>
        </>
    }
    //渲染表单dom
    const getFormDom = () => {
        if (state.theme === 'Tab') {
            return ruleDom()
        } else if (state.theme === 'Node') {
            if (state.formDom.nodeType === 1) {
                if (state.formDom.data.conditionTypeId != 1) {
                    return factorNoDeviceDom()
                } else {
                    return factorDeviceDom()
                }
            } else if (state.formDom.nodeType === 3) {
                return activeDom()
            } else if (state.formDom.nodeType === 2) {
                return renderLogic()
            }
        }
    }

    return (
        <div >
            <div className='content'>
                <div className='tab1'>
                    <Form colon={false}>
                        {
                            getFormDom()
                        }
                        <div className='tab-btn'>
                            <Button type="primary" onClick={saveData}>保存</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}
export default Form.create()(RightCom)