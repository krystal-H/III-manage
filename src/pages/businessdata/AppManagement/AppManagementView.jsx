import React, { Component } from 'react'
import { Card, Button, Tabs, Icon } from 'antd';
// import ProductDetailInfo from './ProductDetailInfo'
// import ProductDetailService from './ProductDetailService';
import { connect } from 'react-redux'
import { actionCreators } from './store';

import AppLinkProduct from './appLinkProduct'; //移动应用--关联产品
import AppColophon from './appColophon'; //移动应用--版本记录
import AppletLinkProduct from './appletLinkProduct'; //小程序--版本记录 

import * as yanjing from '../../../assets/images/u2778.png';

import './style.less';
const { TabPane} = Tabs;

class AppManagementView extends Component{
    constructor(props){
        super(props);
        this.state={
            activeKey:'1',
            appName:'--',
            appId:'',
            appType:'',
            appInfo:this.props.appInfo, //产品详情

            isShowAppSecret:false, //
        }
    }
    componentDidMount(){
        this.getAppInfo();
    }
    getAppInfo(){
        let {appId} = this.props.match.params;

        this.props.GetAppInfo({appId:appId, version:1.1}).then((res) => {
            this.setState({
                appInfo: this.props.appInfo
            })
          });;
    }
    changeTab(e){
        this.setState({activeKey:e});
    }
    handleShowAppSecret(){
        let isShowAppSecret = this.state.isShowAppSecret;
        this.setState({isShowAppSecret:!isShowAppSecret});
    }
    render(){
        let {activeKey, appInfo, isShowAppSecret} = this.state;

        let {appName, appSecret, appDesc, appIconLow, appType, iosBundleId, androidPkg, appMode} = appInfo;
        /** 
            appType: 0--移动应用， 2--小程序应用
            appMode: 1--开发模式， 2--配置模式
        **/
       let {appId} = this.props.match.params;

        let appTypeText='--', appModeText = '--', packageText='--', appSecretText='--';
        if(appType==0){
            appTypeText='移动应用';
        }else if(appType==2){
            appTypeText='小程序应用';
        }
        if(appMode==1){
            appModeText = '开发模式';
        }else if(appMode==2){
            appModeText = '配置模式';
        }
        if(iosBundleId&&androidPkg){
            packageText = iosBundleId + '、' + androidPkg;
        }else if(iosBundleId&&!androidPkg){
            packageText = iosBundleId;
        }else if(!iosBundleId&&androidPkg){
            packageText = androidPkg;
        }else{
            packageText = '--';
        }

        if(isShowAppSecret&&appSecret){
            appSecretText = appSecret;
        }else if(isShowAppSecret===false&&appSecret){
            appSecretText = appSecret.substring(0, 11)+"**********"+appSecret.substring(20, 32)
        }
        return(
            <div className="Product-view">
                <Card >
                    <Button type="primary" className="btn-back" onClick={() => this.props.history.go(-1)}>返回</Button>
                    <div className="productMessage">
                        <div className="productMessage-left">
                            <div>
                                {appIconLow?<img className="left-img" src={appIconLow} />:<img className="left-img-background"/>}
                            </div>
                            <div className="left-text">
                                <div className="text-IdAndName">
                                    <div style={{width:"70%"}}>
                                        <h3>{appName||'--'}</h3>
                                    </div>
                                    <div style={{width:"30%"}}>
                                        <span>APPID：{appId}</span>
                                    </div>  
                                </div>
                                <div className="text-info">
                                    <div style={{marginTop: "10px"}}>
                                        <span style={{marginRight: "20px"}}>APPSecret：{appSecretText}</span><img style={{width:'14px', cursor: "pointer"}} src={yanjing} onClick={this.handleShowAppSecret.bind(this)}/>
                                    </div>
                                    <div style={{marginTop: "10px"}}>
                                        <span>{appDesc}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="productMessage-right">
                            <p><span>应用类型：</span>{appTypeText}</p>
                            <p><span>应用包名：</span>{packageText}</p>
                            <p><span>构建模式：</span>{appModeText}</p>
                        </div>
                    </div>
                    {appType==0?<Tabs activeKey={activeKey} size="large" onChange={this.changeTab.bind(this)}>
                        <TabPane tab="关联产品" key="1">
                        <AppLinkProduct appId={appId} appType={appType}/>
                        </TabPane>
                        <TabPane tab="版本记录" key="2">
                        <AppColophon appId={appId} />
                        </TabPane>
                    </Tabs>:<Tabs activeKey={activeKey} size="large">
                        <TabPane tab="关联产品" key="1">
                        <AppletLinkProduct appId={appId} appType={appType}/>
                        </TabPane>
                    </Tabs>}
                    
                </Card>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    appInfo: state.getIn(["appManagement","appInfo"]).toJS(),

  })
  
  const mapDispatchToProps = (dispatch) => ({
    GetAppInfo: (data)=>{
      return dispatch(actionCreators.GetAppInfo(data))
    },
  })
export default connect(mapStateToProps, mapDispatchToProps)(AppManagementView);
