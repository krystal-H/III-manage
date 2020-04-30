import React from 'react';
import { Modal, Form, Input, Tabs, } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { IRoleItem } from './store/types';
import AuthTree from '../../../components/AuthTree';
import { actionCreators } from './store';
import {connect} from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

export interface IProps extends FormComponentProps {
    visible: boolean
    roleItem: IRoleItem
    getRoleAuth: typeof actionCreators.getRoleAuth
    authList: any[]
    defaultAuth: any[]
    target: any[]
    setRoleAuthTarget: typeof actionCreators.setRoleAuthTarget
    saveRole: typeof actionCreators.saveRole
    closeModal: typeof actionCreators.closeModal
    setRoleAuth: typeof actionCreators.setRoleAuth
    modifyRole: typeof actionCreators.modifyRole
}

// 格式化树
const formatTree = (authList: any) => {
    return authList && authList.map((item: any) => {
        return {
            id: item.resourceId,
            name: item.resourceName,
            children: formatTree(item.resourcesVoList)
        };
    });
};

class RoleEdit extends React.Component<IProps, any> {
    // 保存
    handleOk = () => {
        const { form, target, roleItem } = this.props;
        form.validateFields((err, value) => {
            if (err) {
                return;
            }
            if (roleItem.roleId) {
                value = { ...value, roleId: roleItem.roleId };
            }
            this.props.saveRole({ ...value, roleAccess: target.reduce((x, y) => x.concat(y.map((item: any) => item.split('-').pop())), []).join(',')});
            this.props.closeModal();
        });
    }

    // 勾选权限
    handleChange = ( index: number, value: string[] ) => {
        const {target} = this.props;
        this.props.setRoleAuthTarget([...target.slice(0, index), value, ...target.slice(index+1)]);
    }

    componentWillReceiveProps(nextProps: IProps) {
        const { visible, roleItem } = nextProps;
        // 打开弹窗
        if (visible && visible !== this.props.visible) {
            this.props.getRoleAuth(roleItem.roleId);
        }
    }

    render() {
        const { visible, form, authList, target, roleItem } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        return (
            <Modal
                visible={visible}
                width={700}
                title={roleItem ? "查看角色" : "添加角色"}
                onCancel={this.props.closeModal}
                onOk={this.handleOk}
                wrapClassName="role-manage-modal"
            >
                <Form>
                    <h3>基本信息</h3>
                    <FormItem label="角色名称" {...formItemLayout}>
                        {getFieldDecorator("roleName", {
                            rules: [{
                                required: true,
                                message: "请输入角色名称"
                            }]
                        })(
                            <Input maxLength={18} placeholder="请输入角色名称" />
                        )}
                    </FormItem>
                    <FormItem label="角色描述" {...formItemLayout}>
                        {getFieldDecorator("roleDesc", {
                            rules: [{
                                required: true,
                                message: "请输入角色描述"
                            }]
                        })(
                            <Input maxLength={20} placeholder="请输入角色描述" />
                        )}
                    </FormItem>
                    <div className="account-auth">
                        <h3>编辑权限：</h3>
                        <div className="account-auth-tab">
                            <Tabs>
                                {
                                    authList.map((item, index) => (
                                        <TabPane tab={item.resourceName} key={item.resourceName}>
                                            <AuthTree dataSource={formatTree([item])} target={target[index]} onChange={this.handleChange.bind(this, index)} isExpand={true}/>
                                        </TabPane>
                                    ))
                                }
                            </Tabs>
                        </div>
                    </div>
                </Form>
            </Modal>
        );
    }
}

const mapStateToProps = (state: any) => ({
    visible: state.getIn(["roleManage", "visible"]),
    roleItem: state.getIn(["roleManage", "roleItem"]).toJS(),
    authList: state.getIn(["roleManage", "authList"]).toJS(),
    defaultAuth: state.getIn(["roleManage", "defaultAuth"]).toJS(),
    target: state.getIn(["roleManage", "target"]).toJS(),
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    closeModal: actionCreators.closeModal,
    getRoleAuth: actionCreators.getRoleAuth,
    setRoleAuthTarget: actionCreators.setRoleAuthTarget,
    saveRole: actionCreators.saveRole,
    setRoleAuth: actionCreators.setRoleAuth,
    modifyRole: actionCreators.modifyRole,
},
dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Form.create<IProps>({
    mapPropsToFields(props){
        return props.roleItem ? {
            roleName: Form.createFormField({
                value: props.roleItem.roleName
            }),
            roleDesc: Form.createFormField({
                value: props.roleItem.remark
            }),
        } : null;
    },
    onFieldsChange(props, changedFields){
        console.log('---', changedFields);
        for(let i in changedFields){
          if(i !== "roleDesc"){
            props.modifyRole({
              [i]: changedFields[i].value
            });
          }else{
            props.modifyRole({
                remark: changedFields[i].value
            });
          }
        }
      },
})(RoleEdit));