import React from 'react';
import { Form, Input, Radio, Button, notification } from 'antd';
import TitleTab from '../../../components/TitleTab';
import AuthSetting from './AuthSetting';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { actionCreators } from './store';
import { FormComponentProps } from 'antd/lib/form';
import { IRole } from './store/types';

const FormItem = Form.Item;

interface IProps extends FormComponentProps {
    history: any
    match: any
    roleDetail: IRole
    getRoleAuth: typeof actionCreators.getRoleAuth
    getRoleDetail: typeof actionCreators.getRoleDetail
    modifyRoleDetail: typeof actionCreators.modifyRoleDetail
    saveRole: Function
}

interface IState {
    isChecked: boolean
}

class RoleEdit extends React.Component<IProps, IState> {
    private refSet: any
    state = {
        isChecked: false
    };

    // 返回
    handleBack = () => {
        this.props.history.go(-1);
    }

    // 保存
    handleSave = () => {
        const { form, roleDetail } = this.props;
        form.validateFields((err, values) => {
            if(err){
                return ;
            }
            if(!values.roleName){
                notification.error({
                    duration: 3,
                    message: "角色名不能为空"
                });
                return ;
            }
            let temp = this.refSet.handleSave();
            this.props.saveRole({roleId: roleDetail.roleId || undefined, ...values, dataJson: JSON.stringify(temp)}).then((res: number) => {
                if(res){
                    notification.success({
                        duration: 3,
                        message: "保存成功"
                    });
                    this.props.history.go(-1);
                }
            });
        });
    }

    componentDidMount() {
        const { roleId } = this.props.match.params;
        this.props.getRoleAuth(+roleId);
        if(+roleId){
            this.props.getRoleDetail(roleId);
        }
    }

    render() {
        const { form, roleDetail } = this.props;
        const { getFieldDecorator } = form;
        return (
            <div className="interface-role">
                <TitleTab title="用户角色" >
                    <Button type="primary" className="btn-back" onClick={this.handleBack}>返回</Button>
                </TitleTab>
                <div className="interface-role-content">
                    <Form>
                        <FormItem label="用户角色名">
                            {getFieldDecorator("roleName",)(
                                <Input style={{ width: 500 }} placeholder="20个字符以内" maxLength={20}/>
                            )}
                        </FormItem>
                        <FormItem label="角色备注">
                            {getFieldDecorator("remark")(
                               <Input style={{ width: 500 }} placeholder="不超过100个字符" maxLength={100}/>
                            )}
                        </FormItem>
                        <AuthSetting onRef={(refSet: any) => this.refSet = refSet}/>
                        <FormItem style={{ textAlign: "center" }}>
                            <Button type="primary" onClick={this.handleSave}>{roleDetail.roleId ? "保存" : "创建用户角色" }</Button>
                            <Button type="default" style={{ marginLeft: 20 }} onClick={this.handleBack}>取消</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    roleDetail: state.getIn(["interfaceRole", "roleDetail"]).toJS(),

});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    getRoleAuth: actionCreators.getRoleAuth,
    getRoleDetail: actionCreators.getRoleDetail,
    modifyRoleDetail: actionCreators.modifyRoleDetail,
    saveRole: actionCreators.saveRole
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Form.create<IProps>({
    mapPropsToFields(props){
        return props.roleDetail ? {
            roleName: Form.createFormField({
                value: props.roleDetail.roleName
            }),
            remark: Form.createFormField({
                value: props.roleDetail.remark
            }),
        } : null;
    },
    onFieldsChange(props, changedFields){
        for(let i in changedFields){
            props.modifyRoleDetail({
                [i]: changedFields[i].value
            });
        }
      },
})(RoleEdit));