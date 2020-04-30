/**
 * Created by xiaodaoguang on 2019/8/29.
 */
import React, { Component } from 'react';
import { Input, Form, Button, Select, Modal } from 'antd';


class APIForm extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    const { validateFieldsAndScroll } = this.props.form;
    const { saveOpen } = this.props;
    const curApi = this.props.curApi.toJS();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if (curApi.releaseId || curApi.releaseId === 0) {
          values.releaseId = curApi.releaseId;
        }
        values.dataType = Number(values.dataType);
        saveOpen(values);
      }
    });
  };

  handleCancel = (type) => {
    const { toggleDialog } = this.props;
    toggleDialog(type);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { showApiDialog } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 8 }
    };
    return (
      <Modal
        width="1000px"
        visible={showApiDialog}
        title="新增API/编辑"
        onCancel={this.handleCancel.bind(this, 'api')}
        footer={[
          <Button key="submit" type="primary" onClick={this.handleSubmit}>
            发布
          </Button>
        ]}
      >
        <div className="api-wrapper">
          <Form {...formItemLayout} className="api-form">
            <Form.Item
              label="数据类别"
              wrapperCol={{ span: 6 }}
            >
              {getFieldDecorator('dataType', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })
              (<Select>
                <Select.Option value={1}>设备数据</Select.Option>
                <Select.Option value={2}>用户数据</Select.Option>
              </Select>)}
            </Form.Item>
            <Form.Item
              label="API名称/接口URL"
              hasFeedback
            >
              {getFieldDecorator('apiName', {
                rules: [
                  {
                    required: true,
                    message: '请输入api名称',
                  },
                  {
                    max: 20,
                    message: 'API接口名称不能超过20个字符',
                  },
                ],
              })
              (<Input
                placeholder='请输入API接口的名称'
              />)}
            </Form.Item>
            <Form.Item
              label=" "
              hasFeedback
              colon={false}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator('apiUrl', {
                rules: [
                  {
                    required: true,
                    message: '请输入API接口的url',
                  }
                ],
              })
              (<Input placeholder='接口的URL' />)}
            </Form.Item>
            <Form.Item
              label=" "
              hasFeedback
              colon={false}
            >
              {getFieldDecorator('apiDesc', {
                rules: [
                  {
                    required: true,
                    message: '请输入API接口的描述',
                  },
                  {
                    max: 20,
                    message: 'API接口的描述不能超过20个字符',
                  },
                ],
              })
              (<Input placeholder='请输入API接口的描述' />)}
            </Form.Item>
            <Form.Item
              label=" "
              colon={false}
            >
              {getFieldDecorator('requestType', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })
              (<Select
                wrapperCol={{ span: 6 }}
              >
                <Select.Option value="GET">GET</Select.Option>
                <Select.Option value="POST">POST</Select.Option>
              </Select>)}
            </Form.Item>
            <Form.Item
              label=" "
              hasFeedback
              colon={false}
            >
              {getFieldDecorator('releaseVersion', {
                rules: [
                  {
                    required: true,
                    message: '请输入API接口的版本',
                  },
                  {
                    max: 20,
                    message: 'API接口的版本不能超过20个字符',
                  },
                ],
              })
              (<Input
                placeholder='请输入API接口的版本'
              />)}
            </Form.Item>
          </Form>
        </div>
      </Modal>
    );
  }
}

export const WrappedAPIForm = Form.create({
  name: 'api',
  mapPropsToFields(props) {
    const curApiJS = props.curApi.toJS();
    return {
      dataType: Form.createFormField({
        value: curApiJS.dataType,
      }),
      apiName: Form.createFormField({
        value: curApiJS.apiName,
      }),
      apiUrl: Form.createFormField({
        value: curApiJS.apiUrl,
      }),
      apiDesc: Form.createFormField({
        value: curApiJS.apiDesc,
      }),
      requestType: Form.createFormField({
        value: curApiJS.requestType,
      }),
      releaseVersion: Form.createFormField({
        value: curApiJS.releaseVersion,
      }),
    };
  },
})(APIForm);
