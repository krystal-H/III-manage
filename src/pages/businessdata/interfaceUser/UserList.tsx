import * as React from 'react';
import { connect } from 'react-redux';
import { Input, Button, Select, Form, Tooltip, Modal } from 'antd';
import TitleTab from '../../../components/TitleTab';
import Table from '../../../components/Table';
import UserModal from './UserModal';
import { FormComponentProps } from 'antd/lib/form';
import { IUser, IPager } from './store/types';
import { Dispatch, bindActionCreators } from 'redux';
import { actionCreators } from './store';
import TableHOC from '../../../components/TableHOC';
import { ITableHOCProps } from '../../../types';

const Option = Select.Option;
const FormItem = Form.Item;

interface IProps extends FormComponentProps, ITableHOCProps {
    userList: IUser[]
    pager: IPager
    loading: boolean
    history: any
    getList: typeof actionCreators.getList
    openModal: typeof actionCreators.openModal
    getDeveloperInfo: typeof actionCreators.getDeveloperInfo
    delUser: typeof actionCreators.delUser
}

interface IState {
    visible: boolean
    userItem?: IUser
}

class UserList extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    // 查看
    handleDetail = (userId: number) => {
        this.props.history.push(`./${userId}`);
    }

    // 删除
    handleDel = (userId: number) => {
        const _this = this;
        Modal.confirm({
            title: "提示",
            content: "是否确认删除？",
            onOk() {
                _this.props.delUser(userId);
            }
        });
    }

    render() {
        const { userList, pager, form, loading, openModal } = this.props;
        const { getFieldDecorator } = form;

        const columns = [
            {
                title: "用户名", dataIndex: "userName", width: "12%", render: (item: string) => (
                    <span>{item.split('@')[0]}</span>
                )
            },
            {
                title: "secretId", dataIndex: "secretId", width: "280px", render: (item: string) => (
                    <span title={item}>{item}</span>
                )
            },
            {
                title: "所属客户ID", dataIndex: "parentId", width: "10%", render: (item: number) => {
                    return (<span>{item === -1 ? "系统" : item}</span>);
                }
            },
            { title: "账户角色", dataIndex: "roleName", width: "10%", render: (item: string) => (
                <span title={item}>{item}</span>)
            },
            { title: "账户备注", dataIndex: "remark", width: "18%" },
            {
                title: "账户状态", dataIndex: "status", width: "10%", render: (item: number) => (
                    <span>{item === 1 ? "可用" : "禁用"}</span>
                )
            },
            {
                title: "操作", width: "167px", render: (item: IUser) => (
                    <div className="action">
                        {
                            item.parentId === -1 ? 
                            <span>
                                <Tooltip placement="top" title="编辑">
                                    <Button icon="edit" shape="circle" size="small" onClick={openModal.bind(this, item)} />
                                </Tooltip>
                                &nbsp; | &nbsp;
                            </span> : null
                        }
                        
                        <Tooltip placement="top" title="查看">
                            <Button icon="info" shape="circle" size="small" onClick={this.handleDetail.bind(this, item.userId)} />
                        </Tooltip>
                        {
                            item.parentId === -1 ?
                            <span>
                                &nbsp; | &nbsp;
                                <Tooltip placement="top" title="删除">
                                    <Button icon="delete" shape="circle" size="small" onClick={this.handleDel.bind(this, item.userId)} />
                                </Tooltip>
                            </span> : null
                        }
                    </div>
                )
            },
        ];

        return (
            <div className="interface-user">
                <TitleTab title="接口访问用户">
                    <Form layout="inline">
                        <FormItem label="用户名">
                            {getFieldDecorator('userName')(
                                <Input placeholder="请输入用户名" maxLength={20} style={{ width: 160 }} onPressEnter={this.props.onFilter}></Input>
                            )}
                        </FormItem>
                        <FormItem label="所属客户ID">
                            {getFieldDecorator('parentId', {
                                getValueFromEvent: (e) => {
                                    return e.target.value.replace(/[^\d]/g, '');
                                }
                            })(
                                <Input placeholder="请输入所属客户ID" maxLength={20} style={{ width: 160 }} onPressEnter={this.props.onFilter.bind(this)}></Input>
                            )}
                        </FormItem>
                        <FormItem label="账户状态">
                            {getFieldDecorator('status')(
                                <Select style={{ width: 160 }} placeholder="请选择状态">
                                    <Option key="undefined" value={""}>全部</Option>
                                    <Option key="1" value={1}>可用</Option>
                                    <Option key="0" value={0}>禁用</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.props.onFilter} >查询</Button>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.props.onReset}>重置</Button>
                        </FormItem>
                        <FormItem style={{ float: "right" }}>
                            <Button type="primary" onClick={openModal.bind(this, {})} >新建</Button>
                        </FormItem>
                    </Form>
                </TitleTab>
                <div className="interface-user-content">
                    <Table rowKey={"userId"} columns={columns} dataSource={userList} pager={pager}
                        loading={loading} onPageChange={this.props.onChange} />
                </div>

                <UserModal />
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    userList: state.getIn(["interfaceUser", "userList"]).toJS(),
    pager: state.getIn(["interfaceUser", "pager"]).toJS(),
    loading: state.getIn(["interfaceUser", "loading"]),

});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
    {
        getList: actionCreators.getList,
        openModal: actionCreators.openModal,
        delUser: actionCreators.delUser,
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Form.create<IProps>()(TableHOC<IProps>(UserList)));