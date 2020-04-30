import React from 'react';
import { Modal, Form, Input, Tooltip } from 'antd';

const FormItem = Form.Item;

class MacApply extends React.Component {
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
            const { applyAllocated, allocationDesc } = value;
            const { hetModuleTypeId, macAllocationId } = this.props.macItem;
            this.props.onOk({ applyAllocated, allocationDesc, hetModuleTypeId, macAllocationId });
        });
    }
    // 校验
    handleCheck = (rule, value, callback) => {
        const { remainAllocated } = this.props.macItem;
        if (value > remainAllocated || value === "0") {
            callback(`只能输入1-65536之间的正整数,并且不能大于当前的未分配数量${remainAllocated}`);
            return;
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
        const { form, macItem, visible } = this.props;
        const { getFieldDecorator } = form;
        const { hetName, remainAllocated } = macItem || {};
        const formItemLayout = {
            labelCol: { span: 6 },
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
                            getFieldDecorator('hetName', {
                                initialValue: hetName
                            })(
                                <Input disabled={true} />
                            )
                        }
                    </FormItem>
                    <FormItem label="申请数量" {...formItemLayout}>
                        <Tooltip placement="right" title={`只能输入1-65536之间的正整数,并且不能大于当前的未分配数量${remainAllocated}`} overlayStyle={{ width: 300 }}>
                            {
                                getFieldDecorator('applyAllocated', {
                                    rules: [{
                                        required: true,
                                        message: "请输入申请数量"
                                    }, {
                                        validator: this.handleCheck
                                    }],
                                    getValueFromEvent: (e) => {
                                        return e.target.value.replace(/[^\d]/, '');
                                    }

                                })(
                                    <Input placeholder="请输入申请数量" maxLength={5} />
                                )
                            }
                        </Tooltip>
                    </FormItem>
                    <FormItem label="申请描述" {...formItemLayout}>
                        <Tooltip placement="right" title={"最多支持输入50个字符。"} overlayStyle={{ width: 300 }}>
                            {
                                getFieldDecorator('allocationDesc', {
                                    rules: [{
                                        required: true,
                                        message: "请输入申请描述"
                                    }]
                                })(
                                    <Input.TextArea maxLength={50} placeholder="请输入申请描述" style={{ height: 100 }} />
                                )
                            }
                        </Tooltip>
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

export default Form.create()(MacApply);
