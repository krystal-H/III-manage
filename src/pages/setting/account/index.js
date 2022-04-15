import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Select, notification, Divider, Modal, Form,  message } from 'antd';
import TitleTab from '../../../components/TitleTab';
import TableCom from '../../../components/Table';
import { getList } from '../../../apis/accountMn'
import AddModal from './add';
import EditModal from './edit';
import './style.less'
import { DateTool } from '../../../util/utils';

const FormItem = Form.Item
// const TitleOption = TitleTab.Option
// const { RangePicker } = DatePicker;

function FirmwareMagement({ form }) {
    const [pager, setPager] = useState({ pageIndex: 1, pageRows: 10 }) //分页
    const { getFieldDecorator, validateFields, getFieldsValue } = form;
    const [totalRows, setTotalRows] = useState(0)
    const [dataSource, setdataSource] = useState([])
    const [addVis, setAddVis] = useState(false)
    const [editVis, setEditVis] = useState(false)
    const [modalType,setModalType]= useState('')//详情/重置
    const [actionData, setActionData] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        getTableData()
    }, [pager.pageRows, pager.pageIndex])
    //列表
    const getTableData = () => {
        let params = {accountName:''}
        if (getFieldsValue().accountName && getFieldsValue().accountName.trim()) {
            params.accountName = getFieldsValue().accountName.trim()
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
    const column = [
        {
            title: '账户名',
            dataIndex: 'accountName',
            key: 'accountName',
        },
        {
            title: '厂商名称',
            dataIndex: 'manufacturerName',
            key: 'manufacturerName'
        },
        {
            title: '账号类型',
            dataIndex: 'accountType',
            key: 'accountType'
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render(createTime) {
                return createTime && DateTool.utcToDev(createTime);
            }
        },
        {
            title: '更新时间',
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
            render: (text, record) => {
                return<div>
                    <a style={{marginRight:'10px'}} onClick={()=>{openInfo(record,'info')}}>查看</a>
                    <a onClick={()=>{openInfo(record,'reset')}}>重置密码</a>
                </div>
            }
        }
    ]
    //重置/详情
    const openInfo=(data,type)=>{
        setActionData(data)
        setModalType(type)
        setEditVis(true)
    }
    //关闭详情
    const closeInfo=()=>{
        setEditVis(false)
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

    const searchList = () => {
        if (pager.pageIndex == 1) {
            getTableData()
        } else {
            setPager({ pageIndex: 1, pageRows: 10 })
        }
    }
    const onReset = () => {
        form.resetFields();
    }
    //
    const handleOk = () => {
        getTableData()
        setAddVis(false)
    }
    const handleCancel = () => {
        setAddVis(false)
    }
    //
    const handleResetOk=()=>{
        setEditVis(false)
        getTableData()
    }
    return (
        <div className="account-page">
            <TitleTab title="厂商账号管理">
                <div className='title-space'>
                    <Form layout="inline">
                        <FormItem label="账号名称">
                            {getFieldDecorator('accountName')(
                                <Input placeholder="输入账号名称" style={{ width: 240 }} ></Input>
                            )}
                        </FormItem>
                        <FormItem  >
                            <Button type="primary" onClick={() => searchList()} >查询</Button>
                        </FormItem>
                        <FormItem >
                            <Button onClick={() => onReset()}>重置</Button>
                        </FormItem>
                    </Form>
                    <Button type="primary" onClick={() => { setAddVis(true) }}>新建</Button>
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
            {addVis && <AddModal addVis={addVis} handleOk={handleOk} handleCancel={handleCancel} ></AddModal>}
            {editVis && <EditModal editVis={editVis} handleOk={handleResetOk} handleCancel={closeInfo} type={modalType} actionData={actionData}></EditModal>}
        </div>
    )
}

export default Form.create()(FirmwareMagement)
