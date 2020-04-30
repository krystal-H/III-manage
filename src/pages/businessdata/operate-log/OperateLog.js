import React, { Component } from 'react'
import { Form, Input, Button, Select, DatePicker } from 'antd'
import Table from '../../../components/Table';
import TitleTab from '../../../components/TitleTab/index';
import AloneSection from '../../../components/alone-section/AloneSection';
import moment from 'moment';

import './OperateLog.scss'
import { DateTool, addKeyToTableData } from '../../../util/utils';
import { getListApi } from '../../../apis/operateLog';

const { RangePicker } = DatePicker;
const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';
const defaultPageRows = 20;

const OpetateLogType = {
  "0": "基本操作 ",
  "1": "产品操作 ",
  "2": "数据订阅 ",
  "3": "应用管理 ",
  "4": "设备管理 ",
  "5": "固件管理 ",
  "6": "调试工具"
}

class SearchForm extends Component {
  state = {
    defaultDate: new Date()
  }

  handleSubmit = e => {
    e.preventDefault();

    let { form, searchLog } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        let { time = [], userName, type, theme } = values,
          [startTime = '', endTime = ''] = time;

        if (startTime) {
          startTime = (startTime.hour(0).minute(0).second(0).millisecond(0).unix() - 8 * 3600) * 1000;
        }
        if (endTime) {
          endTime = (endTime.hour(0).minute(0).second(0).millisecond(0).unix() - 8 * 3600) * 1000;
        }
        searchLog({
          userName,
          type,
          theme,
          startTime,
          endTime
        })
      }
    });
  }

  reset = () => {
    let { form } = this.props;

    form.resetFields()
  }

  render() {
    let { form } = this.props,
      { defaultDate } = this.state,
      { getFieldDecorator } = form;

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item label="操作人">
          {getFieldDecorator('userName', {
            rules: [],
            initialValue: ''
          })(<Input style={{ width: '200px' }} placeholder="请输入操作账号" />)}
        </Form.Item>
        <Form.Item label="操作分类">
          {getFieldDecorator('type', {
            rules: [],
            initialValue: ''
          })(<Select style={{ width: '200px' }}>
            <Option value="">请选择</Option>
            <Option value="0">基本操作</Option>
            <Option value="1">产品操作</Option>
            <Option value="2">openApi</Option>
            <Option value="3">数据订阅</Option>
            <Option value="4">应用管理</Option>
            <Option value="5">设备管理</Option>
          </Select>)}
        </Form.Item>
        <Form.Item label="对象">
          {getFieldDecorator('theme', {
            rules: [],
            initialValue: ''
          })(<Input style={{ width: '200px' }} placeholder="请输入操作对象" />)}
        </Form.Item>
        <Form.Item label="时间">
          {getFieldDecorator('time', {
            rules: [],
            // initialValue: [moment(defaultDate, dateFormat), moment(defaultDate, dateFormat)]
          })(<RangePicker
            format={dateFormat} />)}
        </Form.Item>
        <Form.Item style={{ float: 'right' }}>
          <Button style={{ marginRight: '12px' }}
                  htmlType="submit"
                  type="primary">查询</Button>
          <Button onClick={this.reset}
                  type="default">重置</Button>
        </Form.Item>
      </Form>
    )
  }
}

const SearchFormWrapper = Form.create({ name: 'search-form' })(SearchForm)

export default class VisitLog extends Component {
  state = {
    loading: false,
    logsList: [],
    pager: {},
    pageIndex: 1,
    conditions: {
      userName: '',
      type: '',
      theme: '',
      startTime: '',
      endTime: ''
    }
  }

  constructor(props) {
    super(props)
    this.columns = [
      {
        title: 'Id',
        dataIndex: 'logId',
        width: '80px',
      },
      {
        title: '操作人',
        dataIndex: 'userName',
        width: '200px',
      },
      {
        title: '操作',
        dataIndex: 'content',
        width: '200px',
        render: (text) => <span title={text}>{text}</span>
        // render: (text, record) => {
        //   let { type } = record;
        //   return <span>{OpetateLogType[type] || '未识别类型'}</span>
        // }
      },
      {
        title: '对象',
        dataIndex: 'theme',
        render: (text) => <span title={text}>{text}</span>
      },
      {
        title: '时间',
        width: '200px',
        dataIndex: 'createTime',
        render: (text, record) => {
          let { createTime } = record;
          return <span>{DateTool.utcToDev(+createTime)}</span>
        }
      },
    ];
  }

  componentDidMount() {
    this.getLogsList()
  }

  getLogsList() {
    let { conditions, pageIndex } = this.state,
      _data = {};

    Object.keys(conditions).forEach(item => {
      if (conditions[item]) {
        _data[item] = conditions[item]
      }
    })
    getListApi({
      ..._data,
      pageIndex,
      pageRows: defaultPageRows,
      version: '1.1',
    }).then(data => {
      let { list, pager } = data.data.data || {};
      this.setState({
        logsList: addKeyToTableData(list),
        pager,
        loading: false,
      })
    })
  }

  searchLog = (conditions) => {
    this.setState({
      conditions, // 需要存放在state中，因为切换pageIndex时也需要用到
      pageIndex: 1 // 重置pageIndex
    }, () => {
      this.getLogsList()
    })
  }
  changePage = (pageIndex = 1) => {
    this.setState({
      pageIndex,
      loading: true,
    }, () => {
      this.getLogsList()
    })
  }

  render() {
    let { logsList, pager, pageIndex, loading } = this.state;
    return (
      <div>
        <AloneSection title="">
          <div className="search-area">
            <TitleTab title="日志">
              <SearchFormWrapper searchLog={this.searchLog} />
            </TitleTab>
          </div>
          <div className="operate-content" style={{ marginTop: '24px', padding: '12px 24px' }}>
            <Table
              rowKey={"logId"}
              columns={this.columns}
              pager={pager}
              loading={loading}
              onPageChange={this.changePage}
              dataSource={logsList} />
          </div>
        </AloneSection>
      </div>
    )
  }
}
