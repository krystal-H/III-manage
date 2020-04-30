import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tooltip, Modal, notification, Icon } from 'antd';
import { copyTextToClipBoard,DateTool } from '../../../util/utils.js';
import {Editport} from './Editport';
import {SiteData} from './SiteData';
import { actionCreators } from './store';
// import { uniq } from 'loadsh';
import './equipmentDetailInfo.less';

class EquipmentDetailInfo extends Component{
    state = {
        portVisible:false,//端口编辑窗口
        // siteList:[],//位置模型列表
        modelId:'',
        siteVisible:false,
        siteInfoList:[],//模型详情列表
        positionIds:[],//位置信息名称（每一层elementId用英文字符"-"连接成的组合id）
        editState:false,  
    }
    componentDidMount(){

    }

    copyText = (text)=> {
        copyTextToClipBoard(text);
    }
    //端口确认弹窗
    handleOk = () => {
        let portList = this.editPort.state.portList;
        const {deviceId,productId} = this.props.deviceInfoData;
        let list = [];
        for (let a=0; a<portList.length; a++) {
            let obj = {
                deviceId,
                productId,
                deviceName:portList[a],
                devicePortId:'端口'+(a+1)
            };
            list.push(obj);
        }
        this.props.setPort({json:JSON.stringify(list)}).then((res) => {
            if(res.code == 0){
                this.setState({portVisible:false});
                this.props.getEquipmentInfo({deviceId}).then(() => {});
            }
        });
    }
    //端口取消
    handleCancel = () => {
        this.setState({portVisible:false},()=>{
            this.editPort.dataBackfill();
        });
    }
    //端口打开编辑
    editPortModal = () => {
        if(!this.props.deviceInfoData.bindTime){
            this.notification('暂无绑定设备，无法修改！');
            return;
        }
        this.setState({portVisible:true});
    }
    notification = (str) => {
        notification.open({
            message: str,
            duration: 4,
            icon: <Icon type='smile' rotate={180} style={{ color: '#ea4d2e' }} />,
        });
    }
    //设备位置数据确认
    siteHandleOk = () => {
        let deviceId = this.props.deviceInfoData.deviceId,
        { positionIds, modelId } = this.state;
        positionIds = positionIds.join('-');
        if(!modelId){
            this.notification('请选择位置模型！');
            return ;
        }
        if(!positionIds){
            this.notification('请选择位置模型下的位置信息！');
            return ;
        }
        this.props.setSite({deviceId,positionIds}).then((res) => {
            if(res.code == 0){
                this.props.getEquipmentInfo({deviceId}).then(() => {});
                this.setState({siteVisible:false});
            }
        });
    }
    //设备位置数据取消
    siteHandleCancel = () => {
        //取消操作，回到设备详情原点
        this.setState({siteVisible:false,modelId:'',positionIds:[],editState:false});
    }
    //设备位置数据打开编辑
    editSiteModal = () => {
        if(!this.props.deviceInfoData.bindTime){
            this.notification('暂无绑定设备，无法修改！');
            return ;
        }
        let {siteModelId} = this.props.deviceInfoData;
        if(siteModelId){
            this.getSite(siteModelId,false,true);
        }
        this.setState({siteVisible:true});
    }
    /**
     * 位置模型详情一级列表
     * editState：标记是是否选择位置模型下拉框
     * tag：打开弹框时，在一级下拉加载完之后进行层级下拉加载。
     */
    getSite = (modelId,editState=true,tag) => {
        this.setState({modelId,siteInfoList:[],positionIds:[],editState},()=>{
            this.props.getSite({modelId}).then((res) => {
                if(res.code == 0){
                    let siteInfoList = this.state.siteInfoList;
                    siteInfoList.push(res.data[0]);
                    this.setState({siteInfoList},()=>{
                        if(tag){
                            let {deviceSiteId} = this.props.deviceInfoData;
                            let idList = deviceSiteId&&deviceSiteId.split('-')||[];
                            if(idList.length>0){
                                for(let a=0; a<idList.length; a++){
                                    this.selectSite(idList[a],a);
                                }
                            }
                        }
                    });
                }
            });
        });
    }
    //位置模型详情列表
    selectSite = (elementId,index) => {
        let { siteInfoList, modelId, positionIds } = this.state;
        let {siteModelId} = this.props.deviceInfoData;
        positionIds[index] = elementId;
        this.setState({positionIds},()=>{
            this.props.getSite({modelId:modelId||siteModelId,elementId}).then((res) => {
                if(res.code == 0){
                    if(res.data.length >0){
                        if(siteInfoList[siteInfoList.length-1].elements.length<1){
                            // console.log("siteInfoList ====",siteInfoList);
                            // console.log("res.data ====",res.data);
                            siteInfoList[siteInfoList.length-1] = res.data.length>0?res.data[0]:{summary:{},elements:[]};
                        }else{
                            siteInfoList.push(res.data.length>0?res.data[0]:{summary:{},elements:[]});
                        }
                    }
                    
                    this.setState({siteInfoList});
                }
            });
        });
    }
    render(){
        let { productName, productId, productType, productClass, productCode, deviceKey, deviceUniqueId,
            deviceSecret, deviceMac,activeTime, moduleVersion, gateWay, deviceName, bindUser, pcbVersion,
            bindTime,//绑定时间            
            appReal,//应用
            portInfo,//端口信息
            portNum,//端口总数
            deviceSite,//设备所在位置
            deviceSiteId,//所在位置id(各级间“-”隔开)
            siteModelId
        } = this.props.deviceInfoData;
        let { portVisible, siteVisible, siteInfoList, modelId, editState } = this.state;
        productClass = 1;
        siteModelId = modelId?modelId:siteModelId;
        return (
            <div className="equipmentDetailInfo">
                <div className='tableTitle'>产品基础属性</div>
                <table className='table' cellSpacing="0">
                    <tbody>
                        <tr>
                            <td width='10%' className='gray'>产品名称</td>
                            <td width='15%'>{productName||'--'}</td>
                            <td width='10%' className='gray'>产品ID</td>
                            <td width='15%'>{productId||'--'}</td>
                            <td width='10%' className='gray'>所属分类</td>
                            <td width='15%'>
                                <Tooltip placement="top" title={productType}>
                                    {productType||'--'}
                                </Tooltip>
                            </td>
                        </tr>
                        <tr>
                            <td className='gray'>类型</td>
                            <td>{productClass === 0 ? '普通设备' : productClass === 1 ? '普通设备' : '--'}</td>
                            <td className='gray'>产品编码</td>
                            <td>{productCode||'--'}</td>
                            <td className='gray'>产品密钥</td>
                            <td>
                                <Tooltip placement="top" title={deviceKey}>
                                    {deviceKey||'--'}
                                </Tooltip>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className='tableTitle'>设备基础属性</div>
                <table className='table' cellSpacing="0">
                    <tbody>
                        <tr>
                            <td width='10%' className='gray'>设备编码</td>
                            <td width='15%'>{deviceUniqueId||'--'}</td>
                            <td width='10%' className='gray'>设备密钥</td>
                            <td width='15%'>
                                <Tooltip placement="top" title={deviceSecret}>
                                    {deviceSecret||'--'}<span className='copy' onClick={this.copyText.bind(this,deviceSecret)}>复制</span>
                                </Tooltip>
                            </td>
                            <td width='10%' className='gray'>物理地址</td>
                            <td width='15%'>{deviceMac||'--'}</td>
                        </tr>
                        <tr>
                            <td className='gray'>入网时间</td>
                            <td>{DateTool.utcToDev(activeTime)||'--'}</td>
                            <td className='gray'>模组固件版本</td>
                            <td>{moduleVersion||'--'}</td>
                            <td className='gray'>绑定网关</td>
                            <td>{gateWay||'--'}</td>
                        </tr>
                        {productClass==1?<tr>
                                            <td className='gray'>MCU固件版本</td>
                                            <td>{pcbVersion||'--'}</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        :null
                        }
                    </tbody>
                </table>
                <div className='tableTitle'>应用属性</div>
                <table className='table' cellSpacing="0">
                    <tbody>
                        <tr>
                            <td width='20%' className='gray'>绑定C端账户</td>
                            <td>{bindUser||'--'}</td>
                            <td width='20%' className='gray'>绑定时间</td>
                            <td width='30%'>{bindTime&&DateTool.utcToDev(bindTime)||'--'}</td>
                        </tr>
                        <tr>
                            <td className='gray'>设备昵称</td>
                            <td width='30%'>{deviceName||'--'}</td>
                            <td className='gray'>位置数据</td>
                            <td>
                                {deviceSite||'--'}
                                <Tooltip placement="topRight" title='编辑位置数据'>
                                    <span className='edit' onClick={this.editSiteModal}>...</span>     
                                </Tooltip>
                            </td>
                        </tr>
                        <tr>
                            <td className='gray'>关联应用</td>
                            <td>
                                {/* <Tooltip placement="topRight" title={appReal}> */}
                                    <span title={appReal || ""}>{appReal||'--'}</span>
                                {/* </Tooltip> */}
                            </td>
                            <td className='gray'>端口信息</td>
                            <td>
                                {portInfo||'--'}
                                <Tooltip placement="topRight" title='编辑端口信息'>
                                    <span className='edit' onClick={this.editPortModal}>...</span>     
                                </Tooltip>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Modal
                    title="设备位置数据"
                    visible={siteVisible}
                    onOk={this.siteHandleOk}
                    onCancel={this.siteHandleCancel}
                >
                    <SiteData siteList={this.props.siteList} editState={editState} siteInfoList={siteInfoList} onRef={ref => this.editAffirm  = ref} getSite={this.getSite} selectSite={this.selectSite} siteModelId={siteModelId} deviceSiteId={deviceSiteId} />
                </Modal>
                <Modal
                    title="设备端口信息"
                    visible={portVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Editport portInfo={portInfo} portNum={portNum} onRef={ref => this.editPort  = ref}/>
                </Modal>
            </div> 
        );
    }
}

const mapStateToProps = (state) => ({
    
});

const mapDispatchToProps = (dispatch) => ({
    setPort: (json) => {
        return dispatch(actionCreators.setPortFunc(json));
    },
    getEquipmentInfo: (id) => {
        return dispatch(actionCreators.getEquipmentInfoFunc(id));
    },
    getSite: (data) => {
        return dispatch(actionCreators.getSiteFunc(data));
    },
    setSite: (data) => {
        return dispatch(actionCreators.setSiteFunc(data));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentDetailInfo);