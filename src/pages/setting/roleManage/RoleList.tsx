import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Input, Button, Modal, Tooltip, Icon } from 'antd';
import TitleTab from '../../../components/TitleTab';
import Table from '../../../components/Table';
import { actionCreators } from './store';
import RoleEdit from './RoleEdit';
import { DateTool } from "../../../util/utils";
import { IRole, IPager, IRoleState, IRoleItem } from './store/types';
import { List } from 'immutable';

const TitleOption = TitleTab.Option;

export interface IProps {
    loading: boolean
    roleList: IRole[]
    pager: IPager
    authList: any[]
    defaultAuth: any[]
    target: string[]
    getList: typeof actionCreators.getList
    getRoleAuth: typeof actionCreators.getRoleAuth
    saveRole: typeof actionCreators.saveRole
    delRole: typeof actionCreators.delRole
    setRoleAuthTarget: typeof actionCreators.setRoleAuthTarget
    openModal: typeof actionCreators.openModal
}

export interface IState {
    roleName: string
    query: {roleName?: string}
    visible: boolean
    roleItem?: IRoleItem
}

class SubAccountList extends React.Component<IProps, IState> {
    private refInpt: Input
    constructor(props:IProps){
        super(props);
        this.state = {
            roleName: "",
            query: {},
            visible: false,
            roleItem: undefined
        };
    }

    // 修改筛选条件
    handleChange = (e: any) => {
        this.setState({
            roleName: e.target.value
        });
    }

    // 查询
    handleFilter = () => {
        const { roleName } = this.state;
        this.setState({
            query: { roleName }
        }, this.onChange);
    }

    // 重置
    handleReset = () => {
        this.setState({
            roleName: "",
            query: {}
        }, () => {
            this.refInpt.setState({ value: "" });
        });
    }

    // 翻页
    onChange = (pageIndex = 1) => {
        this.props.getList({ pageIndex, ...this.state.query });
    }

    // 删除角色
    handleDel = (roleId: number) => {
        const _this = this;
        Modal.confirm({
            title: "提示",
            content: "是否确认删除？",
            onOk() {
                console.log("确认删除");
                _this.props.delRole(roleId);
            }
        });
    }

    // 关闭查看角色
    handleCancel = () => {
        this.setState({
            visible: false
        });
    }

    componentDidMount() {
        this.onChange();
    }

    render() {
        const { roleList, pager, loading} = this.props;
        const columns = [
            { title: "角色名称", dataIndex: "roleName", width: "30%", render: (text: string) => <span title={text}>{text}</span>},
            { title: "角色描述", dataIndex: "remark", width: "30%", render: (text: string) => <span title={text}>{text}</span>},
            {
                title: "更新时间", dataIndex: "createTime", width: "20%", render: (item: IRole) => {
                    let timeStr = DateTool.utc2beijing(item, "yyyy-MM-dd hh:mm:ss");
                    return <span title={timeStr}>{timeStr}</span>;
                }
            },
            {
                title: "操作", width: "150px", render: (item: IRole) => (
                    <div className="action">
                        <Tooltip placement="top" title="编辑">
                            <Button icon="edit" shape="circle" size="small" onClick={this.props.openModal.bind(this, item)}/>
                        </Tooltip>
                        &nbsp; | &nbsp;
                        <Tooltip placement="top" title="删除">
                            <Button icon="delete" shape="circle" size="small" onClick={this.handleDel.bind(this, item.roleId)}/>
                        </Tooltip>
                    </div>
                )
            },
        ];
        return (
            <div className="role-manage">
                <TitleTab title="角色管理">
                    <TitleOption label="角色名称">
                        <Input style={{ width: 240 }} maxLength={20} name="roleName" onChange={this.handleChange} onPressEnter={this.handleFilter}
                            ref={((refInpt: any) => this.refInpt = refInpt)} placeholder="请输入角色名称" />
                    </TitleOption>
                    <TitleOption>
                        <Button type="primary" onClick={this.handleFilter}>查询</Button>
                    </TitleOption>
                    <TitleOption>
                        <Button type="primary" onClick={this.handleReset}>重置</Button>
                    </TitleOption>
                    <TitleOption align="right">
                        <Button type="primary" onClick={this.props.openModal.bind(this, {})}>新建</Button>
                    </TitleOption>
                </TitleTab>
                <div className="role-content">
                    <Table rowKey={"roleId"} columns={columns} dataSource={roleList} pager={pager}
                        loading={loading} onPageChange={this.onChange} />
                </div>

                <RoleEdit />
            </div>
        );
    }
}

const mapStateToProps = (state: List<IRoleState>) => ({
    loading: state.getIn(["roleManage", "loading"]),
    roleList: state.getIn(["roleManage", "roleList"]).toJS(),
    pager: state.getIn(["roleManage", "pager"]).toJS(),
    authList: state.getIn(["roleManage", "authList"]).toJS(),
    defaultAuth: state.getIn(["roleManage", "defaultAuth"]).toJS(),
    target: state.getIn(["roleManage", "target"]).toJS(),
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
    {
        getList: actionCreators.getList,
        getRoleAuth: actionCreators.getRoleAuth,
        saveRole: actionCreators.saveRole,
        delRole: actionCreators.delRole,
        setRoleAuthTarget: actionCreators.setRoleAuthTarget,
        openModal: actionCreators.openModal,
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(SubAccountList);