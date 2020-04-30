import { fromJS } from 'immutable';
import { constants } from '.';

const defaultState = fromJS({
    equipmentList: [],
    pager: {
        totalRows: 0,
        pageIndex: 0
    },
    deviceInfoData:{},
    labelList:[],
    labelPager: {
        totalRows: 0,
        pageIndex: 0
    },
    defaultLabel: [],
});

export default (state = defaultState, action) => {
    switch(action.type){
        case constants.SET_EQUIPMENT_LIST:
            return state.merge({
                equipmentList: action.list||[],
                pager: action.pager||{},
            });
        case constants.DEVICE_INFO:
            return state.merge({
                deviceInfoData: action.deviceInfoData
            });
        case constants.LABEL_GET_LIST:
            return state.merge({
                labelList:action.labelList,
            });
        case constants.LABEL_GET_PAGER:
            return state.merge({
                labelPager:action.labelPager,
            });
        case constants.DEFAULT_LABEL_GET_LIST:
            return state.merge({
                defaultLabel: action.list
            })

        default:
            return state;
    }
};

