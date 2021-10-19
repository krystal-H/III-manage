import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Modal, Button, Steps, Form, Tabs, Input, Select, InputNumber, Checkbox, Radio, Upload, Icon, message } from 'antd';
import { fileHost } from "../../../util/utils";
import './stepThird.less'

let id = 0

function StepThird({ form }, ref) {
  const [schemeType, setSchemeType] = useState(1)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [descPic, setDescPic] = useState('') // 简介图片
  const { getFieldDecorator, getFieldValue } = form
  const options = [
    { label: '免开发方案', value: 1 },
    { label: 'MCU方案', value: 2 },
    { label: 'Soc方案', value: 3 },
  ]


  // 表单提交
  const validData = () => {
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // setStepCur(2, values)
      }
    })
  }

  // 用于定义暴露给父组件的ref方法
  useImperativeHandle(ref, () => {
    return {
      onFinish: validData
    }
  })

  // 图片格式校验
  const modulePictureBeforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("只能上传PNG格式");
    }
    const fileLength = file.name.length <= 50;
    if (!fileLength) {
      message.error("文件名称长度不超过50个字符");
    }
    return isJpgOrPng && fileLength;
  }

  // 上传文件修改
  const handleChange = (info) => {
    console.log('上传的info', info)
    const { file, fileList } = info;
    if (file.status === "done") {
      setDescPic(file.response.data.url)
    } else if (file.status === "error") {
      message.error(`${info.file.name} 上传失败`);
      setDescPic('')
    } else {
      setDescPic('')
    }
  }
  // --------------------------------------------------------------------
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };

  getFieldDecorator('list', { initialValue: [] });
  const list = getFieldValue('list');

  // getFieldDecorator('list', { initialValue: [{}] });
  // const list = getFieldValue('list');
  
  console.log('打印下list值看看', list)

  // const listContent = list.map((item, index) => {
  //   return (
  //     <Form.Item label='名称：' key={index}>
  //     {getFieldDecorator(`content[${index}].name`, {
  //        rules: [{
  //        required: true,
  //        message: "名称不能为空！",
  //        }],
  //     })(
  //        <Input placeholder="请输入名称" style={{ width: '60%', marginRight: 8 }} />
  //     )}

  //      {index > 0 ? (
  //          <Button type="primary" onClick={() => remove(index)}>删除</Button>
  //      ) : null}


  //     </Form.Item>
  //   );
  // });

  const formItems = list.map((item, index) => (
    <div className="free-scheme-block" key={index}>
      <Form.Item label="可配置模块" labelCol={{ span: 5 }} wrapperCol={{ span: 18 }}>
        {getFieldDecorator(`funcDefList[${index}].funcModule`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: "请输入可配置模块",
            },
          ],
        })(<Input placeholder="请输入可配置模块" style={{ width: '60%', marginRight: 8 }} />)}
      </Form.Item>
      <Form.Item label="可配置功能名称" labelCol={{ span: 5 }} wrapperCol={{ span: 18 }}>
        {getFieldDecorator(`funcDefList[${index}].funcName`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: "请输入可配置功能名称",
            },
          ],
        })(<Input placeholder="请输入可配置功能名称" style={{ width: '60%', marginRight: 8 }} />)}
      </Form.Item>
      <Form.Item label="可配置功能标识" labelCol={{ span: 5 }} wrapperCol={{ span: 18 }}>
        {getFieldDecorator(`funcDefList[${index}].identifier`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: "请输入可配置功能标识",
            },
          ],
        })(<Input placeholder="请输入可配置功能标识" style={{ width: '60%', marginRight: 8 }} />)}
      </Form.Item>
      <Form.Item label="可配置功能数值" labelCol={{ span: 5 }} wrapperCol={{ span: 18 }}>
        {getFieldDecorator(`funcDefList[${index}].dataType.type`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: "请输入可配置功能数值",
            },
          ],
        })(<Input placeholder="请输入可配置功能数值" style={{ width: '60%', marginRight: 8 }} />)}
      </Form.Item>
      <Icon
        key={index}
        className="dynamic-delete-button"
        type="minus-circle-o"
        onClick={() => remove(index)}
      />
    </div>
  ));

  // const add = () => {
  //   const list = form.getFieldValue('list');
  //   const nextList = list.concat({});
  //   form.setFieldsValue({
  //     list: nextList,
  //   });
  // }

  // // 删除
  // const remove = (index) => {
  //   const list = form.getFieldValue('list');
  //   const content = form.getFieldValue('content');
  //   if (list.length === 1) {
  //     return;
  //   }

  //   form.setFieldsValue({
  //     list: list.filter((item, key) => key !== index),
  //     content: content.filter((item, key) => key !== index),
  //   });
  // }

  // 删除
  const remove = index => {
    console.log('数组list的其中一项', index)
    const list = form.getFieldValue('list');
    const funcDefList = form.getFieldValue('funcDefList')
    // We need at least one passenger
    // if (list.length === 1) {
    //   return;
    // }
    form.setFieldsValue({
      list: list.filter((item,key) => key !== index),
      funcDefList: funcDefList.filter((item, key) => key !== index),
    });
  };

  // const add = () => {
  //   const list = form.getFieldValue('list');
  //   const nextList = list.concat({});
  //   form.setFieldsValue({
  //     list: nextList,
  //   });
  // }

  // 新增
  const add = () => {
    // can use data-binding to get
    const list = form.getFieldValue('list');
    const nextList = list.concat({});
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      list: nextList,
    });
  }

  const uploadConfigs = {
    action: fileHost,
    className: "upload-list-inline",
    data: file => ({ appId: 31438, domainType: 4 })
  }
  return (
    <Form labelCol={{ span: 5 }} wrapperCol={{ span: 18 }}>
      <Form.Item label="价格">
        {getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入价格', whitespace: true }],
        })(<Input placeholder="请输入价格" style={{ width: 500 }} />)}人民币/个
      </Form.Item>
      <Form.Item label="支持方案">
        {getFieldDecorator("supportFileTransfer", {
          rules: [{ required: true, message: "请选择支持方案" }]
        })(
          <Checkbox.Group
            options={options}
            onChange={(e) => setSchemeType(e)}
          />
          // <Radio.Group onChange={(e) => setSchemeType(e)}>
          //   <Radio value={1}>免开发</Radio>
          //   <Radio value={2}>MCU方案</Radio>
          //   <Radio value={3}>Soc方案</Radio>
          // </Radio.Group>
        )}
      </Form.Item>
      {/* 免开发方案 */}
      {
        schemeType == 1 &&
        <div>
          <Form.Item
            label="可配置固件引脚示意图"
            extra="请上传尺寸为227*404px，格式为png的引脚示意图"
            wrapperCol={{ span: 10 }}>
            {getFieldDecorator("picture", {
              rules: [{ required: true, message: "请上传可配置固件引脚示意图" }]
            })(
              <div>
                <Upload
                  {...uploadConfigs}
                  listType="picture"
                  defaultFileList={[]}
                  onPreview={() => setPreviewVisible(true)}
                  beforeUpload={modulePictureBeforeUpload}
                  accept="image/png,image/jpeg"
                  onChange={handleChange}>
                  {descPic && descPic.length >= 1 ?
                    null : (<Button><Icon type="upload" /> 上传图片</Button>)
                  }
                </Upload>
                <Modal visible={previewVisible} footer={null}
                  onCancel={() => setPreviewVisible(false)}>
                  <img alt="example" style={{ width: "100%" }} src={descPic} />
                </Modal>
              </div>
            )}
          </Form.Item>
          <Form.Item label="可配置固件功能部分">
            {formItems}
            {/* {listContent} */}
            <Form.Item>
              <Button type="primary" onClick={() => add()}>新增</Button>
            </Form.Item>
          </Form.Item>
        </div>
      }
    </Form>
  )
}

export default Form.create()(forwardRef(StepThird))