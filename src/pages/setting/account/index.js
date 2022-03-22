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
    //状态
    const getStatus = (val = 0) => {
        let arr = ['待发布', '已上线', '已下线']
        return arr[val]
    }

    //上下线
    const offData = (id, status) => {
        let tip = status == 1 ? '是否上线' : '是否下线'
        Modal.confirm({
            title: '确认',
            okText: '确定',
            cancelText: '取消',
            content: tip,
            onOk: () => {
                relData({ id, status }).then(res => {
                    let text = status == 1 ? '上线成功' : '下线成功'
                    if (res.data.code == 0) {
                        message.success(text);
                        getTableData()
                    }

                })
            }
        })

    }
    //删除
    const delDatafn = (id) => {
        Modal.confirm({
            title: '确认',
            okText: '确定',
            cancelText: '取消',
            content: '是否删除此banner',
            onOk: () => {
                delData({ id }).then(res => {
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
            title: '账户名',
            dataIndex: 'accountName',
            key: 'accountName',
        },
        {
            title: '厂商名称',
            dataIndex: 'uploadTime',
            key: 'uploadTime',
            render(uploadTime) {
                return uploadTime && DateTool.utcToDev(uploadTime);
            }
        },
        {
            title: '账号类型',
            dataIndex: 'showStartTime',
            key: 'showStartTime',
            render(showStartTime) {
                return showStartTime && DateTool.utcToDev(showStartTime);
            }
        },
        {
            title: '创建时间',
            dataIndex: 'showEndTime',
            key: 'showEndTime',
            render(showEndTime) {
                return showEndTime && DateTool.utcToDev(showEndTime);
            }
        },
        {
            title: '更新时间',
            dataIndex: 'status',
            key: 'status',
            render(status) {
                return getStatus(status);
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
            {addVis && <AddModal addVis={addVis} handleOk={handleOk} handleCancel={handleCancel}></AddModal>}
            {editVis && <EditModal editVis={editVis} handleOk={handleOk} handleCancel={closeInfo} type={modalType}></EditModal>}
        </div>
    )
}

export default Form.create()(FirmwareMagement)
