import React, { Component } from 'react';
import {
  notification,
  Button,
  Modal,
  PageHeader,
} from 'antd';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { auditOperationApi } from '../../../apis/customMethod';
import { REQUEST_SUCCESS } from '../../../config/config';
import Table from '../../../components/Table';

import './style.scss';

class CustomMethod extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
    }
  }

  componentDidMount = () => {
    this.props.getMethodList({
      pageIndex: 1,
      pageRows: 10,
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (status) => {
    const { curApi } = this.props;
    this.setState({ loading: true });
    let message = status === 1 ? '统计方法审核通过' : '统计方法审核已拒绝';
    let method = status === 1 ? 'success' : 'error';
    auditOperationApi({
      apiId: curApi.apiId,
      status
    }).then((res) => {
      const code = res.data.code;
      if (code === REQUEST_SUCCESS) {
        notification[method]({
          message,
          description: message,
          duration: 3,
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
        this.setState({ loading: false, visible: false }, () => {
          this.props.getMethodList({
            pageIndex: 1,
            pageRows: 10,
          });
        });
      }
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  onChange = (pageNumber) => {
    this.props.getMethodList({
      pageIndex: pageNumber,
      pageRows: 10,
    });
  };

  getMethodDetail = (apiId) => {
    this.props.getMethodDetail(apiId);
    this.showModal();
  };

  _ruleType = (type) => {
    if (type === 1) {
      return (
        <span>取平均值：y=（a<sub>1</sub>+a<sub>2</sub>+...+a<sub>n</sub>）/n</span>
      );
    } else if (type === 2) {
      return (
        <span>取和：y= a<sub>n</sub>+a<sub>（n-1）</sub></span>
      );
    }
    else if (type === 3) {
      return (
        <span>取最大值：y=a<sub>max</sub></span>
      );
    }
    else if (type === 4) {
      return (
        <span>取最小值：y=a<sub>min</sub></span>
      );
    } else {
      return (
        <span>加载中...</span>
      );
    }
  };

  _getAntDMethodListData() {
    let { methodList, pager } = this.props;
    methodList.forEach((item, index) => {
      item.key = item.apiId;
      item.id = (pager.pageIndex - 1) * 10 + index + 1;
    });
    let columns = [{
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '统计方法名称',
      dataIndex: 'apiName',
      key: 'apiName',
      render: (text) => <span title={text}>{text}</span>
    }, {
      title: '申请时间',
      dataIndex: 'createDate',
      key: 'createDate',
    }, {
      title: '申请账号',
      dataIndex: 'developerName',
      key: 'developerName',
      render: (text) => <span title={text}>{text}</span>
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: '120px',
      render(status) {
        return status === 0 ? '未审核' : (status === 1 ? '已通过' : '已拒绝');
      }
    }, {
      title: '操作',
      key: 'opt',
      width: '120px',
      render: (text, record) => (
        <span>
          <a href="javascript:" onClick={() => this.getMethodDetail(record.apiId)}>审核入口</a>
        </span>
      ),
    }];
    return {
      methodList,
      columns,
    }
  }

  render() {
    let { visible, loading } = this.state;
    let { pager, curApi, methodListLoading } = this.props;
    let { methodList, columns } = this._getAntDMethodListData();
    let reportFormsTypeName = '';
    let statusName = '';
    switch (curApi.reportFormsType) {
      case 1:
        reportFormsTypeName = '1年';
        break;
      case 2:
        reportFormsTypeName = '1月';
        break;
      case 3:
        reportFormsTypeName = '1天';
        break;
      case 4:
        reportFormsTypeName = '1小时';
        break;
      default:
        break;
    }
    switch (curApi.status) {
      case 0:
        statusName = '未审核';
        break;
      case 1:
        statusName = '已通过';
        break;
      case 2:
        statusName = '已拒绝';
        break;
      default:
        break;
    }
    let auditOperationButtons = [
      <Button key="back" type="danger" loading={loading} onClick={() => this.handleOk(2)}>
        拒绝
      </Button>,
      <Button key="submit" type="primary" loading={loading} onClick={() => this.handleOk(1)}>
        通过
      </Button>,
    ];
    if (curApi.status !== 0) {
      auditOperationButtons = [
        <Button key="submit" type="primary" onClick={this.handleCancel}>
          确认
        </Button>,
      ];
    }

    return (
      <div className="method-page-wrapper">
        <PageHeader
          title="自定义统计方法审核"
          className="method-title"
        />
        <div className="method-content-wrapper">
          <h3>统计方法列表：</h3>
          <Table
            dataSource={methodList}
            columns={columns}
            rowKey={"id"}
            pager={pager}
            loading={methodListLoading}
            onPageChange={this.onChange}
          />
          <Modal
            width="600px"
            visible={visible}
            title="API详情"
            onCancel={this.handleCancel}
            footer={auditOperationButtons}
          >
            <ul className="name-wrapper">
              <li className="item">统计方法名称：</li>
              <li className="item">{curApi.apiName}</li>
            </ul>
            <ul className="detail-wrapper">
              <li className="item">详情：</li>
              <li className="item">状态：{statusName}</li>
              <li className="item">产品名称：{curApi.productName}</li>
              <li className="item">统计协议：{curApi.property}</li>
              <li className="item">统计精度：{reportFormsTypeName}</li>
              <li className="item">返回值计算规则：{this._ruleType(curApi.ruleType)}</li>
            </ul>
          </Modal>
        </div>
      </div>
    )
  }
}

const mapState = (state) => ({
  methodList: state.getIn(['customMethod', 'methodList']).toJS(),
  pager: state.getIn(['customMethod', 'pager']).toJS(),
  curApi: state.getIn(['customMethod', 'curApi']).toJS(),
  methodListLoading: state.getIn(['customMethod', 'methodListLoading']),
});

const mapDispatch = (dispatch) => {
  return {
    getMethodList(param){
      const action = actionCreators.getMethodList(param);
      dispatch(action);
    },
    getMethodDetail(apiId){
      const action = actionCreators.getMethodDetail(apiId);
      dispatch(action);
    }
  }
};

export default connect(mapState, mapDispatch)(CustomMethod);
