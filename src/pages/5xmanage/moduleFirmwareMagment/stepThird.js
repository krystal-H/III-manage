import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Modal, Button, Steps, Form, Tabs, Input, Select, InputNumber, Checkbox, Radio, Upload, Icon, message } from 'antd';
import { fileHost } from "../../../util/utils";
import { cloneDeep } from 'lodash'
import './stepThird.less'

let id = 0

function StepThird({ form }, ref) {
  const [schemeType, setSchemeType] = useState()
  const [previewVisible, setPreviewVisible] = useState(false)
  const [descPic, setDescPic] = useState('') // 简介图片
  const [valueType, setValueType] = useState([])

  const { getFieldDecorator, getFieldValue } = form
  const options = [
    { label: '免开发方案', value: 1 },
    { label: 'MCU方案', value: 2 },
    { label: 'Soc方案', value: 3 },
  ]

  useEffect(() => {
    console.log('schemeType', schemeType)
  }, [schemeType])

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

  const chooseValueType = (val, index) => {
    let copyVal = cloneDeep(valueType)
    copyVal[index] = val
    console.log('copyVal', copyVal)
    setValueType(copyVal)
  }
  // --------------------------------------------------------------------
  // --------------**********************
  // 新增
  const add2 = (index) => {
    const innerList = form.getFieldValue(`innerList${index}`);
    const nextList = innerList.concat({});
    form.setFieldsValue({
      [`innerList${index}`]: nextList,
    })
  }

  // 删除
  const remove2 = (index1, index2) => {
    console.log('数组innerList的其中一项', index2)
    const innerList = form.getFieldValue(`innerList${index1}`);
    const funcDefList = form.getFieldValue('funcDefList')
    console.log('------------', innerList.filter((item, key) => key !== index2))
    form.setFieldsValue({
      [`innerList${index1}`]: innerList.filter((item, key) => key !== index2),
      funcDefList: funcDefList[index1].dataType.specs.def.filter((item, key) => key !== index2),
    })
  }

  // 枚举的DOM
  const createInnerHtml = (name, index1) => {

    getFieldDecorator(`innerList${index1}`, { initialValue: [{}] });
    const innerList = getFieldValue(`innerList${index1}`);
    console.log('打印下innerList值看看', innerList)

    return innerList.map((item, index2) => (
      <div className="inline-form-item" key={index2}>
        <Form.Item label="数值范围" labelCol={{ span: 5 }} wrapperCol={{ span: 18 }}>
          {getFieldDecorator(`${name}[${index2}].k`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
              {
                required: true,
                whitespace: true,
                message: "请输入数值范围",
              },
            ],
          })(<Input style={{ width: 120, marginRight: 8 }} />)}
        </Form.Item>
        <Form.Item label="" className="right-item">
          至&nbsp;&nbsp;&nbsp;&nbsp;
          {getFieldDecorator(`${name}[${index2}].v`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
              {
                required: true,
                whitespace: true,
                message: "请输入数值范围",
              },
            ],
          })(<Input style={{ width: 120, marginRight: 8 }} />)}
          <Icon
            key={index2}
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => remove2(index1, index2, )}
          />
        </Form.Item>
      </div>
    ))
  }
  // --------------**********************

  // 新增
  const add = () => {
    const list = form.getFieldValue('listww');
    const nextList = list.concat({});
    form.setFieldsValue({
      listww: nextList,
    })
  }

  // 删除
  const remove = index => {
    console.log('数组list的其中一项', index)
    const list = form.getFieldValue('listww');
    const funcDefList = form.getFieldValue('funcDefList')
    form.setFieldsValue({
      listww: list.filter((item, key) => key !== index),
      funcDefList: funcDefList.filter((item, key) => key !== index),
    })
  }
  getFieldDecorator('listww', { initialValue: [] });
  const list = getFieldValue('listww');
  console.log('打印下list值看看', list)

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
      <Form.Item label="可配置功能数值" labelCol={{ span: 5 }} wrapperCol={{ span: 18 }} hasFeedback>
        {getFieldDecorator(`funcDefList[${index}].dataType.type`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: "请选择可配置功能数值",
            },
          ],
        })(
          <Select placeholder="请选择可配置功能数值"
            style={{ width: '60%', marginRight: 8 }}
            onChange={(val) => chooseValueType(val, index)}>
            <Select.Option value="int">数值</Select.Option>
            <Select.Option value="enum">枚举</Select.Option>
          </Select>
        )}
      </Form.Item>
      {/* 数值型 */}
      {
        valueType[index] === 'int' &&
        <>
          <div className="inline-form-item">
            <Form.Item label="数值范围" labelCol={{ span: 5 }} wrapperCol={{ span: 18 }}>
              {getFieldDecorator(`funcDefList[${index}].dataType.specs.min`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "请输入数值范围",
                  },
                ],
              })(<Input style={{ width: 120, marginRight: 8 }} />)}
            </Form.Item>
            <Form.Item label="" className="right-item">
              至&nbsp;&nbsp;&nbsp;&nbsp;
              {getFieldDecorator(`funcDefList[${index}].dataType.specs.max`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "请输入数值范围",
                  },
                ],
              })(<Input style={{ width: 120, marginRight: 8 }} />)}
            </Form.Item>
          </div>
          <Form.Item label="默认值" labelCol={{ span: 5 }} wrapperCol={{ span: 18 }}>
            {getFieldDecorator(`funcDefList[${index}].dataType.specs.defaultValue`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "请输入默认值",
                },
              ],
            })(<Input style={{ width: '60%', marginRight: 8 }} />)}
          </Form.Item>
        </>
      }
      {/* 枚举 */}
      {
        valueType[index] === 'enum' &&
        <>
          <div>{createInnerHtml(`funcDefList[${index}].dataType.specs.def`, index)}</div>
          <Form.Item>
            <Button type="primary" onClick={() => add2(index)}>新增</Button>
          </Form.Item>
        </>
      }
      <Icon
        key={index}
        className="dynamic-delete-button"
        type="minus-circle-o"
        onClick={() => remove(index)}
      />
    </div>
  ));


  // ------------------------------------------------------

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
          <Radio.Group onChange={(e) => setSchemeType(e.target.value)}>
            <Radio value={1}>免开发</Radio>
            <Radio value={2}>MCU方案</Radio>
            <Radio value={3}>Soc方案</Radio>
          </Radio.Group>
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