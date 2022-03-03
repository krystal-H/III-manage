import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Select, notification, Divider, Modal, Form, Tooltip, DatePicker, Upload, message, Table } from 'antd';
import { getList, delData, addDataApi } from '../../../apis/mallClassify'
import { DateTool } from '../../../util/utils';
import './index.scss'
const FormItem = Form.Item
const { Search } = Input;
// const TitleOption = TitleTab.Option
// const { RangePicker } = DatePicker;

function FirmwareMagement({ form }) {
    const [pager, setPager] = useState({ pageIndex: 1, pageRows: 10 }) //分页
    const { getFieldDecorator, validateFields, getFieldsValue } = form;
    const [totalRows, setTotalRows] = useState(0)
    const [searchData, setsearchData] = useState('')  //搜索
    const [dataSource, setdataSource] = useState([])
    const [addVis, setAddVis] = useState(false)
    const [modelType, setModelType] = useState('add')
    const [actionData, setActionData] = useState({})
    const [loading, setLoading] = useState(false)
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };
    useEffect(() => {
        getTableData()
    }, [pager.pageRows, pager.pageIndex])
    //列表
    const getTableData = () => {
        return
        setLoading(true)
        getList(pager).then(res => {
            if (res.data.code == 0) {
                res.data.data.records.forEach((item, index) => {
                    item.key = index + 1
                })
                setdataSource(res.data.data.records)
                setTotalRows(res.data.data.total)
            }
        }).finally(() => { setLoading(false) })
    }

    //删除
    const delDataFn = (row) => {
        Modal.confirm({
            title: '确认',
            okText: '确定',
            cancelText: '取消',
            content: '是否删除此数据',
            onOk: () => {
                delData(row.id).then(res => {
                    if (res.data.code == 0) {
                        message.success('删除成功');
                        getTableData()
                    }
                })
            }
        })

    }
    const column = [
        {
            title: '编号',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: '订单号',
            dataIndex: 'classifyName',
            key: 'classifyName',
            render: (text) => <span title={text}>{text}</span>
        },
        {
            title: '用户',
            dataIndex: 'classifyValue',
            key: 'classifyValue',
            render: (text) => <span title={text}>{text}</span>
        },
        {
            title: '订单金额',
            dataIndex: 'updateTime',
            key: 'updateTime',
        },
        {
            title: '实付金额',
            dataIndex: 'classifyValue',
            key: 'classifyValue',
            render: (text) => <span title={text}>{text}</span>
        },
        {
            title: '支付方式',
            dataIndex: 'classifyValue',
            key: 'classifyValue',
            render: (text) => <span title={text}>{text}</span>
        },
        {
            title: '订单状态',
            dataIndex: 'classifyValue',
            key: 'classifyValue',
            render: (text) => <span title={text}>{text}</span>
        },
        {
            title: '创建时间',
            dataIndex: 'classifyValue',
            key: 'classifyValue',
            render: (text) => <span title={text}>{text}</span>
        },
        {
            title: '操作',
            key: 'action',
            width: 200,
            render(_, row) {
                return <span>
                    <a style={{ marginRight: '10px' }} onClick={() => { editData(row) }}>编辑</a>
                    <a onClick={() => { delDataFn(row) }}>删除</a>
                </span>
            }
        }
    ]

    //编辑
    const editData = (row) => {
        setModelType('edit')
        setActionData(row)
        setAddVis(true)
    }
    //新增
    const addData = () => {
        setModelType('add')
        setAddVis(true)
    }
    //提交
    const handleOk = () => {
        validateFields().then(val => {
            let params = { ...val }
            if (modelType === 'edit') {
                params.id = actionData.id
            }
            addDataApi(params).then(res => {
                if (res.data.code == 0) {
                    message.success('新增成功');
                    getTableData()
                    setAddVis(false)
                }
            })
        })

    }
    const handleCancel = () => {
        setAddVis(false)
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
    return (
        <div className="mall-order-page">
            <Card>
                <div className='order-top'>
                    <Search
                        enterButton="搜索"
                        value={searchData}
                        onChange={(e) => { setsearchData(e.target.value) }}
                        onSearch={getTableData}
                        allowClear
                    />
                </div>
                <Table rowKey={"id"} columns={column} dataSource={dataSource}
                    loading={loading}
                    pagination={{
                        defaultCurrent: 1,
                        current: pager.pageIndex,
                        onChange: pagerChange,
                        pageSize: pager.pageRows,
                        total: totalRows,
                        showQuickJumper: true,
                        showTotal: () => <span>共 <a>{totalRows}</a> 条</span>
                    }}
                />
            </Card>
            {
                addVis && <Modal
                    title={modelType === 'add' ? '新增分类' : '编辑分类'}
                    visible={addVis}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form {...formItemLayout} >
                        <FormItem label="分类名称">
                            {getFieldDecorator('classifyName', {
                                initialValue: modelType === 'add' ? '' : actionData.classifyName
                                , rules: [{ required: true, message: '请输入分类名称' }]
                            })(
                                <Input  ></Input>
                            )}
                        </FormItem>
                        <FormItem label="排序值">
                            {getFieldDecorator('classifyValue', {
                                initialValue: modelType === 'add' ? '' : actionData.classifyValue, getValueFromEvent: (e) => {
                                    const val = e.target.value;
                                    return val.replace(/[^\d]/g, '');
                                }
                            })(
                                <Input  ></Input>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            }
        </div>
    )
}

export default Form.create()(FirmwareMagement)
