import React, { Component } from 'react';
import { PageHeader, Steps, Button, Row, Col, notification } from 'antd';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { toJS } from 'immutable';
import { WrappedDataLabelForm } from './form/dataLabelForm';
import { WrappedDataScopeForm } from './form/dataScopeForm';
import { saveStaticLabelApi } from '../../../apis/dataLabel';
import { REQUEST_SUCCESS } from '../../../config/config';

import './style.scss';

const { Step } = Steps;

class DataLabel extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // 路由切换时置空数据
    this.props.changeCurrent('submit');
    this.props.clearFormData();
  }

  next = (e) => {
    const { current } = this.props;
    if (current === 0) {
      this.dataLabelForm.handleSubmit(e);
    } else if (current === 1) {
      this.dataScopeForm.handleSubmit(e);
    }
  };

  saveStaticLabel = () => {
    let { labelForm, scopeForm } = this.props;
    saveStaticLabelApi({
      labelAlias:labelForm.labelAlias.value,
      labelName:labelForm.labelName.value,
      labelValue:labelForm.labelValue.value,
      deviceImport: scopeForm.excelFiles[0],
      batch: scopeForm.batch.value,
      accountName: scopeForm.accountName.value,
    }).then((res) => {
      const code = res.data.code;
      const msg = res.data.msg;
      let method = code === 0 ? 'success' : 'error';
      if (code === REQUEST_SUCCESS) {
        notification[method]({
          message: '数据标签保存成功',
          description: '数据标签保存成功',
          duration: 3,
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
        this.props.changeCurrent('submit');
        this.props.clearFormData();
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

  _getCurStepContent() {
    const { labelForm, scopeForm, addFile, deleteFile, changeCurrent, changeFormData } = this.props;
    return [
      {
        title: '定义标签数据',
        content: (
          <WrappedDataLabelForm
            changeCurrent={changeCurrent}
            onRef={ref => this.dataLabelForm = ref}
            labelForm={labelForm}
            changeFormData={changeFormData}
          />
        ),
      },
      {
        title: '确定数据范围',
        content: (
          <WrappedDataScopeForm
            scopeForm={scopeForm}
            changeCurrent={changeCurrent}
            onRef={ref => this.dataScopeForm = ref}
            changeFormData={changeFormData}
            addFile={addFile}
            deleteFile={deleteFile}
          />
        ),
      },
      {
        title: '提交计算处理',
        content: (
          <div className="third-content">
            <Row gutter={0} align="middle">
              <Col span={2}>
                <span>标签列表：</span>
              </Col>
              <Col span={8}>
                <div className="label-name-column">
                  <div>标签名称</div>
                  <div>{labelForm.labelName.value}</div>
                </div>
              </Col>
              <Col span={8}>
                <div className="label-value-column">
                  <div>标签值</div>
                  <div>{labelForm.labelValue.value}</div>
                </div>
              </Col>
            </Row>
            <Row gutter={8} align="middle">
              <Col span={2}>
              </Col>
              <Col span={16} className="remarks">
                <span>备注：设备标签，必须包含标签名称和对应的标签值。</span>
              </Col>
            </Row>
            <Row gutter={8} align="middle">
              <Col span={2}>
                <span>范围数据：</span>
              </Col>
              <Col>
                <span>{scopeForm.batch.value}</span>
              </Col>
            </Row>
          </div>
        ),
      },
    ];
  }

  render() {
    let { changeCurrent, current } = this.props;
    let steps = this._getCurStepContent();
    return (
      <div className="data-label-page-wrapper">
        <PageHeader
          title="数据标签--标签分析"
          className="data-label-title"
          subTitle="备注：暂时仅支持对设备，做标签标示。"
        />
        <div className="data-label-content-wrapper">
          <div className="step-wrapper">
            <Steps current={current}>
              {steps.map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <div className="steps-content">
              {steps[current].content}
            </div>
            <div className="steps-action">
              {current > 0 && (
                <Button style={{ marginRight: 8 }} onClick={() => changeCurrent('prev')}>
                  上一步
                </Button>
              )}
              {current < steps.length - 1 && (
                <Button type="primary" onClick={this.next}>
                  下一步
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button type="primary" onClick={this.saveStaticLabel}>
                  提交
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    labelForm: state.getIn(['dataLabel', 'labelForm']).toJS(),
    scopeForm: state.getIn(['dataLabel', 'scopeForm']).toJS(),
    current: state.getIn(['dataLabel', 'current']),
  }
};

const mapDispatch = (dispatch) => {
  return {
    changeCurrent(type){
      const action = actionCreators.changeCurrent(type);
      dispatch(action);
    },
    changeFormData(type, formData){
      const action = actionCreators.changeFormData(type, formData);
      dispatch(action);
    },
    saveStaticLabel(formData){
      const action = actionCreators.saveStaticLabel(formData);
      dispatch(action);
    },
    addFile(file){
      const action = actionCreators.addFile(file);
      dispatch(action);
    },
    deleteFile(file){
      const action = actionCreators.deleteFile(file);
      dispatch(action);
    },
    clearFormData(){
      const action = actionCreators.clearFormData();
      dispatch(action);
    }
  }
};

export default connect(mapState, mapDispatch)(DataLabel);
