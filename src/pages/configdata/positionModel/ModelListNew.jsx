import React from 'react';
import { Modal, Form, Input, Button } from 'antd'

const FormItem = Form.Item;

class ModelListNew extends React.Component {
    // 点击保存
    handleSave = () => {
        const { form } = this.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            this.props.onOk(values)
        })
    }

    componentWillReceiveProps(nextProps) {
        const { visible, summary } = nextProps
        if (visible && visible !== this.props.visible && summary) {
            const { form } = this.props;
            form.setFieldsValue({ summary: summary.summary })
        }
    }

    render() {
        const { form, visible, onCancel, onOk } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 15 },
        };

        return (
            <Modal
                width={600}
                visible={visible}
                onCancel={onCancel}
                onOk={onOk}
                title={"编辑数据"}
                className="data-model"
                footer={null}>
                <Form >
                    <FormItem {...formItemLayout} label="名称">
                        {getFieldDecorator('summary', {
                            rules: [{ required: true, message: '请输入名称' }]
                        })(
                            <Input placeholder="20个以内的字符" maxLength={20} />
                        )}
                    </FormItem>
                    <FormItem className="footer">
                        <Button type="primary" className="btn-save" onClick={this.handleSave}>保存</Button>
                        <Button type="primary" className="btn-cancel" onClick={onCancel}>取消</Button>
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

export default Form.create()(ModelListNew)