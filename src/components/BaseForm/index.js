import React from 'react'
import { Input, Select, Form, Button, Checkbox, Radio, DatePicker } from 'antd'
const FormItem = Form.Item;
const Option = Select.Option;

class FilterForm extends React.Component {

    handleFilterSubmit = () => {
        let fieldsValue = this.props.form.getFieldsValue();
        // console.log(fieldsValue);
        this.props.filterSubmit(fieldsValue);
    }

    reset = () => {
        this.props.form.resetFields();
    }

    getOptionList = (data) => {
        if (!data) {
            return [];
        }
        let options = []
        data.map((item) => {
            options.push(
                <Option value={item.id} key={item.id}>{item.name}</Option>
            )
        })
        return options;
    }

    initFormList = () => {
        const { getFieldDecorator } = this.props.form;
        const formList = this.props.formList;
        const formItemList = [];
        if (formList && formList.length > 0) {

            formList.forEach((item, i) => {
                let label = item.label;
                let field = item.field || "";
                let initialValue = item.initialValue || undefined;
                let placeholder = item.placeholder;
                let width = item.width || 120;
                let selectChange = item.onSelect;
                let resetFields = item.resetFields;
                if (item.type === 'DatePicker') {
                    const begin_time = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator(field)(
                                <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                            )
                        }
                    </FormItem>;
                    formItemList.push(begin_time)
                    const end_time = <FormItem label="~" colon={false} key={field}>
                        {
                            getFieldDecorator(field)(
                                <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                            )
                        }
                    </FormItem>;
                    formItemList.push(end_time)
                } else if (item.type === 'Input') {
                    const INPUT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator(field, {
                                initialValue: initialValue
                            })(
                                <Input style={{ width: width }} type="text" placeholder={placeholder} maxLength={20} />
                            )
                        }
                    </FormItem>;
                    formItemList.push(INPUT)
                } else if (item.type === 'Select') {
                    const SELECT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator(field, {
                                initialValue: initialValue
                            })(
                                <Select
                                    className={field}
                                    style={{ width: width, marginBottom: 0 }}
                                    placeholder={placeholder}
                                    onChange={(value) => {
                                        if (item.resetFields) {
                                            this.props.form.resetFields([...resetFields]);
                                        }

                                        if (selectChange) {
                                            selectChange(value);
                                        }
                                    }}
                                >
                                    {this.getOptionList(item.list)}
                                </Select>
                            )
                        }
                    </FormItem>;
                    formItemList.push(SELECT)
                } else if (item.type === 'Checkbox') {
                    const CHECKBOX = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator(field, {
                                valuePropName: 'checked',
                                initialValue: initialValue //true | false
                            })(
                                <Checkbox>
                                    {label}
                                </Checkbox>
                            )
                        }
                    </FormItem>;
                    formItemList.push(CHECKBOX)
                } else if (item.type === 'Button') {
                    const BUTTON = <FormItem key={field}>
                        <Button type="primary" onClick={selectChange} >{label}</Button>
                    </FormItem>;
                    formItemList.push(BUTTON)
                }
            })
        }
        return formItemList;
    }
    render() {
        const {node} = this.props;
        return (
            <Form layout="inline">
                {this.initFormList()}
                <FormItem>
                    <Button type="primary"  onClick={this.handleFilterSubmit}>查询</Button>
                </FormItem>
                <FormItem>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
                <FormItem>
                    {node}
                </FormItem>
            </Form>
        );
    }
}
export default Form.create({})(FilterForm);