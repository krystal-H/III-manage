import React, { useState } from 'react';
import { Button, Icon, Input, Tabs, Descriptions } from 'antd';
import TitleTab from '../../../components/TitleTab';
import { Dispatch, bindActionCreators } from 'redux';
import { actionCreators } from './store';
import { connect } from 'react-redux';
import AuthTree from '../../../components/AuthTree';
import { IAuthItem, IAuthList, IUserDetail } from './store/types';

const TabPane = Tabs.TabPane;

// 查看key组件
const VisiableString = ({ value }: { value: string }) => {
    const [visible, setVisible] = useState(false);
    const handleClick = () => {
        setVisible(!visible);
    };

    return (
        value ?
            <div className="visible-string">
                <div style={{ width: 300 }}>
                    {visible ? value : value.slice(0, 5) + Array(value.length - 10).fill('*').join('') + value.slice(-5)}
                </div>
                <div onClick={handleClick} style={{ cursor: "pointer", margin: "0 10px" }}>
                    {
                        visible ? <Icon type="eye" style={{ color: "#1890ff" }} /> : <Icon type="eye-invisible" />
                    }
                </div>
            </div>
            : <div />
    );
};

// 格式化树
const formatTree = (authList: any) => {
    return authList && authList.map((item: IAuthItem) => {
        return {
            id: item.boxId,
            name: (item.boxName || item.groupName || "").split('#')[0],
            children: formatTree(item.subBoxs)
        };
    });
};

interface IProps {
    match: any
    history: any
    authList: IAuthList[]
    target: string[][]
    userDetail: IUserDetail
    getUserDetail: typeof actionCreators.getUserDetail
    getRoleAuth: typeof actionCreators.getRoleAuth
    openModal: typeof actionCreators.openModal
    triggerModal: typeof actionCreators.triggerModal
    setUserDetail: typeof actionCreators.setUserDetail
}

interface IState {
    loading: boolean
}

class UserEdit extends React.Component<IProps, IState> {
    state = {
        loading: false
    }

    // 返回
    handleBack = () => {
        this.props.history.go(-1);
    }

    // 编辑
    handleEdit = () => {
        this.props.triggerModal(true);
    }

    componentDidMount() {
        const { userId } = this.props.match.params;
        this.props.getUserDetail(userId);
        this.props.getRoleAuth(userId);
    }

    componentWillUnmount(){
        this.props.setUserDetail({});
    }

    render() {
        const { authList, target, userDetail } = this.props;
        const { ipWhiteList, userName, roleName, remark, secretKey, secretId, regTime, modifyTime } = userDetail;
        const list = authList.filter(item => item.menuCode !== "hideData");
       
        return (
            <div className="interface-user">
                <TitleTab title={"用户详情"} >
                    <Button type="primary" className="interface-user-edit-btn" onClick={this.handleBack}>返回</Button>
                    {/* <Button type="primary" className="interface-user-edit-btn" style={{ marginRight: 80 }} onClick={this.handleEdit}>编辑</Button> */}
                    <Descriptions>
                        <Descriptions.Item label="用户名">{userName}</Descriptions.Item>
                        <Descriptions.Item label="账户类型">{"接口访问用户"}</Descriptions.Item>
                        <Descriptions.Item label="用户角色">{roleName}</Descriptions.Item>
                        <Descriptions.Item label="创建时间">{regTime}</Descriptions.Item>
                        <Descriptions.Item label="修改时间">{modifyTime}</Descriptions.Item>
                        <Descriptions.Item label="备注">{remark}</Descriptions.Item>
                    </Descriptions>

                </TitleTab>
                <div className="interface-user-content">
                    <h2>用户SecretKey</h2>
                    <div className="interface-user-secret">
                        <div className="secret-header">SecretId</div>
                        <div className="secret-header">SecretKey</div>
                        <div className="secret-header">创建时间</div>
                        <div>{secretId}</div>
                        <div><VisiableString value={secretKey} /></div>
                        <div>{regTime}</div>
                    </div>

                </div>
                <div className="interface-user-content">
                    <h2>IP白名单</h2>
                    <Input.TextArea disabled value={ipWhiteList} style={{ height: 80 }} />
                </div>
                <div className="interface-user-content">
                    <h2>权限信息</h2>
                    <div className={"interface-user-auth"}>
                        { list.length ?
                            <Tabs>
                                {
                                    list.map((item: any, index: number) => (
                                        <TabPane tab={item.menuName} key={item.menuCode}>
                                            <AuthTree dataSource={formatTree(item.checkBoxGroupList)} target={target[index]} isCheck={false} isExpand={true} key={index + ''} />
                                        </TabPane>
                                    )) 
                                }
                            </Tabs> : null
                        }
                    </div>
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state: any) => ({
    userDetail: state.getIn(["interfaceUser", "userDetail"]).toJS(),
    authList: state.getIn(["interfaceUser", "authList"]).toJS(),
    target: state.getIn(["interfaceUser", "target"]).toJS(),
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    getUserDetail: actionCreators.getUserDetail,
    getRoleAuth: actionCreators.getRoleAuth,
    openModal: actionCreators.openModal,
    triggerModal: actionCreators.triggerModal,
    setUserDetail: actionCreators.setUserDetail
}, dispatch);



export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);