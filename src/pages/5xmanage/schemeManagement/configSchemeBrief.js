import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Modal, Button, Form, Input, Select, Upload, Icon, message } from 'antd';
import { fileHost } from "../../../util/utils";

const { Option } = Select
const { TextArea } = Input

function ConfigSchemeBrief({ setStepCur, form, communicationMethodsList, editData = {}, opeType }, ref) {
  const [descPic, setDescPic] = useState([]) // 简介图片
  const [previewVisible, setPreviewVisible] = useState(false)

  useEffect(() => {
    if (opeType === 'edit') {
      editData.picture && setDescPic([{ url: editData.picture, name: '见截图', uid: 1 }])
    }
  }, [editData])

  useEffect(() => {
    console.log(descPic, '11111111')
  }, [descPic])


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
    console.log('上传的info', info)
    const { file, fileList } = info;
    if (file.status === "done") {
      setDescPic([{
        status: 'done',
        name: file.name,
        url: file.response.data.url
      }])
      form.setFieldsValue({ picture: file.response.data.url })
    } else if (file.status === "error") {
      message.error(`${info.file.name} 上传失败`);
      setDescPic('')
      form.setFieldsValue({ picture: '' })
    } else {
      setDescPic('')
      form.setFieldsValue({ picture: '' })
    }
  }

  const onChangeFile = ({ file, fileList }) => {
    if (file.status === "done") {
      let file = fileList[0];
      // 给最外层添加一个url ,不然upload组件不会点击下载
      file.url = file.response.data.url;
      form.setFieldsValue({ picture: file.response.data.url })
    } else if (file.status === "error") {
      message.error(`上传失败`);
    } else if (file.status === "removed") {
      form.setFieldsValue({ picture: '' })
    }
  }

  // 表单提交
  const validData = () => {
    form.validateFields((err, values) => {
      if (!err) {
        values.picture = descPic[0].url || ''
        console.log('Received values of form: ', values);
        setStepCur(2, values)
      }
    })
  }

  // 用于定义暴露给父组件的ref方法
  useImperativeHandle(ref, () => {
    return {
      onFinish: validData
    }
  }, [descPic])

  const uploadConfigs = {
    action: fileHost,
    className: "upload-list-inline",
    data: file => ({ appId: 31438, domainType: 4 })
  }
  const { getFieldDecorator, getFieldValue } = form

  const uploadButton = (type = '上传文档') => {
    return (<Button><Icon type="upload" />{type}</Button>)
  }
  return (
    <Form labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
      <Form.Item label="方案名称">
        {getFieldDecorator('name', {
          initialValue: editData.name,
          rules: [{ required: true, message: '请输入方案名称', whitespace: true }],
        })(<Input placeholder="请输入方案名称" />)}
      </Form.Item>
      <Form.Item label="通信协议" hasFeedback>
        {getFieldDecorator('protocol', {
          initialValue: editData.protocol,
          rules: [{ required: true, message: '请选择通信协议' }],
        })(
          <Select placeholder="请选择通信协议" showSearch optionFilterProp="children"
            onChange={(val) => sessionStorage.setItem('communicationType', val)}>
            {
              communicationMethodsList && communicationMethodsList.map((item, index) => (
                <Option value={item.moduleType} key={item.moduleType}>{item.moduleTypeName}</Option>
              ))
            }
          </Select>
        )}
      </Form.Item>
      <Form.Item label="概况" hasFeedback>
        {getFieldDecorator('summarize', {
          initialValue: editData.summarize,
          rules: [{ required: true, message: '请输入概况' }]
        })(
          <TextArea rows={3} autoSize={{ minRows: 3, maxRows: 3 }}></TextArea>
        )}
      </Form.Item>
      <Form.Item label="特点" hasFeedback>
        {getFieldDecorator('feature', {
          initialValue: editData.feature,
          rules: [{ required: true, message: '请输入特点' }]
        })(
          <TextArea rows={3} autoSize={{ minRows: 3, maxRows: 3 }}></TextArea>
        )}
      </Form.Item>
      <Form.Item label="适合场景" hasFeedback>
        {getFieldDecorator('illustrate', {
          initialValue: editData.illustrate,
          rules: [{ required: true, message: '请输入适合' }]
        })(
          <TextArea rows={3} autoSize={{ minRows: 3, maxRows: 3 }}></TextArea>
        )}
      </Form.Item>
      <Form.Item
        label="简介图"
        extra="支持格式：png、jpg 建议尺寸：134 * 188px"
        wrapperCol={{ span: 10 }}>
        {getFieldDecorator("picture", {
          initialValue: editData.picture,
          rules: [{ required: true, message: "请上传简介图" }]
        })(
          <div>
            <Upload
              {...uploadConfigs}
              listType="picture"
              defaultFileList={descPic || []}
              onPreview={() => setPreviewVisible(true)}
              beforeUpload={() => modulePictureBeforeUpload}
              accept="image/png,image/jpeg"
              onChange={handleChange}>
              {descPic && descPic.length >= 1 ? null : uploadButton('上传图片')}
            </Upload>
          </div>
        )}
      </Form.Item>
      {/* <Modal visible={previewVisible} footer={null}
        onCancel={() => setPreviewVisible(false)}>
        <img alt="example" style={{ width: "100%" }} src={descPic && descPic.length && descPic[0].url} />
      </Modal> */}
    </Form>
  )
}

ConfigSchemeBrief = forwardRef(ConfigSchemeBrief)
export default Form.create()(ConfigSchemeBrief)
