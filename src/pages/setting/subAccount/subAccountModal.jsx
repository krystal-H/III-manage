import React from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import RoleAuth from './RoleAuth';

const FormItem = Form.Item;
const Option = Select.Option;

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
class SubAccountModal extends React.Component {
    // 校验前后密码
    handleCheck = (rule, value, callback) => {
        const { form } = this.props;
        const password = form.getFieldValue("password");
        if (password !== value) {
            callback("两次密码输入不一致");
        }

        callback();
    }

    // 关闭窗口
    handleCancel = () => {
        const { form, closeModal } = this.props;
        form.resetFields();
        closeModal();
    }

    // 保存
    handleOk = () => {
        const { form, accountItem } = this.props;
        form.validateFields((err, value) => {
            if (err) {
                return;
            }
            console.log("----", value, accountItem);
            if (accountItem.userId) {
                const { userName, roleId, nickName, remark } = accountItem;
                if (JSON.stringify({ userName, roleId, nickName, remark }) === JSON.stringify(value)) {
                    this.props.closeModal();
                    return;
                }
                this.props.modifySubAccount({ ...value, userId: accountItem.userId });
            } else {
                this.props.saveSubAccount(value);
            }
            this.props.closeModal();
        });
    }

    // 选择角色
    hanldeChange = (roleId) => {
        // console.log("角色id", roleId);
        // 添加查询角色权限
        this.props.getRoleAuth(roleId);
    }

    componentWillReceiveProps(nextProps) {
        const { visible, form, accountItem } = nextProps;
        // 打开弹窗
        if (visible && visible !== this.props.visible) {
            if (accountItem.userId) {
                const { userName, roleId, nickName, remark } = accountItem;
                form.setFieldsValue({ userName, roleId, nickName, remark });
                if (this.props.accountItem.roleId !== accountItem.roleId) {
                    this.props.getRoleAuth(roleId);
                }
            } else {
                form.resetFields();
            }
        }
    }

    render() {
        const { form, visible, roleList, authList, target, accountItem } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const list = formatTree(authList);

        return (
            <Modal
                width={600}
                title={accountItem.userId ? "编辑用户" : "添加用户"}
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                wrapClassName={"sub-account-modal"}
            >
                <Form>
                    <FormItem label="用户名" {...formItemLayout}>
                        {getFieldDecorator('userName', {
                            rules: [{
                                required: true,
                                message: "4~16位，支持字母、数字输入"
                            }, {
                                validator: (rule, value, callback) => {
                                    if(!/^[a-zA-Z0-9]{4,16}$/.test(value)){
                                        callback('4~16位，支持字母、数字输入');
                                    }
                                    callback();
                                }
                            }],
                        })(
                            <Input placeholder="4~16位，支持字母、数字输入" maxLength={16} disabled={!!accountItem.userId} />
                        )}
                    </FormItem>
                    {
                        !accountItem.userId ?
                            <div>
                                <FormItem label="密码" {...formItemLayout}>
                                    {getFieldDecorator('password', {
                                        rules: [{
                                            required: true,
                                            message: "6~18位，支持字母、数字、符号输入"
                                        }, {
                                            validator: (rule, value, callback) => {
                                                if(!/^[\w~!@#$%^&*]{6,18}$/.test(value)){
                                                    callback('6~18位，支持字母、数字、符号输入');
                                                }
                                                callback();
                                            }
                                        }]
                                    })(
                                        <Input placeholder="6~18位，支持字母、数字、符号输入"  maxLength={18} type="password" />
                                    )}
                                </FormItem>
                                <FormItem label="确认密码" {...formItemLayout}>
                                    {getFieldDecorator('confirmPw', {
                                        rules: [{
                                            required: true,
                                            message: "6~18位，支持字母、数字、符号输入"
                                        }, {
                                            validator: this.handleCheck
                                        }]
                                    })(
                                        <Input placeholder="6~18位，支持字母、数字、符号输入"  maxLength={18} type="password" />
                                    )}
                                </FormItem>
                            </div>
                            : null
                    }
                    <FormItem label="角色" {...formItemLayout}>
                        {getFieldDecorator('roleId', {
                            rules: [{
                                required: true,
                                message: "请选择用户角色"
                            }]
                        })(
                            <Select placeholder="请选择角色" onChange={this.hanldeChange}>
                                {
                                    roleList.map(item => (
                                        <Option value={item.roleId} key={item.roleId + ''}>{item.roleName}</Option>
                                    ))
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="使用者" {...formItemLayout}>
                        {getFieldDecorator('nickName')(
                            <Input placeholder="请输入使用者" maxLength={10}/>
                        )}
                    </FormItem>
                    <FormItem label="备注" {...formItemLayout}>
                        {getFieldDecorator('remark')(
                            <Input placeholder="请输入备注" maxLength={20}/>
                        )}
                    </FormItem>
                    {
                        authList.length ?
                            <RoleAuth dataSource={list} target={target} /> : null
                    }

                </Form>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    visible: state.getIn(["subAccount", "visible"]),
    roleList: state.getIn(["subAccount", "roleList"]).toJS(),
    authList: state.getIn(["subAccount", "authList"]).toJS(),
    target: state.getIn(["subAccount", "target"]).toJS(),
    accountItem: state.getIn(["subAccount", "accountItem"]).toJS()
});

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch(actionCreators.closeModal()),
    getRoleAuth: (roleId) => dispatch(actionCreators.getRoleAuth(roleId)),
    modifySubAccount: (params) => dispatch(actionCreators.modifySubAccount(params)),
    saveSubAccount: (params) => dispatch(actionCreators.saveSubAccount(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubAccountModal);