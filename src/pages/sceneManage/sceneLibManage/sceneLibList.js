import React, { useState, useEffect } from 'react'
import { Card, Form, Input, Button, Select, Tooltip, Modal, message } from 'antd'
import TitleTab from '../../../components/TitleTab'
import TableCom from '../../../components/Table'
import './sceneLibList.less'

const { Option } = Select

const optionMap = ['场景产品列表', '条件类型列表', '条件字典列表', 'AI能力列表']
const btnArr = [
  { title: "编辑", icon: "edit", status: 0, key: 1 },
  { title: "删除", icon: "delete", status: 0, key: 2 }
]

function SceneLibList({ form }) {
  const { getFieldDecorator, getFieldsValue } = form
  const [pager, setPager] = useState({ pageIndex: 1, pageRows: 10 }) //分页
  const [totalRows, setTotalRows] = useState(0)
  const [dataSource, setDataSource] = useState([{}])
  const [loading, setLoading] = useState(false) //antd的loading控制
  const [selectVal, setSelectVal] = useState('1') // 列表类型切换

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
            <Select defaultValue="1" onChange={(val) => setSelectVal(val)} style={{ width: 150 }}>
              {
                optionMap.map((item, index) => (
                  <Option key={item} value={index + 1 + ''}>场景产品列表</Option>
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
          <TableCom rowKey="moduleId" bordered
            columns={sceneColumns}
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

      </div>
    </div>
  )
}

export default Form.create()(SceneLibList)
