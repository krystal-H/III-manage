import React from 'react'
import {Col, Row, Form, Input} from "antd";

const FormItem = Form.Item;

class FuncType extends React.Component{
    state = {
        functionDetailList: this.props.functionDetailList || [{
            functionDetailId: null,
            functionMark: null,
            functionLength: 1,
            functionUnit: 2,
        }]
    }

    componentWillReceiveProps(nextProps){
        const {flag} = this.props;
        if(flag != nextProps.flag){
            this.setState({
                functionDetailList: nextProps.functionDetailList || [{
                    functionDetailId: null,
                    functionMark: null
                }]
            })
        }
    }

    handleAdd = () => {
        let {functionDetailList} = this.state;
        let arr = Array.from(functionDetailList);
            arr.push({
                functionDetailId: null,
                functionMark: null,
                functionLength: 1,
                functionUnit: 2,
            })
        this.setState({
            functionDetailList: arr
        })
    }

    handleDel = (id) => {
        const {form} = this.props;
        // 获取当前数据，然后过滤对应行数据
        const values = form.getFieldsValue();
        let functionDetailList = [];
        const arr = {
            id: "functionDetailId",
            field: "functionMark",
            len: "functionLength",
            unit: "functionUnit"
        }
        Object.keys(values).map(item => {
            if(/^id_|field_|len_|unit_\d$/.test(item)){
                const temp = item.split('_');
                if(!functionDetailList[temp[1]]){
                    functionDetailList[temp[1]] = {};
                }
                functionDetailList[temp[1]][arr[temp[0]]] = values[item]
            }
        })
        functionDetailList = functionDetailList.filter((item, index) => index != id);
        // 新数据重新设值
        let itemData = {};
        functionDetailList.map((item,index) => {
            itemData["id_"+index] = item.functionDetailId;
            itemData["field_"+index] = item.functionMark;
            itemData["len_"+index] = item.functionLength;
            itemData["unit_"+index] = item.functionUnit;
        })
        form.setFieldsValue(itemData);

        this.setState({
            functionDetailList: functionDetailList
        })
    }

    // 设置列数
    render(){
        const {form} = this.props;
        const {functionDetailList} = this.state;
        const {getFieldDecorator} = form;
        return (
            <div className="value-type">
                <Row >
                    <Col span={4}>
                        <span>&nbsp;</span>
                    </Col>
                    <Col span={15}>
                        <span>数据标识</span>
                    </Col>
                    <Col span={4}>
                        <span>&nbsp;</span>
                    </Col>
                </Row>
                {
                   functionDetailList && functionDetailList.map((item, index) => (
                        <Row type="flex" justify={"space-around"} key={index+item.functionMark}>
                            <Col span={4}>
                                <FormItem>
                                <p>{`BIT${index}`}</p>
                                </FormItem>
                            </Col>
                            <Col span={0}>
                                <FormItem>
                                    {getFieldDecorator('id_'+index, {
                                        initialValue: item.functionDetailId || null,
                                        rules: [{ required: false}]
                                    })(
                                        <Input style={{display:"none"}}  size="small"/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={15}>
                                <FormItem>
                                    {getFieldDecorator('field_'+index, {
                                        initialValue: item.functionMark,
                                        rules: [{ required: true, message: '字段不能为空'}]
                                    })(
                                        <Input size="small"/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={0}>
                                {getFieldDecorator('len_'+index, {
                                    initialValue: item.functionLength || 1,
                                    rules: [{ required: false, message: '字段不能为空'}]
                                })(
                                    <Input style={{opacity:0}} size="small" />
                                )}
                            </Col>
                            <Col span={0}>
                                {getFieldDecorator('unit_'+index, {
                                    initialValue: item.Unit || 2,
                                    rules: [{ required: false, message: '字段不能为空'}]
                                })(
                                    <Input style={{opacity: 0}} size="small"/>
                                )}
                            </Col>
                            <Col span={4} style={{textAlign: "center"}}>
                                {index > 0 ? <a onClick={this.handleDel.bind(this, index)}>删除</a> : <p>&nbsp;</p>}
                            </Col>
                        </Row>
                ))
                }
                <Row >
                    <Col span={4}>
                        <a onClick={this.handleAdd}>添加</a>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default FuncType;