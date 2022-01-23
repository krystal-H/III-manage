import React, { useState, useEffect, useReducer, useLayoutEffect,useMemo } from 'react';
import RightCom from './right'
import LeftCom from './left'
import MiddleCom from './middle'
import { cloneDeep } from "lodash"
import { Spin } from 'antd';
import { getRuleList } from '../../../../apis/ruleSet'

import { useHistory } from "react-router-dom";
import './index.less'
const initState = {
    sentId: 0,
    pannelTab: [],
    title: '',
    showTab: '1',//全局/属性
    propsId: 0,//左侧当前节点，仅起渲染左菜单作
    activePropsId: 0,//渲染右边form的节点
    theme: '',//主题 当前操作的是规则还是结点
    lastData: {},
    isCheckSave: false,//开启验证
    getFormData: null,//获取form数据的方法
    currentRule: 0,//当前规则
    wholeInfo: {},//全局信息
    formDom: {},
    NodeType: 0,
    relatedAI: 0,
    currentEvent: '',
    nodeInfo: {},
    allFactorInfo: [],
    scenceId: 0
}
// 定义state[业务]处理逻辑 reducer函数
function loginReducer(state2, action) {
    let state = cloneDeep(state2)
    switch (action.type) {
        //显示规则
        case 'overViewRule':
            return {
                ...state,
                theme: 'Tab',
                showTab: '2',
                activePropsId: -1
            }
        //获取场景id
        case 'getSceneID':
            return {
                ...state,
                scenceId: action.payload,
            }
        //事件去除
        case 'callBackEvent':
            return {
                ...state,
                currentEvent: ""
            }
        //刷新规则列表
        case 'reRule':
            return {
                ...state,
                pannelTab: action.payload,
                theme: 'Tab',
            }
        //删除规则列表
        case 'delRule':
            state.pannelTab.splice(action.payload.index, 1)
            if (action.payload.isSame) {
                state.currentRule = 0
            }
            return {
                ...state,
                theme: 'Tab',
                showTab: action.payload.isSame ? '1' : '2'
            }
        //刷新规则列表
        case 'addReRule':
            return {
                ...state,
                pannelTab: action.payload.list,
                theme: 'Tab',
                currentRule: action.payload.id
            }
        //切换规则tab====
        case 'translateTab':
            return {
                ...state,
                theme: 'Tab',
                currentRule: action.payload,
                showTab: '2',
                activePropsId:0
            }
        //更换节点
        case 'changeNode':
            return {
                ...state,
                propsId: action.payload,
            }
        //更改右侧tab
        case 'changeTab':
            return {
                ...state,
                showTab: action.payload,
            }
        //添加规则节点===
        case 'addNode':
            return {
                ...state,
                currentEvent: 'addNode',
                nodeInfo: action.payload
            }
        //点击节点===
        case 'clickNode':
            let activePropsId
            if (action.payload.nodeType == 1) {
                activePropsId = action.payload.data.conditionId + '_' + action.payload.index
            } else if (action.payload.nodeType == 3) {
                activePropsId = action.payload.data.actionsId + '_' + action.payload.index
            } else if (action.payload.nodeType == 2) {
                activePropsId = action.payload.data.title
            }
            return {
                ...state,
                theme: 'Node',
                showTab: '2',
                currentEvent: 'editNode',
                formDom: action.payload,
                activePropsId
            }
        //配置主题
        case 'setNode':
            let data = state.pannelTab.find(item => {
                return item.tabIndex === state.currentRule
            })
            if (action.payload.nodeType === 1) {
                data.content[action.payload.nodeType - 1].push(action.payload)
            }
            return {
                ...state,
                propsId: action.payload.nodeId
            }
        //切换规则节点
        case 'transItem':
            return {
                ...state,
                showTab: '2',
                theme: 'Node',
                formDom: action.payload.formDom,
                propsId: action.payload.nodeId,
            }
        //保存节点 ====
        case 'saveItem':
            state.formDom.data = { ...state.formDom.data, ...action.payload }
            return {
                ...state,
                currentEvent: 'saveNode',
            }
        //刷新设备动作节点 ====
        case 'saveActive':
            return {
                ...state,
                currentEvent: 'reFreshNode',
            }
        //保存全局信息
        case 'saveWhole':
            return {
                ...state,
                wholeInfo: action.payload,
            }
        //新增规则tab=====
        case 'newTab':
            state.pannelTab.push({ ruleName: '规则名称', ruleId: -1 })
            return {
                ...state,
                showTab: '2',
                theme: 'Tab',
                currentRule: -1
            }
        // state.pannelTab.push({ content: [[], [], []], tabIndex: action.payload, info: {} })
        // return {
        //     ...state,
        //     theme: 'Tab',
        //     currentRule: action.payload,
        //     showTab: 2,
        //     propsId: 0
        // }
        //编辑规则tab
        case 'saveTab':
            let index = state.pannelTab.findIndex(item => {
                return item.tabIndex === state.currentRule
            })
            state.pannelTab[index].info = action.payload
            return {
                ...state,
            }

        //获取最新form数据
        case 'saveCheck':
            return {
                ...state,
                getFormData: action.payload,
            }
        default:
            return state;
    }
}
// 定义 context函数
export const Context = React.createContext();

export default function FirmwareMagement(math) {
    const [state, dispatch] = useReducer(loginReducer, initState);
    const [loadingPage, setLoadingPage] = useState(false)
    const wholeScenceId=useMemo(()=>{
        return math.location.pathname.split('/').slice(-1)[0]
    },[])
    if(!wholeScenceId){
        return '无内容'
    }
    // useLayoutEffect(()=>{
    //     dispatch({ type: "getSceneID", payload: 931 })
    //   },[])
    useEffect(() => {
        getRuleList(wholeScenceId).then(res => {
            if (res.data.code == 0) {
                dispatch({ type: "reRule", payload: res.data.data })
                if(res.data.data.length){
                    dispatch({ type: "translateTab", payload: res.data.data[0].ruleId })
                }
            }
        })
    }, [])
    useEffect(() => {
        if (state.activePropsId || state.currentRule) {
            setLoadingPage(true)
            setTimeout(() => {
                setLoadingPage(false)
            }, 1000)
        }
    }, [state.activePropsId, state.currentRule])
    return (
        <div>
            <Spin spinning={loadingPage}>
                <div className='rule-configuration'>
                    <Context.Provider value={{ state, dispatch,wholeScenceId }}>
                        <LeftCom />
                        <MiddleCom />
                        <RightCom />
                    </Context.Provider>
                </div>
            </Spin>
        </div>
    )
}

