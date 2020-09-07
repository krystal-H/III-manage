import React from 'react'
import {Form,Input,Row,Col,Tooltip} from 'antd'

export default function VerificationCodeInput({getFieldDecorator,imgSrc,refreshVeriCode}) {
   
    return (
        <Form.Item label="验证码">
            <Row>
                <Col span={15}>
                    {getFieldDecorator('verifyCode', {
                        rules:[{
                            required: true,
                            message: "请输入验证码"
                        },{
                            len:4,
                            message:'验证码长度为4'
                        }],
                        initialValue: '',
                        
                    })(<Input placeholder="请输入验证码" />)}
                </Col>
                <Col span={8} offset={1}>
                    <div className="code-img-wrapper">
                       
                            <img style={{height:'50px',width:'130px',cursor:'pointer'}} 
                                src={imgSrc}
                                onClick={refreshVeriCode} 
                                alt="验证码图片"/>
                        
                    </div>
                </Col>
            </Row>
        </Form.Item>
    )
}