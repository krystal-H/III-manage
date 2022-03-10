import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Select, notification, Divider, Modal, Form, Tooltip, DatePicker, Upload, message, Table } from 'antd';
import { getList, changeStatus } from '../../../apis/mallUser'
import { DateTool } from '../../../util/utils';
import './index.scss'
const FormItem = Form.Item
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
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };
    useEffect(() => {
        getTableData()
    }, [pager.pageRows, pager.pageIndex])
    //列表
    const getTableData = () => {
        // return
        setLoading(true)
        getList({ pager }).then(res => {
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
    const changeUser = (row) => {
        let params = {
            status: row.status ? 0 : 1,
            userId: row.userId
        }
        Modal.confirm({
            title: '确认',
            okText: '确定',
            cancelText: '取消',
            content: `是否${row.status ? '禁用账户' : '解除锁定'}`,
            onOk: () => {
                changeStatus(params).then(res => {
                    if (res.data.code == 0) {
                        message.success(`${row.status ? '禁用账户' : '解除锁定'}成功`);
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
            width: 70,
        },
        {
            title: '账户名',
            dataIndex: 'userName',
            key: 'userName',
            render: (text) => <span title={text}>{text}</span>
        },
        {
            title: '身份状态',
            dataIndex: 'status',
            key: 'status',
            render: (text) => <span title={text ? '正常' : '禁用'}>{text ? '正常' : '禁用'}</span>
        },
        {
            title: '注册时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render(createTime) {
                return createTime && DateTool.utcToDev(createTime);
            }
        },
        {
            title: '操作',
            key: 'action',
            width: 200,
            render(_, row) {
                return <a onClick={() => { changeUser(row) }}>{row.status ? '禁用账户' : '解除锁定'}</a>
            }
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
    return (
        <div className="classify-page">
            <Card>
                {/* <div className='classify-top'><Button type='primary' onClick={addData}>新增分类</Button></div> */}
                <Table rowKey={"userId"} columns={column} dataSource={dataSource}
                    loading={loading}
                    bordered
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
        </div>
    )
}

export default Form.create()(FirmwareMagement)
