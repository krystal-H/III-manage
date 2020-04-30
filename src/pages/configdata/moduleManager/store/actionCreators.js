import {
    CHANGE_COMMUNICAIONMETHODLIST, CHANGE_BRANDIEMS, CHANGE_MODULETYPEITEMS,
    CHANGE_NETWORKMETHODLIST, CHANGE_PROTOCOLLIST, CHANGE_BINDSCENELIST,
    CHANGE_VISIBLE, CHANGE_MODULEINFO, CHANGE_CUR_API, CHANGE_DATALENGTHLIMITLIST
} from './constants.js';

import {
    BindSceneListRequest, GetAllModuleBrandListRequest, GetAllModuleTypeRequest, ModuleInfoRequest, GetModuleTypeMenu, ModuleInfoPreview
} from '../../../../apis/moduleManager.js';

export const communicatonMethodListChangeAcion = (value) => ({
    type: CHANGE_COMMUNICAIONMETHODLIST,
    value: value
})

export const brandItemsChangeAcion = (value) => ({
    type: CHANGE_BRANDIEMS,
    value: value
})

export const dataLengthLimitListChangeAcion = (value) => ({
    type: CHANGE_DATALENGTHLIMITLIST,
    value: value
})

export const moduleTypeItemsChangeAcion = (value) => ({
    type: CHANGE_MODULETYPEITEMS,
    value: value
})

export const networkMethodListChangeAcion = (value) => ({
    type: CHANGE_NETWORKMETHODLIST,
    value: value
})

export const protocolListChangeAcion = (value) => ({
    type: CHANGE_PROTOCOLLIST,
    value: value
})

export const bindSceneListChangeAcion = (value) => ({
    type: CHANGE_BINDSCENELIST,
    value: value
})

export const visibleChangeAcion = (value) => ({
    type: CHANGE_VISIBLE,
    value: value
})

export const moduleInfoChangeAcion = (value) => ({
    type: CHANGE_MODULEINFO,
    value: value
})

export const changeCurApi = (key, value) => {
    return {
        type: CHANGE_CUR_API,
        key,
        value,
    }
};

export const getBindSceneList = () => {
    return (dispatch) => {
        BindSceneListRequest().then(res => {
            let code = res.data.code
            if (code === 0) {
                // console.log("获取绑定场景列表接口成功")
                let data = res.data.data;
                const action = bindSceneListChangeAcion(data);
                dispatch(action);
            }
        })
    }
}

export const getAllModuleBrandList = () => {
    return (dispatch) => {
        GetAllModuleBrandListRequest().then(res => {
            let code = res.data.code
            if (code === 0) {
                // console.log("获取模组厂商列表接口成功")
                let data = res.data.data;
                const action = brandItemsChangeAcion(data);
                dispatch(action);
            }
        })
    }
}

export const getAllModuleTypeList = (params) => {
    return (dispatch) => {
        GetAllModuleTypeRequest(params).then(res => {
            let code = res.data.code
            if (code === 0) {
                // console.log("获取模组所属库列表接口成功")
                let data = res.data.data
                const action = moduleTypeItemsChangeAcion(data);
                dispatch(action);
            }
        })
    }
}

export const getModuleInfo = (moduleId, type) => {
    return (dispatch) => {
        ModuleInfoRequest(moduleId).then(res => {
            let code = res.data.code
            if (code === 0) {
                // console.log("获取模组具体信息接口成功")
                let data = res.data.data
                const moduleInfo = moduleInfoChangeAcion(data)
                if (data.moduleTypeList !== undefined) {
                    dispatch(getAllModuleTypeList(data.moduleTypeList));
                }
                if (type === "view") {
                    const action = visibleChangeAcion(true);
                    dispatch(action);
                }
                dispatch(moduleInfo)
            }
        })
    }
}

export const getModuleTypeMenuAction = (moduleId, type) => {
    return (dispatch) => {
        GetModuleTypeMenu().then(res => {
            let code = res.data.code
            if (code === 0) {
                // console.log("获取模组专用公共菜单接口成功")
                let data = res.data.data
                const communicatonAction = communicatonMethodListChangeAcion(data.moduleTypeList);
                dispatch(communicatonAction);
                const networkMethodAction = networkMethodListChangeAcion(data.networkTypeList);
                dispatch(networkMethodAction);
                const protocolListAction = protocolListChangeAcion(data.supportProtocolList);
                dispatch(protocolListAction);
                const dataLengthLimitListAction = dataLengthLimitListChangeAcion(data.dataLengthLimitList);
                dispatch(dataLengthLimitListAction);
            }
        })
    }
}

export const getModuleInfoPreviewAction = (moduleId, type) => {
    return (dispatch) => {
        ModuleInfoPreview(moduleId).then(res => {
            let code = res.data.code
            if (code === 0) {
                console.log("获得单个模组预览信息")
                let data = res.data.data
                const moduleInfo = moduleInfoChangeAcion(data)
                dispatch(moduleInfo);
                const action = visibleChangeAcion(true);
                dispatch(action);
            }
        })
    }
}


