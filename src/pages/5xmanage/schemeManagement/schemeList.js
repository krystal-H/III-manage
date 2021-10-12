import React, { Component } from 'react';
import { Card, Input, Button, Select, notification, Divider, Modal, Form, Tooltip } from 'antd';
import TitleTab from '../../../components/TitleTab';
import TableCom from '../../../components/Table';
import TableHOC from '../../../components/TableHOC';

import './schemeList.less'

const FormItem = Form.Item
const TitleOption = TitleTab.Option

const modeList = {
  0: '开发中',
  1: '已发布',
  2: '审核中'
}

class SchemeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      pager: {
        totalRows: 0,
        pageIndex: 0
      },
      loading: false,//antd的loading控制，
    }
  }
  column = [
    { title: "修改账号", dataIndex: 'productName', key: 'productName', render: (text) => <span title={text}>{text}</span> },
    { title: "更新时间", dataIndex: 'productId', key: 'productId' },
    { title: "品类", dataIndex: 'allCategoryName', key: 'allCategoryName', render: (text) => <span title={text}>{text}</span> },
    { title: "免开发方案", dataIndex: 'mode', key: 'mode', render: (item) => (<span>{modeList[item] || ''}</span>) },
    { title: "MCU方案", dataIndex: 'email', key: 'email', render: (text) => <span title={text}>{text}</span> },
    { title: "Soc方案", dataIndex: 'email', key: 'email', render: (text) => <span title={text}>{text}</span> },
    { title: "状态", dataIndex: 'mode', key: 'mode', render: (item) => (<span>{modeList[item] || ''}</span>) },
    {
      title: "操作", dataIndex: 'productId', key: 'operation', width: 66,
      render: (item) => {
        return (
          <Tooltip placement="top" title="查看">
            <Button icon="info" shape="circle" size="small" />
          </Tooltip>
        )
      }
    }
  ]

  // 查询列表
  searchList = () => {
    console.log('查询列表')
  }

  // 重置
  onReset = () => {
    console.log('重置')
  }

  // 翻页
  onPageChange = () => {
    console.log('翻页')
  }

  render() {
    const { dataSource, pager, loading } = this.state
    const { getFieldDecorator } = this.props.form
    return (
      <div className="schemeList">
        <TitleTab title="方案信息导入">
          <Form layout="inline" className="schemeList-form">
            <div>
              <FormItem label="三级品类">
                {getFieldDecorator('productId', {
                  getValueFromEvent: (e) => {
                    const val = e.target.value;
                    return val.replace(/[^\d]/g, '');
                  }
                })(
                  <Input placeholder="请输入三级品类名称" style={{ width: 240 }} onPressEnter={() => this.searchList()}></Input>
                )}
              </FormItem>
              <FormItem label="状态">
                {getFieldDecorator('mode')(
                  <Select style={{ width: 160 }} placeholder="请选择状态">
                    {
                      Object.keys(modeList).map((item, index) => (
                        <Select.Option key={index} value={+item}>
                          {modeList[item]}
                        </Select.Option>
                      ))
                    }
                  </Select>
                )}
              </FormItem>
              <FormItem  >
                <Button type="primary" onClick={() => this.searchList()} >查询</Button>
              </FormItem>
              <FormItem >
                <Button onClick={() => this.onReset()}>重置</Button>
              </FormItem>
            </div>
            <div>
              <Form.Item>
                <Button type="primary">批量导入</Button>
              </Form.Item>
              <Form.Item>
                <Button type="primary">新增</Button>
              </Form.Item>
            </div>
          </Form>
        </TitleTab>
        <Card>
          <TableCom rowKey={"productId"} columns={this.column} dataSource={dataSource}
            pager={pager} onPageChange={() => this.onPageChange()} loading={loading} />
        </Card>
      </div>
    )
  }
}

export default Form.create()(SchemeList)