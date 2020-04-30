import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
    list: [],
    pager: {
        totalRows: 0,
        pageIndex: 0
    },
    project: {
        projectId: "",
        projectName: "",
        projectDeviceProductList: [],   // 设备列表
        projectPositionDataModel: {},   // 模型数据
        projectVoiceRobot: {},     // 机器人数据
    },
    replyList: {
        0: [{ sceneId: 0, replyIndex: 0, replyInfo: "主人，您还没有绑定此设备呢，请到APP进行绑定哦。" }],
        1: [{ sceneId: 1, replyIndex: 0, replyInfo: "主人，设备开小差了，请您检查设备电源和网络连接，稍后再试哦。" }],
        2: [{ sceneId: 2, replyIndex: 0, replyInfo: "主人，设备还不支持这个功能。" }],
        3: [{ sceneId: 3, replyIndex: 0, replyInfo: "主人，您设置的值超过我的能力了。" }],
        4: [{ sceneId: 4, replyIndex: 0, replyInfo: "主人，指令没能执行成功。"}],
    },
    deviceList: [], // 设备列表, mac查询后的设备列表
    positionList: [], // 位置模型列表
    summaryList: [],
    deletedDeviceProductList: [],
    projectDeviceProductList: []
})

export default (state = defaultState, action) => {
    switch(action.type){
        case constants.SET_PROJECT_LIST: 
            return state.merge({
                list: action.list,
                pager: action.pager,
            });
        case constants.SET_PROJECT_DETAIL: 
            return state.merge({
                project: action.project
            });    
        case constants.SET_PROJECT_DETAIL_NAME:
            return state.merge({
                project: {...state.getIn(["project"]).toJS(), projectName: action.projectName}
            });
        case constants.SET_PROJECT_DEVICE:
            return state.merge({
                deviceList: action.deviceList
            });
        case constants.SET_PROJECT_DEVICE_LIST:
            return state.merge({
                project: {...state.getIn(["project"]).toJS(), projectDeviceProductList: action.projectDeviceProductList}
            })    
        case constants.SET_PROJECT_POSITION_LIST: 
            return state.merge({
                positionList: action.positionList
            })
        case constants.SET_PROJECT_POSITION:
            return state.merge({
                project: {...state.getIn(["project"]).toJS(), projectPositionDataModel: action.model}
            })
        case constants.SET_PROJECT_ROBOT_ID:
            return state.merge({
                project: {...state.getIn(["project"]).toJS(), projectVoiceRobot: {...state.getIn(["project", "projectVoiceRobot"]).toJS(), robotId: action.value}}
            }) 
        case constants.SET_PROJECT_ROBOT_DESC:
            return state.merge({
                project: {...state.getIn(["project"]).toJS(), projectVoiceRobot: {...state.getIn(["project", "projectVoiceRobot"]).toJS(), robotDesc: action.value}}
            }) 
        case constants.SET_PROJECT_SUMMARY_ID:
            return state.merge({
                project: {...state.getIn(["project"]).toJS(), projectVoiceRobot: {...state.getIn(["project", "projectVoiceRobot"]).toJS(), summaryId: action.value}}
            })    
        case constants.SET_PROJECT_SUMMARY_LIST:
            return state.merge({
                summaryList: action.summaryList
            });
        case constants.SET_PROJECT_REPLY_LIST:
            return state.merge({
                replyList: action.replyList
            });
        case constants.SET_PROJECT_DEL_DEVICE:
            return state.merge({
                deletedDeviceProductList: action.deletedDeviceProductList
            })    
        case constants.CLEAR_PROJECT_DATA:
            return defaultState
        case constants.SET_PROJECT_ADD_DEVICE_LIST:
            return state.merge({
                projectDeviceProductList: action.projectDeviceProductList
            })    
        default: 
            return state
    }
}