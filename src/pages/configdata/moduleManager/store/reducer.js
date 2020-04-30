import { fromJS } from 'immutable';
import {
    CHANGE_COMMUNICAIONMETHODLIST, CHANGE_NETWORKMETHODLIST, CHANGE_PROTOCOLLIST,
    CHANGE_BRANDIEMS, CHANGE_MODULETYPEITEMS, CHANGE_BINDSCENELIST, CHANGE_VISIBLE,
    CHANGE_MODULEINFO, CHANGE_CUR_API, CHANGE_DATALENGTHLIMITLIST
} from './constants';

const defaultState = fromJS({
    communicationMethodList: [],
    networkMethodList: [],
    protocolList: [],
    brandItems: [],// 模组厂家
    moduleTypeItems: [],// 模组所属库
    bindSceneList: [],
    dataLengthLimitList: [],
    visible: false,
    moduleInfo: {
        historyObj:{},
        buildNewObj:{}
    },
});

const getFile =(fileName,obj,state)=>{
    let url = fileName;
    let name = fileName + 'Name';
    let file ={
        "url": obj[url], status: "done",name: obj[name], uid: 0 + name 
    }
    return file;
}

const buildHistoryObj =(action)=>{
    let obj = action.value;
    let newObj = {
        sourceCode:obj.sourceCode,
        libraryFile:obj.libraryFile,
        burnFile:obj.burnFile,
        readmePdf:obj.readmePdf,
        modulePicture:obj.modulePicture,
        referenceCircuitDiagram:obj.referenceCircuitDiagram,   
    }
    return newObj;
}

export default (state = defaultState, action) => {

    // 数据回填
    if (action.type === CHANGE_COMMUNICAIONMETHODLIST) {
        // set的方法会返回一个全新的对象，不会改变原来的对象
        return state.set('communicationMethodList', fromJS(action.value));
    }
    if (action.type === CHANGE_NETWORKMETHODLIST) {
        return state.set('networkMethodList', fromJS(action.value));
    }
    if (action.type === CHANGE_PROTOCOLLIST) {
        return state.set('protocolList', fromJS(action.value));
    }
    if (action.type === CHANGE_BRANDIEMS) {
        return state.set('brandItems', fromJS(action.value));
    }
    if (action.type === CHANGE_MODULETYPEITEMS) {
        return state.set('moduleTypeItems', fromJS(action.value));
    }
    if (action.type === CHANGE_BINDSCENELIST) {
        return state.set('bindSceneList', fromJS(action.value));
    }
    if (action.type === CHANGE_VISIBLE) {
        return state.set('visible', fromJS(action.value));
    }
    if (action.type === CHANGE_DATALENGTHLIMITLIST) {
        return state.set('dataLengthLimitList', fromJS(action.value));
    }
    if (action.type === CHANGE_MODULEINFO) {
        let zipArr = [];
        if (action.value.sourceCode) {
            let file = getFile("sourceCode",action.value);
            zipArr.push(file);
        }
        let aArr = [];
        if (action.value.libraryFile) {
            let file = getFile("libraryFile",action.value);
            aArr.push(file);
        }
        let binArr = [];
        if (action.value.burnFile) {
            let file = getFile("burnFile",action.value);
            binArr.push(file);
        }
        let pdfArr = [];
        if (action.value.readmePdf) {
            let file = getFile("readmePdf",action.value);
            pdfArr.push(file);
        }
        let picArr = [];
        if (action.value.modulePicture) {
            let file = getFile("modulePicture",action.value);
            picArr.push(file);
        }
        let bandGapArr = [];
        if (action.value.referenceCircuitDiagram) {
            let file = getFile("referenceCircuitDiagram",action.value);
            bandGapArr.push(file);
        }

        let obj = buildHistoryObj(action);
        return state.set('moduleInfo', fromJS(action.value)).setIn(['moduleInfo', 'modulePicture'], fromJS(picArr))
            .setIn(['moduleInfo', 'sourceCode'], fromJS(zipArr)).setIn(['moduleInfo', 'libraryFile'], fromJS(aArr))
            .setIn(['moduleInfo', 'burnFile'], fromJS(binArr)).setIn(['moduleInfo', 'readmePdf'], fromJS(pdfArr))
            .setIn(['moduleInfo', 'referenceCircuitDiagram'], fromJS(bandGapArr)).setIn(['moduleInfo', 'historyObj'], fromJS(obj));
    }

    if (CHANGE_CUR_API) {
        return state.setIn(['moduleInfo', action.key], action.value);
    }
    return state;
}