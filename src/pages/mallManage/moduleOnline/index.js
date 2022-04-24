import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Select, notification, Table, Modal, Form, Tooltip, DatePicker, Upload, message } from 'antd';
import { getListApi, publicCommodityApi, offCommodityApi, editStock } from '../../../apis/mallProduct'
// import PreviewModal from './previewInfo'
import ApplyGoods from './apply'
import './index.scss'
const FormItem = Form.Item

function FirmwareMagement({ form, match, history }) {
  // const history = useHistory();
  const [pager, setPager] = useState({ pageIndex: 1, pageRows: 10 }) //分页
  const { getFieldDecorator, validateFields, getFieldsValue, resetFields } = form;
  const [totalRows, setTotalRows] = useState(0)
  const [dataSource, setdataSource] = useState([])
  const [supplyVis, setSupplyVis] = useState(false)
  const [actionData, setActionData] = useState({})
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    // getTableData()
  }, [pager.pageRows, pager.pageIndex])
  //列表
  const getTableData = () => {
    let data = getFieldsValue()
    if (data.productId) {
      data.productId = Number(data.productId)
    }
    let params = { ...data, ...pager }
    setLoading(true)
    getListApi(params).then(res => {
      if (res.data.code === 0) {
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

  const column = [
    {
      title: "模组型号",
      key: "hetModuleTypeName",
      dataIndex: "hetModuleTypeName",
      render: (text) => <span title={text}>{text}</span>
    },
    {
      title: "模组IC型号",
      key: "moduleName",
      dataIndex: "moduleName",
      render: (text) => <span title={text}>{text}</span>
    },
    {
      title: '尺寸',
      key: "ww",
      dataIndex: "ww",
      render: (text) => <span title={text}>{text}</span>
    },
    {
      title: "生产厂商",
      key: "brandName",
      dataIndex: "brandName"
    },
    {
      title: '使用范围',
      key: "brandName2",
      dataIndex: "brandName2"
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
            <a onClick={() => { goDetail(row, false) }} style={{ marginRight: '10px' }}>查看</a>
            <a onClick={() => { offData(row.id, 0) }} style={{ marginRight: '10px' }}>下架商品</a>
            <a onClick={() => { addSupply(row) }}>补充库存</a>
          </>
        }
        {
          [0, 3].indexOf(row.status) != -1 && <>
            <a onClick={() => { goDetail(row, true) }} style={{ marginRight: '10px' }}>编辑</a>
            <a onClick={() => { offData(row.id, 1) }}>上架商品</a>
          </>
        }

      </span>
    }
  ]

  //查看详情
  const goDetail = (row, isEdit) => {
    history.push(`/mall/moduleOnlineInfo?id=${row.id}&&isEdit=${isEdit}`);
  }
  //增加补给
  const addSupply = (row) => {
    setActionData(row)
    setSupplyVis(true)
  }
  //确定补给
  const confirmSupply = () => {
    setSupplyVis(false)
    getTableData()
  }
  //取消补给
  const cancelSupply = () => {
    setSupplyVis(false)
  }
  //新增
  const openAdd = () => {
    history.push(`/mall/moduleOnlineInfo`);
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
    if (pager.pageIndex === 1) {
      getTableData()
    } else {
      setPager({ pageIndex: 1, pageRows: 10 })
    }
  }
  const handleReset = () => {
    resetFields()
  }
  return (
    <div className="mall-product-page">
      <Card>
        <div className='mall-product-top'>
          <Form layout="inline" >

            <Form.Item label='关键字'>
              {getFieldDecorator('moduleName', {})(
                <Input placeholder="请输入生产厂商或模组型号" style={{ width: 260 }} maxLength={20} />,
              )}
            </Form.Item>
            <FormItem  >
              <Button type="primary" onClick={() => searchList()} >查询</Button>
            </FormItem>
            <FormItem >
              <Button onClick={() => handleReset()}>重置</Button>
            </FormItem>
          </Form>
          <Button type='primary' onClick={openAdd}>新增模组</Button>
        </div>
        <Table rowKey={"id"} columns={column} dataSource={dataSource}
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
          }} />
      </Card>
      {
        supplyVis && <ApplyGoods cancelSupply={cancelSupply} confirmSupply={confirmSupply} supplyVis={supplyVis} actionData={actionData} />
      }
    </div>
  )
}

export default Form.create()(FirmwareMagement)
