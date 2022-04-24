import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Tabs, Modal, Form, Tooltip, DatePicker, Upload, message, Table } from 'antd';
import { getList, delData, addDataApi } from '../../../apis/mallClassify'
import { DateTool } from '../../../util/utils';
import './index.scss'
const FormItem = Form.Item
const { TabPane } = Tabs
// const TitleOption = TitleTab.Option
// const { RangePicker } = DatePicker;

function FirmwareMagement({ form }) {
    const [pager, setPager] = useState({ pageIndex: 1, pageRows: 10 }) //分页
    const { getFieldDecorator, validateFields, getFieldsValue } = form;
    const [totalRows, setTotalRows] = useState(0)
    const [dataSource, setdataSource] = useState([])
    const [addVis, setAddVis] = useState(false)
    const [modelType, setModelType] = useState('add')
    const [actionData, setActionData] = useState({})
    const [loading, setLoading] = useState(false)
    const [currentTab, setCurrentTab] = useState('0')
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };
    useEffect(() => {
        getTableData()
    }, [pager.pageRows, pager.pageIndex, currentTab])
    //列表
    const getTableData = () => {
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
            title: '分类名称',
            dataIndex: 'classifyName',
            key: 'classifyName',
            render: (text) => <span title={text}>{text}</span>
        },
        {
            title: '排序值',
            dataIndex: 'classifyValue',
            key: 'classifyValue',
            render: (text) => <span title={text}>{text}</span>
        },
        {
            title: '编辑时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
            render(updateTime) {
                return updateTime && DateTool.utcToDev(updateTime);
            }
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

    // 切换tab
    const tabChange = (val) => {
        console.log(val)
        setCurrentTab(val)
        // 拉列表数据
        setPager({ pageIndex: 1, pageRows: 10 })
    }

    const classifiyTypeMap = ['硬件产品', '通信模组']
    return (
        <div className="classify-page">
            <Card>
                <div className='top-flex'>
                    <Tabs activeKey={currentTab} onChange={val => tabChange(val)}>
                        {
                            classifiyTypeMap.map((item, index) => {
                                return <TabPane tab={`${item}`} key={index + ""}></TabPane>
                            })
                        }
                    </Tabs>
                    <div className='classify-top'><Button type='primary' onClick={addData}>新增分类</Button></div>
                </div>
                <Table rowKey={"id"} columns={column} dataSource={dataSource}
                    loading={loading}
                    bordered
                    pagination={{
                        defaultCurrent: 1,
                        current: pager.pageIndex,
                        onChange: pagerChange,
                        pageSize: pager.pageRows,
                        total: dataSource.length,
                        showQuickJumper: true,
                        showTotal: () => <span>共 <a>{dataSource.length}</a> 条</span>
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
