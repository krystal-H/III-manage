import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Select, Modal, Form, Tooltip, DatePicker, Upload, message, Table } from 'antd';
import { getList, getOrderInfo, getMenInfo } from '../../../apis/mallOrder'
import { DateTool } from '../../../util/utils';
import Expressmodal from './fullExpress'
import './index.scss'
const FormItem = Form.Item
const { Search } = Input;

function FirmwareMagement({ form }) {
    const [pager, setPager] = useState({ pageIndex: 1, pageRows: 10 }) //分页
    const { getFieldDecorator, validateFields, getFieldsValue } = form;
    const [totalRows, setTotalRows] = useState(0)
    const [searchData, setsearchData] = useState('')  //搜索
    const [dataSource, setdataSource] = useState([])
    const [addVis, setAddVis] = useState(false)
    const [receiveModel, setReceiveModel] = useState(false) //收件人窗口
    const [expressModel, setExpressModel] = useState(false) //填写快递窗口
    const [orderModel, setOrderModel] = useState(false) //订单窗口
    const [modelType, setModelType] = useState('add')
    const [actionData, setActionData] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        getTableData()
    }, [pager.pageRows, pager.pageIndex])
    //列表
    const getTableData = () => {
        setLoading(true)
        let parmas={
            ...pager
        }
        if(searchData && searchData.trim()){
            parmas.condition=searchData.trim()
        }
        getList(parmas).then(res => {
            if (res.data.code == 0) {
                res.data.data.records.forEach((item, index) => {
                    item.key = index + 1
                })
                setdataSource(res.data.data.records)
                setTotalRows(res.data.data.total)
            }
        }).finally(() => { setLoading(false) })
    }
    const column = [
        {
            title: '编号',
            dataIndex: 'key',
            key: 'key',
            width: 70,
        },
        {
            title: '订单号',
            dataIndex: 'orderNo',
            key: 'orderNo',
            render: (text) => <span title={text}>{text}</span>
        },
        {
            title: '用户',
            dataIndex: 'a',
            key: 'a',
            render: (_, row) => {
                let phone=row.phone 
                if(phone){
                    phone=phone.split('')
                    phone.splice(3,4,'****').join('')
                }
                return <div >
                    <div>{row.receiverName}</div>
                    <div title={row.phone}>{phone}</div>
                </div>
            }
        },
        {
            title: '订单金额',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (text) => <span title={text}>{text}</span>
        },
        {
            title: '实付金额',
            dataIndex: 'finalPrice',
            key: 'finalPrice',
            render: (text) => <span title={text}>{text}</span>
        },
        {
            title: '支付方式',
            dataIndex: 'payMode',
            key: 'payMode',
            render: (text) => {
                let arr = ['离线', '微信', '支付宝']
                return <span title={arr[text]}>{arr[text]}</span>
            }
        },
        {
            title: '订单状态',
            dataIndex: 'status',
            key: 'status',
            render: (text) => {
                let arr = ['支付中', '支付完成', '发货中', '退款退货中', '订单支付失败', '订单超时', '订单关闭', '订单完成', '异常', '已删除']
                return <span title={arr[text]}>{arr[text]}</span>
            }
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render(createTime) {
                return <span title={createTime && DateTool.utcToDev(createTime)}>{createTime && DateTool.utcToDev(createTime)}</span> 
            }
        },
        {
            title: '操作',
            key: 'action',
            width: 150,
            render(_, row) {
                return <div className='mall-order-table-action'>
                    <div style={{ marginRight: '10px' }} onClick={() => { openOrder(row) }}>查看订单信息</div>
                    <div style={{ marginRight: '10px' }} onClick={() => { openReceive(row) }}>查看收件人信息</div>
                    <div onClick={() => { openExpress(row) }}>填写快递信息</div>
                </div>
            }
        }
    ]
    const openReceive = (row) => {
        setActionData(row)
        setReceiveModel(true)
    }
    const openOrder = (row) => {
        setActionData(row)
        setOrderModel(true)
    }
    const openExpress = (row) => {
        setActionData(row)
        setExpressModel(true)

    }
    const handleCancel = () => {
        setExpressModel(false)
    }
    const handleOk = () => {
        setExpressModel(false)
        getTableData()
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
                        placeholder='请输入用户名/手机号/订单号进行搜索'
                        onChange={(e) => { setsearchData(e.target.value) }}
                        onSearch={getTableData}
                        allowClear
                    />
                </div>
                <Table rowKey={"orderId"} columns={column} dataSource={dataSource}
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
            {
                expressModel && <Expressmodal actionData={actionData} infoVis={expressModel} handleCancel={handleCancel} handleOk={handleOk} />
            }
            {
                orderModel && <Modal wrapClassName='mall-order-modal' visible={orderModel} title="订单信息" footer={null} onCancel={() => { setOrderModel(false) }}>
                    <OrderInfo actionData={actionData} /></Modal>
            }
            {
                receiveModel && <Modal wrapClassName='mall-order-modal' visible={receiveModel} title="收件人信息" footer={null} onCancel={() => { setReceiveModel(false) }}>
                    <ReceiveInfo actionData={actionData} /></Modal>
            }
        </div>
    )
}

export default Form.create()(FirmwareMagement)
function OrderInfo({ actionData }) {
    const [data, setData] = useState([])
    useEffect(() => {
        getOrderInfo(actionData.orderId).then(res => {
            if (res.data.code === 0) {
                setData(res.data.data)
            }
        })
    }, [])
    return <div className='mall-order-moadl'>
        {
            data.map((item, index) => {
                return <div key={index} className='content'>
                    <img src={item.commodityPicture.split(',')[0]} />
                    <div className='name'>{item.name}</div>
                    <div className='code'>{item.commodityModel}</div>
                    <div className='price'>￥{item.quantity}*{item.unitPrice}</div>
                </div>
            })
        }
    </div>
}
function ReceiveInfo({ actionData }) {
    const [data, setData] = useState({})
    useEffect(() => {
        getMenInfo(actionData.orderId).then(res => {
            if (res.data.code === 0) {
                if(res.data.data.phone){
                    
                }
                setData(res.data.data)
            }
        })
    }, [])
    return <div className='mall-user-moadl'>
        {
            Object.keys(data).length ? <div>{data.address}，{data.receiverName}，{data.phone && data.phone}</div> : ''
        }
        
    </div>
}
