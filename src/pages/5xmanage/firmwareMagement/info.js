import React, { useState, useEffect, useMemo } from 'react';
import { Card, Input, Button, Select, message, Radio, Modal, Form, Tooltip, Popconfirm } from 'antd';
import TitleTab from '../../../components/TitleTab';
import {lookData } from '../../../apis/firmwareMagement'
import { DateTool } from '../../../util/utils';

const FormItem = Form.Item
const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
function PanelMn({ form, handleCancel, infoVisible,actionData }) {
    const { getFieldDecorator, validateFields, getFieldsValue, getFieldValue } = form;
    const [firmwareData,setFirmwareData]=useState({})
    useEffect(() => {
        lookData({productId:actionData.productId}).then(res=>{
            setFirmwareData(res.data.data)
        })
    }, [])
    return (
        <div >
            <Modal
                title="固件信息"
                visible={infoVisible}
                onCancel={handleCancel}
                width='800px'
                maskClosable={false}
                footer={false}
            >
                <div className='firm-model-wrap'>
                    <Form {...formItemLayout} >
                        {/* <FormItem label="物模型选择">
                            <span>嘿嘿嘿</span>
                        </FormItem> */}
                        <Form.Item label="固件名称/固件Key" className="txt-color">{firmwareData.burnFileName || '-'}</Form.Item>
                        <Form.Item label="固件版本" className="txt-color">{firmwareData.burnFileVersion || '-'}</Form.Item>
                        {
                            // JSON.parse(sessionStorage.getItem('productItem')).schemeType == 1 &&
                            firmwareData.firmwareModuleList && firmwareData.firmwareModuleList.map(item => (
                                item.firmwareFuncList && item.firmwareFuncList.map((ele, index) => (
                                    <>
                                        {
                                            ele.dataType.type === 'int' &&
                                            <Form.Item key={ele.funcName} label={ele.funcName} className="txt-color">{ele.dataType.specs.defaultValue}</Form.Item>
                                        }
                                        {
                                            ele.dataType.type === 'enum' &&
                                            <Form.Item key={ele.funcName} label={ele.funcName} className="txt-color">{ele.dataType.specs.defaultValue[0].k}</Form.Item>
                                        }
                                    </>
                                ))
                            ))
                        }
                    </Form>

                </div>
            </Modal>
        </div>
    )
}

export default Form.create()(PanelMn)