import React, { useState, useEffect, useMemo } from 'react';
import { Card, Input, Button, Select, message, Radio, Modal, Form } from 'antd';
import TitleTab from '../../../components/TitleTab';
import { lookCheckData } from '../../../apis/firmwareMagement'
import { DateTool } from '../../../util/utils';

const FormItem = Form.Item
const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
function PanelMn({ form, handleCancel, infoVisible, actionData }) {
    const [data, setData] = useState([])
    useEffect(() => {
        console.log(0.11 + 0.1)
        lookCheckData({ id: actionData.id, productId: actionData.productId }).then(res => {
            if (res.data.code == 0) {
                setData(res.data.data.productFirmwareTypeList)
            }
        })
    }, [])
    return (
        <div >
            <Modal
                title="审核信息"
                visible={infoVisible}
                onCancel={handleCancel}
                width='600px'
                maskClosable={false}
                footer={false}
            >
                <div className='firm-model-wrap'>
                    <Form {...formItemLayout} >
                        {
                            data.map((item, index) => {
                                return <div key={index} className='firm-item'> <FormItem label={`${item.deviceVersionType == 1 ? '插件' : '模块'}名称`}>
                                    <span>{item.firmwareTypeName}</span>
                                </FormItem>
                                    <FormItem label={`${item.deviceVersionType == 1 ? '插件' : '模块'}编号`}>
                                        <span>{item.firmwareTypeNo}</span>
                                    </FormItem>
                                </div>
                            })
                        }
                    </Form>
                </div>
            </Modal>
        </div>
    )
}

export default Form.create()(PanelMn)