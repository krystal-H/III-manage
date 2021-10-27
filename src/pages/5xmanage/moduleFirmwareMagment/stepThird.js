import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Modal, Button, Steps, Form, Tabs, Input, Select, InputNumber, Checkbox, Radio, Upload, Icon, message } from 'antd';
import { fileHost } from "../../../util/utils";
import { cloneDeep } from 'lodash'
import './stepThird.less'

let picId = 0
let uniquekey = 0

// 上传地址
const uploadConfigs = {
  action: fileHost,
  className: "upload-list-inline",
  data: file => ({ appId: 31438, domainType: 4 })
}

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
}

const StyleItem = {
  width: '60%'
}

function StepThird({ form, commitAll }, ref) {
  const [schemeType, setSchemeType] = useState()
  const [valueType, setValueType] = useState([])
  const [previewVisible, setPreviewVisible] = useState(false) // 图片预览
  const [showSrc, setshowSrc] = useState('') // 图片预览展示的地址

  const [pinDiagram, setPindiagram] = useState([]) // 引脚示意图
  const [sourceCode, setSourcecode] = useState([]) // 源码路径
  const [libraryFile, setLibraryFile] = useState([]) // 库文件路径
  const [burnFile, setBurnFile] = useState([]) // 烧录文件路径
  const [modulePicture, setModulepicture] = useState([]) // 模组图片
  const [referenceCircuitDiagram, setReferencecircuitdiagram] = useState([]) // 参考电路图
  const [readmePdf, setReadmepdf] = useState([]) // 说明文档

  const { getFieldDecorator, getFieldValue } = form

  // 表单提交
  const validData = () => {
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if (values.funcDefList && values.funcDefList.length > 0) {
          values.funcDefList = values.funcDefList.map(item => {
            if (item.dataType.type === 'enum') {
              item.dataType.specs.def = item.dataType.specs.def.filter(item => item)
            }
            return item
          })
        }

        // 免开发的参数
        const freeParams = {
          price: values.price,
          schemeType: values.schemeType,
          customConfigJson: JSON.stringify(values.funcDefList) || JSON.stringify([]),
          pinDiagram: pinDiagram && pinDiagram.length ? pinDiagram[0].url : ''
        }
        
        // mcu方案的参数
        const mcuParams = {
          burnFile: values.burnFile, // 烧录文件
          burnFileName: values.burnFileName, // 烧录文件名称
          modulePicture: modulePicture && modulePicture.length ? modulePicture[0].url : '',
          referenceCircuitDiagram: referenceCircuitDiagram && referenceCircuitDiagram.length ? referenceCircuitDiagram[0].url : '',
          readmePdf: readmePdf && readmePdf.length ? readmePdf[0].url : '',
          readmePdfName: '',
        }

        // Soc方案参数
        const socParams = {
          sourceCode: sourceCode && sourceCode.length ? sourceCode[0].url : '',
          sourceCodeVersion: values.sourceCodeVersion,
          sourceCodeName: '',
          libraryFile: libraryFile && libraryFile.length ? libraryFile[0].url : '',
          burnFileVersion: values.burnFileVersion,
          burnFileName: '',
          ...mcuParams
        }
        const firmwareDefReqList = []
        switch (schemeType) {
          case 1:
            firmwareDefReqList.push(freeParams)
            break;
          case 2:
            firmwareDefReqList.push(mcuParams)
            break;
          case 3:
            firmwareDefReqList.push(socParams)
            break;
        }
        commitAll(firmwareDefReqList)
      }
    })
  }

  // 用于定义暴露给父组件的ref方法
  useImperativeHandle(ref, () => {
    return {
      onFinish: validData
    }
  }, [pinDiagram, sourceCode, libraryFile, burnFile, modulePicture, referenceCircuitDiagram, readmePdf, form])

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
  const handleChange = (info, type) => {
    console.log('上传的info', info, type)
    // type首字母转大写，赋值 setAaa(xxx)
    const upperType = type.trim().toLowerCase().replace(type[0], type[0].toUpperCase())
    const { file, fileList } = info
    if (file.status === "done") {
      const arr = []
      const uploadObj = {
        status: 'done',
        url: file.response.data.url
      }
      arr.push(uploadObj)
      setTimeout(() => {
        eval(`set${upperType}`)(arr)
      }, 0)
      form.setFieldsValue({ type: file.response.data.url })
    } else if (file.status === "error") {
      message.error(`${info.file.name} 上传失败`)
      eval(`set${upperType}`)([])
    } else {
      eval(`set${upperType}`)([])
    }
  }

  // 格式判断
  const judgeFormat = (file, type) => {
    switch (type) {
      case '源码':
        return (file.type === "application/zip" || file.type === "application/x-zip-compressed")
      case '烧录文件':
        return (file.type === "application/macbinary" || file.type === "application/octet-stream")
      case '库文件':
        return file.name.substr(file.name.lastIndexOf(".")).toLowerCase() === ".a"
      case 'PDF文件':
        return file.type === "application/pdf"
    }
  }

  // 上传文档限制
  const uploadDocumentLimit = (file, type, limitSize) => {
    const isFormat = judgeFormat(file, type)
    if (!isFormat) {
      message.error(`只能上传${type}!`)
    }

    const isLimit = file.size / 1024 / 1024 <= limitSize
    if (!isLimit) {
      message.error(`文件必须小于${limitSize}M`)
    }

    const fileLength = file.name.length <= 50
    if (!fileLength) {
      message.error("文件名称长度不超过50个字符")
    }

    return isFormat && isLimit && fileLength
  }

  // 图片预览
  const handlePreview = (val, arr) => {
    setPreviewVisible(val)
    setshowSrc(arr[0].url)
  }

  // 数值or枚举
  const chooseValueType = (val, index) => {
    let copyVal = cloneDeep(valueType)
    copyVal[index] = val
    console.log('copyVal', copyVal)
    setValueType(copyVal)
  }
  // --------------------------------------------------------------------
  // -*********新增枚举项start*************
  // 新增枚举项
  const addEnum = (index) => {
    const innerList = form.getFieldValue(`innerList${index}`);
    uniquekey++
    const nextList = innerList.concat({ uniquekey });
    form.setFieldsValue({
      [`innerList${index}`]: nextList,
    })
  }

  // 删除枚举项
  const deleteEnum = (index1, uniquekey) => {
    const innerList = form.getFieldValue(`innerList${index1}`);
    const funcDefList = form.getFieldValue('funcDefList')
    form.setFieldsValue({
      [`innerList${index1}`]: innerList.filter((item, key) => item.uniquekey !== uniquekey),
      funcDefList: funcDefList[index1].dataType.specs.def.filter((item, key) => item.uniquekey !== uniquekey),
    })
  }

  // 枚举的DOM创建——内层
  const createInnerHtml = (name, index1) => {
    const html1 = <div className="inline-form-item" key={index1}>
      <Form.Item label="默认值" {...formItemLayout}>
        {getFieldDecorator(`${name}.defaultValue[${index1}].k`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{ required: true, whitespace: true, message: "请输入key值" }],
        })(<Input style={{ width: 95, marginRight: 8 }} />)}
      </Form.Item>
      <Form.Item className="right-item">
        -&nbsp;&nbsp;&nbsp;&nbsp;
        {getFieldDecorator(`${name}.defaultValue[${index1}].v`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{ required: true, whitespace: true, message: "请输入value值", }],
        })(<Input style={{ width: 95, marginRight: 8 }} />)}
      </Form.Item>
    </div>

    getFieldDecorator(`innerList${index1}`, { initialValue: [{ uniquekey: 0 }] })
    const innerList = getFieldValue(`innerList${index1}`)
    const html2 = innerList.map((item, index2) => (
      <div className="inline-form-item" key={index2}>
        <Form.Item label="key-value" {...formItemLayout}>
          {getFieldDecorator(`${name}.def[${item.uniquekey}].k`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{ required: true, whitespace: true, message: "请输入key值" }],
          })(<Input style={{ width: 95, marginRight: 8 }} />)}
        </Form.Item>
        <Form.Item label="" className="right-item">
          -&nbsp;&nbsp;&nbsp;&nbsp;
          {getFieldDecorator(`${name}.def[${item.uniquekey}].v`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{ required: true, whitespace: true, message: "请输入value值", }],
          })(<Input style={{ width: 95, marginRight: 8 }} />)}
          <Icon
            key={index2}
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => deleteEnum(index1, item.uniquekey,)}
          />
        </Form.Item>
      </div>
    ))
    return [html1, html2]
  }
  // -***********新增枚举项end***********

  // 新增配置项
  const addConfig = () => {
    const list = form.getFieldValue('configList');
    const nextList = list.concat({});
    form.setFieldsValue({
      configList: nextList,
    })
  }

  // 删除配置项
  const removeConfig = index => {
    const list = form.getFieldValue('configList')
    const funcDefList = form.getFieldValue('funcDefList')
    form.setFieldsValue({
      configList: list.filter((item, key) => key !== index),
      funcDefList: funcDefList.filter((item, key) => key !== index),
    })
  }

  getFieldDecorator('configList', { initialValue: [] })
  const list = getFieldValue('configList')

  // 新增可配置固件的DOM创建——外层
  const firmwareFormHtml = list.map((item, index) => (
    <div className="free-scheme-block" key={index}>
      <Form.Item label="可配置模块" {...formItemLayout}>
        {getFieldDecorator(`funcDefList[${index}].funcModule`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{ required: true, whitespace: true, message: "请输入可配置模块", }],
        })(<Input placeholder="请输入可配置模块" style={StyleItem} />)}
      </Form.Item>
      <Form.Item label="可配置功能名称" {...formItemLayout}>
        {getFieldDecorator(`funcDefList[${index}].funcName`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{ required: true, whitespace: true, message: "请输入可配置功能名称", },],
        })(<Input placeholder="请输入可配置功能名称" style={StyleItem} />)}
      </Form.Item>
      <Form.Item label="可配置功能标识" {...formItemLayout}>
        {getFieldDecorator(`funcDefList[${index}].identifier`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{ required: true, whitespace: true, message: "请输入可配置功能标识", },],
        })(<Input placeholder="请输入可配置功能标识" style={StyleItem} />)}
      </Form.Item>
      <Form.Item label="可配置功能数值" {...formItemLayout}>
        {getFieldDecorator(`funcDefList[${index}].dataType.type`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{ required: true, whitespace: true, message: "请选择可配置功能数值", },],
        })(
          <Select placeholder="请选择可配置功能数值" style={StyleItem}
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
            <Form.Item label="数值范围" {...formItemLayout}>
              {getFieldDecorator(`funcDefList[${index}].dataType.specs.min`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{ required: true, whitespace: true, message: "请输入数值范围", }],
              })(<Input style={{ width: 90, marginRight: 8 }} />)}
            </Form.Item>
            <Form.Item label="" className="right-item">
              至&nbsp;&nbsp;&nbsp;&nbsp;
              {getFieldDecorator(`funcDefList[${index}].dataType.specs.max`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{ required: true, whitespace: true, message: "请输入数值范围", }],
              })(<Input style={{ width: 90, marginRight: 8 }} />)}
            </Form.Item>
          </div>
          <Form.Item label="默认值" {...formItemLayout}>
            {getFieldDecorator(`funcDefList[${index}].dataType.specs.defaultValue`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{ required: true, whitespace: true, message: "请输入默认值", }],
            })(<Input style={{ width: '60%', marginRight: 8 }} />)}
          </Form.Item>
        </>
      }
      {/* 枚举 */}
      {
        valueType[index] === 'enum' &&
        <>
          <div>{createInnerHtml(`funcDefList[${index}].dataType.specs`, index)}</div>
          <div className="add-enmu-btn">
            <Button type="primary" icon="plus" onClick={() => addEnum(index)}>新增</Button>
          </div>
        </>
      }
      <div className="del-btn" key={index} onClick={() => removeConfig(index)}>
        删除&nbsp;&nbsp;<Icon type="delete" />
      </div>
    </div>
  ))

  const uploadButton = (type = '上传文档') => {
    return (<Button><Icon type="upload" />{type}</Button>)
  }

  // ------------------------------------------------------
  return (
    <Form {...formItemLayout}>
      <Form.Item label="价格">
        {getFieldDecorator('price', {
          rules: [{ required: true, message: '请输入价格', whitespace: true }],
        })(<Input placeholder="请输入价格" style={{ width: 350 }} />)}&nbsp;&nbsp;人民币/个
      </Form.Item>
      <Form.Item label="支持方案">
        {getFieldDecorator("schemeType", {
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
        schemeType === 1 &&
        <div>
          <Form.Item
            label="可配置固件引脚示意图"
            extra="请上传尺寸为227*404px，格式为png的引脚示意图"
            wrapperCol={{ span: 10 }}>
            {getFieldDecorator("pinDiagram", {
              rules: [{ required: true, message: "请上传可配置固件引脚示意图" }]
            })(
              <div>
                <Upload
                  {...uploadConfigs}
                  listType="picture"
                  defaultFileList={pinDiagram || []}
                  onPreview={() => handlePreview(true, pinDiagram)}
                  beforeUpload={modulePictureBeforeUpload}
                  accept="image/png"
                  onChange={(info) => handleChange(info, 'pinDiagram')}>
                  {pinDiagram && pinDiagram.length >= 1 ? null : uploadButton('上传图片')}
                </Upload>
              </div>
            )}
          </Form.Item>
          <Form.Item label="可配置固件功能部分">
            {/* 创建DOM */}
            {firmwareFormHtml}
            <Form.Item>
              <Button type="primary" icon="plus" onClick={() => addConfig()}>新增</Button>
            </Form.Item>
          </Form.Item>
        </div>
      }
      {
        (schemeType === 2 || schemeType === 3) &&
        <Form.Item label="通信模组文件" colon={false}></Form.Item>
      }
      {/* Soc方案 */}
      {
        schemeType === 3 &&
        <>
          <Form.Item label="源码" extra="（请上传格式为.zip源文件压缩包）">
            <Form.Item style={{ display: "inline-block", marginBottom: 0 }}>
              {getFieldDecorator("sourceCode", {
                rules: [{ required: true, message: "请上传源码" }]
              })(
                <div>
                  <Upload
                    {...uploadConfigs}
                    beforeUpload={(file) => uploadDocumentLimit(file, '源码', 512)}
                    onChange={(info) => handleChange(info, 'sourceCode')}
                    defaultFileList={sourceCode || []}
                    accept=".zip ">
                    {sourceCode && sourceCode.length >= 1 ? null : uploadButton()}
                  </Upload>
                </div>
              )}
            </Form.Item>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <Form.Item style={{ display: "inline-block", marginBottom: 0 }}>
              <div>
                版本号：
                {getFieldDecorator("sourceCodeVersion", {
                  rules: [{ required: true, message: "请输入源码版本号" }]
                })(<Input style={{ width: 162 }} type="text" maxLength={10} placeholder="v1.1.1" />)}
              </div>
            </Form.Item>
          </Form.Item>
          <Form.Item label="库文件" extra="（请上传格式为.a的库文件）">
            <Form.Item style={{ display: "inline-block", marginBottom: 0 }}>
              {getFieldDecorator("libraryFile", {
                rules: [{ required: true, message: "请上传库文件" }]
              })(
                <div>
                  <Upload
                    {...uploadConfigs}
                    beforeUpload={(file) => uploadDocumentLimit(file, '库文件', 512)}
                    onChange={(info) => handleChange(info, 'libraryFile')}
                    defaultFileList={libraryFile || []}
                    accept=".a">
                    {libraryFile && libraryFile.length >= 1 ? null : uploadButton()}
                  </Upload>
                </div>
              )}
            </Form.Item>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <Form.Item style={{ display: "inline-block", marginBottom: 0 }}>
              <div>
                版本号：
                {getFieldDecorator("libraryFileVersion", {
                  initialValue: '',
                  rules: [{ required: true, message: "请输入库文件版本号" }]
                })(<Input style={{ width: 162 }} type="text" maxLength={10} placeholder="v1.1.1" />)}
              </div>
            </Form.Item>
          </Form.Item>
        </>
      }
      {/* MCU方案 */}
      {
        (schemeType === 2 || schemeType === 3) &&
        <>

          <Form.Item label="烧录文件" extra="（请上传格式为.bin的烧录件）">
            <Form.Item style={{ display: "inline-block", marginBottom: 0 }}>
              {getFieldDecorator("burnFile", {
                rules: [{ required: true, message: "请上传烧录文件" }]
              })(
                <div>
                  <Upload
                    {...uploadConfigs}
                    beforeUpload={(file) => uploadDocumentLimit(file, '烧录文件', 32)}
                    onChange={(info) => handleChange(info, 'burnFile')}
                    defaultFileList={burnFile || []}
                    accept=".bin"
                  >
                    {burnFile && burnFile.length >= 1 ? null : uploadButton()}
                  </Upload>
                </div>
              )}
            </Form.Item>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <Form.Item style={{ display: "inline-block", marginBottom: 0 }}>
              <div>
                版本号：
                {getFieldDecorator("burnFileVersion", {
                  initialValue: '',
                  rules: [{ required: true, message: "请输入烧录文件版本号" }]
                })(<Input style={{ width: 162 }} type="text" maxLength={10} placeholder="v1.1.1" />)}
              </div>
            </Form.Item>
          </Form.Item>
          <Form.Item label="烧录文件名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '烧录文件名称', whitespace: true }],
            })(<Input placeholder="烧录文件名称" style={{ width: 350 }} />)}
          </Form.Item>
          <Form.Item label="模组图片" extra="（请上传格式为.png，小于500k图片）" wrapperCol={{ span: 9 }}>
            {getFieldDecorator("modulePicture", {
              rules: [{ required: false, message: "请上传一张图片" }]
            })(
              <div>
                <Upload
                  {...uploadConfigs}
                  listType="picture"
                  defaultFileList={modulePicture || []}
                  onPreview={() => handlePreview(true, modulePicture)}
                  beforeUpload={() => modulePictureBeforeUpload}
                  accept="image/png"
                  onChange={(info) => handleChange(info, 'modulePicture')}
                >
                  {modulePicture && modulePicture.length >= 1 ? null : uploadButton('上传图片')}
                </Upload>
              </div>
            )}
          </Form.Item>
          <Form.Item
            label="参考电路"
            extra="（请上传格式为.png，小于500k图片）"
            wrapperCol={{ span: 9 }}
          >
            {getFieldDecorator("referenceCircuitDiagram", {
              rules: [{ required: false, message: "请上传一张图片" }]
            })(
              <div>
                <Upload
                  {...uploadConfigs}
                  listType="picture"
                  defaultFileList={referenceCircuitDiagram || []}
                  onPreview={() => handlePreview(true, referenceCircuitDiagram)}
                  beforeUpload={modulePictureBeforeUpload}
                  accept="image/png"
                  onChange={(info) => handleChange(info, 'referenceCircuitDiagram')}
                >
                  {referenceCircuitDiagram && referenceCircuitDiagram.length >= 1 ? null : uploadButton('上传图片')}
                </Upload>
              </div>
            )}
          </Form.Item>
          <Form.Item
            label="说明文档"
            extra="（请上传格式为.pdf，大小2M说明文件)"
            wrapperCol={{ span: 9 }}
          >
            {getFieldDecorator("readmePdf", {
              rules: [{ required: true, message: "请上传文档" }]
            })(
              <div>
                <Upload
                  {...uploadConfigs}
                  defaultFileList={readmePdf || []}
                  beforeUpload={(file) => uploadDocumentLimit(file, 'PDF文件', 2)}
                  accept=".pdf"
                  onChange={(info) => handleChange(info, 'readmePdf')}
                >
                  {readmePdf && readmePdf.length >= 1 ? null : uploadButton()}
                </Upload>
              </div>
            )}
          </Form.Item>
        </>
      }
      <Modal visible={previewVisible} footer={null}
        onCancel={() => setPreviewVisible(false)}>
        <img alt="example" style={{ width: "100%" }} src={showSrc} />
      </Modal>
    </Form>
  )
}

export default Form.create()(forwardRef(StepThird))
