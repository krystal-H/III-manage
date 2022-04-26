import React, { useState, useEffect, useContext } from 'react';
import { Tabs, Button, notification, Spin, Icon, Menu, Dropdown, } from 'antd';
import { getActiveInfo, getFatcorInfo, saveFactor, delActiveItem, delRule, getRuleList, clearRule } from '../../../../apis/ruleSet'
import { cloneDeep } from "lodash"
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
import closeImg from '../../../../assets/images/ruleImage/close.png';
const { TabPane } = Tabs;
import { Context } from "./index";
export default function MiddleCom() {
    const { state, dispatch, wholeScenceId } = useContext(Context);
    const [rightData, setRightData] = useState([])
    const [middleData, setMiddleData] = useState([{
        title: 'AND',
        key: '2-and',
    }])
    const [leftData, setLeftData] = useState([])
    const [subSceneIndex, setSubSceneIndex] = useState(0)
    const [loadingPage, setLoadingPage] = useState(false)
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
        getRuleList(wholeScenceId).then(res => {
            if (res.data.code === 0) {
                dispatch({ type: "reRule", payload: res.data.data })
                if (res.data.data.length) {
                    dispatch({ type: "translateTab", payload: res.data.data[0].ruleId })
                } else {
                    setRightData([])
                    setLeftData([])
                }
            }
        })
        dispatch({ type: "callBackEvent" })
    }, [wholeScenceId])
    //改变tab
    const changeCurrent = (val, e) => {
        e.stopPropagation()
        let index = state.pannelTab.findIndex(item => {
            if (item.ruleId < 0) {
                return true
            }
        })
        if (index > -1) {
            notification.info({
                message: '提示',
                description: '请先配置规则基本信息',
            });
            return
        }
        if (val === state.currentRule) {
            return
        }
        dispatch({ type: "translateTab", payload: val })
    }
    //新增
    const newTab = (e) => {
        e.stopPropagation()
        let index = state.pannelTab.findIndex(item => {
            return item.ruleId < 0
        })
        if (index > -1) {
            return
        }
        dispatch({ type: "newTab" })
    }
    //点击节点
    const clickNode = (data, nodeType, index, e) => {
        e.stopPropagation()
        if (state.activePropsId == data.conditionId + '_' + index && nodeType == 1) {
            return
        }
        if (state.activePropsId == data.actionsId + '_' + index && nodeType == 3) {
            return
        }
        if (state.activePropsId == data.title + '_' + index && nodeType == 2) {
            return
        }
        dispatch({ type: "clickNode", payload: { data, nodeType, index } })
    }
    //渲染左边
    const renderDomL = () => {
        return leftData.map((item, index) => {
            return <div className={['item', state.activePropsId == item.conditionId + '_' + index ? 'current-node-light' : ''].join(' ')}
                key={index} onClick={(e) => { clickNode(item, 1, index, e) }}>
                <div className='left'>
                    <img src={getImg(item)} />
                </div>
                <div className='right'>
                    <div>
                        <span>{item.conditionTypeName}：</span>
                        <span>{item.conditionTypeId === 1 ? item.conditionOptionName : item.conditionName}</span>
                    </div>
                    <div>
                        {/* {item.conditionExpression} */}
                        {
                            item.conditionInstanceId ?  item.paramStyleId === 1 ? <span>{item.conditionName+item.operatorName +item.conditionValue}</span> : 
                            <span>{item.conditionName+item.operatorName +item.queryParamName}</span> : ''
                        }
                        {/* {
                            item.conditionName+item.operatorName+item.conditionValue
                        } */}
                        {/* {
                            item.conditionTypeId === 1 ? item.conditionName + item.operatorName + item.queryParamName : 
                            item.conditionName + item.operatorName + item.queryParamName
                        } */}
                        {item.unitCode === '无' ? '' : item.unitCode}
                    </div>
                </div>
                {/* <Icon type="close" className='del-btn' onClick={(e) => { delFactor(index, e) }} /> */}
                <img src={closeImg} className='del-btn' onClick={(e) => { delFactor(index, e) }} />
            </div>
        })

    }
    //删除条件
    const delFactor = (index, e) => {
        e.stopPropagation()
        let arr = cloneDeep(leftData)
        arr.splice(index, 1)
        saveData(arr)
        // dispatch({ type: "overViewRule" })
    }
    //渲染中间
    const renderDomM = () => {
        if (!state.currentRule) {
            return
        }
        return middleData.map((item, index) => {
            return <div className={['item', state.activePropsId == item.title ? 'current-node-light' : ''].join(' ')}
                key={index} onClick={(e) => { clickNode(item, 2, index, e) }}>
                <div className='left'><img src={item.title == "AND" ? andImg : orImg} /></div>
                <div className='right'>
                    <div>逻辑符：</div>
                    <div>{item.title}</div>
                </div>
                {/* <Icon type="close" className='del-btn' onClick={(e) => { delLogic(e) }} /> */}
                {/* <img src={closeImg} className='del-btn' onClick={(e) => { delLogic(e) }} /> */}
            </div>
        })
    }
    // //删除逻辑
    // const delLogic = e => {
    //     e.stopPropagation()
    //     setMiddleData([])
    // }
    //渲染右边
    const renderDomR = () => {
        return rightData.map((item, index) => {
            let text = ''
            if (item.actionsId) {
                item.actionsItems.forEach(item => {
                    if (item.actionParamValue.indexOf('clifeai,') > -1) {
                        text += item.deviceFunctionName + ':' + '关联AI' + ';'
                    } else {
                        if (item.paramStyleId == 1) {
                            text += item.deviceFunctionName + ':' + item.actionParamValue + item.unitCode + ';'
                        } else {
                            text += item.deviceFunctionName + ':' + item.functionParamName + ';'
                        }

                    }

                })
            }
            return <div className={['item', state.activePropsId == item.actionsId + '_' + index ? 'current-node-light' : ''].join(' ')}
                key={index} onClick={(e) => { clickNode(item, 3, index, e) }}>
                <div className='left'><img src={actionImg} /></div>
                <div className='right'>
                    <div>
                        <span>设备动作：</span>
                        <span>{item.deviceTypeName}</span>
                    </div>
                    <div>
                        {text}
                    </div>
                </div>
                {/* <Icon type="close" className='del-btn' onClick={(e) => { delAction(item, index, e) }} /> */}
                <img src={closeImg} className='del-btn' onClick={(e) => { delAction(item, index, e) }} />
            </div>
        })
    }
    //删除设备动作
    const delAction = (data, index, e) => {
        e.stopPropagation()
        if (!data.actionsId) {
            setRightData(pre => {
                let arr = cloneDeep(pre)
                arr.splice(index, 1)
                return arr
            })
            dispatch({ type: "overViewRule" })
            return
        }
        delActiveItem({ actionsId: data.actionsId }).then(res => {
            if (res.data.code == 0) {
                setRightData(pre => {
                    let arr = cloneDeep(pre)
                    arr.splice(index, 1)
                    return arr
                })
                dispatch({ type: "overViewRule" })
                notification.success({
                    message: '提示',
                    description: '删除成功',
                });
            }
        })
    }
    useEffect(() => {
        setRightData([])
        setMiddleData([{
            title: 'AND',
            key: '2-and',
        }])
        setLeftData([])
        if (state.currentRule > 0) {
            let value
            state.pannelTab.forEach((item, index) => {
                if (item.ruleId == state.currentRule) {
                    value = index
                    setSubSceneIndex(index)
                }
            })
            getActive(value)
            getFactor(value)
        }
    }, [state.currentRule])
    const checkIsContinue = () => {
        let check1 = leftData.findIndex(item => {
            if (typeof item.operatorId == 'undefined') {
                return true
            }
        })
        let check2 = rightData.findIndex(item => {
            if (typeof item.actionsId == 'undefined') {
                return true
            }
        })
        let check3 = state.pannelTab.findIndex(item => {
            if (item.ruleId < 0) {
                return true
            }
        })
        if (check1 > -1 || check2 > -1 || check3 > -1) {
            return false
        }
        return true
    }
    const isHasFist=()=>{
        if(leftData.length){
            if(state.nodeInfo.nodeInfo.conditionId === 26 || leftData[0].conditionId === 26 ){
                return false
            }
        }
        return true
    }
    useEffect(() => {
        if (state.currentEvent === 'addNode') {
            let isTrue = checkIsContinue()
            let isContinue=isHasFist()
            if (!isTrue) {
                notification.info({
                    message: '提示',
                    description: '有未完善数据',
                });
                dispatch({ type: "callBackEvent" })
                return
            }
            if(!isContinue){
                notification.info({
                    message: '提示',
                    description: '条件不合理',
                });
                dispatch({ type: "callBackEvent" })
                return
            }
            if (state.nodeInfo.nodeType == 1) {
                setLeftData(pre => {
                    let arr = cloneDeep(pre)
                    arr.push(state.nodeInfo.nodeInfo)
                    return arr
                })
            } else if (state.nodeInfo.nodeType == 2) {
                setMiddleData([state.nodeInfo.nodeInfo])
            } else if (state.nodeInfo.nodeType == 3) {
                setRightData(pre => {
                    let arr = cloneDeep(pre)
                    arr.push(state.nodeInfo.nodeInfo)
                    return arr
                })
            }

        } else if (state.currentEvent === 'saveNode') {
            if (state.formDom.nodeType == 1) {
                subFactorData()
            }
        } else if (state.currentEvent === 'reFreshNode') {
            getActive()
        }else if(state.currentEvent === 'refreshLogic') {
            if(leftData.length !==0){
                saveData(leftData)
            }
            
        }
        dispatch({ type: "callBackEvent" })
    }, [state.currentEvent])
    //提交触发条件
    const subFactorData = () => {
        let arr = cloneDeep(leftData)
        arr.splice(state.formDom.index, 1, state.formDom.data)
        let isCover = leftData.find((item, index) => {
            if (index === state.formDom.index) return false
            if (item.conditionId === state.formDom.data.conditionId && item.conditionOptionId === state.formDom.data.conditionOptionId) {
                return true
            }
            return false
        })
        if (isCover) {
            notification.info({
                message: '提示',
                description: '配置条件有重复',
            });
            return
        }
        saveData(arr)
    }
    //刷新动作卡片
    const getActive = (index) => {
        if (typeof index !== 'number') {
            index = subSceneIndex
        }
        let params = {
            sceneId: wholeScenceId,
            subSceneIndex: index
        }
        dispatch({ type: "overViewRule" })
        getActiveInfo(params).then(res => {
            if (res.data.code === 0) {
                setRightData(res.data.data)
            }
        })
    }
    //获取条件卡片
    const getFactor = (index) => {
        if (typeof index !== 'number') {
            index = subSceneIndex
        }
        let params = {
            sceneId: wholeScenceId,
            subSceneIndex: index
        }
        getFatcorInfo(params).then(res => {
            if (res.data.code === 0) {
                setLeftData(res.data.data)
                if (res.data.data.length && res.data.data.length > 1) {
                    if (res.data.data[0].suffix === "&&") {
                        setMiddleData([{ title: 'AND', key: '2-and' }])
                    } else {
                        setMiddleData([{ title: 'OR', key: '2-or' }])
                    }
                }
            }
        })
    }
    //提交提交数据
    const saveData = (leftData) => {
        if (leftData.length) {
            let arr = []
            if (leftData.length > 1 && middleData.length === 0) {
                if (middleData.length === 0) {
                    notification.info({
                        message: '提示',
                        description: '请选择逻辑符',
                    });
                    return
                }
            }
            // if (leftData.length === 1) {
            //     if (middleData[0].title == 'OR') {
            //         notification.info({
            //             message: '提示',
            //             description: '触发条件只有一个时，逻辑符只能是且',
            //         });
            //         return
            //     }
            // }
            let equivalentConditionId = new Date().getTime()
            let unikeyT = 0
            leftData.forEach((item, index) => {
                unikeyT++
                let obj = {
                    conditionId: item.conditionId,
                    conditionValue: item.conditionValue,
                    conditionIndex: index,
                    ruleId: state.currentRule,
                    sceneId: wholeScenceId,
                    operatorId: item.operatorId,
                    equivalentConditionId: equivalentConditionId + unikeyT,
                    subSceneIndex
                }
                if (index + 1 !== leftData.length && leftData.length > 1) {
                    obj.suffix = middleData[0].title == 'AND' ? '&&' : '||'
                }
                if (item.deviceTypeId) {
                    obj.deviceTypeId = item.deviceTypeId
                }
                arr.push(obj)
            })
            saveFactor(arr).then(res => {
                if (res.data.code === 0) {
                    callBackFn()
                }
            }).finally(r => {
            })
        } else {
            clearRule({
                sceneId: wholeScenceId,
                subSceneIndex
            }).then(res => {
                if (res.data.code === 0) {
                    callBackFn()
                }
            })
        }
        function callBackFn() {
            notification.success({
                message: '提示',
                description: '提交成功',
            });
            getFactor()
            dispatch({ type: "overViewRule" })
        }
    }
    //删除设备动作
    const delTab = (id, e) => {
        e.stopPropagation()
        let index = state.pannelTab.findIndex(item => {
            return item.ruleId == id
        })
        if (id > 0) {
            delRule({ ruleId: id }).then(res => {
                if (res.data.code == 0) {
                    notification.success({
                        message: '提示',
                        description: '删除成功',
                    });
                    dispatch({ type: "delRule", payload: { index, isSame: id == state.currentRule ? true : false } })
                }
            })
        } else {
            notification.success({
                message: '提示',
                description: '删除成功',
            });
            dispatch({ type: "delRule", payload: { index, isSame: id == state.currentRule ? true : false } })
        }

    }
    //
    const lookProps = (e) => {
        e.stopPropagation()
        if (state.currentRule > 0) {
            dispatch({ type: "overViewRule" })
        }
    }
    const menu = () => {
        return <Menu>
            {
                state.pannelTab.map(item => {
                    return <Menu.Item key={item.ruleId}>
                        <div className={[state.currentRule === item.ruleId ? 'tab-item-active' : '', 'tab-item'].join(' ')}
                            key={item.ruleId} onClick={(e) => { changeCurrent(item.ruleId, e) }}>
                            <span title={item.ruleName}>{item.ruleName}</span>
                        </div>
                    </Menu.Item>
                })
            }
        </Menu>
    }
    return (
        <div className='rule-middle'>
            <div className='rule-title'>
                <div className='rule-title-middle'>
                    <div className='wrap'>
                        {
                            state.pannelTab.slice(0, 6).map(item => {
                                return <div className={[state.currentRule === item.ruleId ? 'tab-item-active' : '', 'tab-item'].join(' ')}
                                    key={item.ruleId} onClick={(e) => { changeCurrent(item.ruleId, e) }}>
                                    <span title={item.ruleName}>{item.ruleName}</span>
                                    {/* <Icon type="close" className='del-title-btn' onClick={(e) => { delTab(item.ruleId, e) }} /> */}
                                    <img src={closeImg} className='del-title-btn' onClick={(e) => { delTab(item.ruleId, e) }} />
                                </div>
                            })
                        }
                    </div>
                    <div className='rule-btn-wrap'>
                        <div className='btn-add' onClick={(e) => { newTab(e) }}></div>
                        {/* <div className='btn-save' onClick={e => { saveData(e) }}></div> */}
                        {/* <div className='btn-menu'></div> */}
                        <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
                            <div className='btn-menu'></div>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <div className='middle-content' onClick={(e) => { lookProps(e) }}>
                <div className='conditions'>
                    {
                        renderDomL()
                    }
                </div>
                <div className='logic'>
                    {
                        renderDomM()
                    }
                </div>
                <div className='action'>
                    {
                        renderDomR()
                    }
                </div>
            </div>
        </div>

    )
}
