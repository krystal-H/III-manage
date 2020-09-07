import React from 'react';
import { Modal, Form, Input } from 'antd';
import { psdPattern } from '../../../util/utils';
import VerificationCodeInput from './VerificationCodeInput';
import axios from '../../../util/api.request';
const FormItem = Form.Item;

@Form.create()
class PasswordReset extends React.Component {
    state = {
		vcodeImageUrl:''
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.visible&&!this.props.visible){
            this.getCodeImage();
        }
    }
    componentDidMount(){
        this.props.refMe(this);
    }
    // 校验前后密码
    handleCheck = (rule, value, callback) => {
        const { form } = this.props;
        const password = form.getFieldValue("password");
        if (password !== value) {
            callback("两次密码输入不一致");
        }
        callback();
    }

    // 保存
    handleOk = () => {
        const { form } = this.props;
        form.validateFields((err, value) => {
            if (err) return;
            this.props.onOk(value);
        });
    }

    // 关闭
    handleCancel = () => {
        const { form, onCancel } = this.props;
        form.resetFields();
        onCancel();
    }

    getCodeImage=()=>{
        axios.Get('manage-open/common/check/getResetPwdImgVeriCode').then((model) => {
            if(model.data.code==0){
                this.setState({ vcodeImageUrl:model.data.data });
            }
        });
    }

    render() {
        const { form, visible } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        return (
            <Modal
                width={600}
                visible={visible}
                title="重置密码"
                onCancel={this.handleCancel}
                onOk={this.handleOk}
            >
                <Form {...formItemLayout}>
                    <FormItem label="新密码" >
                        {getFieldDecorator('password', {
                            rules: [{
                                min: 8,
                                max: 18,
                                required: true,
                                pattern:psdPattern,
                                message: "请输入8-18位包含字母、数字、符号3种字符"
                            }, {
                                validator: this.handleCheck
                            }],
                            getValueFromEvent: (e) => {
                                return e.target.value.replace(/[^\w~!@#$%^&*]/, '');
                            }
                        })(
                            <Input type="password" maxLength={18} placeholder="请输入8-18位包含字母、数字、符号3种字符" />
                        )}
                    </FormItem>
                    <FormItem label="确认密码" >
                        {getFieldDecorator('confirmPw', {
                            rules: [{
                                required: true,
                                message: "请确认新密码"
                            }, {
                                validator: this.handleCheck
                            }],
                            getValueFromEvent: (e) => {
                                return e.target.value.replace(/[^\w~!@#$%^&*]/, '');
                            }
                        })(
                            <Input type="password" maxLength={18} placeholder="请确认新密码" />
                        )}
                    </FormItem>
                    <VerificationCodeInput 
                        getFieldDecorator={getFieldDecorator} 
                        imgSrc={this.state.vcodeImageUrl}
                        refreshVeriCode={this.getCodeImage}
					/>
                </Form>
            </Modal>
        );
    }
}

export default PasswordReset;