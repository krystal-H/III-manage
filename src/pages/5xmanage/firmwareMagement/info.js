import React, { useState, useEffect, useMemo } from 'react';
import { Card, Input, Button, Select, message, Radio, Modal, Form, Tooltip, Popconfirm } from 'antd';
import TitleTab from '../../../components/TitleTab';
import { lookData } from '../../../apis/firmwareMagement'
import { DateTool } from '../../../util/utils';

const FormItem = Form.Item
const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
function PanelMn({ form, handleCancel, infoVisible, actionData }) {
    const { getFieldDecorator, validateFields, getFieldsValue, getFieldValue } = form;
    const [firmwareData, setFirmwareData] = useState({})
    useEffect(() => {
        lookData({ productId: actionData.productId }).then(res => {
            setFirmwareData(res.data.data)
        })
    }, [])
    const getText = (value, data) => {
        let result = data.find(item => {
            if (item.k == value) {
                return item
            }
        })
        result = result || {}
        return result.k + ' - ' + result.v
    }
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
                        <Form.Item label="固件名称/固件Key" className="txt-color">{firmwareData.burnFileName || '-'}</Form.Item>
                        <Form.Item label="固件版本" className="txt-color">{firmwareData.burnFileVersion || '-'}</Form.Item>
                        {
                            // JSON.parse(sessionStorage.getItem('productItem')).schemeType == 1 &&
                            firmwareData.firmwareModuleList && firmwareData.firmwareModuleList.map(item => (
                                item.firmwareFuncList && item.firmwareFuncList.map((ele, index) => (
                                    <>
                                        {
                                            ele.dataType.type === 'int' &&
                                            <Form.Item key={ele.funcName} label={ele.funcName} className="txt-color">{ele.dataType.specs.value}</Form.Item>
                                        }
                                        {
                                            ele.dataType.type === 'enum' && <div key={ele.funcName}>
                                                <Form.Item label={ele.funcName} className="txt-color">
                                                    {getText(ele.dataType.specs.value, ele.dataType.specs.def.concat(ele.dataType.specs.defaultValue))}</Form.Item>

                                            </div>
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