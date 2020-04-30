import React from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Tabs } from 'antd';
import { actionCreators } from './store';
import RoleAuth from './RoleAuth';


const EditableInfo = ({ label, value }) => {
    return (
        <div className="account-info-item">
            <div className="label">{`${label}：`}</div>
            <div className="account-info-input" >{value}</div>
        </div>
    );
};

// 格式化树
const formatTree = (authList) => {
    return authList && authList.map((item) => {
        return {
            id: item.resourceId,
            name: item.resourceName,
            children: formatTree(item.resourcesVoList)
        };
    });
};

@Form.create()
class SubAccountView extends React.Component {
    state = {
        account: null
    }

    componentWillReceiveProps(nextProps) {
        const { account } = nextProps;
        // console.log(111,account);
        if (account && account.roleId && account.roleId !== this.props.account.roleId) {
            this.props.getRoleAuth(account.roleId);
        }
    }

    render() {
        const { visible, account, authList, target } = this.props;
        const { userName, nickName, roleName, remark } = account || {};
        const dataSource = formatTree(authList);

        return (
            <Modal
                visible={visible}
                width={800}
                title={"查看用户"}
                wrapClassName={"sub-account-modal"}
                onOk={this.props.closeView}
                onCancel={this.props.closeView}
            >
                <Form className="account-info">
                    <EditableInfo label={"用户名"} value={userName} />
                    <EditableInfo label={"使用人"} value={nickName} />
                    <EditableInfo label={"角色"} value={roleName} />
                    <EditableInfo label={"备注"} value={remark} />
                </Form>
                <RoleAuth dataSource={dataSource} target={target}/>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    roleList: state.getIn(["subAccount", "roleList"]).toJS(),
    visible: state.getIn(["subAccount", "viewVisible"]),
    account: state.getIn(["subAccount", "viewAccountItem"]).toJS(),
    authList: state.getIn(["subAccount", "authList"]).toJS(),
    target: state.getIn(["subAccount", "target"]).toJS(),
});

const mapDispatchToProps = (dispatch) => ({
    getRoleAuth: (roleId) => dispatch(actionCreators.getRoleAuth(roleId)),
    closeView: () => dispatch(actionCreators.closeView()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubAccountView);