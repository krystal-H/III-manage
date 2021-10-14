import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Modal, Button, Form, Input, Select, Upload, Icon, message } from 'antd';
import { fileHost } from "../../../util/utils";

const { Option } = Select
const { TextArea } = Input

function ConfigSchemeBrief({ nextStep, form, validateFunc }, ref) {
  const [configInfo, setConfigInfo] = useState({})
  const [descPic, setDescPic] = useState('') // 简介图片
  const [previewVisible, setPreviewVisible] = useState(false)

  // 上传图片后绑定方法到父组件
  // useEffect(() => {
  //   validateFunc(validData)
  // }, [descPic])

  // 图片格式校验
  const modulePictureBeforeUpload = (file) => {
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
        values.descPic = descPic
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

  const uploadConfigs = {
    action: fileHost,
    className: "upload-list-inline",
    data: file => ({ appId: 31438, domainType: 4 })
  }
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
          )}
        </Form.Item>
        <Form.Item label="特点" hasFeedback>
          {getFieldDecorator('textarea2', {
            rules: [{ required: true, message: '请输入特点' }]
          })(
            <TextArea rows={3} autoSize={{ minRows: 3, maxRows: 3 }}></TextArea>
          )}
        </Form.Item>
        <Form.Item label="适合" hasFeedback>
          {getFieldDecorator('textarea3', {
            rules: [{ required: true, message: '请输入适合' }]
          })(
            <TextArea rows={3} autoSize={{ minRows: 3, maxRows: 3 }}></TextArea>
          )}
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
                {...uploadConfigs}
                listType="picture"
                defaultFileList={configInfo.descPic || []}
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
      </Form>
    </div>
  )
}

ConfigSchemeBrief = forwardRef(ConfigSchemeBrief)
// export default Form.create()(forwardRef(ConfigSchemeBrief))  // 暴露不出去onFinish方法
export default Form.create()(ConfigSchemeBrief)
