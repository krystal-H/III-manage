import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Modal, Button, Steps, Form, Input, Select, Radio, Upload, Icon, message } from 'antd';
import { fileHost } from "../../../util/utils";

const { Option } = Select;
const { TextArea } = Input

function ConfigScheme({ nextStep, form }, ref) {
  const [configInfo, setConfigInfo] = useState({})
  const [descPic, setDescPic] = useState('') // 简介图片

  const configs = {
    action: fileHost,
    className: "upload-list-inline",
    data: file => ({
      appId: 31438,
      domainType: 4 // 不加密，公开
    })
  };

  // 图片预览
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };
  // 图片格式校验
  const modulePictureBeforeUpload = (file) => {
    console.log("file,file.type", file, file.type);
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("只能上传JPG或者PNG格式");
    }
    // const isLt2M = file.size / 1024 / 1024 <= 0.5;
    // if (!isLt2M) {
    //   message.error("图片必须小于500KB!");
    // }
    const fileLength = file.name.length <= 50;
    if (!fileLength) {
      message.error("文件名称长度不超过50个字符");
    }
    // return isJpgOrPng && isLt2M && fileLength;
    return isJpgOrPng && fileLength;
  }

  // 上传文件修改
  const handleChange = (info) => {
    const { file, fileList } = info;
    console.log('info,', info)
    if (file.status === "done") {
      setDescPic(file.response.data.url)
    } else if (file.status === "error") {
      message.error(`${info.file.name} 上传失败`);
      setDescPic('')
    } else {
      setDescPic('')
    }
  }

  // 表单提交
  const validData = () => {
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        nextStep()
      }
    })
  }

  // 用于定义暴露给父组件的ref方法
  useImperativeHandle(ref, () => {
    return {
      onFinish: validData
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  })

  const { getFieldDecorator } = form
  return (
    <div>
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
        <Form.Item label="方案名称">
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: '请输入方案名称', whitespace: true }],
          })(<Input placeholder="请输入方案名称" />)}
        </Form.Item>
        <Form.Item label="通信协议" hasFeedback>
          {getFieldDecorator('select', {
            rules: [{ required: true, message: '请选择通信协议' }],
          })(
            <Select placeholder="请选择通信协议">
              <Option value="china">China</Option>
              <Option value="usa">U.S.A</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="概况" hasFeedback>
          {getFieldDecorator('textarea1', {
            rules: [{ required: true, message: '请输入概况' }]
          })(
            <TextArea rows={3} autoSize={{ minRows: 3, maxRows: 3 }}></TextArea>
          )
          }
        </Form.Item>
        <Form.Item label="特点" hasFeedback>
          {getFieldDecorator('textarea2', {
            rules: [{ required: true, message: '请输入特点' }]
          })(
            <TextArea rows={3} autoSize={{ minRows: 3, maxRows: 3 }}></TextArea>
          )
          }
        </Form.Item>
        <Form.Item label="适合" hasFeedback>
          {getFieldDecorator('textarea3', {
            rules: [{ required: true, message: '请输入适合' }]
          })(
            <TextArea rows={3} autoSize={{ minRows: 3, maxRows: 3 }}></TextArea>
          )
          }
        </Form.Item>
        <Form.Item
          label="简介图"
          extra="支持格式：png、jpg 建议尺寸：134 * 188px"
          wrapperCol={{ span: 10 }}>
          {getFieldDecorator("descPic", {
            rules: [{ required: true, message: "请上传简介图" }]
          })(
            <div>
              <Upload
                {...configs}
                listType="picture"
                defaultFileList={configInfo.descPic || []}
                onPreview={() => handlePreview()}
                beforeUpload={modulePictureBeforeUpload}
                accept="image/png,image/jpeg"
                onChange={handleChange}>
                {descPic && descPic.length >= 1 ?
                  null : (<Button><Icon type="upload" /> 上传图片</Button>)
                }
              </Upload>
              <Modal visible={false} footer={null}>
                <img alt="example" style={{ width: "100%" }} src={descPic} />
              </Modal>
            </div>
          )}
        </Form.Item>
      </Form>
    </div>
  )
}

export default Form.create()(forwardRef(ConfigScheme))