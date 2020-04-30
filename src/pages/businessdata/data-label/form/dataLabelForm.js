/**
 * Created by xiaodaoguang on 2019/8/29.
 */
import React, { Component } from 'react';
import { Input, Form } from 'antd';

class DataLabelForm extends Component {

  componentDidMount() {
    this.props.onRef(this);
  }

  constructor(props) {
    super(props);
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

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 21 },
    };
    return (
      <div className="first-content">
        <Form {...formItemLayout} className="data-label-form">
          <Form.Item
            label="标签类别名"
          >
            {getFieldDecorator('labelAlias', {
              rules: [
                {
                  max: 50,
                  message: '最多可输入50个字符',
                }
              ],
            })
            (<Input
              placeholder='最多可输入50个字符'
              style={{ width: 'calc(35% - 24px)' }}
            />)}
            <span className="item">如：业务类</span>
          </Form.Item>
          <Form.Item
            label="新增标签名称"
          >
            {getFieldDecorator('labelName', {
              rules: [
                {
                  required: true,
                  message: '请输入新增标签名称',
                },
                {
                  max: 50,
                  message: '最多可输入50个字符',
                },
              ],
            })
            (<Input
              placeholder='最多可输入50个字符'
              style={{ width: 'calc(35% - 24px)' }}
            />)}
            <span className="item">如：项目主体</span>
          </Form.Item>
          <Form.Item
            label="对应value"
          >
            {getFieldDecorator('labelValue', {
              rules: [
                {
                  required: true,
                  message: '请输入对对应value',
                },
                {
                  max: 30,
                  message: '最多可输入30个字符',
                },
              ],
            })
            (<Input
              placeholder='最多30个字符'
              style={{ width: 'calc(35% - 24px)' }}
            />)}
            <span className="item">如：酒店名称，木棉花酒店</span>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export const WrappedDataLabelForm = Form.create({
  name: 'dataLabel',
  onFieldsChange(props, changedFields) {
    // console.log('changedFields', changedFields);
    if (JSON.stringify(changedFields) === '{}') {
      return;
    }
    props.changeFormData('labelForm', changedFields);
  },
  mapPropsToFields(props) {
    const { labelForm } = props;
    let labelFormMap = {};
    for (let key of Object.keys(labelForm)) {
      labelFormMap[key] = Form.createFormField({
        ...labelForm[key],
        value: labelForm[key].value,
      })
    }
    return labelFormMap;
  }
})(DataLabelForm);
