import React from 'react';
import { Modal, Form, Input, Tooltip, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class MacAdd extends React.Component {
    // 取消
    onCancel = () => {
        const { form, onCancel } = this.props;
        form.resetFields();
        onCancel();
    }
    // 保存
    onOk = () => {
        const { form } = this.props;
        form.validateFields((err, value) => {
            if (err) return;
            this.props.onOk(value);
        });
    }

    // 校验输入
    handleCheck = (rule, value, callback) => {
        if(!/^[0-9A-F]{2}$/.test(value)){
            callback("只能输入两位数的十六进制[0-9、A~F]");
        }
        callback();
    }


    componentWillReceiveProps(nextProps){
        const {visible} = nextProps;
        if(this.props.visible && !visible){
            this.props.form.resetFields();
        }
    }

    render() {
        const { form, visible, moduleList } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 14 },
        };
        return (
            <Modal
                width={600}
                visible={visible}
                onCancel={this.onCancel}
                onOk={this.onOk}
                title={"分配MAC"}
            >
                <Form >
                    <FormItem label="模组型号" {...formItemLayout}>
                            {
                                getFieldDecorator('hetModuleTypeId', {
                                    rules: [{
                                        required: true,
                                        message: "请选择模组型号"
                                    }]
                                })(
                                    <Select placeholder="请选择">
                                       {
                                            moduleList.map(item => (
                                                <Option value={item.moduleId} key={item.moduleId}>{item.hetModuleTypeName}</Option>
                                            ))
                                        }
                                    </Select>
                                )
                            }
                    </FormItem>
                    <FormItem label="MAC地址（第四字节）" {...formItemLayout}>
                        <Tooltip placement="right" title={"只能输入两位数的十六进制[0-9、A~F]"} overlayStyle={{ width: 300 }}>
                            {
                                getFieldDecorator('productCode', {
                                    rules: [{
                                        min: 2,
                                        max: 2,
                                        required: true,
                                        message: "请MAC地址（第四字节）"
                                    }, {
                                        validator: this.handleCheck
                                    }],
                                    getValueFromEvent: (e) => {
                                        return String.prototype.toLocaleUpperCase.call(e.target.value.substr(0,2).replace(/[^0-9a-fA-F]/, ''));
                                    }
                                })(
                                    <Input maxLength={2} placeholder="MAC地址（第四字节）"  />
                                )
                            }
                        </Tooltip>
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

export default Form.create()(MacAdd);
