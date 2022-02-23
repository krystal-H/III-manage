import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Select, notification, Table, Modal, Form, Tooltip, DatePicker, Upload, message } from 'antd';
import { getListApi, publicCommodityApi, offCommodityApi, editStock } from '../../../apis/mallProduct'
// import PreviewModal from './previewInfo'
import './index.scss'
const FormItem = Form.Item
// const TitleOption = TitleTab.Option
// const { RangePicker } = DatePicker;

function FirmwareMagement({ form, match, history }) {
    // const history = useHistory();
    const [pager, setPager] = useState({ pageIndex: 1, pageRows: 10 }) //分页
    const { getFieldDecorator, validateFields, getFieldsValue } = form;
    const [totalRows, setTotalRows] = useState(0)
    const [dataSource, setdataSource] = useState([])
    const [supplyVis, setSupplyVis] = useState(false)
    const [showImg, setShowImg] = useState(false)
    const [actionData, setActionData] = useState({})
    const [loading, setLoading] = useState(false)
    const [previewVis, setPreviewVis] = useState(false)
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };
    useEffect(() => {
        getTableData()
    }, [pager.pageRows, pager.pageIndex])
    //列表
    const getTableData = () => {
        setLoading(true)
        getListApi(pager).then(res => {
            if (res.data.code == 0) {
                setdataSource(res.data.data.records)
                setTotalRows(res.data.data.total)
            }
        }).finally(() => { setLoading(false) })
    }
    //状态
    const getStatus = (val = 0) => {
        let arr = ['下架', '在售', '售罄', '未上架']
        return arr[val]
    }

    //上下线
    const offData = (id, status) => {
        let tip = status == 1 ? '是否上架商品' : '是否下架商品'
        Modal.confirm({
            title: '确认',
            okText: '确定',
            cancelText: '取消',
            content: tip,
            onOk: () => {
                offCommodityApi({ commodityId: id, status }).then(res => {
                    let text = status == 1 ? '上架成功' : '下架成功'
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
            title: '商品名称',
            dataIndex: 'commodityName',
            key: 'commodityName',
            render: (text) => <span title={text}>{text}</span>
        },
        {
            title: '品牌',
            dataIndex: 'commodityBrand',
            key: 'commodityBrand',
            render: (text) => <span title={text}>{text}</span>
        },
        {
            title: '商品型号',
            dataIndex: 'commodityModel',
            key: 'commodityModel',
            render: (text) => <span title={text}>{text}</span>
        },
        {
            title: '缩略图',
            dataIndex: 'commodityPicture',
            key: 'commodityPicture',
            render: (text) => {
                if (text) {
                    let url = text.split(',')[0]
                    return <img src={url} style={{ width: '30px' }} />
                }
                return ''
            }
        },
        {
            title: '所属类别',
            dataIndex: 'commodityClassifyName',
            key: 'commodityClassifyName',
            render: (text) => <span title={text}>{text}</span>
        },
        {
            title: '平台产品ID',
            dataIndex: 'productId',
            key: 'productId',
            render: (text) => <span title={text}>{text}</span>
        },
        {
            title: '产品价格',
            dataIndex: 'commodityRealPrice',
            key: 'commodityRealPrice',
            render: (text) => <span title={text}>{text}</span>
        },
        {
            title: '库存',
            dataIndex: 'currentStock',
            key: 'currentStock',
            render: (text) => <span title={text}>{text}</span>
        },
        {
            title: '已售出',
            dataIndex: 'selledStock',
            key: 'selledStock'
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (text) => <span title={getStatus(text)}>{getStatus(text)}</span>
        },
        {
            title: '操作',
            key: 'action',
            width: 300,
            render: (_, row) => <span >

                {/* <a onClick={() => { onPreView(row) }} style={{marginRight:'10px'}}>预览</a> */}
                {
                    [0, 3].indexOf(row.status) == -1 && <>
                        <a onClick={() => { goDetail(row,false) }} style={{ marginRight: '10px' }}>查看</a>
                        <a onClick={() => { offData(row.id, 0) }} style={{ marginRight: '10px' }}>下架商品</a>
                        <a onClick={() => { addSupply(row) }}>补充库存</a>
                    </>
                }
                {
                    [0, 3].indexOf(row.status) != -1 && <>
                        <a onClick={() => { goDetail(row,true) }} style={{ marginRight: '10px' }}>编辑</a>
                        <a onClick={() => { offData(row.id, 1) }}>上架商品</a>
                    </>
                }

            </span>
        }
    ]
    //查看详情
    const goDetail = (row,isEdit) => {
        history.push(`/mall/productInfo?id=${row.id}&&isEdit=${isEdit}`);
    }
    //预览
    const onPreView = (row) => {
        setActionData(row)
        setPreviewVis(true)
    }
    //
    const lookData = (data) => {
        setActionData(data)
        setShowImg(true)
    }
    //增加补给
    const addSupply = (row) => {
        setActionData(row)
        setSupplyVis(true)
    }
    //确定补给
    const confirmSupply = () => {
        validateFields().then(val => {
            let params = {
                id: actionData.id,
                currentStock: Number(actionData.currentStock) + Number(val.classifyValue),
                maxStock: Number(actionData.currentStock) + Number(val.classifyValue) + Number(actionData.selledStock)
            }
            editStock(params).then(res => {
                if (res.data.code == 0) {
                    message.success('补给成功')
                    setSupplyVis(false)
                    getTableData()
                }
            })
        })

    }
    //取消补给
    const cancelSupply = () => {
        setSupplyVis(false)
    }
    //新增
    const openAdd = () => {
        history.push(`/mall/productInfo`);
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
    //取消预览
    const handleCancel = () => {
        setPreviewVis(false)
    }
    return (
        <div className="mall-product-page">
            <Card>
                <div className='mall-product-top'><Button type='primary' onClick={openAdd}>新增商品</Button></div>
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
                    }} />
            </Card>
            {
                supplyVis && <Modal
                    title='库存信息'
                    visible={supplyVis}
                    onOk={confirmSupply}
                    onCancel={cancelSupply}
                >
                    <Form {...formItemLayout} >
                        <FormItem label="产品名称">
                            <div>
                                <span style={{ marginRight: '30px' }}>{actionData.commodityName}</span>
                                <span style={{ marginRight: '10px' }}>现有库存</span>
                                <span>{actionData.currentStock}</span>
                            </div>

                        </FormItem>
                        <FormItem label="本次补充">
                            {getFieldDecorator('classifyValue', {
                                getValueFromEvent: (e) => {
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
            {/* {
                previewVis && <PreviewModal previewVis={previewVis} handleCancel={handleCancel} />
            } */}
        </div>
    )
}

export default Form.create()(FirmwareMagement)
