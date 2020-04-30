/**
 * Created by xiaodaoguang on 2019/8/29.
 */
import React, { Component } from 'react';
import { Input, Form, Button, Icon, Modal } from 'antd';

class DimensionForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  handleCancel = (type) => {
    const { toggleDialog } = this.props;
    toggleDialog(type);
  };

  compareToDimensionKeys = (rule, value, callback) => {
    const { form, dataDimension } = this.props;
    let fieldValues = [];
    const dataDimensionJS = dataDimension.toJS();
    dataDimensionJS.forEach((item, index) => {
      console.log('getFieldValue', form.getFieldValue('dimensionName-' + index));
      fieldValues.push(form.getFieldValue('dimensionName-' + index));
    });
    let flag = false;
    if (fieldValues.length !== new Set(fieldValues).size) {
      flag = true;
    }
    if (value && flag) {
      callback('数据维度Key值重复输入');
    } else {
      callback();
    }
  };

  serializableDimensionJson = (type, values) => {
    let dimensionList = [];
    // 按数据维度、数据指标分组
    for (let key of Object.keys(values)) {
      if (type === 'dimension' && key.startsWith('d')) {
        dimensionList.push({
          [key]: values[key],
        });
      }
      if (type === 'index' && key.startsWith('i')) {
        dimensionList.push({
          [key]: values[key],
        });
      }
    }
    // 按字母表排序
    dimensionList.sort((a, b) => {
      let aKey = Object.keys(a)[0];
      let bKey = Object.keys(b)[0];
      let aKeyCompareStr = aKey.split('').reverse().join('');
      let bKeyCompareStr = bKey.split('').reverse().join('');
      return aKeyCompareStr - bKeyCompareStr;
    });
    let dimensionListJson = '{';
    for (let i = 0; i < dimensionList.length; i++) {
      let item = dimensionList[i];
      let nextItem = dimensionList[++i];
      let value = Object.values(item)[0];
      let nextValue = Object.values(nextItem)[0];
      dimensionListJson = dimensionListJson + '\"' + value + '\"' + ':' + '\"' + nextValue + '\"' + ',';
    }
    dimensionListJson = dimensionListJson.substr(0, dimensionListJson.length - 1);
    dimensionListJson += '}';
    return dimensionListJson;
  };

  handleSubmit = e => {
    e.preventDefault();
    const { validateFieldsAndScroll } = this.props.form;
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let dimensionJson = this.serializableDimensionJson('dimension', values);
        let indexJson = this.serializableDimensionJson('index', values);
        const { saveDimensionIndex, dimensionType } = this.props;
        // console.log('dimensionListJson', dimensionJson);
        // console.log('indexJson', indexJson);
        saveDimensionIndex(dimensionJson, indexJson, dimensionType);
      }
    });
  };

  getDimensionListHTML(type) {
    const { form, dataDimension, dataIndex, delDimensionItem } = this.props;
    const dataDimensionJS = dataDimension.toJS();
    const dataIndexJS = dataIndex.toJS();
    const { getFieldDecorator } = form;
    let dimensionJS = null;
    let name = '';
    let desc = '';
    let message = '';
    let messageDesc = '请输入备注，不超50个字符';
    if (type === 'dimension') {
      dimensionJS = dataDimensionJS;
      name = 'dimensionName-';
      desc = 'dimensionDesc-';
      message = '请输入维度';
    } else {
      dimensionJS = dataIndexJS;
      name = 'indexName-';
      desc = 'indexDesc-';
      message = '请输入指标';
    }

    return dimensionJS && dimensionJS.length > 0 ? dimensionJS.map((item, index) => {
      return (
        <div key={index}>
          <Form.Item
            hasFeedback
            style={{ display: 'inline-block', width: 'calc(50% - 24px)' }}
          >
            {getFieldDecorator(name + index, {
              rules: [
                {
                  required: true,
                  message: message,
                },
                {
                  validator: this.compareToDimensionKeys,
                },
              ],
            })
            (<Input
              placeholder={message}
            />)}
          </Form.Item>
          <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }} />
          <Form.Item
            hasFeedback
            style={{ display: 'inline-block', width: 'calc(50% - 24px)' }}
          >
            {getFieldDecorator(desc + index, {
              rules: [
                {
                  required: true,
                  message: messageDesc,
                },
                {
                  max: 50,
                  message: messageDesc,
                },
              ],
            })
            (<Input
              placeholder={messageDesc}
            />)}
          </Form.Item>
          {index !== 0 &&
          <a href="javascript:" onClick={() => delDimensionItem(type, index)}
             style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>
            <Icon type="minus-circle" />
          </a>}
        </div>
      );
    }) : null;
  }

  render() {
    const { showDimensionDialog, addDimensionItem } = this.props;
    let { loading } = this.state;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 }
    };
    return (
      <Modal
        width="1000px"
        visible={showDimensionDialog}
        title="维度指标发布/编辑"
        onCancel={this.handleCancel.bind(this, 'dimension')}
        footer={[
          <Button key="submit" type="primary" loading={loading} onClick={this.handleSubmit}>
            发布
          </Button>,
        ]}
      >
        <div className="dimension-wrapper">
          <Form {...formItemLayout} className="dimension-form">
            <Form.Item
              label="数据维度"
            >
              {this.getDimensionListHTML('dimension')}
              <div>
                <a href="javascript:" onClick={() => addDimensionItem('dimension')}>+ 新增维度</a>
              </div>
            </Form.Item>
            <Form.Item
              label="数据指标"
            >
              {this.getDimensionListHTML('index')}
              <div>
                <a href="javascript:" onClick={() => addDimensionItem('index')}>+ 新增指标</a>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    );
  }
}

export const WrappedDimensionForm = Form.create({
  name: 'dimension',
  onFieldsChange(props, changedFields) {
    console.log('changedFields', changedFields);
    if (JSON.stringify(changedFields) === '{}') {
      return;
    }
    props.changeDimensionData(changedFields);
  },
  mapPropsToFields(props) {
    const dataDimensionJS = props.dataDimension.toJS();
    const dataIndexJS = props.dataIndex.toJS();
    let mapObj = {};
    dataDimensionJS.forEach((item, index) => {
      let { dimensionName, dimensionDesc } = item;
      mapObj['dimensionName-' + index] = Form.createFormField({
        value: dimensionName,
      });
      mapObj['dimensionDesc-' + index] = Form.createFormField({
        value: dimensionDesc,
      })
    });
    dataIndexJS.forEach((item, index) => {
      let { indexName, indexDesc } = item;
      mapObj['indexName-' + index] = Form.createFormField({
        value: indexName,
      });
      mapObj['indexDesc-' + index] = Form.createFormField({
        value: indexDesc,
      })
    });
    return mapObj;
  },
})(DimensionForm);
