import React from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

@Form.create()
class ResetPwd extends React.Component {
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
                <Form>
                    <FormItem label="新密码" {...formItemLayout}>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: "以字母开头的6到18个字母或数字或下划线"},
                            { pattern: /^[a-zA-Z]\w{5,17}$/ , message: '以字母开头的6到18个字母或数字或下划线'}]
                        })(
                            <Input.Password  maxLength={18} placeholder="以字母开头的6到18个字母或数字或下划线" />
                        )}
                    </FormItem>
                    <FormItem label="确认密码" {...formItemLayout}>
                        {getFieldDecorator('confirmPw', {
                            rules: [{
                                required: true,
                                message: "请确认新密码"
                            }, {
                                validator: this.handleCheck
                            }]
                        })(
                            <Input.Password maxLength={18} placeholder="请确认新密码" onPressEnter={this.handleOk}/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

export default ResetPwd;