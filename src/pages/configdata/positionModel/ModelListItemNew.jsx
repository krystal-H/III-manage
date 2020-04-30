import React from 'react';
import { Modal, Form, Table, Input, Button } from 'antd';

const FormItem = Form.Item;

class ModelListItemNew extends React.Component {
    state = {
        selectedRowKeys: [],  // 关联数据 
    }

    // 勾选关联父层级
    onSelectChange = (selectedRowKeys) => {

        console.log('..selectedRowKeys..',selectedRowKeys);
        this.setState({ selectedRowKeys })
    }
    // 保存数据
    handleSave = () => {
        const { form } = this.props;
        const { selectedRowKeys } = this.state;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            this.props.onOk({
                elementName: values.elementName,
                parentIds: selectedRowKeys
            });
        })
    }

    componentWillReceiveProps(nextProps) {
        const { visible, elementsItem } = nextProps
        if (visible && visible !== this.props.visible && elementsItem) {
            this.setState({ selectedRowKeys: typeof elementsItem.parentIds == "string" ? JSON.parse(elementsItem.parentIds) : (elementsItem.parentIds || []) });
            const { form } = this.props;
            form.setFieldsValue({ elementName: elementsItem.elementName })
        }
    }

    render() {
        const { visible, onOk, onCancel, form, list } = this.props;
        const { getFieldDecorator } = form;
        const { selectedRowKeys } = this.state;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 17 },
        };
        const columns = [{ title: "父层级数据", dataIndex: "elementName", width: 1000, textWrap: 'word-break', }];
        const rowSelection = {
            selectedRowKeys: selectedRowKeys.filter(item => list.findIndex(inner => inner.elementId == item) >= 0),
            onChange: this.onSelectChange
        }

        return (
            <Modal
                width={600}
                visible={visible}
                onCancel={onCancel}
                onOk={onOk}
                title={"添加数据"}
                className="data-model"
                footer={null}>
                <Form >
                    <FormItem {...formItemLayout} label="名称">
                        {getFieldDecorator('elementName', {
                            rules: [{ required: true, message: '请输入名称' }]
                        })(
                            <Input placeholder="20个以内的字符" maxLength={20} />
                        )}
                    </FormItem>
                    {
                        this.props.id > 0 ?
                            <FormItem  {...formItemLayout} label="关联父层级">
                                <Table rowKey={"elementId"} size="small"
                                    rowSelection={rowSelection}
                                    columns={columns} pagination={false} dataSource={list}
                                    scroll={{ y: 194 }} bordered={false} />
                            </FormItem>
                            : null
                    }

                    <FormItem className="footer">
                        <Button type="primary" className="btn-save" onClick={this.handleSave}>保存</Button>
                        <Button type="primary" className="btn-cancel" onClick={onCancel}>取消</Button>
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

const modelListItemNew = Form.create()(ModelListItemNew)
export default modelListItemNew