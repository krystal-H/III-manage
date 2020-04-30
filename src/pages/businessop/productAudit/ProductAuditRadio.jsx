import React, { Component } from 'react'
import {Radio, Input} from 'antd'

class ProductAuditRadio extends Component{
    state = {
        statu: 1,
        remark: ''
    }

    // 状态变化
    onChange = (e) => {
        const {value} = e.target;
        this.setState({statu: value})
    }

    // 添加驳回
    changeText = (e) => {
        this.setState({
            remark: e.target.value || ""
        })
    }

    render(){
        const {statu} = this.state;
        return (
            <div className="audit-modal">
                <span className="label">审核结果：</span>
                <Radio.Group value={statu} buttonStyle="solid" onChange={this.onChange}>
                    <Radio.Button value={1}>通过</Radio.Button>
                    <Radio.Button value={2}>不通过</Radio.Button>
                </Radio.Group>
                {
                    statu && statu == 2 ?
                    <div style={{marginTop: 10}}>
                        <span className="label">说明：</span>
                        <Input.TextArea style={{height: 100, marginTop: 10}} onChange={this.changeText} />
                    </div> : null
                }
            </div>
        )
    }
}

export default ProductAuditRadio