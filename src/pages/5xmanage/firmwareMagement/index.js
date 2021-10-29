import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Select, message, Radio, Modal, Form, Tooltip, Popconfirm } from 'antd';
import TitleTab from '../../../components/TitleTab';
import { getList, relData } from '../../../apis/panelMn'
import { getOrderType } from '../../../apis/physical'
import TableCom from '../../../components/Table';
import { DateTool } from '../../../util/utils';

const FormItem = Form.Item
const optionArr = [{ value: 1, label: '待审核' }, { value: 1, label: '已通过' }, { value: 1, label: '不通过' }]

function PanelMn({ form }) {
    const { getFieldDecorator, validateFields, getFieldsValue } = form;
    const [pager, setPager] = useState({ pageIndex: 1, pageRows: 10 }) //分页
    const [totalRows, setTotalRows] = useState(0)
    const [dataSource, setdataSource] = useState([])
    const [checkVisible, setCheckVisible] = useState(false)
    const [actionData, setActionData] = useState({})
    const column = [
        {
            title: '提交账号',
            dataIndex: 'developerId',
            key: 'developerId',
            width: 100
        },
        {
            title: '提交时间',
            dataIndex: 'templateName',
            key: 'templateName',
        },
        {
            title: '归属产品',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: '方案',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render(status) {
                return <span>{status ? '正式' : '草稿'}</span>;
            }
        },
        {
            title: '模组名称',
            dataIndex: 'moduleName',
            key: 'moduleName',
            render(createTime) {
                return createTime && DateTool.utcToDev(createTime);
            }
        },
        {
            title: '上传的固件名称',
            dataIndex: 'burnFileName',
            key: 'burnFileName',
            render(modifyTime) {
                return modifyTime && DateTool.utcToDev(modifyTime);
            }
        },
        {
            title: '固件标识',
            dataIndex: 'modifyTime',
            key: 'modifyTime',
            render(modifyTime) {
                return modifyTime && DateTool.utcToDev(modifyTime);
            }
        }, {
            title: '固件版本',
            dataIndex: 'burnFileVersion',
            key: 'burnFileVersion',
            render(modifyTime) {
                return modifyTime && DateTool.utcToDev(modifyTime);
            }
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render(modifyTime) {
                return modifyTime && DateTool.utcToDev(modifyTime);
            }
        },
        {
            title: '操作',
            key: 'action',
            width: 180,
            render: (text, record) => (
                <span>
                    {
                        <a onClick={() => { openEdit(record) }}>更新</a>

                    }
                </span>
            ),
        }
    ]


    //页码改变
    const pagerChange = (pageIndex, pageRows) => {
        if (pageRows === pager.pageRows) {
            setPager(pre => {
                let obj = JSON.parse(JSON.stringify(pre))
                return Object.assign(obj, { pageIndex, pageRows })
            })
        } else {
            setPager(pre => {
                let obj = JSON.parse(JSON.stringify(pre))
                return Object.assign(obj, { pageIndex: 1, pageRows })
            })
        }

    }
    useEffect(() => {
        getTableData()
    }, [pager.pageRows, pager.pageIndex])
    //列表
    const getTableData = () => {
        let params = {}
        if (getFieldsValue().templateName && getFieldsValue().templateName.trim()) {
            params.templateName = getFieldsValue().templateName.trim()
        }
        if (getFieldsValue().deviceTypeId) {
            params.deviceTypeId = getFieldsValue().deviceTypeId
        }
        params = { ...params, ...pager }
        getList(params).then(res => {
            if (res.data.code == 0) {
                setdataSource(res.data.data.list)
                setTotalRows(res.data.data.pager.totalRows)
            }

        })
    }
    //重置
    const handleReset = () => {
        form.resetFields();
    }
    //搜索
    const searchList = () => {
        if (pager.pageIndex == 1) {
            getTableData()
        } else {
            setPager({ pageIndex: 1, pageRows: 10 })
        }
    }

    //=======
    const openEdit = (data) => {
        setActionData(data)
        setCheckVisible(true)
    }
    const handleOk = () => {
        setCheckVisible(false)
    }
    const handleCancel = () => {
        setCheckVisible(false)
    }
    const [status, setStatus] = useState('a')
    const changeStatus = val => {
        setStatus(val.target.value)
    }
    return (
        <div className="panelMn-page">
            <TitleTab title="用户免开发固件上传信息">
                <Form layout="inline" >
                    <FormItem label="产品ID">
                        {getFieldDecorator('templateName', {
                            getValueFromEvent: (e) => {
                                const val = e.target.value;
                                return val.replace(/[^\d]/g, '');
                            }
                        })(
                            <Input placeholder="请输入产品ID" style={{ width: 240 }} ></Input>
                        )}
                    </FormItem>
                    <FormItem label="状态">
                        {getFieldDecorator('deviceTypeId')(
                            <Select style={{ width: 160 }} placeholder="请选择状态">
                                {
                                    optionArr.map((item, index) => (
                                        <Select.Option key={item.value} value={item.value} label={item.label}>
                                            {item.label}
                                        </Select.Option>
                                    ))
                                }
                            </Select>
                        )}
                    </FormItem>

                    <FormItem  >
                        <Button type="primary" onClick={() => searchList()} >查询</Button>
                    </FormItem>
                    <FormItem >
                        <Button onClick={() => handleReset()}>重置</Button>
                    </FormItem>
                </Form>
            </TitleTab>
            <Card>
                <TableCom rowKey={"templateId"} columns={column} dataSource={dataSource}
                    pagination={{
                        defaultCurrent: 1,
                        current: pager.pageIndex,
                        onChange: pagerChange,
                        pageSize: pager.pageRows,
                        total: totalRows,
                        showQuickJumper: true,
                        showTotal: () => <span>共 <a>{totalRows}</a> 条</span>
                    }} />
            </Card>
            {
                <Modal
                    title="固件审核"
                    visible={checkVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <span>审核结果：</span>
                        <Radio.Group value={status} buttonStyle="solid" onChange={changeStatus}>
                            <Radio.Button value="a">通过</Radio.Button>
                            <Radio.Button value="b">不通过</Radio.Button>
                        </Radio.Group>
                    </div>
                </Modal>
            }
        </div>
    )
}

export default Form.create()(PanelMn)