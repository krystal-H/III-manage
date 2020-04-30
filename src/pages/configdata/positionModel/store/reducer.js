import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
    locationModelList: [],
    pager: {
        totalRows: 0,
        pageIndex: 0
    },
    modelDetail: {
        modelId: "",
        modelName: "",
        modelDesc: ""
    },
    model: [],
    modList:[]
})

export default (state = defaultState, action) => {
    switch (action.type) {
        case constants.SET_LOCATION_LIST:
            return state.merge({
                locationModelList: action.list,
                pager: action.pager,
            });
        case constants.SET_LOCATION_DETAIL:
            return state.merge({
                modelDetail: action.modelDetail
            });
        case constants.SET_LOCATION_DETAIL_LIST:
            return state.merge({
                model: action.model
            })
        case constants.RESET_LOCATION_DETIAL:
            return state.merge({
                model: [],
                modelDetail: {
                    modelId: "",
                    modelName: "",
                    modelDesc: ""
                },
            })
        case 'MODLABELLIST':
            console.log('....action.model....',action.model);
            return state.merge({
                modList: action.model
            }) 
        default:
            return state;
    }
}
