import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Select, message, Divider, Modal, Form, Tooltip, Popconfirm } from 'antd';
import TitleTab from '../../../components/TitleTab';
import { getList, delData } from '../../../apis/gateWayMn'
import TableCom from '../../../components/Table';
import { DateTool } from '../../../util/utils';
import './index.less'
import ActionDia from './actionModel'
const FormItem = Form.Item

const gateArr = [{ value: 11133, label: 'IOT路由器' }, { value: 7710, label: 'ZigBee3.0网关' }]
function PanelMn({ form }) {
    const { getFieldDecorator, validateFields, getFieldsValue } = form;
    const [pager, setPager] = useState({ pageIndex: 1, pageRows: 10 }) //分页
    const [totalRows, setTotalRows] = useState(0)
    const [dataSource, setdataSource] = useState([])
    const [optionList, setOptionList] = useState(gateArr)
    const [addVis, setAddVis] = useState(false)
    const [actionData, setActionData] = useState({})
    const [modelType, setModelType] = useState('')
    const [loading, setLoading] = useState(false)
    const column = [
        // {
        //     title: '序号',
        //     dataIndex: 'templateId',
        //     key: 'templateId',
        //     width: 100
        // },
        {
            title: '网关名称',
            dataIndex: 'gatewayName',
            key: 'gatewayName',
        },
        {
            title: '网关ID',
            dataIndex: 'gatewayType',
            key: 'gatewayType',
        },
        {
            title: '产品名称',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: '产品型号',
            dataIndex: 'productCode',
            key: 'productCode',
        },
        {
            title: '产品ID',
            dataIndex: 'productId',
            key: 'productId',
        },
        {
            title: '产品标识',
            dataIndex: 'productMark',
            key: 'productMark'
        },
        {
            title: '操作',
            key: 'action',
            width: 180,
            render: (text, record) => (
                <span>
                    {/* <a onClick={() => { openEdit(record) }} style={{ marginRight: '10px' }}>编辑</a> */}
                    <a onClick={() => { relPanel(record) }} >删除</a>
                </span>
            ),
        }
    ]
    //删除
    const relPanel = (data) => {
        Modal.confirm({
            title: '删除',
            okText: '确定',
            cancelText: '取消',
            content: '点击确定将删除此数据。',
            onOk: () => {
                delData({ id: data.id }).then(res => {
                    message.success("删除成功");
                    getTableData()
                })
            }
        })
    }
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
        // if (getFieldsValue().templateName && getFieldsValue().templateName.trim()) {
        //     params.templateName = getFieldsValue().templateName.trim()
        // }
        if (getFieldsValue().gatewayType) {
            params.gatewayType = getFieldsValue().gatewayType
        }
        params = { ...params, ...pager }
        setLoading(true)
        getList(params).then(res => {
            if (res.data.code == 0) {
                setdataSource(res.data.data.list)
                setTotalRows(res.data.data.pager.totalRows)
            }

        }).finally(() => { setLoading(false) })
    }
    //重置
    const handleReset = () => {
        form.resetFields();
    }
    //搜索
    const searchList = () => {
        if (pager.pageIndex === 1) {
            getTableData()
        } else {
            setPager({ pageIndex: 1, pageRows: 10 })
        }
    }

    //=======
    const openEdit = (data) => {
        setModelType('edit')
        setActionData(data)
        setAddVis(true)
    }
    const openAdd = () => {
        setModelType('add')
        setAddVis(true)
    }
    const handleOk = () => {
        searchList()
        setAddVis(false)
    }
    const handleCancel = () => {
        setAddVis(false)
    }
    return (
        <div className="gatelMn-page">
            <TitleTab title="网关子设备">
                <div className='title-space'>
                    <Form layout="inline" >

                        <FormItem label="网关名称">
                            {getFieldDecorator('gatewayType')(
                                <Select style={{ width: 200 }}  allowClear>
                                    {
                                        optionList.map((item, index) => (
                                            <Select.Option key={item.value} value={item.value} label={item.label} >
                                                {item.label}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            )}
                        </FormItem>
                        {/* <FormItem label="网关ID">
                            {getFieldDecorator('templateName', {})(
                                <Input placeholder="请输入面板名称" style={{ width: 240 }} ></Input>
                            )}
                        </FormItem> */}
                        <FormItem  >
                            <Button type="primary" onClick={() => searchList()} >查询</Button>
                        </FormItem>
                        <FormItem >
                            <Button onClick={() => handleReset()}>重置</Button>
                        </FormItem>
                    </Form>
                    <Button type="primary" onClick={() => { openAdd() }} >新增子设备</Button>
                </div>
            </TitleTab>
            <Card>
                <TableCom rowKey={"id"} columns={column} dataSource={dataSource}
                    loading={loading}
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
                addVis && <ActionDia addVis={addVis} handleCancel={handleCancel} handleOk={handleOk} optionList={optionList} modelType={modelType} actionData={actionData} />
            }
        </div>
    )
}

export default Form.create()(PanelMn)