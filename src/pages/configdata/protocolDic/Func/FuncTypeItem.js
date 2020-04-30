import React from 'react'
import {Row, Col, Input, Select, Form} from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;

class FuncTypeItem extends React.Component{
    // componentWillReceiveProps(nextProps){
    //     this.field.value = nextProps.defaultField || "";
    //     this.len.value = nextProps.defaultLen || 1;
    //     this.unit.value = nextProps.defaultUnit || "byte";
    // }

    render(){
        const {placeholder, defaultField, defaultLen, defaultUnit, form, name} = this.props;
        const {getFieldDecorator} = form;

        return (
            <Row type="flex" justify={"space-around"}>
                <Col>
                    <FormItem>
                        {getFieldDecorator('id_'+name, {
                            rules: [{ required: false}]
                        })(
                            <Input style={{display:"none"}}  size="small"/>
                        )}
                    </FormItem>
                </Col>
                <Col span={11}>
                    <FormItem>
                        {getFieldDecorator('field_'+name, {
                            initialValue: defaultField || "",
                            rules: [{ required: true, message: '字段不能为空'}]
                        })(
                            <Input placeholder={placeholder}  size="small"/>
                        )}
                    </FormItem>
                </Col>
                <Col span={5}>
                    {getFieldDecorator('len_'+name, {
                        initialValue: defaultLen || 1,
                        rules: [{ required: true, message: '字段不能为空'}]
                    })(
                        <Input size="small" />
                    )}
                </Col>
                <Col span={6}>
                    {getFieldDecorator('unit_'+name, {
                        initialValue: defaultUnit || 1,
                        rules: [{ required: true, message: '字段不能为空'}]
                    })(
                        <Select  size="small">
                            <Option value={1}>字节</Option>
                            <Option value={2}>位</Option>
                        </Select>
                    )}
                </Col>
            </Row>
        )
    }
}

export default FuncTypeItem