import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Select, notification, Table, Modal, Form, Tooltip, DatePicker, Upload, message } from 'antd';
import { getListApi } from '../../../apis/mallProduct'
import { DateTool } from '../../../util/utils';
import './index.scss'
const FormItem = Form.Item
// const TitleOption = TitleTab.Option
// const { RangePicker } = DatePicker;

function FirmwareMagement({ form,match ,history}) {
    // const history = useHistory();
    const [pager, setPager] = useState({ pageIndex: 1, pageRows: 10 }) //分页
    const { getFieldDecorator, validateFields, getFieldsValue } = form;
    const [totalRows, setTotalRows] = useState(0)
    const [dataSource, setdataSource] = useState([])
    const [supplyVis, setSupplyVis] = useState(false)
    const [showImg, setShowImg] = useState(false)
    const [actionData, setActionData] = useState({})
    const [loading, setLoading] = useState(false)
    const [addinfoVis, setAddinfoVis] = useState(false)
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
        getListApi().then(res => {
            if (res.data.code == 0) {
                setdataSource(res.data.data)
            }
        }).finally(() => { setLoading(false) })
    }
    //状态
    const getStatus = (val = 0) => {
        let arr = ['下架', '在售', '售罄']
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
                relData({ id, status }).then(res => {
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
                    let url = text.split(',')
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
            dataIndex: 'commodityPrice',
            key: 'commodityPrice',
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
            dataIndex: '',
            key: ''
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (text) => <span>{getStatus(text)}</span>
        },
        {
            title: '操作',
            key: 'action',
            width: 300,
            render: (_, row) => <span >
                <a>查看</a>
                <a>预览</a>
                <a onClick={() => { offData(row, 2) }}>下架商品</a>
                <a onClick={() => { addSupply(row) }}>补充库存</a>
                <a onClick={() => { offData(row, 1) }}>上架商品</a>
            </span>
        }
    ]
    //
    const lookData = (data) => {
        setActionData(data)
        setShowImg(true)
    }
    const onReset = () => {
        form.resetFields();
    }
    //增加补给
    const addSupply = (row) => {
        setActionData(row)
        setSupplyVis(true)
    }
    //确定补给
    const confirmSupply = () => {
    }
    //取消补给
    const cancelSupply = () => {
        setSupplyVis(false)
    }
    //新增
    const openAdd = () => {
        history.push(`/mall/productInfo`);
    }
    //取消新增
    const cancalAdd = () => {
        setAddinfoVis(false)
    }
    return (
        <div className="mall-product-page">
            <Card>
                <div className='mall-product-top'><Button type='primary' onClick={openAdd}>新增商品</Button></div>
                <Table rowKey={"id"} columns={column} dataSource={dataSource}
                    loading={loading}
                    pagination={false} />
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
        </div>
    )
}

export default Form.create()(FirmwareMagement)
