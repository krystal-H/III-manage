import React, { Component } from 'react'
import { Card, Form, Input, Button, Select, Tooltip } from 'antd'
import TableCom from '../../../components/Table';
import { DateTool } from "../../../util/utils";
import TitleTab from '../../../components/TitleTab';
// import TableHOC from '../../../components/TableHOC';
import './style.less'
const FormItem = Form.Item
const { Option } = Select

const modeList = {
  0: '开发中',
  1: '已发布',
  2: '审核中'
}

class List extends Component {

  constructor(props){
    super(props);
    this.state = {
      searchName: undefined,
      searchType: "-1",
    };
    this.column = [
        { title: '提交账号', dataIndex: 'name',ellipsis:true },
        { title: '分组ID', dataIndex: 'id', width:'100px',},
        { title: '描述', dataIndex: 'remark',ellipsis:true},
        { title: '添加时间', dataIndex: 'createTime', width:'180px',
            render: text => <span>{text && DateTool.utcToDev(text) || '--'}</span>
        },
        { title: '操作', key: 'action', width:'120px',
            render: (text, record) => (
                <span>
                    
                    {/* <a onClick={this.openDel.bind(this,record.id,record.name)} >chan</a> */}
                </span>
            ),
        },
    ];
  }
  onReset = ()=>{
    this.setState({
      searchName:undefined,searchType:"-1"
    })
  }
  onFilter=()=>{

  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { searchName, searchType } = this.state;
    
    return (
      <div className="product">
        <TitleTab title="申请&采购模组申请">
          <div className="comm-title-search-box">
            <span className="labeknam">产品名称</span><Input value={searchName} placeholder="输入产品名称查询" maxLength={10} onPressEnter={this.onFilter} />
            <span className="labeknam">产品状态</span>
            <Select placeholder="请选择状态" value={searchType}>
              <Option key={"-1"} value={"-1"}> 全部 </Option>
              {
                Object.keys(modeList).map((item, index) => (
                  <Option key={index} value={+item}> {modeList[item]} </Option>
                ))
              }
            </Select>
            <Button className='btn' type="primary" onClick={this.onFilter} >查询</Button>
            <Button className='btn' onClick={this.onReset}>重置</Button>
          </div>
        </TitleTab>
        {/* <Card>
          <TableCom rowKey={"productId"} columns={this.column} dataSource={productList} 
              pager={pager} onPageChange={this.props.onChange} loading={loading} />
        </Card> */}
      </div>
    )
  }
}


export default Form.create()(List)