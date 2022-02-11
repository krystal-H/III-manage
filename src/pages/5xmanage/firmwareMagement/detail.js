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
    return (
        <div >
            <Modal
                title="审核信息"
                visible={infoVisible}
                onCancel={handleCancel}
                width='800px'
                maskClosable={false}
                footer={false}
            >
                <div className='firm-model-wrap'>

                </div>
            </Modal>
        </div>
    )
}

export default Form.create()(PanelMn)