import React from 'react';
import { Modal, Form, Input, Tabs, Radio} from 'antd';
const FormItem = Form.Item;
import axios from '../../../util/api.request';

class TagEdit extends React.Component{

    // 保存
    handleOk = () => {
        const { form, target, editData } = this.props;
        form.validateFields((err, value) => {
            if(!err){
                let param= {...value},
                    url = 'manage-open/thing/label/add';
                if (editData.labelId) {
                    param.labelId = editData.labelId;
                    url = 'manage-open/thing/label/update';
                }
                axios.Post(url,param).then((res) => {
                    console.log('---res',res);
                    this.props.getLabelList();
                    this.props.handleCancel();
                    
                });

            }
        });
    }

    render() {
        const { visible, form, editData } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        return (
            <Modal
                visible={visible}
                width={700}
                title={editData.labelId ? "编辑标签" : "新建标签"}
                onCancel={this.props.handleCancel}
                onOk={this.handleOk}
                wrapClassName="role-manage-modal"
            >
                <Form {...formItemLayout}>
                    <FormItem label="标签类型" >
                        {getFieldDecorator("labelType", {
                            rules: [{
                                required: true,
                                message: "请选择标签类型"
                            }]
                        })(
                            <Radio.Group>
                                <Radio value={0}>基础</Radio>
                                <Radio value={1}>复合</Radio>
                            </Radio.Group>
                        )}
                    </FormItem>
                    <FormItem label="标签名称" >
                        {getFieldDecorator("labelName", {
                            rules: [{
                                required: true,
                                message: "请输入标签名称"
                            }]
                        })(
                            <Input maxLength={20} placeholder="请输入标签名称" />
                        )}
                    </FormItem>
                    
                    <FormItem label="英文名" >
                        {getFieldDecorator("labelNameEn", {
                            rules: [{
                                required: true,
                                message: "请输入英文名"
                            }]
                        })(
                            <Input maxLength={20} placeholder="请输入标签英文名" />
                        )}
                    </FormItem>
                    <FormItem label="备注">
                        {getFieldDecorator("remark", {
                        })(
                            <Input.TextArea rows={3} placeholder="请输入标签备注" maxLength={200}/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

export default (Form.create({
    mapPropsToFields(props){
        let editData = props.editData;
        return {
            labelName: Form.createFormField({
                value: editData.labelName
            }),
            labelNameEn: Form.createFormField({
                value: editData.labelNameEn
            }),
            remark: Form.createFormField({
                value: editData.remark
            }),
            labelType: Form.createFormField({
                value: editData.labelType || 0
            }),

            
        };
    },
    onFieldsChange(props, changedFields){
        // console.log('---', changedFields);
        // for(let i in changedFields){
        //     props.modifyRole({
        //         [i]: changedFields[i].value
        //     });
        // }
      },
})(TagEdit));