import { fromJS } from 'immutable';
import * as constants from './constants'
import { REQUEST_SUCCESS } from '../../../../config/config';
import * as apis from '../../../../apis/projectManage';
import { notification } from 'antd';

// 获取项目列表
export const getList = (params) => {
    let data = {};
    if(params){
        Object.keys(params).filter(item => params[item] !== "" && params[item] !== undefined).map(inner => data[inner] = params[inner]);
    }
    let [pageIndex, pageRows] = [1, 10]
    return (dispatch) => {
        return apis.getList({pageIndex, pageRows, ...data}).then(res => {
            let result = res.data.data;
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(setList(result));
                return Promise.resolve(result)
            }
        }).catch(err => console.log(err))
    }
}

// 设置项目列表
export const setList = (result) => {
    return {
        type: constants.SET_PROJECT_LIST,
        list: fromJS(result.list),
        pager: fromJS(result.pager)
    }
}

// 删除项目
export const delProject = (projectId) => {
    return (dispatch) => {
        return apis.delProject({projectId}).then(res => {
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                dispatch(getList())
                return Promise.resolve(code)
            }
        }).catch(err => console.log(err))
    }
}

// 获取项目详情
export const getProject = (projectId) => {
    return (dispatch, getState) => {
        return apis.getProject({projectId}).then(res => {
            let code = res.data.code;
            // let data = res.data.data;
            const state = getState().getIn(["projectManage"]).toJS();
            if (code === REQUEST_SUCCESS) {
                // dispatch(setProject(data))

                // 空数据设置默认值
                const data = {};
                Object.keys(res.data.data).map(item => {
                    return data[item] = res.data.data[item] || state.project[item];
                })
                // 设置默认语音回复
                const {projectVoiceRobot} = data;
                const {projectReplyInfoList} = projectVoiceRobot;
                const voices = {};
                projectReplyInfoList && projectReplyInfoList.map(item => {
                    return voices[item.sceneId] = voices[item.sceneId] ? [...voices[item.sceneId], item] : [item]
                })

                // 如果有modelId获取对应的区域列表
                const {modelId} = data.projectPositionDataModel;
                if(modelId){
                    dispatch(getSummaryList(modelId))
                }

                dispatch(setProject(data));
                dispatch(setReplyList({...state.replyList, ...voices}));
                return Promise.resolve(res)
            }
        }).catch(err => console.log(err))
    }
}

// 设置项目详情
export const setProject = (result) => {
    return {
        type: constants.SET_PROJECT_DETAIL,
        project: fromJS(result)
    }
}

// 设置项目名称
export const setProjectName = (projectName) => { 
    return {
        type: constants.SET_PROJECT_DETAIL_NAME,
        projectName
    }
}

// 通过mac地址查询产品
export const getDevice = (params) => {
    return (dispatch) => {
        return apis.getDevice(params).then(res => {
            let code = res.data.code;
            let data = res.data.data;
            if (code === REQUEST_SUCCESS) {
                dispatch(setDevice(data ? [data]: []))
                return Promise.resolve(res)
            }
        }).catch(err => console.log(err))
    }
}

// 设置mac查询设备结果
export const setDevice = (result) => {
    return {
        type: constants.SET_PROJECT_DEVICE,
        deviceList: fromJS(result)
    }
}

// 添加设备
export const addDevice = (products) => {
    return (dispatch, getState) => {
        const addList = getState().getIn(["projectManage", "projectDeviceProductList"]).toJS();
        const projectDeviceProductList = getState().getIn(["projectManage", "project", "projectDeviceProductList"]).toJS();
        let msg = [];
        products = products.filter((item, index) => {
            const flag = projectDeviceProductList.find(inner => inner.macAddress === item.macAddress)
            if(flag){
                msg.push(index+1)
            }
            return !!!flag
        })
        if(msg.length > 0){
            notification.error({
                message: `第 ${msg.join(',')} 条数据与原数据mac地址重复！`,
                duration: 3
            })
        }
        
        dispatch(setAddDevice([...addList, ...products]));
        dispatch(modifyDeviceList([...projectDeviceProductList, ...products]));
        return Promise.resolve()
    }
}

// 修改设备列表
export const modifyDeviceList = (projectDeviceProductList) => {
    return {
        type: constants.SET_PROJECT_DEVICE_LIST,
        projectDeviceProductList: fromJS(projectDeviceProductList)
    }
}

// 删除设备
export const delDevice = (product) => {
    return (dispatch, getState) => {
        const state = getState().getIn(["projectManage"]).toJS();
        let {deletedDeviceProductList, project, projectDeviceProductList} = state;

        if(typeof product.primaryId !== "undefined"){
            deletedDeviceProductList = [...deletedDeviceProductList, product];
            dispatch(setDelDevice(deletedDeviceProductList));
        }else{
            projectDeviceProductList = projectDeviceProductList.filter(item => item.macAddress !== product.macAddress);
            dispatch(setAddDevice(projectDeviceProductList))
        }
        const list = project.projectDeviceProductList.filter(item => item.macAddress !== product.macAddress);
        dispatch(modifyDeviceList(list))
    }
}

// 设置添加设备
export const setAddDevice = (projectDeviceProductList) => {
    return {
        type: constants.SET_PROJECT_ADD_DEVICE_LIST,
        projectDeviceProductList: fromJS(projectDeviceProductList)
    }
}


// 设置删除设备列表
export const setDelDevice = (deletedDeviceProductList) => {
    return {
        type: constants.SET_PROJECT_DEL_DEVICE,
        deletedDeviceProductList
    }
}

// 导入文件查询设备
export const uploadDevice = (file) => {
    return (dispatch) => {
        return apis.uploadFile(file).then(res => {
            let code = res.data.code;
            let data = res.data.data;
            if (code === REQUEST_SUCCESS) {
                dispatch(addDevice(data))
                return Promise.resolve(1)
            }
            return Promise.resolve(0)
        }).catch(err => console.log(err))
    }
}


// 获取所有位置数据模型列表
export const getPositionList = () => {
    return (dispatch) => {
        apis.getPositionList().then(res => {
            let code = res.data.code;
            let data = res.data.data;
            if (code === REQUEST_SUCCESS) {
                dispatch(setPositionList(data))
            }
        }).catch(err => console.log(err))
    }
}

// 设置位置数据模型列表
export const setPositionList = (list) => {
    return {
        type: constants.SET_PROJECT_POSITION_LIST,
        positionList: fromJS(list)
    }
}

// 修改位置数据
export const setPosition = (model) => {
    return {
        type: constants.SET_PROJECT_POSITION,
        model: fromJS(model)
    }
}

// 获取区域列表
export const getSummaryList = (modelId) => {
    return (dispatch, getState) => {
        return apis.getSummaryList({modelId}).then(res => {
            let code = res.data.code;
            let data = res.data.data;
            if (code === REQUEST_SUCCESS) {
                const {project} = getState().getIn(["projectManage"]).toJS();
                const summaryId = project.projectVoiceRobot && project.projectVoiceRobot.summaryId && data.find(item => item.summaryId ===  project.projectVoiceRobot.summaryId) 
                        ?  project.projectVoiceRobot.summaryId : data[0] ? data[0].summaryId : "";
                dispatch(setSummaryList(data))
                dispatch(setProject({...project, projectVoiceRobot: {...project.projectVoiceRobot, summaryId: summaryId || ""}}))
            }
        }).catch(err => console.log(err))
    }
}

//设置区域列表
export const setSummaryList = (summaryList) => {
    return {
        type: constants.SET_PROJECT_SUMMARY_LIST,
        summaryList: fromJS(summaryList)
    }
}


// 修改语音机器人详情
export const setRobotDetail = (name, value) => {
    let type = "";
    if(name === "robotId"){
        type = constants.SET_PROJECT_ROBOT_ID
    }else if(name === "robotDesc"){
        type = constants.SET_PROJECT_ROBOT_DESC
    }else if(name === "summaryId"){
        type = constants.SET_PROJECT_SUMMARY_ID
    }
    return { type, value }
}

// 设置机器人语音回复
export const setReplyList = (replyList) => {
    return {
        type: constants.SET_PROJECT_REPLY_LIST,
        replyList
    }
}

// 保存项目数据
export const saveProject = () => {
    return (dispatch, getState) => {
        const state = getState().getIn(["projectManage"]).toJS();
        const {replyList, project, deletedDeviceProductList, projectDeviceProductList, summaryList} = state;
        const list = Object.keys(replyList).map(item => 
            replyList[item].filter(k => k.replyInfo).map((inner, index) => {
                return {...inner, sceneId: +item, replyIndex: index}
            })
        ).reduce((x, y) => x.concat(y));
        const params = {...project}
        params.projectVoiceRobot.projectReplyInfoList = list;
        // 设备删除添加
        params.deletedDeviceProductList = deletedDeviceProductList.length > 0 ? deletedDeviceProductList.map(item => item.primaryId) : undefined;
        params.projectDeviceProductList = projectDeviceProductList.length > 0 ? projectDeviceProductList : undefined;
        params.projectPositionDataModel = params.projectPositionDataModel.modelId ? params.projectPositionDataModel : undefined
        params.projectVoiceRobot = params.projectVoiceRobot.robotId ? params.projectVoiceRobot : undefined
        if(params.projectVoiceRobot && summaryList && summaryList.length){
            let temp = summaryList.find(item => item.summaryId === params.projectVoiceRobot.summaryId);
            if(temp){
                params.projectVoiceRobot.summaryName = temp.summary;
            }
        }
        
        return apis.saveProject(params).then(res => {
            let code = res.data.code;
            if (code === REQUEST_SUCCESS) {
                return Promise.resolve(1)
            }
            return Promise.resolve(0)
        })    
    }
}


// 清除数据
export const clearData = () => {
    return {
        type: constants.CLEAR_PROJECT_DATA
    }
}

