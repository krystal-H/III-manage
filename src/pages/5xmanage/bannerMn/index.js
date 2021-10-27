import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Select, notification, Divider, Modal, Form, Tooltip, DatePicker, Upload, message } from 'antd';
import TitleTab from '../../../components/TitleTab';
import TableCom from '../../../components/Table';
import { getList, relData,delData } from '../../../apis/bannerMn'
import AddModal from './add';
import './index.less'
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
    const [showImg, setShowImg] = useState(false)
    const [actionData, setActionData] = useState({})
    useEffect(() => {
        getTableData()
    }, [pager.pageRows, pager.pageIndex])
    //列表
    const getTableData = () => {
        let params = {}
        if (getFieldsValue().bannerName && getFieldsValue().bannerName.trim()) {
            params.bannerName = getFieldsValue().bannerName.trim()
        }
        params = { ...params, ...pager }
        getList(params).then(res => {
            if (res.data.code == 0) {
                setdataSource(res.data.data.list)
                setTotalRows(res.data.data.pager.totalRows)
            }
        })
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
            title: 'banner名称',
            dataIndex: 'bannerName',
            key: 'bannerName',
        },
        {
            title: '上传时间',
            dataIndex: 'uploadTime',
            key: 'uploadTime',
            render(uploadTime) {
                return uploadTime && DateTool.utcToDev(uploadTime);
            }
        },
        {
            title: '计划展示开始时间',
            dataIndex: 'showStartTime',
            key: 'showStartTime',
            render(showStartTime) {
                return showStartTime && DateTool.utcToDev(showStartTime);
            }
        },
        {
            title: '计划展示结束时间',
            dataIndex: 'showEndTime',
            key: 'showEndTime',
            render(showEndTime) {
                return showEndTime && DateTool.utcToDev(showEndTime);
            }
        },
        {
            title: '状态',
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
                if (record.status == 1) {
                    return <span className='comman-table-margin'>
                        <a onClick={() => { lookData(record) }}>查看图片</a>
                        <a onClick={() => { offData(record.id, 2) }}>下线</a>
                    </span>
                } else if (record.status == 0) {
                    return <span className='comman-table-margin'>
                        <a onClick={() => { lookData(record) }}>查看图片</a>
                        <a onClick={() => { offData(record.id, 1) }}>上线</a>
                        <a onClick={() => { delDatafn(record.id) }}>删除</a>
                    </span>
                } else if (record.status == 2) {
                    return <span className='comman-table-margin'>
                        <a onClick={() => { lookData(record) }}>查看图片</a>
                        <a onClick={() => { offData(record.id, 1) }}>上线</a>
                        <a onClick={() => { delDatafn(record.id) }}>删除</a>
                    </span>
                }
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

    const searchList = () => {
        if (pager.pageIndex == 1) {
            getTableData()
        } else {
            setPager({ pageIndex: 1, pageRows: 10 })
        }
    }
    //
    const lookData = (data) => {
        setActionData(data)
        setShowImg(true)
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
        <div className="banner-page">
            <TitleTab title="平台banner管理">
                <div className='title-space'>
                    <Form layout="inline">
                        <FormItem label="">
                            {getFieldDecorator('bannerName')(
                                <Input placeholder="输入名称查询" style={{ width: 240 }} ></Input>
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
            {
                showImg && <Modal
                    title="查看图片"
                    visible={showImg}
                    width={1200}
                    footer={null}
                    onCancel={() => { setShowImg(false) }}
                >
                    <div className='banner-img-wrap'>
                        <img src={actionData.imageUrl}/>
                    </div>
                </Modal>
            }
        </div>
    )
}

export default Form.create()(FirmwareMagement)
