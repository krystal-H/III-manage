import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Tabs, Radio} from 'antd';
const FormItem = Form.Item;
import './style.scss'
import axios from '../../../util/api.request';
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};
const mailTy = {
    "1":'顺丰',"2":'其他'
}

function Detail({
    id,status,form:{ getFieldDecorator, validateFields, resetFields },
    closeDetail,getList
}){
    const [info, setInfo] = useState({})
    useEffect(() => {
        if(id){
            axios.Post('manage-open/moduleApplyVerify/getModuleApply',{id},{},{ headers: {"Content-Type":"application/json"}}).then( ({data={}}) => {
                let res = data.data || {};
                setInfo({...res})
              });

        }
    }, [id])
    const {productName,schemeType,moduleName,type,num,account,tel,address,mailType,expressNum,userId} = info
    const checkOk = ()=>{
        validateFields((err, value) => {
            if(!err){
                let param= {...value,id},
                    url = 'manage-open/moduleApplyVerify/flowCheckModuleApply';  
                axios.Post(url,param,{},{ headers: {"Content-Type":"application/json"}}).then((res) => {
                    console.log(1111,res)
                    closeDetail();
                    getList();
                    
                });

            }
        });
    }
    let dhtml = '',modtit = '';
    if(status==1){
        modtit = "审核";
        dhtml = <>
            <FormItem label="邮寄通道" > 
                {getFieldDecorator("mailType", {
                    initialValue:1,
                    rules: [{ required: true, message: "请选择邮寄通道" }]
                })(
                    <Radio.Group>
                        <Radio value={1}>顺丰</Radio>
                        <Radio value={2}>其他</Radio>
                    </Radio.Group>
                )}
             </FormItem>
             <FormItem label="快递单号" >
                {getFieldDecorator("expressNum", {
                    rules: [{ required: true, message: "快递单号" }]
                })(
                    <Input maxLength={50} placeholder="请输入快递单号" />
                )}
            </FormItem>
            <FormItem label="审核" > 
                {getFieldDecorator("status", {
                    rules: [{ required: true, message: "请审核是否通过" }]
                })(
                    <Radio.Group>
                        <Radio value={2}>不通过</Radio>
                        <Radio value={3}>通过</Radio>
                    </Radio.Group>
                )}
             </FormItem>
        </>
    }else{
        modtit = "查看"
        dhtml = <>
            <FormItem label="邮寄通道" > { mailType && mailTy[mailType]} </FormItem>
            <FormItem label="快递单号" > { expressNum} </FormItem>
            <FormItem label="状态" > { {"2":"不通过","3":"通过"}[status]} </FormItem>
        </>

    }
    

    return (
        <Modal
            visible={!!id}
            width={600}
            title={modtit}
            onCancel={closeDetail}
            onOk={status==1?checkOk:closeDetail}
            wrapClassName="apply-modul-auditing-infomod"
            afterClose={resetFields}
        >
            <Form {...formItemLayout}>
                <FormItem label="提交账号" > {userId} </FormItem>
                {/* <FormItem label="归属产品" >{productName}</FormItem>
                <FormItem label="方案" > {{'1':'免开发','2':'MCU方案','3':'Soc方案'}[schemeType]} </FormItem> */}
                <FormItem label="类型" > { {'1':'免费','2':'采购'}[type]} </FormItem>
                <FormItem label="数量" > {num} </FormItem>
                <FormItem label="收件人" > {account} </FormItem>
                <FormItem label="收件人电话" > {tel} </FormItem>
                <FormItem label="收件地址" > {address} </FormItem>
                {dhtml}
            </Form>
        </Modal>
    )
}
export default Form.create()(Detail);