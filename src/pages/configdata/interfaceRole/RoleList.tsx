import React from 'react';
import { connect } from 'react-redux';
import { Input, Button, Tooltip, Modal, Form } from 'antd';
import TitleTab from '../../../components/TitleTab';
import Table from '../../../components/Table';
import { Dispatch, bindActionCreators } from 'redux';
import { actionCreators } from './store';
import { IRole, IPager } from './store/types';
import { DateTool } from '../../../util/utils';
import TableHOC from '../../../components/TableHOC';
import { FormComponentProps } from 'antd/lib/form';
import { ITableHOCProps } from '../../../types';

interface IProps extends FormComponentProps, ITableHOCProps{
    roleList: IRole[]
    pager: IPager
    loading: boolean
    history: any
    getList: typeof actionCreators.getList
    setRoleDetail: typeof actionCreators.setRoleDetail
    delRole: typeof actionCreators.delRole
}

class UserList extends React.Component<IProps> {
    // 跳转编辑页
    handleEdit = (item: IRole) => {
        this.props.history.push(`./${item.roleId || 0}`);
        this.props.setRoleDetail(item);
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

    render() {
        const { roleList, pager, loading, form } = this.props;
        const { getFieldDecorator } = form;

        const columns = [
            { title: "角色名", dataIndex: "roleName", width: "20%", render: (text: string) => <span title={text}>{text}</span> },
            { title: "角色备注", dataIndex: "remark", width: "35%", render: (item: string) => (
                <span title={item}>{item}</span>
            )},
            { title: "最新修改时间", dataIndex: "modifyTime", width: "30%", render: (item: string) => {
                let temp = DateTool.utc2beijing(item, "yyyy-MM-dd hh:mm:ss");
                return (<span title={temp}>{temp}</span>);
            }},
            {
                title: "操作", render: (item: IRole) => (
                    <div className="action">
                        <Tooltip placement="top" title="编辑">
                            <Button icon="edit" shape="circle" size="small" onClick={this.handleEdit.bind(this, item)}/>
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
            <div className="interface-role">
                <TitleTab title="接口访问用户角色">
                    <Form layout="inline">
                        <Form.Item label="角色名">
                            {getFieldDecorator('roleName')(
                                <Input placeholder="请输入角色名" maxLength={20} style={{ width: 240 }} onPressEnter={this.props.onFilter}></Input>
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={this.props.onFilter}>查询</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={this.props.onReset}>重置</Button>
                        </Form.Item>
                        <Form.Item style={{ float: "right" }}>
                            <Button type="primary" onClick={this.handleEdit.bind(this, {})}>新建</Button>
                        </Form.Item>
                    </Form>
                </TitleTab>
                <div className="interface-role-content">
                    <Table rowKey={"roleId"} columns={columns} dataSource={roleList} pager={pager}
                        loading={loading} onPageChange={this.props.onChange} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    roleList: state.getIn(["interfaceRole", "roleList"]).toJS(),
    pager: state.getIn(["interfaceRole", "pager"]).toJS(),
    loading: state.getIn(["interfaceRole", "loading"]),
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    getList: actionCreators.getList,
    setRoleDetail: actionCreators.setRoleDetail,
    delRole: actionCreators.delRole,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Form.create<IProps>()(TableHOC<IProps>(UserList)));