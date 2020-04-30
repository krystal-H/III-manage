import React, { Component } from 'react';
import { Input, Form, Button, notification, Upload, Icon } from 'antd';

class DataScopeForm extends React.Component {

  componentDidMount() {
    this.props.onRef(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    const { validateFieldsAndScroll } = this.props.form;
    const { changeCurrent } = this.props;
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        changeCurrent('next');
      }
    });
  };

  exportFormWorkExcel = () => {
    let host = window.location.host;
    if (host.startsWith('localhost')) {
      // 内网ip
      host = '200.200.200.50';
    }
    window.location.href = 'https://' + host + '/v1/web/manage-open/labelInfo/exportFormworkExcel';
  };

  onRemove = file => {
    this.props.deleteFile(file);
  };

  beforeUpload = file => {

    this.props.addFile(file);
    return false;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const scopeForm = this.props.scopeForm;
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 18 }
    };
    return (
      <div className="second-content">
        <Form {...formItemLayout} className="data-scope-form">
          <Form.Item
            label="设备导入"
          >
            {getFieldDecorator('deviceImport', {
              rules: [
                {
                  required: true,
                  message: '请选择文件',
                },
              ],
            })(
              <div>
                <a href="javascript:" className="download" onClick={this.exportFormWorkExcel}>下载模版</a>
                <Upload
                  onRemove={this.onRemove}
                  beforeUpload={this.beforeUpload}
                  fileList={scopeForm.excelFiles}
                  accept='.xls,.xlsx'
                >
                  <Button>
                    <Icon type="upload" />批量倒入
                  </Button>
                </Upload>
                <span>备注：导入列表设备MAC、IMEI列表数据，后台将赋予上一步定义的标签名称和标签值。</span>
              </div>
            )}
          </Form.Item>
          <Form.Item
            label="批次名"
          >
            {getFieldDecorator('batch', {
              rules: [
                {
                  required: true,
                  message: '请输入本次导入的设备列表，备注名称',
                },
              ],
            })
            (<Input
              placeholder={'输入本次导入的设备列表，备注名称'}
              style={{ width: 'calc(50%)' }}
            />)}
          </Form.Item>
          <Form.Item
            label="账户名称"
          >
            {getFieldDecorator('accountName', {
              rules: [
                {
                  required: true,
                  message: '请输入账户名称',
                },
              ],
            })
            (<Input
              placeholder={'请输入账户名称'}
              style={{ width: 'calc(50%)' }}
            />)}
            <span style={{ marginLeft: '10px' }}>请输入管理后台配置好的接口访问用户角色下账号</span>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export const WrappedDataScopeForm = Form.create({
  name: 'dataScope',
  onFieldsChange(props, changedFields) {
    // console.log('changedFields', changedFields);
    if (JSON.stringify(changedFields) === '{}') {
      return;
    }
    props.changeFormData('scopeForm', changedFields);
  },
  mapPropsToFields(props) {
    const scopeForm = props.scopeForm;
    return {
      deviceImport: Form.createFormField({
        ...scopeForm.deviceImport,
        value: scopeForm.deviceImport.value,
      }),
      batch: Form.createFormField({
        ...scopeForm.batch,
        value: scopeForm.batch.value,
      }),
      accountName: Form.createFormField({
        ...scopeForm.accountName,
        value: scopeForm.accountName.value,
      }),
    };
  },
})(DataScopeForm);
