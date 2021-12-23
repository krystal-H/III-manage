import React, { useState, useEffect } from 'react'
import { Card, Form, Input, Button, Select, Tooltip, Modal, message } from 'antd'
import TitleTab from '../../../components/TitleTab'
import TableCom from '../../../components/Table'
import {
  conditionTypeListRequest,
  conditionDicListRequest,
  sceneProductListRequest,
  AIAbilityListRequest
} from '../../../apis/sceneLibList'
import './sceneLibList.less'

const { Option } = Select

const btnArr = [
  { title: "编辑", icon: "edit", status: 0, key: 1 },
  { title: "删除", icon: "delete", status: 0, key: 2 }
]
const optionMap = ['场景产品列表', '条件类型列表', '条件字典列表', 'AI能力列表']

function SceneLibList({ form }) {
  const { getFieldDecorator, getFieldsValue } = form
  const [pager, setPager] = useState({ pageIndex: 1, pageRows: 10 }) //分页
  const [totalRows, setTotalRows] = useState(0)
  const [dataSource, setDataSource] = useState([{}])
  const [loading, setLoading] = useState(false) //antd的loading控制
  const [selectVal, setSelectVal] = useState('1') // 列表类型切换

  // 场景产品列表
  const sceneColumns = [
    {
      title: '产品名称',
      dataIndex: '',
      key: '',
      // width: 100
    },
    {
      title: '产品ID',
      dataIndex: '',
      key: '',
    },
    {
      title: '大类',
      dataIndex: '',
      key: '',
    },
    {
      title: '小类',
      dataIndex: '',
      key: '',
    },
    {
      title: '状态查询',
      dataIndex: '',
      key: '',
    },
    {
      title: '功能控制',
      dataIndex: '',
      key: '',
    },
    {
      title: '输入输出',
      dataIndex: '',
      key: '',
    },
    {
      title: '编辑时间',
      dataIndex: '',
      key: '',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: "100px",
      render: (text, record) => (
        <div>
          {btnArr.map((value, index) => {
            return (
              <Tooltip key={index} placement="top" title={value.title}>
                <Button style={{ marginLeft: index === 1 ? "10px" : "" }}
                  shape="circle"
                  size="small"
                  icon={value.icon}
                  key={record.key}
                // onClick={() => this.handleDelete(item, value)}
                />
              </Tooltip>
            )
          })}
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
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: "10%",
      render: (text, record) => (
        <div>
          {btnArr.map((value, index) => {
            return (
              <Tooltip key={index} placement="top" title={value.title}>
                <Button style={{ marginLeft: index === 1 ? "10px" : "" }}
                  shape="circle"
                  size="small"
                  icon={value.icon}
                  key={record.conditionTypeId}
                // onClick={() => this.handleDelete(item, value)}
                />
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
          {btnArr.map((value, index) => {
            return (
              <Tooltip key={index} placement="top" title={value.title}>
                <Button style={{ marginLeft: index === 1 ? "10px" : "" }}
                  shape="circle"
                  size="small"
                  icon={value.icon}
                  key={record.conditionId}
                // onClick={() => this.handleDelete(item, value)}
                />
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
      dataIndex: '',
      key: '',
    },
    {
      title: '接口地址',
      dataIndex: '',
      key: '',
    },
    {
      title: '输入',
      dataIndex: '',
      key: '',
    },
    {
      title: '输出',
      dataIndex: '',
      key: '',
    },
    {
      title: '描述',
      dataIndex: '',
      key: '',
    },
    {
      title: '编辑时间',
      dataIndex: '',
      key: '',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: "10%",
      render: (text, record) => (
        <div>
          {btnArr.map((value, index) => {
            return (
              <Tooltip key={index} placement="top" title={value.title}>
                <Button style={{ marginLeft: index === 1 ? "10px" : "" }}
                  shape="circle"
                  size="small"
                  icon={value.icon}
                  key={record.key}
                // onClick={() => this.handleDelete(item, value)}
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

  // 搜索按钮触发,默认请求第一页的数据
  const searchClick = () => {
    if (pager.pageIndex === 1) {
      getTableData()
    } else {
      setPager({ pageIndex: 1, pageRows: 10 })
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

  return (
    <div>
      <div className="scene-lib-page">
        <TitleTab title="场景库管理" className="title-box">
          <div className="select-box">
            <Select defaultValue="1" style={{ width: 150 }}
              onChange={(val) => setSelectVal(val)}>
              {
                optionMap.map((item, index) => (
                  <Option key={item} value={index + 1 + ''}>{item}</Option>
                ))
              }
            </Select>
          </div>
          <Form layout="inline" className='scene-form'>
            <div>
              {/* 场景产品列表-查询 */}
              {
                selectVal === '1' && <>
                  <Form.Item label="产品名称">
                    {getFieldDecorator('productName', {
                      getValueFromEvent: (e) => {
                        const val = e.target.value;
                        return val.replace(/[^\d]/g, '');
                      }
                    })(
                      <Input placeholder="请输入产品名称" style={{ width: 240 }}></Input>
                    )}
                  </Form.Item>
                  <Form.Item label="产品ID">
                    {getFieldDecorator('productId', {
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
                    {getFieldDecorator('productName', {
                      getValueFromEvent: (e) => {
                        const val = e.target.value;
                        return val.replace(/[^\d]/g, '');
                      }
                    })(
                      <Input placeholder="请输入条件类型名称" style={{ width: 240 }}></Input>
                    )}
                  </Form.Item>
                </>
              }
              {/* 条件字典列表-查询 */}
              {
                selectVal === '3' && <>
                  <Form.Item label="条件字典名称">
                    {getFieldDecorator('productName', {
                      getValueFromEvent: (e) => {
                        const val = e.target.value;
                        return val.replace(/[^\d]/g, '');
                      }
                    })(
                      <Input placeholder="请输入条件字典名称" style={{ width: 240 }}></Input>
                    )}
                  </Form.Item>
                  <Form.Item label="条件类型">
                    {getFieldDecorator('productName', {
                      getValueFromEvent: (e) => {
                        const val = e.target.value;
                        return val.replace(/[^\d]/g, '');
                      }
                    })(
                      <Input placeholder="请输入条件类型" style={{ width: 240 }}></Input>
                    )}
                  </Form.Item>
                </>
              }
              {/* AI能力列表-查询 */}
              {
                selectVal === '4' && <>
                  <Form.Item label="AI能力列表">
                    {getFieldDecorator('productName', {
                      getValueFromEvent: (e) => {
                        const val = e.target.value;
                        return val.replace(/[^\d]/g, '');
                      }
                    })(
                      <Input placeholder="请输入AI能力列表" style={{ width: 240 }}></Input>
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
            <div>
              <Form.Item>
                <Button type="primary" onClick={() => setAddSchemeModal(true)}>新增</Button>
              </Form.Item>
            </div>
          </Form>
        </TitleTab>

        <Card className='ModuleManagerListTable' style={{ marginTop: 10 }}>
          <TableCom
            rowKey="moduleId"
            bordered
            columns={mapColumns[selectVal]}
            dataSource={dataSource}
            loading={loading}
            pagination={{
              defaultCurrent: 1,
              current: pager.pageIndex,
              onChange: pagerChange,
              pageSize: pager.pageRows,
              // total: totalRows,
              total: dataSource.length || 0,
              showQuickJumper: true,
              pageSizeOptions: ['10'],
              // showTotal: () => <span>共 <a>{totalRows}</a> 条</span>
              showTotal: () => <span>共 <a>{dataSource.length || 0}</a> 条</span>
            }}
          />
        </Card>

      </div>
    </div>
  )
}

export default Form.create()(SceneLibList)
