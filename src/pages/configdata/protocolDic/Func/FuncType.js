import React from 'react'
import FuncTypeItem from "./FuncTypeItem";
import {Col, Row, Form} from "antd";

class FuncType extends React.Component{
    getFieldsItem = () => {
        const {protocolType, form} = this.props;
        return protocolType?protocolType.content.map((item, index)=>{
            return  <FuncTypeItem key={protocolType.id+'_'+index} form={form} placeholder={item.placeholder} 
            defaultLen={item.defaultLen} defaultUnit={item.defaultUnit} name={index}/>
        }): null
    }

    render(){
        return (
            <div className="value-type">
                <Row >
                    <Col span={11}>
                        <span>数据标识</span>
                    </Col>
                    <Col span={6}>
                        <span>长度</span>
                    </Col>
                    <Col span={7}>
                        <span>单位</span>
                    </Col>
                </Row>
                {
                    this.getFieldsItem()
                }
            </div>
        )
    }
}

export default FuncType;