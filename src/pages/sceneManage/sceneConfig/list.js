import React, { Component } from 'react'
import { Form, Input, Button, Modal, message, notification } from 'antd'
import { Link } from 'react-router-dom';
import TitleTab from '../../../components/TitleTab';
import Table from '../../../components/Table';
import axios from '../../../util/api.request';
import { saveGloalInfo } from '../../../apis/ruleSet'
const { TextArea } = Input;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
class List extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sceneName: undefined,
      pageIndex: 1,
      list: [],
      pager: {},
      addVisable: false
    };
    this.column = [
      { title: '标题', dataIndex: 'sceneName', width: 250 },
      { title: '规则数', dataIndex: 'ruleNum' },
      { title: '订阅app数', dataIndex: 'bindAppNum', },
      { title: '历史活跃度', dataIndex: 'vigorIndex' },
      { title: '状态', dataIndex: 'enable', render: e => <span>{{ '1': '已启用', '0': '未启用' }[e]}</span> },
      {
        title: '操作', dataIndex: 'sceneId', width: 200,
        render: (sceneId, { enable }) => <span className='comman-table-margin'>
          <Link  target="_black" to={{ pathname: "/sceneMgt/sceneConfig/detail/"+sceneId }}>详情</Link>
          {/* <a onClick={() => this.goDetail(sceneId)} >详情</a> */}
          <a onClick={() => this.enableH(sceneId, enable ? 0 : 1)} >{enable == 1 ? '禁用' : '启用'}</a>
          <a onClick={() => this.deleteH(sceneId)} >删除</a>
        </span>
      },
    ];
  }
  componentDidMount = () => {
    this.getList();
  }
  onReset = () => {
    this.setState({
      sceneName: undefined,
    }, () => {
      this.getList();
    })
  }
  changeSearch = (t, v) => {
    this.setState({ [t]: v })
  }
  goDetail = (id) => {
    // this.props.history.push(`/sceneMgt/sceneConfig/detail/${id}`)
    // window.open
    window.open(window.location.origin + window.location.pathname + '#/sceneMgt/sceneConfig/detail/' + id) ;
  }
  getList = (index) => {
    if (index) {
      this.setState({ pageIndex: index })
    }
    let { sceneName, pageIndex } = this.state;
    let param = {
      paged: true,
      pageIndex: index || pageIndex,
      pageRows: 10,
      sceneName,
      level: 2
    }
    axios.Get('expert/scene/list/v2.0', param).then(({ data = {} }) => {
      let res = data.data || {};
      let { list = [], pager = {} } = res
      this.setState({ list, pager })
    });
  }
  deleteH = sceneId => {
    Modal.confirm({
      title: "提示",
      content: "是否确认删除？",
      onOk: () => {
        axios.Post('expert/scene/delete/v2.0', { sceneId }).then(() => {
          this.getList(this.state.pageIndex)
        });
      }
    });

  }
  enableH = (sceneId, enable) => {
    const t = enable ? '启用' : '禁用';
    Modal.confirm({
      title: "提示",
      content: `是否确认${t}?`,
      onOk: () => {
        axios.Post('expert/scene/enable/v2.0', { sceneId, enable }).then(r => {
          notification.success({ message: `${t}成功` });
          this.getList(this.state.pageIndex)
        });
      }
    });
  }
  newScene = () => {
    this.setState({ addVisable: true })
  }
  handleOk = () => {
    this.props.form.validateFields().then(val => {
      saveGloalInfo(val).then(res => {
        if (res.data.code == 0) {
          message.success('新建场景成功')
          this.setState({ addVisable: false })
          this.getList(this.state.pageIndex)
        }
      })
    })
  }
  handleCancel = () => {
    this.setState({ addVisable: false })
  }
  render() {
    const { sceneName, list, pager, pageIndex, addVisable } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <TitleTab title="系统场景管理">
          <div className="comm-title-search-box">
            <span className="labeknam">场景标题：</span>
            <Input value={sceneName} placeholder="请输入场景标题" maxLength={30} onPressEnter={() => { this.getList() }} onChange={e => { this.changeSearch("sceneName", e.target.value || undefined) }} />

            <Button className='btn' type="primary" onClick={() => { this.getList() }} >查询</Button>
            <Button className='btn' onClick={this.onReset}>重置</Button>

            <Button className='btnright' type="primary" onClick={this.newScene} >+ 新建场景</Button>
          </div>
        </TitleTab>
        <div className="comm-contont-card">
          <Table rowKey="sceneId" columns={this.column} dataSource={list} pager={{ ...pager, pageIndex }} onPageChange={this.getList} />
        </div>
        <Modal
          title="新建场景"
          visible={addVisable}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form  {...formItemLayout}>
            <Form.Item
              label="场景名称"
            >
              {getFieldDecorator('sceneName', {
                rules: [
                  {
                    required: true,
                    message: '请输入场景名称',
                  },
                  {
                    max: 20,
                    message: '场景名称不能超过20个字符',
                  },
                ],
              })
                (<Input placeholder='请输入场景名称' />)}
            </Form.Item>
            <Form.Item
              label="场景描述"
            >
              {getFieldDecorator('summary', {
                rules: [
                  {
                    required: true,
                    message: '请输入场景描述',
                  },
                  {
                    max: 100,
                    message: '场景描述不能超过100个字符',
                  },
                ],
              })
                (<TextArea placeholder='请输入场景描述' />)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}


export default Form.create()(List)