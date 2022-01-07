import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Select, message, Radio, Modal, Form, Tooltip, Popconfirm } from 'antd';
import TitleTab from '../../../components/TitleTab';
import { getList, relData } from '../../../apis/firmwareMagement'
import TableCom from '../../../components/Table';
import { DateTool } from '../../../util/utils';
import CheckModal from './check'
import InfoModal from './info'
import './index.less'
const FormItem = Form.Item
const optionArr = [{ value: 1, label: '待审核' }, { value: 2, label: '已通过' }]

function PanelMn({ form }) {
    const { getFieldDecorator, validateFields, getFieldsValue } = form;
    const [pager, setPager] = useState({ pageIndex: 1, pageRows: 10 }) //分页
    const [totalRows, setTotalRows] = useState(0)
    const [dataSource, setdataSource] = useState([])
    const [checkVisible, setCheckVisible] = useState(false)
    const [infoVisible, setInfoVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [actionData, setActionData] = useState({})
    const column = [
        {
            title: '提交账号',
            dataIndex: 'account',
            key: 'account',
            width: 100,
            render: (text) => <span title={text}>{text}</span>
        },
        {
            title: '提交时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render(createTime) {
                return createTime && DateTool.utcToDev(createTime);
            }
        },
        {
            title: '归属产品',
            dataIndex: 'productName',
            key: 'productName',
            render: (text) => <span title={text}>{text}</span>
        },
        {
            title: '方案',
            dataIndex: 'schemeType',
            key: 'schemeType',
            width: 100,
            render(schemeType) {
                return <span>免开发</span>
            }
        },
        {
            title: '模组名称',
            dataIndex: 'moduleName',
            key: 'moduleName',
            render: (text) => <span title={text}>{text}</span>

        },
        {
            title: '上传的固件名称',
            dataIndex: 'burnFileName',
            key: 'burnFileName',
            render: (text,row) => <span >
                {text && <>{text}
                <a style={{marginLeft:'3px'}} onClick={() => { openInfo(row) }}>查看</a></>}
            </span>
        },
        {
            title: '固件标识',
            dataIndex: 'firmwareId1',
            key: 'firmwareId1',
        }, {
            title: '固件版本',
            dataIndex: 'burnFileVersion',
            key: 'burnFileVersion'
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => {
                if (text === 1) {
                    return <span>待审核</span>
                } else if (text === 2) {
                    return <span style={{ color: '#008000' }}>已通过</span>
                } else if (text === 3) {
                    return <span>未通过</span>
                }
                return ''
            }
        },
        {
            title: '操作',
            width: 200,
            key: '',
            render: (val, record) => {
                let text = record.status
                if (text ==1) {
                    return <a onClick={() => { openEdit(record) }}>审核</a>
                }
                return ''
            }
        }
    ]
    const openInfo = data => {
        setActionData(data)
        setInfoVisible(true)
    }
    const closeInfo = () => {
        setInfoVisible(false)
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
        if (getFieldsValue().productId && getFieldsValue().productId.trim()) {
            params.productId = getFieldsValue().productId.trim()
        }
        if (getFieldsValue().status) {
            params.status = getFieldsValue().status
        }
        params = { ...params, ...pager }
        setLoading(true)
        getList(params).then(res => {
            if (res.data.code == 0) {
                setdataSource(res.data.data.records)
                setTotalRows(res.data.data.totalRows)
            }
        }).finally(() => { setLoading(false) })
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
        getTableData()
    }
    const handleCancel = () => {
        setCheckVisible(false)
    }
    return (
        <div className="panelMn-page" style={{ minWidth: '1200px' }}>
            <TitleTab title="用户免开发固件上传信息">
                <Form layout="inline" >
                    <FormItem label="产品ID">
                        {getFieldDecorator('productId', {
                            getValueFromEvent: (e) => {
                                const val = e.target.value;
                                return val.replace(/[^\d]/g, '');
                            }
                        })(
                            <Input placeholder="请输入产品ID" style={{ width: 240 }} allowClear></Input>
                        )}
                    </FormItem>
                    <FormItem label="状态">
                        {getFieldDecorator('status')(
                            <Select style={{ width: 160 }} placeholder="请选择状态" allowClear>
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
                checkVisible && <CheckModal checkVisible={checkVisible} handleOk={handleOk} handleCancel={handleCancel} actionData={actionData} />
            }
            {
                infoVisible && <InfoModal infoVisible={infoVisible} handleCancel={closeInfo} actionData={actionData}/>
            }
        </div>
    )
}

export default Form.create()(PanelMn)