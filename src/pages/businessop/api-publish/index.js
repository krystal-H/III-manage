/**
 * Created by xiaodaoguang on 2019/8/15.
 */
import React, { Component } from 'react';
import { Tabs, Divider, Button, PageHeader, notification } from 'antd';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { toJS } from 'immutable';
import { WrappedDimensionForm } from './form/wrappedDimensionForm';
import { WrappedAPIForm } from './form/apiForm';
import { REQUEST_SUCCESS } from '../../../config/config';
import { saveOpenApi, cancelApiReleaseApi, saveDimensionIndexApi } from '../../../apis/apiPublish';
import { DateTool } from '../../../util/utils';
import Table from '../../../components/Table';

import './style.scss';

const { TabPane } = Tabs;

class ApiPublish extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dimensionData: [{
        key: 1,
        dataType: '设备数据',
        dataClassify: '汇总类',
      }, {
        key: 2,
        dataType: '设备数据',
        dataClassify: '分析类',
      }, {
        key: 3,
        dataType: '设备数据',
        dataClassify: '基础类',
      }, {
        key: 4,
        dataType: '用户数据',
        dataClassify: '汇总类',
      }, {
        key: 5,
        dataType: '用户数据',
        dataClassify: '分析类',
      }, {
        key: 6,
        dataType: '用户数据',
        dataClassify: '基础类',
      }],
      dimensionColumn: [{
        title: '数据类别',
        dataIndex: 'dataType',
        key: 'dataType'
      }, {
        title: '数据分类',
        dataIndex: 'dataClassify',
        key: 'dataClassify',
      }, {
        title: '操作',
        dataIndex: 'opt',
        render: (text, record) => (
          <span>
            <a href="javascript:" onClick={() => this.props.getDimensionDetail(record.key)}>编辑</a>
        </span>
        ),
      }],
    }
  }

  componentDidMount() {
    this.props.getOpenApiList({
      pageIndex: 1,
      pageRows: 10,
    });
  }

  cancelApiRelease = (releaseId) => {
    cancelApiReleaseApi(releaseId).then((res) => {
      const code = res.data.code;
      const msg = res.data.msg;
      let method = code === 0 ? 'success' : 'error';
      if (code === REQUEST_SUCCESS) {
        notification[method]({
          message: '取消发布成功',
          description: '取消发布成功',
          duration: 3,
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
        this.props.getOpenApiList({
          pageIndex: 1,
          pageRows: 10,
        });
      } else {
        notification[method]({
          message: code,
          description: msg,
          duration: 3,
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
      }
    });
  };

  _getAntDApiListData(apiList) {
    let { editApi } = this.props;
    let dataSource = apiList.toJS();
    dataSource.forEach((item) => {
      item.key = item.releaseId;
    });
    let columns = [{
      title: 'ID',
      dataIndex: 'key',
      key: 'key',
    }, {
      title: 'API名称',
      dataIndex: 'apiName',
      key: 'apiName',
    }, {
      title: '数据类别',
      dataIndex: 'dataType',
      key: 'dataType',
      render(dataType) {
        return dataType === 1 ? "设备数据" : "用户数据";
      }
    }, {
      title: '发布时间',
      dataIndex: 'releaseTime',
      key: 'releaseTime',
      // render(releaseTime) {
      //   return DateTool.utcToDev(releaseTime);
      // }
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render(status) {
        return status === 1 ? "未发布" : "已发布";
      }
    }, {
      title: '操作',
      key: 'opt',
      render: (text, record) => (
        <span>
          {record.status !== 1 && <a href="javascript:" onClick={() => this.cancelApiRelease(record.key)}>取消发布</a>}
          {record.status !== 1 && <Divider type="vertical" />}
          <a href="javascript:" onClick={() => editApi(record.key)}>编辑</a>
        </span>
      ),
    }];
    return {
      dataSource,
      columns,
    }
  }

  changeDimensionData = changedFields => {
    let key = Object.keys(changedFields)[0];
    let value = Object.values(changedFields)[0];
    let type = key.split('-')[0];
    let index = key.split('-')[1];
    this.props.changeDimensionData(type, index, value.value);
  };

  onChange = (pageNumber) => {
    this.props.getOpenApiList({
      pageIndex: pageNumber,
      pageRows: 10,
    });
  };

  saveDimensionIndex = (dataDimension, dataIndex, dimensionType) => {
    saveDimensionIndexApi(dataDimension, dataIndex, dimensionType).then((res) => {
      const code = res.data.code;
      const msg = res.data.msg;
      let method = code === 0 ? 'success' : 'error';
      if (code === REQUEST_SUCCESS) {
        notification[method]({
          message: '保存维度成功',
          description: '保存维度成功',
          duration: 3,
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
        this.props.toggleDialog('dimension');
      } else {
        notification[method]({
          message: code,
          description: msg,
          duration: 3,
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
      }
    });
  };

  saveOpen = (curApi) => {
    saveOpenApi(curApi).then((res) => {
      const code = res.data.code;
      const msg = res.data.msg;
      let message = curApi.releaseId || curApi.releaseId === 0 ? '更新API成功' : '新增API成功';
      let method = code === 0 ? 'success' : 'error';
      if (code === REQUEST_SUCCESS) {
        notification[method]({
          message,
          description: message,
          duration: 3,
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
        this.props.toggleDialog('api');
        this.props.getOpenApiList({
          pageIndex: 1,
          pageRows: 10,
        });
      } else {
        notification[method]({
          message: code,
          description: msg,
          duration: 3,
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
      }
    });
  };

  render() {
    const { apiList, addDimensionItem, pager, loading, dimensionType, delDimensionItem, showApiDialog, curApi, editApi, saveOpenApi, dataDimension, dataIndex, toggleDialog, showDimensionDialog, dataDimensions } = this.props;
    const { dimensionColumn, dimensionData } = this.state;
    let { dataSource, columns } = this._getAntDApiListData(apiList);
    const dimensionPager = {
      currPageRows: 10,
      defaultPageRows: 20,
      hasNextPage: false,
      hasPrevPage: false,
      pageEndRow: 9,
      pageIndex: 1,
      pageRows: 10,
      pageStartRow: 0,
      paged: false,
      totalPages: 1,
      totalRows: 6,
    }
    return (
      <div className="api-page-wrapper">
        <PageHeader
          title="API发布"
          className="api-title"
          extra={[
            <Button key="1" type="primary" onClick={() => {
              editApi()
            }}>
              + 新增API
            </Button>,
          ]}
        />
        <div className="api-content-wrapper">
          <Tabs defaultActiveKey="1">
            <TabPane tab="API列表" key="1">
              <Table
                rowKey={"releaseId"}
                columns={columns}
                pager={pager}
                loading={loading}
                onPageChange={this.onChange}
                dataSource={dataSource} />
            </TabPane>
            <TabPane tab="维度指标" key="2">
              <Table
                rowKey={"key"}
                columns={dimensionColumn}
                pager={dimensionPager}
                // loading={loading}
                // onPageChange={this.onChange}
                dataSource={dimensionData} />
            </TabPane>
          </Tabs>
        </div>
        <WrappedAPIForm
          showApiDialog={showApiDialog}
          toggleDialog={toggleDialog}
          curApi={curApi}
          saveOpen={this.saveOpen}
        />
        <WrappedDimensionForm
          changeDimensionData={this.changeDimensionData}
          addDimensionItem={addDimensionItem}
          delDimensionItem={delDimensionItem}
          dataDimension={dataDimension}
          dataIndex={dataIndex}
          showDimensionDialog={showDimensionDialog}
          toggleDialog={toggleDialog}
          saveDimensionIndex={this.saveDimensionIndex}
          dimensionType={dimensionType}
        />
      </div>
    )
  }
}

const mapState = (state) => ({
  apiList: state.getIn(['apiPublish', 'apiList']),
  loading: state.getIn(['apiPublish', 'loading']),
  pager: state.getIn(['apiPublish', 'pager']).toJS(),
  showApiDialog: state.getIn(['apiPublish', 'showApiDialog']),
  curApi: state.getIn(['apiPublish', 'curApi']),
  showDimensionDialog: state.getIn(['apiPublish', 'showDimensionDialog']),
  dataDimension: state.getIn(['apiPublish', 'dataDimension']),
  dataIndex: state.getIn(['apiPublish', 'dataIndex']),
  dimensionType: state.getIn(['apiPublish', 'dimensionType']),
});

const mapDispatch = (dispatch) => {
  return {
    getOpenApiList(pager){
      const action = actionCreators.getOpenApiList(pager);
      dispatch(action);
    },
    editApi(key){
      const action = actionCreators.editApi(key);
      dispatch(action);
    },
    toggleDialog(type){
      let action = null;
      if (type === 'api') {
        action = actionCreators.toggleApiDialog();
      } else {
        action = actionCreators.toggleDimensionDialog();
      }
      dispatch(action);
    },
    getDimensionDetail(index){
      const action = actionCreators.getDimensionDetail(index);
      dispatch(action);
    },
    addDimensionItem(type){
      const action = actionCreators.addDimensionItem(type);
      dispatch(action);
    },
    delDimensionItem(type, index){
      const action = actionCreators.delDimensionItem(type, index);
      dispatch(action);
    },
    changeDimensionData(type, index, value){
      const action = actionCreators.changeDimensionData(type, index, value);
      dispatch(action);
    },
    // saveDimensionIndex(dataDimension, dataIndex, dimensionType){
    //   const action = actionCreators.saveDimensionIndex(dataDimension, dataIndex, dimensionType);
    //   dispatch(action);
    // },
  }
};

export default connect(mapState, mapDispatch)(ApiPublish);
