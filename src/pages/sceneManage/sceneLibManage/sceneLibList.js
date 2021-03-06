import React, { useState, useEffect } from 'react'
import { Card, Form, Input, Button, Select, Tooltip, Modal, message } from 'antd'
import TitleTab from '../../../components/TitleTab'
import TableCom from '../../../components/Table'
import {
  conditionTypeListRequest,
  conditionDicListRequest,
  sceneProductListRequest,
  AIAbilityListRequest,
  deleteConditionTypeRequest,
  getConditonTypeDetailRequest,
  getCheckTypeRequest,
  getUnitRequest,
  getConditionDicDetailRequest,
  deleteConditionDicRequest,
  getSceneProductDetailRequest,
  getAIbilityDetailRequest,
  deleteAIbilityRequest,
  deleteSceneProductListRequest
} from '../../../apis/sceneLibList'
import './sceneLibList.less'
import { cloneDeep } from 'lodash'
import ConditionTypeModal from './conditionTypeModal'
import ConditionDicModal from './conditionDicModal'
import ScenePorductModal from './scenePorductModal'
import AIAbilityModal from './AIAbilityModal'

const { Option } = Select
const { confirm } = Modal

const btnArr = [
  { title: "编辑", icon: "edit", status: 0, key: 1, type: 'edit' },
  { title: "删除", icon: "delete", status: 0, key: 2, type: 'delete' }
]
const optionMap = ['场景产品列表', '条件类型列表', '条件字典列表', 'AI能力列表']

function SceneLibList({ form }) {
  const { getFieldDecorator, getFieldsValue } = form
  const [pager, setPager] = useState({ pageIndex: 1, pageRows: 10, paged: true }) //分页
  const [totalRows, setTotalRows] = useState(0)
  const [dataSource, setDataSource] = useState([{}])
  const [loading, setLoading] = useState(false) //antd的loading控制
  const [selectVal, setSelectVal] = useState('1') // 列表类型切换

  const [conditionTypeVisible, setConditionTypeVisible] = useState(false) // 条件类型-弹窗
  const [conditionTypeDetailData, setConditionTypeDetailData] = useState({}) // 条件类型-详情数据

  const [conditionDicVisible, setConditionDicVisible] = useState(false) // 条件字典-弹窗
  const [conditionDicDetailData, setConditionDicDetailData] = useState({}) // 条件字典-详情数据
  const [dicConditionType, setDicConditionType] = useState([]) // 条件字典-条件类型
  const [unitList, setUnitList] = useState([]) // 条件字典-参数单位

  const [sceneProductVisible, setSceneProductVisible] = useState(false)
  const [sceneProductDetail, setSceneProductDetail] = useState({}) // 场景产品列表-详情数据

  const [aiAbilityVisible, setAiAbilityVisible] = useState(false) // ai能力-弹窗
  const [aiAbilityDetail, setAiAbilityDetail] = useState({}) // ai能力-详情数据

  // 场景产品列表
  const sceneColumns = [
    {
      title: '产品名称',
      dataIndex: 'deviceTypeName',
      key: 'deviceTypeName',
    },
    {
      title: '产品ID',
      dataIndex: 'defaultProductId',
      key: 'defaultProductId',
    },
    {
      title: '大类',
      dataIndex: 'judge',
      key: 'judge',
      render: (item, record) => {
        if (record.level === 2) {
          return <span>{record.parent ? record.parent.deviceTypeName : ''}</span>
        } else if (record.level === 3) {
          return <span>{record.grand ? record.grand.deviceTypeName : ''}</span>
        }
      }
    },
    {
      title: '小类',
      dataIndex: 'judge2',
      key: 'judge2',
      render: (item, record) => {
        if (record.level === 2) {
          return <span>{record.deviceTypeName}</span>
        } else if (record.level === 3) {
          return <span>{record.parent ? record.parent.deviceTypeName : ''}</span>
        }
      }
    },
    {
      title: '状态查询',
      dataIndex: 'statusQueryCount',
      key: 'statusQueryCount',
    },
    {
      title: '功能控制',
      dataIndex: 'deviceFunctionCount',
      key: 'deviceFunctionCount',
    },
    {
      title: '输入输出',
      dataIndex: 'inoutType',
      key: 'inoutType',
      render: (item, record) => {
        return item && item.inoutTypeName && <span>{item.inoutTypeName}</span>
      }
    },
    {
      title: '编辑时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: "100px",
      render: (text, record) => (
        <div>
          <Tooltip placement="top" title="查看">
            <Button
              shape="circle"
              size="small"
              icon="info"
              onClick={() => checkSceneProductDetail(record)}>
            </Button>
          </Tooltip>
          <Tooltip placement="top" title="删除">
            <Button
            style={{marginLeft:'10px'}}
              shape="circle"
              size="small"
              icon="delete"
              onClick={() => handleDeleteOpe({type:'delete'}, record)} >
            </Button>
          </Tooltip>
        </div>
      )
    }
  ]

  // 条件类型列表
  const conditionTypeColumns = [
    {
      title: '条件类型名称',
      dataIndex: 'conditionOptionName',
      key: 'conditionOptionName',
    },
    {
      title: '备注',
      dataIndex: 'comments',
      key: 'comments',
    },
    {
      title: '编辑时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: "10%",
      render: (text, record) => (
        <div>
          {btnArr.map((item, index) => {
            return (
              <Tooltip key={index} placement="top" title={item.title}>
                <Button style={{ marginLeft: index === 1 ? "10px" : "" }}
                  shape="circle"
                  size="small"
                  icon={item.icon}
                  key={record.conditionOptionId}
                  onClick={() => handleDeleteOpe(item, record)} />
              </Tooltip>
            )
          })}
        </div>
      )
    }
  ]

  // 条件字典列表
  const conditionDicColumns = [
    {
      title: '条件字典名称',
      dataIndex: 'conditionName',
      key: 'conditionName',
    },
    {
      title: '条件类型',
      dataIndex: 'conditionOptionName',
      key: 'conditionOptionName',
    },
    {
      title: '类型',
      dataIndex: 'paramStyleName',
      key: 'paramStyleName'
    },
    {
      title: '编辑时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: "10%",
      render: (text, record) => (
        <div>
          {btnArr.map((item, index) => {
            return (
              <Tooltip key={index} placement="top" title={item.title}>
                <Button style={{ marginLeft: index === 1 ? "10px" : "" }}
                  shape="circle"
                  size="small"
                  icon={item.icon}
                  key={record.conditionId}
                  onClick={() => handleDeleteOpe(item, record)} />
              </Tooltip>
            )
          })}
        </div>
      )
    }
  ]

  // AI能力列表
  const AIColumns = [
    {
      title: '能力名称',
      dataIndex: 'aiName',
      key: 'aiName',
    },
    {
      title: '接口地址',
      dataIndex: 'aiUrl',
      key: 'aiUrl',
    },
    {
      title: '输入',
      dataIndex: 'aiInParamList',
      key: 'aiInParamList',
      render: (item, record) => {
        return item && item.map((ele, index) => {
          let result = ''
          if (ele.type == 2) {// 范围
            result = <span title={`范围：${ele.range.min}~${ele.range.max}`} key={index}>
              {`范围：${ele.range.min}~${ele.range.max}`},&nbsp;&nbsp;&nbsp;
            </span>
          }
          if (ele.type == 1) {// 枚举
            let val = ''
            val += ele.enums.map(item2 => `${item2.name}:${item2.value}`)
            result = <span title={`枚举：${val}`} key={index}>{`枚举：${val}`}&nbsp;&nbsp;&nbsp;</span>
          }
          return result
        })
      }
    },
    {
      title: '输出',
      dataIndex: 'aiOutParamList',
      key: 'aiOutParamList',
      render: (item, record) => {
        return item && item.map((ele, index) => {
          let result = ''
          if (ele.type == 2) {// 范围
            result = <span title={`范围：${ele.range.min}~${ele.range.max}`} key={index}>
              {`范围：${ele.range.min}~${ele.range.max}`},&nbsp;&nbsp;&nbsp;
            </span>
          }
          if (ele.type == 1) {// 枚举
            let val = ''
            val += ele.enums.map(item2 => `${item2.name}:${item2.value}`)
            result = <span title={`枚举：${val}`} key={index}>{`枚举：${val}`}&nbsp;&nbsp;&nbsp;</span>
          }
          return result
        })
      }
    },
    {
      title: '描述',
      dataIndex: 'aiDesc',
      key: 'aiDesc',
      render: (text) => {
        return <span title={text}>{text}</span>
      }
    },
    {
      title: '编辑时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: "10%",
      render: (text, record) => (
        <div>
          {btnArr.map((item, index) => {
            return (
              <Tooltip key={index} placement="top" title={item.title}>
                <Button style={{ marginLeft: index === 1 ? "10px" : "" }}
                  shape="circle"
                  size="small"
                  icon={item.icon}
                  key={record.key}
                  onClick={() => handleDeleteOpe(item, record)}
                />
              </Tooltip>
            )
          })}
        </div>
      )
    }
  ]

  // columns列映射
  const mapColumns = {
    '1': sceneColumns,
    '2': conditionTypeColumns,
    '3': conditionDicColumns,
    '4': AIColumns
  }

  // 场景产品列表查看
  const checkSceneProductDetail = (record) => {
    setSceneProductVisible(true)
    setSceneProductDetail(record)
    // getSceneProductDetailRequest({ deviceTypeId: record.deviceTypeId })
    //   .then(res => {
    //     if (res.data.code === 0) {
    //       setSceneProductDetail(res.data.data.deviceType)
    //     }
    //   })
  }

  // 编辑/删除 判断
  const handleDeleteOpe = (item, record) => {
    if (item.type === 'delete') {
      confirm({
        content: '是否确定删除本条数据？',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
          deleteCommonFunc(record)
        },
        onCancel() { },
      })
    } else if (item.type === 'edit') {
      getCommonDetail(record)
    }
  }

  // 删除操作
  const deleteCommonFunc = (record) => {
    if (selectVal === '2') {// 条件类型的删除
      deleteConditionTypeRequest({ conditionOptionId: record.conditionOptionId })
        .then(res => {
          if (res.data.code === 0) {
            message.success('删除成功')
            getTableData()
          }
        })
    } else if (selectVal === '3') {// 条件字典的删除
      deleteConditionDicRequest({ conditionId: record.conditionId })
        .then(res => {
          if (res.data.code === 0) {
            message.success('删除成功')
            getTableData()
          }
        })
    } else if (selectVal === '4') {// ai能力
      deleteAIbilityRequest({ aiId: record.aiId })
        .then(res => {
          if (res.data.code === 0) {
            message.success('删除成功')
            getTableData()
          }
        })
    }else if (selectVal === '1') {// ai能力
      deleteSceneProductListRequest({ deviceTypeId: record.deviceTypeId })
        .then(res => {
          if (res.data.code === 0) {
            message.success('删除成功')
            getTableData()
          }
        })
    }
  }

  // 获取编辑详情
  const getCommonDetail = (record) => {
    if (selectVal === '2') {// 条件类型 详情
      setConditionTypeVisible(true)
      setConditionTypeDetailData({})
      getConditonTypeDetailRequest({ conditionOptionId: record.conditionOptionId })
        .then(res => {
          if (res.data.code === 0) {
            setConditionTypeDetailData(res.data.data)
          }
        })
    } else if (selectVal === '3') {
      setConditionDicDetailData({})
      getConditionDicDetailRequest({ conditionId: record.conditionId }).then(res => {
        if (res.data.code === 0) {
          setConditionDicDetailData(res.data.data)
          setConditionDicVisible(true)
        }
      })
    } else if (selectVal === '4') {
      setAiAbilityVisible(true)
      setAiAbilityDetail({})
      getAIbilityDetailRequest({ aiId: record.aiId }).then(res => {
        if (res.data.code === 0) {
          setAiAbilityDetail(res.data.data)
        }
      })
    }
  }

  // 获取列表数据
  const getTableData = () => {
    const variableName = {
      '1': sceneProductListRequest, // 场景产品列表
      '2': conditionTypeListRequest, // 条件类型接口
      '3': conditionDicListRequest, // 条件字典接口
      '4': AIAbilityListRequest, // AI能力列表
    }
    const params = { ...form.getFieldsValue(), ...pager }
    setLoading(true)
    variableName[selectVal](params).then(res => {
      if (res.data.code === 0) {
        setDataSource(res.data.data.list)
        setTotalRows(res.data.data.pager.totalRows)
      }
    }).finally(() => { setLoading(false) })
  }

  useEffect(() => {
    getTableData()
  }, [pager.pageRows, pager.pageIndex, selectVal])

  // 条件字典-条件类型
  const getCheckType = () => {
    getCheckTypeRequest({ pageIndex: 1, pageRows: 999999 }).then(res => {
      if (res.data.code === 0) {
        setDicConditionType(res.data.data)
      }
    })
  }

  // 参数单位
  const getUnit = () => {
    getUnitRequest({ paged: false }).then(res => {
      if (res.data.code === 0) {
        setUnitList(res.data.data)
      }
    })
  }

  useEffect(() => {
    getCheckType()
    getUnit()
  }, [])

  // 搜索按钮触发,默认请求第一页的数据
  const searchClick = () => {
    if (pager.pageIndex === 1) {
      getTableData()
    } else {
      setPager(pre => {
        let obj = cloneDeep(pre)
        return Object.assign(obj, { pageIndex: 1, pageRows: 10 })
      })
    }
  }

  // 重置按钮触发
  const reset = () => {
    form.resetFields()
    searchClick()
  }

  // 翻页
  const pagerChange = (pageIndex, pageRows) => {
    setPager(pre => {
      let obj = cloneDeep(pre)
      return Object.assign(obj, { pageIndex: pageRows === pager.pageRows ? pageIndex : 1, pageRows })
    })
  }

  // 新增 操作
  const handleAdd = () => {
    const addMap = {
      '2': () => { setConditionTypeVisible(true); setConditionTypeDetailData({}) },
      '3': () => { setConditionDicVisible(true); setConditionDicDetailData({}); getCheckType() },
      '4': () => { setAiAbilityVisible(true); setAiAbilityDetail({}) }
    }
    addMap[selectVal]()
  }

  const rowKeyMap = {
    '1': 'deviceTypeId',
    '2': 'conditionTypeId',
    '3': 'conditionId',
    '4': 'aiId'
  }

  return (
    <div>
      <div className="scene-lib-page">
        <TitleTab title="场景库管理" className="title-box">
          <div className="select-box">
            <Select defaultValue="1" style={{ width: 150 }}
              onChange={(val) => {
                setSelectVal(val)
                setPager(pre => {
                  let obj = cloneDeep(pre)
                  return Object.assign(obj, { pageIndex: 1, pageRows: 10 })
                })
              }}>
              {
                optionMap.map((item, index) => (
                  <Option key={item} value={index + 1 + ''}>{item}</Option>
                ))
              }
            </Select>
          </div>
          <Form layout="inline" className='scene-form' autoComplete="off">
            <div>
              {/* 场景产品列表-查询 */}
              {
                selectVal === '1' && <>
                  <Form.Item label="产品名称">
                    {getFieldDecorator('deviceTypeName', {})(
                      <Input placeholder="请输入产品名称" style={{ width: 240 }}></Input>
                    )}
                  </Form.Item>
                  <Form.Item label="产品ID">
                    {getFieldDecorator('defaultProductId', {
                      getValueFromEvent: (e) => {
                        const val = e.target.value;
                        return val.replace(/[^\d]/g, '');
                      }
                    })(
                      <Input placeholder="请输入产品ID" style={{ width: 240 }}></Input>
                    )}
                  </Form.Item>
                </>
              }
              {/* 条件类型列表-查询 */}
              {
                selectVal === '2' && <>
                  <Form.Item label="条件类型名称">
                    {getFieldDecorator('conditionOptionName', {})(
                      <Input placeholder="请输入条件类型名称" style={{ width: 240 }}></Input>
                    )}
                  </Form.Item>
                </>
              }
              {/* 条件字典列表-查询 */}
              {
                selectVal === '3' && <>
                  <Form.Item label="条件字典名称">
                    {getFieldDecorator('conditionName', {})(
                      <Input placeholder="请输入条件字典名称" style={{ width: 240 }}></Input>
                    )}
                  </Form.Item>
                  <Form.Item label="条件类型">
                    {getFieldDecorator('conditionTypeId', {})(
                      <Select placeholder="请选择条件类型" style={{ width: 240 }}>
                        {
                          dicConditionType && dicConditionType.map(item => (
                            <Option key={item.conditionTypeId} value={item.conditionTypeId + ''}>{item.conditionOptionName}</Option>
                          ))
                        }
                      </Select>
                    )}
                  </Form.Item>
                </>
              }
              {/* AI能力列表-查询 */}
              {
                selectVal === '4' && <>
                  <Form.Item label="能力名称">
                    {getFieldDecorator('aiName', {})(
                      <Input placeholder="请输入能力名称" style={{ width: 240 }}></Input>
                    )}
                  </Form.Item>
                </>
              }
              <Form.Item>
                <Button type="primary" onClick={() => searchClick()}>查询</Button>
              </Form.Item>
              <Form.Item>
                <Button type="default" onClick={() => reset()}>重置</Button>
              </Form.Item>
            </div>
            {
              selectVal !== '1' &&
              <div>
                <Form.Item>
                  <Button type="primary" onClick={() => handleAdd()}>新增</Button>
                </Form.Item>
              </div>
            }
          </Form>
        </TitleTab>

        <Card className='ModuleManagerListTable' style={{ marginTop: 10 }}>
          <TableCom
            rowKey={rowKeyMap[selectVal]}
            bordered
            columns={mapColumns[selectVal]}
            dataSource={dataSource}
            loading={loading}
            pagination={{
              defaultCurrent: 1,
              current: pager.pageIndex,
              onChange: pagerChange,
              pageSize: pager.pageRows,
              total: totalRows,
              showQuickJumper: true,
              pageSizeOptions: ['10'],
              showTotal: () => <span>共 <a>{totalRows}</a> 条</span>
            }}
          />
        </Card>

        {/* 条件类型-弹窗 */}
        {
          conditionTypeVisible &&
          <ConditionTypeModal
            visible={conditionTypeVisible}
            conditionTypeDetailData={conditionTypeDetailData}
            handleOk={() => {
              setConditionTypeVisible(false)
              getTableData()
            }}
            handleCancel={() => setConditionTypeVisible(false)}
          />
        }
        {/* 条件字典-弹窗 */}
        {
          conditionDicVisible &&
          <ConditionDicModal
            visible={conditionDicVisible}
            dicConditionType={dicConditionType}
            unitList={unitList}
            conditionDicDetailData1={conditionDicDetailData}
            handleOk={() => {
              setConditionDicVisible(false)
              getTableData()
            }}
            handleCancel={() => setConditionDicVisible(false)}
          />
        }
        {/* 场景列表-详情弹窗 */}
        {
          sceneProductVisible &&
          <ScenePorductModal
            visible={sceneProductVisible}
            sceneProductDetail={sceneProductDetail}
            handleOk={() => {
              setSceneProductVisible(false)
            }}
            handleCancel={() => setSceneProductVisible(false)}
          />
        }
        {/* ai能力列表 */}
        {
          aiAbilityVisible &&
          <AIAbilityModal
            visible={aiAbilityVisible}
            aiAbilityDetail={aiAbilityDetail}
            handleCancel={() => setAiAbilityVisible(false)}
            handleOk={() => {
              setAiAbilityVisible(false)
              getTableData()
            }}
          />
        }
      </div>
    </div>
  )
}

export default Form.create()(SceneLibList)
