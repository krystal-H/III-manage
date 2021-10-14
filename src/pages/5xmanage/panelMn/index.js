import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Select, notification, Divider, Modal, Form, Tooltip } from 'antd';
import TitleTab from '../../../components/TitleTab';
import TableCom from '../../../components/Table';
import './index.less'

const FormItem = Form.Item
const TitleOption = TitleTab.Option


function FirmwareMagement({ form }) {
    const [pager, setpager] = useState({
        totalRows: 0,
        pageIndex: 0
    })
    const [dataSource, setdataSource] = useState([])
    const column = [
        {
            title: 'banner名称',
            dataIndex: '',
            key: '',
        },
        {
            title: '上传时间',
            dataIndex: '',
            key: '',
        },
        {
            title: '计划展示开始时间',
            dataIndex: '',
            key: '',
        },
        {
            title: '计划展示结束时间',
            dataIndex: '',
            key: '',
        },
        {
            title: '状态',
            dataIndex: '',
            key: '',
        },
        {
            title: '操作',
            key: 'action',
            width: 100,
            render: (text, record) => (
                <span>
                    {
                        record.status !== 1 ?
                            <a onClick={() => { audit(record) }}>审核</a>
                            :
                            <a onClick={() => { checkDetail(record) }}>查看</a>
                    }
                </span>
            ),
        }
    ]

    // 审核
    const audit = () => { }
    // 查看
    const checkDetail = () => { }

    const searchList = () => {

    }

    const onReset = () => {

    }

    const onPageChange = () => {

    }

    const { getFieldDecorator, validateFields } = form;
    return (
        <div className="firmwareMagement-page">
            <TitleTab title="平台banner管理">
                <div>
                    <Form layout="inline">
                        <FormItem label="产品ID">
                            {getFieldDecorator('productId')(
                                <Input placeholder="输入名称查询" style={{ width: 240 }} onPressEnter={() => searchList()}></Input>
                            )}
                        </FormItem>
                        <FormItem  >
                            <Button type="primary" onClick={() => searchList()} >查询</Button>
                        </FormItem>
                        <FormItem >
                            <Button onClick={() => onReset()}>重置</Button>
                        </FormItem>
                    </Form>
                    <Button type="primary"  >新建</Button>
                </div>
            </TitleTab>
            <Card>
                <TableCom rowKey={"productId"} columns={column} dataSource={dataSource}
                    pager={pager} onPageChange={() => onPageChange()} />
            </Card>
        </div>
    )
}

export default Form.create()(FirmwareMagement)