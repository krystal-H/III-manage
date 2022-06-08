import React, { useState, useEffect } from 'react'
import { Table, Modal, message, Input, Icon, Button } from 'antd'
import { strToAsterisk } from '../../../util/utils'
import './auditDetail.less'
import { getProfuctDetailRequest } from '../../../apis/schemeManagement'
import { approveVoiceRequest, getVoiceApproveRequest } from '../../../apis/voiceAudit'
import { cloneDeep } from "lodash"

const schemeTypeMap = {
  1: '免开发方案',
  2: '独立MCU方案',
  3: 'SoC方案',
  4: '成品接入方案',
  5: '操作系统方案'
}

function AuditDetail({ visible, handleOk, handleCancel, productId, opeType }) {
  const [productItem] = useState({})
  const [dataSource, setDataSource] = useState([]) // 需要审核的数据
  const [detailList, setDetailList] = useState([]) // 详情展示的列表数据
  const [showSecret, setShowSecret] = useState(false) // 秘钥boolean
  const [productDetail, setProductDetail] = useState({})
  const [loading, setLoading] = useState(false) //antd的loading控制
  const [btnLoading, setBtnLoading] = useState(false)
  const [pager, setPager] = useState({ pageIndex: 1, pageRows: 100000000 }) //分页
  const [totalRows, setTotalRows] = useState(0)

  const columns = [
    {
      title: '语音能力ID',
      dataIndex: 'abilityId',
      key: 'abilityId',
      width: 100
    },
    {
      title: '语音能力名称',
      dataIndex: 'abilityName',
      key: 'abilityName',
      width: 120
    },
    {
      title: '语言调用词',
      dataIndex: 'abilityDesc',
      key: 'abilityDesc',
      render: (text) => {
        let abilityDesc = text && JSON.parse(text)
        let html = <div title={abilityDesc.desc}>{abilityDesc.desc}</div>
        const arr = abilityDesc.examples.map((item, index) => {
          return <span key={index} title={item}>{item}<br /></span>
        })
        return [html, arr]
      }
    },
    {
      title: '关联物模型功能',
      dataIndex: 'schemeRelationList',
      key: 'schemeRelationList',
      width: '45%',
      render: (text) => {
        return text.map((item, index) => (
          <span key={index} title={item}>
            {item}<br />
          </span>
        ))
      }
    },
    {
      title: '操作状态',
      dataIndex: 'operation',
      key: 'operation',
      width: 80,
      render: (text) => <span>{text == 0 ? '移除' : text == 1 ? '新增' : ''}</span>
    }
  ];

  useEffect(() => {
    setLoading(true)
    getProfuctDetailRequest({ productId }).then(res => {
      setProductDetail(res.data.data)
    })
    getVoiceApproveRequest({ productId, ...pager }).then(res => {
      if (opeType == 'detail') {
        setDetailList(res.data.data.list)
      }
      if (opeType == 'approve') {
        setDataSource(res.data.data.list.filter(item => item.status == 0))
      }
      setTotalRows(res.data.data.pager.totalRows)
    }).finally(() => { setLoading(false) })
  }, [])

  // 翻页
  const pagerChange = (pageIndex, pageRows) => {
    setPager(pre => {
      let obj = cloneDeep(pre)
      return Object.assign(obj, { pageIndex: pageRows === pager.pageRows ? pageIndex : 1, pageRows })
    })
  }


  // 展示秘钥
  const showText = (value) => {
    value = showSecret ? value : strToAsterisk(value, 10)
    return value
  }

  // 切换秘钥隐藏
  const changeState = () => {
    setShowSecret(!showSecret)
  }

  const titleCom = (<div className='product_title_baseinfo_list'>
    <div>
      <div>品类：</div><div>{productDetail.deviceTypeName}</div>
    </div>
    <div>
      <div>产品ID：</div><div>{productDetail.productId}</div>
    </div>
    <div>
      <div>通讯协议：</div><div>{productDetail.bindTypeName}</div>
    </div>
    <div>
      <div>产品编码：</div><div>{productDetail.productIdHex}</div>
    </div>
    <div>
      <div>产品密钥：</div>
      <div>{showText(productDetail.deviceKey)}
        <span onClick={changeState} style={{ cursor: 'pointer' }}>&nbsp;
          <Icon type={showSecret ? 'eye-invisible' : 'eye'} style={{ fontSize: '14px' }}
            theme="twoTone" twoToneColor="#2874FF" />
        </span>
      </div>
    </div>
  </div>)

  // 审核通过
  const confirmSubmit = (status) => {
    setBtnLoading(true)
    const params = {
      approveIdList: cloneDeep(dataSource).map(item => { return item.approveId }),
      status // 1审批通过；2：审批不通过
    }
    approveVoiceRequest(params).then(res => {
      message.success(`提交成功`)
      handleOk()
    }).finally(() => setBtnLoading(false))
  }

  return (
    <Modal title="审核" width={1100}
      visible={visible}
      onCancel={handleCancel}
      maskClosable={false}
      wrapClassName="add-scheme"
      footer={opeType == 'detail' ? null :
        [
          <Button key="back" onClick={() => confirmSubmit(2)}>审核不通过</Button>,
          <Button key="submit" type="primary" loading={btnLoading} onClick={() => confirmSubmit(1)}>审核通过</Button>
        ]
      }>
      <div className='audit-detail-modal'>
        <div className='title'>{productDetail.productName}
          <span className='tag'>{schemeTypeMap[productDetail.schemeType]}</span>
        </div>
        <div>{titleCom}</div>
        <div>
          <Table
            rowKey="approveId"
            loading={loading}
            columns={columns}
            dataSource={opeType == 'approve' ? dataSource : detailList}
            pagination={false}
            scroll={{ y: 340 }}
          // pagination={{
          //   defaultCurrent: 1,
          //   current: pager.pageIndex,
          //   onChange: pagerChange,
          //   pageSize: pager.pageRows,
          //   total: totalRows,
          //   showQuickJumper: true,
          //   pageSizeOptions: ['10'],
          //   showTotal: () => <span>共 <a>{totalRows}</a> 条</span>
          // }} 
          />
        </div>
      </div>
    </Modal>
  )
}

export default AuditDetail
