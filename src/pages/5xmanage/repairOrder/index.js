import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Select, notification, Divider, Modal, Form, Cascader, message } from 'antd';
import TitleTab from '../../../components/TitleTab';
import TableCom from '../../../components/Table';
import { getList, getOrderType, getCallback } from '../../../apis/repairOrder'
import { DateTool } from '../../../util/utils';
import './index.less'
const FormItem = Form.Item
const TitleOption = TitleTab.Option

const modeList = {
    0: '开发中',
    1: '已发布',
    2: '审核中'
}
const { TextArea } = Input;
function rapairModel({ form }) {
    const [pager, setPager] = useState({ pageIndex: 1, pageRows: 10 }) //分页
    const [totalRows, setTotalRows] = useState(0)
    const [dataSource, setdataSource] = useState([])
    const [addVis, setAddVis] = useState(false)
    const [detailInfo, setDetailInfo] = useState({})
    const column = [
        {
            title: "工单ID", dataIndex: "workOrderId"
        },
        {
            title: "提交账号", dataIndex: "creator"
        },
        {
            title: "提交时间", dataIndex: "createTime",
            render(createTime) {
                return createTime && DateTool.utcToDev(createTime);
            }
        },
        {
            title: "问题内容", dataIndex: "problemDesc",
        },
        {
            title: "问题图片/视频", dataIndex: "image",
            render(image, record) {
                return <span onClick={() => { lookImg(record) }}>查看</span>;
            }
        },
        {
            title: "状态", dataIndex: "status",
            render(status) {
                return <span>{status ? '已回复' : '未回复'}</span>;
            }
        },
        {
            title: "操作",
            render: (text, record) => <span>
                <a onClick={() => { openApiDetail(record, true) }} style={{ marginRight: '10px' }}>详情</a>
                {!record.status && <a onClick={() => { openApiDetail(record, false) }}>回复</a>}
            </span>
        }
    ];
    useEffect(() => {
        getType()
    }, [])
    useEffect(() => {
        getTableData()
    }, [pager.pageRows, pager.pageIndex])
    const [options, setOptions] = useState([])
    const [showImg, setShowImg] = useState(false)
    const [isDetail, setIsDetail] = useState(false)
    const [showImgDetail, setShowImgDetail] = useState(false)
    const [detailImg, setDetailImg] = useState('')
    const openImg = (src) => {
        setDetailImg(src)
        setShowImgDetail(true)
    }
    const lookImg = (detailInfo) => {
        setDetailInfo(detailInfo)
        if (detailInfo.image) {
            setShowImg(true)
        } else {
            alert('无图片')
        }
    }
    const getType = () => {
        getOrderType().then(res => {
            if (res.data.code == 0) {
                let options = []
                for (let key in res.data.data.problemTypeOneLevel) {
                    let item = {
                        value: key,
                        label: res.data.data.problemTypeOneLevel[key],
                        children: []
                    }
                    for (let key2 in res.data.data.problemTypeTwoLevel[key]) {
                        item.children.push({
                            value: key2,
                            label: res.data.data.problemTypeTwoLevel[key][key2],
                        })
                    }
                    options.push(item)
                }
                setOptions(options)
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

    const { getFieldDecorator, validateFields, getFieldsValue } = form;
    //重置
    const handleReset = () => {
        form.resetFields();
    }
    //搜索
    const handleFilter = () => {
        getTableData()
    }
    //=======详情
    const openApiDetail = (data, type) => {
        setIsDetail(type)
        setDetailInfo(data)
        setAddVis(true)
    }
    const handleOk = () => {
        setAddVis(false)
    }
    const handleCancel = () => {
        setAddVis(false)
    }
    //回复
    const handlereplyOk = () => {
        if (!replyContent && !replyContent.trim()) {
            message.info("请输入回复内容");
            return
        }
        let params = {
            workOrderId: detailInfo.workOrderId,
            replyContent: replyContent
        }
        getCallback(params).then(res => {
            if (res.data.code == 0) {
                setAddVis(false)
                message.success("回复成功");
                getTableData()
            }
        })

    }
    //列表
    const getTableData = () => {
        let params = {}
        if (getFieldsValue().status) {
            params.status = getFieldsValue().status
        }
        let id = getFieldsValue().userType
        if (id) {
            params.problemTypeOneLevel = id[0]
            params.problemTypeTwoLevel = id[1]
        }
        params = { ...params, ...pager }
        getList(params).then(res => {
            if (res.data.code == 0) {
                setdataSource(res.data.data.list)
                setTotalRows(res.data.data.pager.totalRows)
            }

        })
    }
    const [replyContent, setReplyContent] = useState('')
    const inputChange = e => {
        e.persist()
        setReplyContent(e.target.value)
    }

    return (
        <div className="PhysicalModel-page">
            <TitleTab title="工单管理">
                <Form layout="inline" >

                    <Form.Item label="问题分类">
                        {getFieldDecorator('userType', {})(
                            <Cascader options={options} placeholder="请选择" style={{ width: '412px' }} popupClassName='order-Cascader' />
                        )}
                    </Form.Item>
                    <Form.Item label="状态">
                        {getFieldDecorator('status', {})(
                            <Select style={{ width: 160 }} placeholder="请选择" allowClear>
                                <Select.Option value="1">已回复</Select.Option>
                                <Select.Option value="0">未回复</Select.Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item  >
                        <Button type="primary" onClick={handleFilter} >查询</Button>
                    </Form.Item>
                    <Form.Item >
                        <Button onClick={handleReset}>重置</Button>
                    </Form.Item>
                </Form>
            </TitleTab>
            <Card>
                <TableCom rowKey="workOrderId" columns={column} dataSource={dataSource}
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
                addVis && <Modal
                    title={isDetail ? "详情" : '回复'}
                    visible={addVis}
                    onCancel={handleCancel}
                    width='700px'
                    footer={
                        isDetail ? <div className='repair-model-footer'><Button type="primary" block onClick={handleOk}>
                            确认
                        </Button></div> : <div className='repair-model-footer'><Button type="primary" block onClick={handlereplyOk}>
                            确认回复
                        </Button></div>
                    }
                >
                    <div className='my-order-detail'>
                        <div className='order-item'>
                            <div className='order-item-label'>提交账号：</div>
                            <div className='order-item-text'>{detailInfo.creator} </div>
                        </div>
                        <div className='order-item'>
                            <div className='order-item-label'>内容分类：</div>
                            <div className='order-item-text'>{detailInfo.problemTypeOneName}-{detailInfo.problemTypeTwoName}  </div>
                        </div>
                        <div className='order-item'>
                            <div className='order-item-label'>问题描述：</div>
                            <div className='order-item-text'>{detailInfo.problemDesc}</div>
                        </div>
                        <div className='order-item'>
                            <div className='order-item-label'>上传问题图片/视频：</div>
                            <div className='order-item-text'>
                                {
                                    detailInfo.image && detailInfo.image.split(',').map((item, index) => {
                                        return <img key={index} src={item} width={100} onClick={() => { openImg(item) }} />
                                    })
                                }
                            </div>
                        </div>
                        <div className='order-item'>
                            <div className='order-item-label'>联系方式：</div>
                            <div className='order-item-text'>{detailInfo.phone}</div>
                        </div>
                        {
                            detailInfo.status == 1 && isDetail ? (<div className='order-feedback'>
                                <div style={{ margin: '0 -24px' }}>
                                </div>
                                <div className='order-item'>
                                    <div className='feedback-title'>回复内容：</div>
                                    <div className='feedback-dec'>
                                        {detailInfo.replyContent}
                                    </div>
                                </div>
                            </div>) : null
                        }
                        {
                            !isDetail && <div className='reply-footer'>
                                <div className='label'>回复内容：</div>
                                <TextArea rows={4} onChange={inputChange} />
                            </div>

                        }

                    </div>
                </Modal>
            }
            {
                showImg && <Modal
                    title="图片信息"
                    visible={showImg}
                    onCancel={() => { setShowImg(false) }}
                    width='700px'
                    footer={false}

                >
                    <div style={{ textAlign: 'center' }}>
                        {
                            detailInfo.image && detailInfo.image.split(',').map((item, index) => {
                                return <img key={index} src={item} width={100} style={{ marginRight: '10px' }} onClick={() => { openImg(item) }} />
                            })
                        }
                    </div>
                </Modal>
            }
            {
                showImgDetail && <Modal
                    title="图片预览"
                    visible={showImgDetail}
                    onCancel={() => { setShowImgDetail(false) }}
                    width='1000px'
                    footer={false}

                >
                    <div style={{ textAlign: 'center' }}>
                        <img src={detailImg} style={{ maxWidth: 850 }} />
                    </div>
                </Modal>
            }
        </div>
    )
}

export default Form.create()(rapairModel)