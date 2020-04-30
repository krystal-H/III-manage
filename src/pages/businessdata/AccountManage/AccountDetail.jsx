import React from 'react';
import { Tabs, Icon, Button } from 'antd';
import SubAccount from './SubAccount';
import ProductInfo from './ProductInfo';
import TitleTab from '../../../components/TitleTab';
import {actionCreators} from './store';
import {connect} from 'react-redux';
import ResetPwd from './ResetPwd';

const { TabPane } = Tabs;

class AccountDetail extends React.Component {
    state = {
        isEdit: false,
        visible: false,
    }

    // 展开 & 收起
    handleTrigger = () => {
        const { isEdit } = this.state;
        this.setState({
            isEdit: !isEdit
        });
    }

    // 编辑
    handleEdit = () => {
        const { id } = this.props.match.params;
        this.props.history.push(`./edit/${id}`);
    }

    // 返回
    handleBack = () => {
        this.props.history.go(-1);
    }

    // 打开重置密码窗口
    handleResetPwd = (userId) => {
        this.setState({
            visible: true,
        });
    }

    // 关闭重置密码窗口
    handleResetCancel = () => {
        this.setState({
            visible: false,
        }, () => {
            this.form.props.form.resetFields();
        });
    }

    // 重置密码
    handleResetSave = (value) => {
        const { password } = value;
        const { id } = this.props.match.params;
        this.props.resetPwd({ password, id }).then(res => {
            if(res){
                this.handleResetCancel();
            }
        });
    }

    componentDidMount() {
        const {province} = this.props;
        if(!!!province.length){
            this.props.getProvince();
        }

        const { id } = this.props.match.params;
        this.props.getAccountDetail(id);
    }

    render() {
        const { isEdit, visible } = this.state;
        const {accountDetail, province} = this.props;
        const {id, email, mobilePhone, createTime, contactAddr, contactPerson, contactPhone} = accountDetail;
        const provinceItem = province.find(item => item.value === accountDetail.province) || {};
        const cityItem = provinceItem.children ? provinceItem.children.find(item => item.value === +accountDetail.city) : {};
        const provinceCity =`${provinceItem.label || accountDetail.province || ''}-${cityItem && cityItem.label ? cityItem.label : accountDetail.city || ''}`;
        return (
            <div className="account-manage" >
                <TitleTab title="用户详情" >
                    <Button type="primary" className="btn-back" onClick={this.handleBack}>返回</Button>
                </TitleTab>
                <div className="account-info-wrap">
                    <div className="account-content info" >
                        <div className={`account-info ${isEdit ? "active" : ""}`}>
                            <div className="account-info-detail ">
                                <h2>基本资料</h2>
                                <div className="account-info-grid">
                                    <p><span className="label">账号ID：</span>{id}</p>
                                    <p><span className="label">电子邮箱：</span>{email}</p>
                                    <p><span className="label">手机号码：</span>{mobilePhone}</p>
                                    <p><span className="label">注册时间：</span>{createTime}</p>
                                    <p><span className="label">密码：</span>******<span className="reset" onClick={this.handleResetPwd}>重置</span></p>
                                </div>
                                <h2>联系信息</h2>
                                <div className="account-info-grid">
                                    <p><span className="label">国家：</span>中国</p>
                                    <p><span className="label">所在地区：</span>{provinceCity}</p>
                                    <p><span className="label">联系人：</span>{contactPerson}</p>
                                    <p><span className="label">联系电话：</span>{contactPhone || ''}</p>
                                </div>
                            </div>
                            <span className="slide-up" onClick={this.handleTrigger}><Icon type={isEdit ? "up" : "down"}/>{isEdit ? "收起" : "展开"}</span>
                            <span className="edit" onClick={this.handleEdit}><Icon type="edit" />编辑</span>
                        </div>
                    </div>

                    <div className="account-content sub">
                        <Tabs defaultActiveKey="1" >
                            <TabPane tab="子账号" key="1">
                                <SubAccount />
                            </TabPane>
                            <TabPane tab="产品信息" key="2">
                                <ProductInfo />
                            </TabPane>
                        </Tabs>
                    </div>
                </div>

                {/* 重置密码 */}
                <ResetPwd visible={visible} onCancel={this.handleResetCancel} onOk={this.handleResetSave} wrappedComponentRef={(form) => this.form = form}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    accountDetail: state.getIn(["accountManage", "accountDetail"]).toJS(),
    province: state.getIn(["accountManage", "province"]).toJS(),
});

const mapDispatchToProps = (dispatch) => ({
    getAccountDetail: (id) => dispatch(actionCreators.getAccountDetail(id)),
    resetPwd: (params) => dispatch(actionCreators.resetPwd(params)),
    getProvince: () => dispatch(actionCreators.getProvince()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetail);