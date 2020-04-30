import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Form, Input, Button, Select, Tooltip } from 'antd'
import { actionCreators } from './store';
import TableCom from '../../../components/Table';
import { DateTool } from "../../../util/utils";
import TitleTab from '../../../components/TitleTab';
import TableHOC from '../../../components/TableHOC';

const FormItem = Form.Item

const modeList = {
  0: '开发中',
  1: '已发布',
  2: '审核中'
}

class ProductList extends Component {
  state = {
    productId: undefined,
    status: undefined,
    query: {},
    loading: false
  }

  handleClick = (id) => {
    this.props.history.push(`./${id}`);
  }

  column = [
    { title: "产品名称", dataIndex: 'productName', key: 'productName', width: "20%", render: (text) => <span title={text}>{text}</span> },
    { title: "产品ID", dataIndex: 'productId', key: 'productId', width: "10%" },
    { title: "所属分类", dataIndex: 'allCategoryName', key: 'allCategoryName', width: "20%", render: (text) => <span title={text}>{text}</span> },
    { title: "状态", dataIndex: 'mode', key: 'mode', width: "102px", render: (item) => (<span>{modeList[item] || ''}</span>) },
    { title: "创建账号", dataIndex: 'email', key: 'email', width: "20%", render: (text) => <span title={text}>{text}</span> },
    {
      title: "创建时间", dataIndex: 'createTime', key: 'createTime', width: "17%", render: (item) => {
        let timeStr = DateTool.utc2beijing(item, "yyyy-MM-dd hh:mm:ss")
        return <span title={timeStr}>{timeStr}</span>
      }
    },
    {
      title: "操作", dataIndex: 'productId', key: 'operation', width: 66,
      render: (item) => {
        return (
          <Tooltip placement="top" title="查看">
            <Button icon="info" shape="circle" size="small" onClick={this.handleClick.bind(this, item)}/>
        </Tooltip>
        )
      }
    }
  ]

  render() {
    let { getFieldDecorator } = this.props.form;
    const { productList, pager, loading } = this.props;
    return (
      <div className="product">
        <TitleTab title="产品">
          <Form layout="inline">
            <FormItem label="产品ID">
              {getFieldDecorator('productId', {
                getValueFromEvent: (e) => {
                  const val = e.target.value;
                  return val.replace(/[^\d]/g, '');
                }
              })(
                <Input placeholder="请输入产品ID" maxLength={9} style={{ width: 240 }} onPressEnter={this.props.onFilter}></Input>
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
              <Button type="primary" onClick={this.props.onFilter} >查询</Button>
            </FormItem>
            <FormItem >
              <Button onClick={this.props.onReset}>重置</Button>
            </FormItem>
          </Form>
        </TitleTab>
        <Card>
          <TableCom rowKey={"productId"} columns={this.column} dataSource={productList} 
              pager={pager} onPageChange={this.props.onChange} loading={loading} />
        </Card>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  productList: state.getIn(['product', 'productList']).toJS(),
  pager: state.getIn(['product', 'pager']).toJS(),
  loading: state.getIn(['product', 'loading']),
})

const mapDispatchToProps = (dispatch) => ({
  getList: (pager) => {
    return dispatch(actionCreators.getProductList(pager))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(TableHOC(ProductList)))