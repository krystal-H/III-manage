import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Select, notification, Divider, Modal, Form, Tooltip, DatePicker, Upload } from 'antd';
import TitleTab from '../../../components/TitleTab';
import TableCom from '../../../components/Table';
import { upFile } from '../../../apis/repairOrder'
import { getList } from '../../../apis/bannerMn'
import AddModal from './add';
import './index.less'

const FormItem = Form.Item
// const TitleOption = TitleTab.Option
// const { RangePicker } = DatePicker;

function FirmwareMagement({ form }) {
    const [pager, setPager] = useState({ pageIndex: 1, totalRows: 0, pageRows: 10 }) //分页
    const [dataSource, setdataSource] = useState([])
    const [addVis, setAddVis] = useState(false)
    useEffect(() => {
        getTableData()
    }, [ pager.pageRows, pager.pageIndex])
    const getTableData = () => {
        getList(pager).then(res=>{
            
        })
    }
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
    //
    const handleOk = () => {
        setAddVis(false)
    }
    const handleCancel = () => {
        setAddVis(false)
    }
    const { getFieldDecorator, validateFields } = form;
    return (
        <div className="banner-page">
            <TitleTab title="平台banner管理">
                <div className='title-space'>
                    <Form layout="inline">
                        <FormItem label="">
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
                    <Button type="primary" onClick={() => { setAddVis(true) }}>新建</Button>
                </div>
            </TitleTab>
            <Card>
                <TableCom rowKey={"productId"} columns={column} dataSource={dataSource}
                    pagination={{
                        defaultCurrent: 1,
                        current: pager.pageIndex,
                        onChange: pagerChange,
                        pageSize: pager.pageRows,
                        total: pager.totalRows,
                        showQuickJumper: true,
                        pageSizeOptions: [10],
                        showTotal: () => <span>共 <a>{pager.totalRows}</a> 条</span>
                    }} />
            </Card>
            {addVis && <AddModal addVis={addVis} handleOk={handleOk} handleCancel={handleCancel}></AddModal>}
        </div>
    )
}

export default Form.create()(FirmwareMagement)
