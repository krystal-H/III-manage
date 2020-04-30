import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { Card, Button, Tabs, PageHeader, notification  } from 'antd';
import EquipmentDetailInfo from './EquipmentDetailInfo';
import EquipmentDetailTag from './EquipmentDetailTag';
import { getUrlParam,copyTextToClipBoard } from '../../../util/utils.js';

import './equipmentDetail.less';

class EquipmentDetail extends Component {
    state = {
        steps:getUrlParam('step')||'1',
        siteList:[],
    }
    componentDidMount(){
        let deviceId = this.props.match.params.deviceId;
        this.props.getEquipmentInfo({deviceId}).then(() => {
            this.props.getSiteModel().then((res) => {
                if(res.code == 0){
                    this.setState({siteList:res.data});
                }
            });
            this.setState({ loading: false });
        });
    }
    copyText(text) {
        copyTextToClipBoard(text);
    }
    callback = (steps) => {
        this.props.history.replace({
            search: `?step=${steps}`
        })
        this.setState({steps});
    }
    remove = () => {
        this.props.getSiteModel().then((res) => {
            if(res.code == 0){
                this.setState({siteList:res.data});
            }
        });
    }
    render(){
        let deviceId = this.props.match.params.deviceId;
        let {deviceInfoData} = this.props;
        return (
            <div className="equipmentDetail">
                <PageHeader title="数据标签-详情">
                    <Button type="primary" className="btn-back" onClick={() => this.props.history.go(-1)}>返回</Button>
                </PageHeader>
                <Card >
                    <table>
                        <tbody>
                            <tr>
                                <td width='70px'>设备ID：</td>
                                <td width='120px'>{deviceInfoData.deviceUniqueId}</td>
                                <td width='120px'>物理地址：</td>
                                <td width='250px'>{deviceInfoData.deviceMac}</td>
                                <td width='90px'>产品密钥：</td>
                                <td width='300px'>{deviceInfoData.deviceKey}<span className='copy' onClick={this.copyText.bind(this,deviceInfoData.deviceKey)}>复制</span></td>
                            </tr>
                            <tr>
                                <td>产品名：</td>
                                <td title={deviceInfoData.productName}>{deviceInfoData.productName}</td>
                                <td>所属分类：</td>
                                <td title={deviceInfoData.productType}>{deviceInfoData.productType}</td>
                                <td>产品编码：</td>
                                <td>{deviceInfoData.productCode}</td>
                            </tr>
                        </tbody>
                    </table>
                </Card>
                <br/>
                <Card >
                    <Tabs defaultActiveKey={this.state.steps} size="large" onChange={value => this.callback(value)}>
                        <Tabs.TabPane tab="基本信息" key="1">
                           <EquipmentDetailInfo deviceInfoData={deviceInfoData} siteList={this.state.siteList} remove={this.remove}/>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="设备标签" key="2">
                           <EquipmentDetailTag deviceId={deviceId} />
                        </Tabs.TabPane>
                    </Tabs>
                </Card>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    deviceInfoData: state.getIn(['equipment', 'deviceInfoData']).toJS(),
});

const mapDispatchToProps = (dispatch) => ({
    getEquipmentInfo: (id) => {
        return dispatch(actionCreators.getEquipmentInfoFunc(id));
    },
    getSiteModel: (id) => {
        return dispatch(actionCreators.getSiteModelFunc(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentDetail);

