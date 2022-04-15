import axios from '../util/api.request'
const prefix = '/expert'
//规则信息详情
export const getsceneDetail = (val) => {
    return axios.request({
        url: prefix + '/scene/getDetail/v2.0?sceneId=' + val,
        method: 'get',
        headers: {
            "Content-Type": "application/json",
        }
    })
}
//获取左边菜单
export const getMenuList = (val) => {
    return axios.request({
        url: prefix + '/scene/condition/option/list/v2.0?conditionTypeId=' + val,
        method: 'get',
        headers: {
            "Content-Type": "application/json",
        }
    })
}
export const getMenuList2 = () => {
    return axios.request({
        url: prefix + '/combine/menus/v2.0',
        method: 'get',
        headers: {
            "Content-Type": "application/json",
        }
    })
}
//全局配置-保存
export const saveGloalInfo = (data) => {
    return axios.request({
        url: prefix + '/scene/addOrUpdate/v2.0',
        method: 'post',
        needFormData: true,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data
    })
}

//获取条件
export const getfactor = (val) => {
    return axios.request({
        url: prefix + '/scene/condition/list/v2.0?conditionOptionId=' + val,
        method: 'get',
        headers: {
            "Content-Type": "application/json",
        }
    })
}
//根据设备动作-触发功能
export const getAvtiveByProduct = (data) => {
    return axios.request({
        url: prefix + '/deviceType/deviceFunction/list/v2.0',
        method: 'post',
        needFormData: true,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data
    })
}

//获取设备触发-产品列表
export const getProductList = (val) => {
    return axios.request({
        url: prefix + '/combine/deviceType/option/v2.0?inoutTypeId=' + val,
        method: 'get',
        headers: {
            "Content-Type": "application/json",
        }
    })
}
//获取设备动作-产品列表
export const getActiveProductList = (params) => {
    return axios.request({
        url: prefix + '/combine/deviceType/action/v2.0',
        method: 'get',
        headers: {
            "Content-Type": "application/json",
        },
        params
    })
}
//获取ai列表
export const getAIList = () => {
    return axios.request({
        url: prefix + '/scene/ai/getPageList/v2.0',
        method: 'get',
        headers: {
            "Content-Type": "application/json",
        }
    })
}
//获取ai字段
export const getAIPropsList = (val) => {
    return axios.request({
        url: prefix + '/scene/ai/getAiAbility/v2.0?aiId=' + val,
        method: 'get',
        headers: {
            "Content-Type": "application/json",
        }
    })
}
//规则列表
export const getRuleList = (val) => {
    let params = {
        paged: false,
        sceneId: val,
    }
    return axios.request({
        url: prefix + '/rule/list',
        method: 'get',
        params,
        headers: {
            "Content-Type": "application/json",
        }
    })
}
//新增规则
export const addRule = (data) => {
    return axios.request({
        url: prefix + '/rule/addOrUpdate',
        method: 'post',
        needFormData: true,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data
    })
}
//获取规则标签
export const getRuleLabelList = (params) => {
    return axios.request({
        url: prefix + '/attributeTag/list/v2.0',
        method: 'get',
        params,
        headers: {
            "Content-Type": "application/json",
        }
    })
}
//关联app列表
export const getAppList = (params) => {
    return axios.request({
        url: prefix + '/scene/appInfo/list/v2.0',
        params,
        method: 'get',
        headers: {
            "Content-Type": "application/json",
        }
    })
}
//设备触发-产品获取条件
export const getfactorByProduct = (val) => {
    return axios.request({
        url: prefix + '/scene/condition/list/v2.0?conditionOptionId=' + val,
        method: 'get',
        headers: {
            "Content-Type": "application/json",
        }
    })
}
//设备动作-获取动作详情-middle-right
export const getActiveInfo = (data) => {
    return axios.request({
        url: prefix + '/scene/actions/list',
        method: 'post',
        needFormData: true,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data
    })
}
//设备条件-条件-middle-left
export const getFatcorInfo = (params) => {
    return axios.request({
        url: prefix + '/scene/condition/instance/list/v2.0',
        method: 'get',
        params,
        headers: {
            "Content-Type": "application/json",
        }
    })
}
//规则信息详情
export const getRuleDetail = (val) => {
    return axios.request({
        url: prefix + '/rule/getDetail?ruleId=' + val,
        method: 'get',
        headers: {
            "Content-Type": "application/json",
        }
    })
}
//新增规则
export const updateActive = (data) => {
    return axios.request({
        url: prefix + '/scene/actions/addOrUpdate',
        method: 'post',
        headers: {
            "Content-Type": "application/json",
        },
        data
    })
}
//保存条件
export const saveFactor = (data) => {
    return axios.request({
        url: prefix + '/scene/condition/instance/addOrUpdate/v2.0',
        method: 'post',
        headers: {
            "Content-Type": "application/json",
        },
        data
    })
}
//删除设备动作
export const delActiveItem = (data) => {
    return axios.request({
        url: prefix + '/scene/actions/delete',
        method: 'post',
        needFormData: true,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data
    })
}
//删除规则
export const delRule = (data) => {
    return axios.request({
        url: prefix + '/rule/delete',
        method: 'post',
        needFormData: true,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data
    })
}
//清空触发条件
export const clearRule = (params) => {
    return axios.request({
        url: prefix + '/scene/condition/instance/delete/v2.0',
        method: 'get',
        headers: {
            "Content-Type": "application/json",
        },
        params
    })
}