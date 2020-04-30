import React from 'react';
import { Modal, Form, Input, Select, Icon, Switch, notification } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { IUser, IRole, IDeveloperInfo } from './store/types';
import { Dispatch, bindActionCreators } from 'redux';
import { actionCreators } from './store';
import { connect } from 'react-redux';

const FormItem = Form.Item;
const Option = Select.Option;

interface IProps extends FormComponentProps {
    visible: boolean
    userDetail: IUser
    roleList: IRole[]
    developerInfo: IDeveloperInfo
    triggerModal: typeof actionCreators.triggerModal
    getRoleList: typeof actionCreators.getRoleList
    addUser: typeof actionCreators.addUser
    saveUser: Function
    getDeveloperInfo: typeof actionCreators.getDeveloperInfo
    getList: typeof actionCreators.getList
    setUserDetail: typeof actionCreators.setUserDetail
}

let id = 0;

class UserModal extends React.Component<IProps> {
    state = {
        keys: [0],
        type: 1,    // 账号密码类型
        isIpChecked: false,
    }

    // 保存
    handleOk = () => {
        const { form, userDetail, developerInfo } = this.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            if (values.userNameList) {
                values.userNameList = values.userNameList.filter(Boolean).map((item: string) => item + "@" + developerInfo.developerId);
            }
            if (values.userName) {
                values.userName = values.userName + '@' + userDetail.userName.split('@')[1];
            }
            if(!values.isIpChecked){
                values.ipWhiteList = null;
            }
            delete values.isIpChecked;
            if (userDetail.userId) {
                values.userId = userDetail.userId;
                this.props.saveUser(values);
            } else {
                this.props.addUser(values);
            }
        });
    }

    // 关闭窗口
    handleClose = () => {
        this.props.triggerModal(false);
    }

    // 添加
    handleAdd = () => {
        let { keys } = this.state;
        if(keys.filter(Boolean).length > 9){
            notification.warning({
                duration: 3,
                message: "一次最多添加十个用户"
            });
            return ;
        }
        this.setState({
            keys: [...keys, ++id]
        });
    }

    // 删除
    handleDel = (t: number) => {
        let { keys } = this.state;
        this.setState({
            keys: keys.filter(item => item !== t)
        });
    }

    // 是否开启白名单
    handleCheck = (val: boolean) => {
        const { form } = this.props;
        if (!val) {
            form.setFieldsValue({ ipWhiteList: [] });
        }
    }

    // 校验ip白名单
    checkIP = (_: any, value: any, callback: any) => {
        if(!new RegExp(/^(?:(?:^|,)(?:[0-9]|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])(?:\.(?:[0-9]|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){3})+$/).test(value)){
            callback(`格式错误，多个IP地址以",(英文)"分割,最多10个IP`);
        }else{
            let len = value.split(',').length;
            if(len > 10){
                callback("最多添加10个IP");
            }
        }
        callback();
    }

    componentWillReceiveProps(nextProps: IProps) {
        const { visible } = nextProps;
        if (visible && !this.props.visible) {
            this.setState({
                keys: [0],
                type: 1,    // 账号密码类型
            });
        }
    }

    componentDidMount() {
        this.props.getRoleList();
        const { developerInfo } = this.props;
        if (!!!developerInfo.developerId) {
            this.props.getDeveloperInfo();
        }
    }

    render() {
        const { type } = this.state;
        const { visible, form, userDetail, roleList, developerInfo } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 15 },
        };
        const isIpChecked = form.getFieldValue("isIpChecked");
        // 用户名
        const formItems =
            !!!userDetail.userId ?
                <div>
                    {
                        this.state.keys.map((item: number, index: number) => (
                            <FormItem label={index < 1 ? "用户名" : ""} labelCol={{ span: 6 }} wrapperCol={index < 1 ? { span: 15 } : { offset: 6, span: 15 }} key={item}>
                                {getFieldDecorator(`userNameList[${item}]`, {
                                    rules: [{
                                        required: true,
                                        message: "请输入用户名"
                                    }, { pattern: /^\w{6,14}$/, message: '请输入6~14位大小写字母＋数字' }]
                                })(
                                    <Input maxLength={14} placeholder="请输入6~14位大小写字母＋数字" suffix={"@" + developerInfo.developerId} />
                                )}
                                {item ? <Icon type="minus-circle" className="btn-del" onClick={this.handleDel.bind(this, item)} /> : null}
                            </FormItem>))
                    }
                    <FormItem {...formItemLayout}>
                        <span className="btn-add" onClick={this.handleAdd}>添加用户</span>
                    </FormItem>
                </div>
                :
                <FormItem label="用户名" {...formItemLayout}>
                    {getFieldDecorator("userName", {
                        rules: [{
                            required: true,
                            message: "请输入用户名"
                        }, { pattern: /^\w{6,14}$/, message: '请输入6~14位大小写字母＋数字' }]
                    })(
                        <Input placeholder="请输入6~14位大小写字母＋数字" maxLength={14} suffix={"@" + userDetail.userName.split('@')[1]} />
                    )}
                </FormItem>;

        return (
            <Modal
                title="创建用户"
                width={600}
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleClose}
                wrapClassName={"interface-modal"}
            >
                <Form>
                    {formItems}
                    <FormItem label="用户角色" {...formItemLayout}>
                        {getFieldDecorator("roleId", {
                            rules: [{
                                required: true,
                                message: "请选择而用户角色"
                            }]
                        })(
                            <Select placeholder="请选择用户角色" style={{ width: 240 }}>
                                {
                                    roleList.map((item: IRole) => (
                                        <Option key={item.roleId} value={item.roleId}>{item.roleName}</Option>
                                    ))
                                }
                            </Select>
                        )}
                    </FormItem>
                    {/* <FormItem label="IP白名单" {...formItemLayout}>
                        { getFieldDecorator('isIpChecked', {
                            valuePropName: "checked"
                        })(
                            <Switch size="small" onChange={this.handleCheck} />
                        )}
                    </FormItem> */}
                    {
                        isIpChecked ?
                            <FormItem wrapperCol={{ offset: 6, span: 15 }}>
                                {
                                    getFieldDecorator("ipWhiteList", {
                                        validateTrigger: "onChange",
                                        rules: [{
                                            validator: this.checkIP
                                        }]
                                    })(
                                        <Input.TextArea placeholder={`多个IP地址以",(英文)"分割,最多10个IP`} style={{ height: 80 }} />
                                    )
                                }
                            </FormItem> : null
                    }
                    <FormItem label="备注" {...formItemLayout}>
                        {getFieldDecorator("remark")(
                            <Input.TextArea placeholder="不超过100个字符" style={{ height: 100 }} />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

const mapStateToProps = (state: any) => ({
    visible: state.getIn(["interfaceUser", "visible"]),
    userDetail: state.getIn(["interfaceUser", "userDetail"]).toJS(),
    roleList: state.getIn(["interfaceUser", "roleList"]).toJS(),
    developerInfo: state.getIn(["interfaceUser", "developerInfo"]).toJS(),
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
    {
        getList: actionCreators.getList,
        triggerModal: actionCreators.triggerModal,
        getRoleList: actionCreators.getRoleList,
        addUser: actionCreators.addUser,
        saveUser: actionCreators.saveUser,
        getDeveloperInfo: actionCreators.getDeveloperInfo,
        setUserDetail: actionCreators.setUserDetail
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Form.create<IProps>({
    mapPropsToFields(props: IProps) {
        return props.userDetail.userId ? {
            userName: Form.createFormField({
                value: props.userDetail.userName.split('@')[0]
            }),
            roleId: Form.createFormField({
                value: props.userDetail.roleId
            }),
            ipWhiteList: Form.createFormField({
                value: props.userDetail.ipWhiteList
            }),
            isIpChecked: Form.createFormField({
                value: !!props.userDetail.ipWhiteList
            }),
            remark: Form.createFormField({
                value: props.userDetail.remark
            }),
        } : {};
    },
})(UserModal));