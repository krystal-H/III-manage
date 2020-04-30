import React from 'react';
import { connect } from 'react-redux';
import { Input, Button, Modal, Tooltip, Icon } from 'antd';
import TitleTab from '../../../components/TitleTab';
import Table from '../../../components/Table';
import { actionCreators } from './store';
import SubAccountView from './subAccountView';
import SubAccountReset from './subAccountReset';
import { DateTool } from "../../../util/utils";
import SubAccountModal from './subAccountModal';

const TitleOption = TitleTab.Option;

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

class SubAccountList extends React.Component {
    state = {
        loading: false,
        accountName: "",
        query: {},
        editVisible: false,
        resetVisible: false,
        userId: null,
        accountItem: null,
    }

    // 编辑账户名
    handleChange = (e) => {
        this.setState({
            accountName: e.target.value
        });
    }

    // 查询
    handleFilter = () => {
        const { accountName } = this.state;
        this.setState({
            query: { accountName }
        }, this.onChange);
    }

    // 重置
    handleReset = () => {
        this.setState({
            accountName: "",
            query: {}
        }, () => {
            this.refInpt.setState({ value: "" });
        });
    }

    // 翻页
    onChange = (pageIndex = 1) => {
        this.setState({ loading: true });
        this.props.getList({ pageIndex, ...this.state.query }).then(() => {
            this.setState({ loading: false });
        });
    }

    // 打开重置密码窗口
    handleResetPwd = (userId) => {
        this.setState({
            resetVisible: true,
            userId
        });
    }

    // 关闭重置密码窗口
    handleResetCancel = () => {
        this.setState({
            resetVisible: false,
            userId: null
        });
    }

    // 重置密码
    handleResetSave = (value) => {
        const { password } = value;
        this.props.resetPwd({ password, subId: this.state.userId });
        this.handleResetCancel();
    }

    // 删除子账号
    handleDel = (subId) => {
        const _this = this;
        Modal.confirm({
            title: "提示",
            content: "删除账户后，将会同清除所有用户信息，是否确认删除？",
            onOk() {
                _this.props.delSubAccount(subId);
            }
        });
    }

    componentDidMount() {
        this.onChange();

        // 请求获取角色列表
        this.props.getRoleList();
    }

    render() {
        const { subAccountList, pager, } = this.props;
        const { loading, resetVisible } = this.state;
        const columns = [
            { title: "用户名", dataIndex: "userName", width: "10%", render: (text) => <span title={text}>{text}</span> },
            { title: "使用人", dataIndex: "nickName", width: "10%", render: (text) => <span title={text}>{text}</span> },
            { title: "角色", dataIndex: "roleName", width: "15%", render: (text) => <span title={text}>{text}</span> },
            { title: "备注", dataIndex: "remark", width: "15%", render: (text) => <span title={text}>{text}</span> },
            {
                title: "更新时间", dataIndex: "modifyTime", width: "15%", render: (item) => {
                    let timeStr = DateTool.utc2beijing(item, "yyyy-MM-dd hh:mm:ss");
                    return <span title={timeStr}>{timeStr}</span>;
                }
            },
            {
                title: "操作", width: "200px", render: (item) => (
                    <div className="action">
                        <Tooltip placement="top" title="编辑">
                            <Button icon="edit" shape="circle" size="small" onClick={this.props.openModal.bind(this, item)}/>
                        </Tooltip>
                        &nbsp; | &nbsp;
                        <Tooltip placement="top" title="查看">
                            <Button icon="info" shape="circle" size="small" onClick={this.props.openView.bind(this, item)}/>
                        </Tooltip>
                        &nbsp; | &nbsp;
                        <Tooltip placement="top" title="密码重置">
                            <Button icon="retweet" shape="circle" size="small" onClick={this.handleResetPwd.bind(this, item.userId)}/>
                        </Tooltip>
                        &nbsp; | &nbsp;
                        <Tooltip placement="top" title="删除">
                            <Button icon="delete" shape="circle" size="small" onClick={this.handleDel.bind(this, item.userId)}/>
                        </Tooltip>
                    </div>
                )
            },
        ];

        return (
            <div className="sub-account">
                <TitleTab title="子帐号管理">
                    <TitleOption label="账号名称">
                        <Input style={{ width: 240 }} maxLength={20} name="accountName" onPressEnter={this.handleFilter}
                            ref={(refInpt => this.refInpt = refInpt)} placeholder="请输入账号名称" onChange={this.handleChange}/>
                    </TitleOption>
                    <TitleOption>
                        <Button type="primary" onClick={this.handleFilter}>查询</Button>
                    </TitleOption>
                    <TitleOption>
                        <Button type="primary" onClick={this.handleReset.bind(this)}>重置</Button>
                    </TitleOption>
                    <TitleOption align="right">
                        <Button type="primary" onClick={this.props.openModal.bind(this, {})}>新建</Button>
                    </TitleOption>
                </TitleTab>
                <div className="sub-account-content">
                    <Table rowKey={"userId"} columns={columns} dataSource={subAccountList} pager={pager}
                        loading={loading} onPageChange={this.onChange} />
                </div>
                {/* 查看 */}
                <SubAccountView />

                {/* 重置密码 */}
                <SubAccountReset visible={resetVisible} onCancel={this.handleResetCancel} onOk={this.handleResetSave} />

                {/* 新增 & 编辑 */}
                <SubAccountModal />
            </div>
        );
    };
};

const mapStateToProps = (state) => ({
    subAccountList: state.getIn(["subAccount", "list"]).toJS(),
    pager: state.getIn(["subAccount", "pager"]).toJS(),
    roleList: state.getIn(["subAccount", "roleList"]).toJS(),
    authList: state.getIn(["subAccount", "authList"]).toJS(),
    target: state.getIn(["subAccount", "target"]).toJS()
});

const mapDispatchToProps = (dispatch) => ({
    getList: (pager) => dispatch(actionCreators.getList(pager)),
    getRoleList: () => dispatch(actionCreators.getRoleList()),
    setAccount: (item) => dispatch(actionCreators.setAccount(item)),
    resetPwd: (params) => dispatch(actionCreators.resetPwd(params)),
    delSubAccount: (subId) => dispatch(actionCreators.delSubAccount(subId)),
    getRoleAuth: (roleId) => dispatch(actionCreators.getRoleAuth(roleId)),
    openModal: (accountItem) => dispatch(actionCreators.openModal(accountItem)),
    openView: (account) => dispatch(actionCreators.openView(account)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubAccountList);            