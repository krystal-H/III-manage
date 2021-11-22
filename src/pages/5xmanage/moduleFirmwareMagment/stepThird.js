import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Modal, Button, Form, Input, Select, Radio, Upload, Icon, message } from 'antd'
import { fileHost } from "../../../util/utils"
import { cloneDeep } from 'lodash'
import './stepThird.less'

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

function StepThird({ form, commitAll, opeType, editData = {} }, ref) {
  const [schemeType, setSchemeType] = useState()
  const [valueType, setValueType] = useState([])
  const [previewVisible, setPreviewVisible] = useState(false) // 图片预览
  const [showSrc, setshowSrc] = useState('') // 图片预览展示的地址

  const [pinDiagram, setPindiagram] = useState([]) // 引脚示意图
  const [sourceCode, setSourcecode] = useState([]) // 原厂SDK路径
  const [libraryFile, setLibraryfile] = useState([]) // clifeSDK路径
  const [burnFile, setBurnfile] = useState([]) // 模组固件路径
  const [modulePicture, setModulepicture] = useState([]) // 模组图片
  const [referenceCircuitDiagram, setReferencecircuitdiagram] = useState([]) // 参考电路图
  const [readmePdf, setReadmepdf] = useState([]) // 说明文档
  const { getFieldDecorator, getFieldValue } = form
  const [editInfo, setEditInfo] = useState(opeType === "edit" && editData.firmwareDefList[0] ? editData.firmwareDefList[0] : {}) // 编辑详情数据
  const [radiosDisabled, setRadiosDisabled] = useState(false) // 编辑  方案不可切换
  const [newData, setNewData] = useState()
  useEffect(() => {
    if (opeType === 'edit') {
      setSchemeType(editInfo.schemeType)
      Object.keys(editInfo).length && setRadiosDisabled(true) // 为了兼容老数据  没有固件信息的还是可以选择方案
      editData.modulePicture && setModulepicture([{ url: editData.modulePicture, name: editData.modulePictureName || '模组图片', uid: 2 }])
      if (editInfo.schemeType === 1) { // 免开发
        editInfo.pinDiagram && setPindiagram([{ url: editInfo.pinDiagram, name: '可配置固件引脚示意图', uid: 1 }])
        let arr = []
        let data = JSON.parse(editData.firmwareDefList[0].customConfigJson)
        // console.log(data, '-----')
        data.forEach(ele => {
          if (ele.dataType.type === 'enum') {
            ele.dataType.specs.def = ele.dataType.specs.def.map(item => {
              uniquekey++
              return {
                uniquekey,
                k: item.k,
                v: item.v
              }
            })
          }
        })
        // console.log(data, '修改后得')
        setNewData(data)
        data.forEach(ele => {
          arr.push(ele.dataType.type)
        })
        setValueType(arr)
      } else if (editInfo.schemeType === 2 || editInfo.schemeType === 3) { // mcu方案
        editInfo.burnFile && setBurnfile([{ url: editInfo.burnFile, name: editInfo.burnFileName || '模组固件', uid: 1 }])
        editInfo.referenceCircuitDiagram && setReferencecircuitdiagram([{
          url: editInfo.referenceCircuitDiagram,
          name: editInfo.referenceCircuitDiagramName || '参考电路图',
          uid: 3
        }])
        editInfo.readmePdf && setReadmepdf([{ url: editData.readmePdf, name: editData.readmePdfName || '说明文档', uid: 4 }])
        editInfo.sourceCode && setSourcecode([{ url: editInfo.sourceCode, name: editInfo.sourceCodeName || '原厂SDK', uid: 4 }])
        editInfo.libraryFile && setLibraryfile([{ url: editInfo.libraryFile, name: editInfo.libraryFileName || 'clifeSDK', uid: 5 }])
      }
      // console.log(editData.firmwareDefList[0], '-------------editData')
    }
  }, [editData])

  useEffect(() => { console.log(burnFile, 'burnFileburnFileburnFile') }, [burnFile])

  // 表单提交
  const validData = () => {
    form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        if (values.funcDefList && values.funcDefList.length > 0) {
          values.funcDefList = values.funcDefList.map(item => {
            if (item.dataType.type === 'enum') {
              item.dataType.specs.def = item.dataType.specs.def.filter(item => item)
              item.dataType.specs.defaultValue = item.dataType.specs.defaultValue.filter(item => item)
            }
            return item
          })
        }

        const firmwareDefReqList = []
        const commonParam = {
          price: values.price,
          schemeType: values.schemeType,
          modulePicture: modulePicture && modulePicture.length ? modulePicture[0].url : '',
          modulePictureName: modulePicture && modulePicture.length ? modulePicture[0].name : '',
          referenceCircuitDiagram: referenceCircuitDiagram && referenceCircuitDiagram.length ? referenceCircuitDiagram[0].url : '',
          referenceCircuitDiagramName: referenceCircuitDiagram && referenceCircuitDiagram.length ? referenceCircuitDiagram[0].name : '',
          readmePdf: readmePdf && readmePdf.length ? readmePdf[0].url : '',
          readmePdfName: readmePdf && readmePdf.length ? readmePdf[0].name : '',
        }
        // 免开发的参数
        const freeParams = {
          ...commonParam,
          customConfigJson: JSON.stringify(values.funcDefList) || JSON.stringify([]),
          pinDiagram: pinDiagram && pinDiagram.length ? pinDiagram[0].url : ''
        }
        // mcu方案的参数
        const mcuParams = {
          ...commonParam,
          burnFile: burnFile && burnFile.length ? burnFile[0].url : '', // 模组固件
          burnFileVersion: values.burnFileVersion, // 模组固件版本
          burnFileName: values.burnFileName, // 模组固件名称
        }
        // Soc方案参数
        const socParams = {
          ...commonParam,
          sourceCode: sourceCode && sourceCode.length ? sourceCode[0].url : '',
          sourceCodeVersion: values.sourceCodeVersion,
          sourceCodeName: sourceCode && sourceCode.length ? sourceCode[0].name : '',
          libraryFile: libraryFile && libraryFile.length ? libraryFile[0].url : '',
          libraryFileVersion: values.libraryFileVersion,
          libraryFileName: libraryFile && libraryFile.length ? libraryFile[0].name : ''
        }
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
        // console.log('第三步提交的数据', firmwareDefReqList)
      } else {
        console.log('err', err)
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
    return new Promise((resolve, reject) => {
      const isJpgOrPng = file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("只能上传PNG格式");
        return reject(false)
      }
      const isLt2M = file.size / 1024 / 1024 <= 0.5;
      if (!isLt2M) {
        message.error("图片必须小于500KB!");
        return reject(false)
      }
      const fileLength = file.name.length <= 50;
      if (!fileLength) {
        message.error("文件名称长度不超过50个字符");
        return reject(false)
      }
      return resolve(true)
    })
  }


  // 移除图片
  const removePic = (file, type) => {
    // console.log(file, '移除', type)
    const upperType = type.trim().toLowerCase().replace(type[0], type[0].toUpperCase())
    eval(`set${upperType}`)([])
    form.setFieldsValue({ [type]: '' })
    console.log(form.getFieldValue(type))
  }

  // 上传文件修改
  const handleChange = (info, type) => {
    // console.log('上传的info', info, type)
    // type首字母转大写，赋值 setAaa(xxx)
    const upperType = type.trim().toLowerCase().replace(type[0], type[0].toUpperCase())
    const { file, fileList } = info
    if (file.status === "done") {
      const arr = []
      const uploadObj = {
        status: 'done',
        name: file.name,
        url: file.response.data.url,
        uid: file.uid
      }
      arr.push(uploadObj)
      setTimeout(() => {
        eval(`set${upperType}`)(arr)
      }, 0)

      form.setFieldsValue({ type: file.response.data.url })
    } else if (file.status === "error") {
      message.error(`${info.file.name} 上传失败`)
      eval(`set${upperType}`)([])
      form.setFieldsValue({ type: '' })
    } else {
      eval(`set${upperType}`)([])
      form.setFieldsValue({ type: '' })
    }
  }

  // 格式判断
  const judgeFormat = (file, type) => {
    switch (type) {
      case '原厂SDK':
      case 'PDF文件':
      case 'clifeSDK':
      case '模组固件':
        return (file.type === "application/zip" || file.type === "application/x-zip-compressed")
      // case '模组固件':
      //   return (file.type === "application/macbinary" || file.type === "application/octet-stream")
      // case 'clifeSDK':
      //   return file.name.substr(file.name.lastIndexOf(".")).toLowerCase() === ".a"
      // case 'PDF文件':
      //   return file.type === "application/pdf"
    }
  }

  // 上传文档限制
  const uploadDocumentLimit = (file, type, limitSize) => {
    return new Promise((resolve, reject) => {
      const isFormat = judgeFormat(file, type)
      if (!isFormat) {
        message.error(`只能上传${type}!`)
        return reject(false)
      }
      const isLimit = file.size / 1024 / 1024 <= limitSize
      if (!isLimit) {
        message.error(`文件必须小于${limitSize}M`)
        return reject(false)
      }
      const fileLength = file.name.length <= 50
      if (!fileLength) {
        message.error("文件名称长度不超过50个字符")
        return reject(false)
      }
      return resolve(true)
    })
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
  const createInnerHtml = (name, index1, item) => {
    // console.log(item, '输出下内层')
    const html1 = <div className="inline-form-item" key={index1}>
      <Form.Item label="默认值" {...formItemLayout}>
        {getFieldDecorator(`${name}.defaultValue[${index1}].k`, {
          initialValue: item.dataType && item.dataType.specs && item.dataType.specs.defaultValue[0] && item.dataType.specs.defaultValue[0].k ? item.dataType.specs.defaultValue[0].k : '',
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{ required: true, whitespace: true, message: "请输入key值" }],
        })(<Input style={{ width: 95, marginRight: 8 }} />)}
      </Form.Item>
      <Form.Item className="right-item">
        -&nbsp;&nbsp;&nbsp;&nbsp;
        {getFieldDecorator(`${name}.defaultValue[${index1}].v`, {
          initialValue: item.dataType && item.dataType.specs && item.dataType.specs.defaultValue[0] && item.dataType.specs.defaultValue[0].v ? item.dataType.specs.defaultValue[0].v : '',
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{ required: true, whitespace: true, message: "请输入value值", }],
        })(<Input style={{ width: 95, marginRight: 8 }} />)}
      </Form.Item>
    </div>

    const canOpe = item.dataType && item.dataType.specs && item.dataType.specs.def
    getFieldDecorator(`innerList${index1}`, { initialValue: opeType === "edit" && schemeType === 1 && canOpe ? item.dataType.specs.def : [{ uniquekey: 0 }] })
    const innerList = getFieldValue(`innerList${index1}`)
    // console.log('innerList--', innerList)
    const html2 = innerList.map((item, index2) => (
      <div className="inline-form-item" key={index2}>
        <Form.Item label="key-value" {...formItemLayout}>
          {getFieldDecorator(`${name}.def[${item.uniquekey}].k`, {
            initialValue: item.k,
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{ required: true, whitespace: true, message: "请输入key值" }],
          })(<Input style={{ width: 95, marginRight: 8 }} />)}
        </Form.Item>
        <Form.Item label="" className="right-item">
          -&nbsp;&nbsp;&nbsp;&nbsp;
          {getFieldDecorator(`${name}.def[${item.uniquekey}].v`, {
            initialValue: item.v,
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
    console.log(list, '-------------')
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
  // JSON.parse(editData.firmwareDefList[0].customConfigJson)
  let list = []
  if (schemeType === 1) {
    getFieldDecorator('configList', { initialValue: opeType === "edit" && schemeType === 1 && newData ? newData : [{}] })
    list = getFieldValue('configList')
  }

  // 免开发方案——新增可配置固件的DOM创建——外层
  const firmwareFormHtml = list && list.map((item, index) => (
    <div className="free-scheme-block" key={index}>
      <Form.Item label="可配置模块" {...formItemLayout}>
        {getFieldDecorator(`funcDefList[${index}].funcModule`, {
          initialValue: item.funcModule,
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{ required: true, whitespace: true, message: "请输入可配置模块", }],
        })(<Input placeholder="请输入可配置模块" style={StyleItem} />)}
      </Form.Item>
      <Form.Item label="可配置功能名称" {...formItemLayout}>
        {getFieldDecorator(`funcDefList[${index}].funcName`, {
          initialValue: item.funcName,
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{ required: true, whitespace: true, message: "请输入可配置功能名称", },],
        })(<Input placeholder="请输入可配置功能名称" style={StyleItem} />)}
      </Form.Item>
      <Form.Item label="可配置功能标识" {...formItemLayout}>
        {getFieldDecorator(`funcDefList[${index}].identifier`, {
          initialValue: item.identifier,
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{ required: true, whitespace: true, message: "请输入可配置功能标识", },],
        })(<Input placeholder="请输入可配置功能标识" style={StyleItem} />)}
      </Form.Item>
      <Form.Item label="可配置功能数值" {...formItemLayout}>
        {getFieldDecorator(`funcDefList[${index}].dataType.type`, {
          initialValue: item.dataType ? item.dataType.type : '',
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
                initialValue: opeType === 'edit' && item.dataType && item.dataType.specs && item.dataType.specs.min ? item.dataType.specs.min.toString() : '',
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{ required: true, whitespace: true, message: "请输入数值范围", }],
              })(<Input style={{ width: 90, marginRight: 8 }} />)}
            </Form.Item>
            <Form.Item label="" className="right-item">
              至&nbsp;&nbsp;&nbsp;&nbsp;
              {getFieldDecorator(`funcDefList[${index}].dataType.specs.max`, {
                initialValue: opeType === 'edit' && item.dataType && item.dataType.specs && item.dataType.specs.max ? item.dataType.specs.max.toString() : '',
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{ required: true, whitespace: true, message: "请输入数值范围", }],
              })(<Input style={{ width: 90, marginRight: 8 }} />)}
            </Form.Item>
          </div>
          <Form.Item label="默认值" {...formItemLayout}>
            {getFieldDecorator(`funcDefList[${index}].dataType.specs.defaultValue`, {
              initialValue: opeType === 'edit' && item.dataType && item.dataType.specs && (!Array.isArray(item.dataType.specs.defaultValue)) ? item.dataType.specs.defaultValue.toString() : '',
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
          <div>{createInnerHtml(`funcDefList[${index}].dataType.specs`, index, item)}</div>
          <div className="add-enmu-btn">
            <Button type="primary" icon="plus" onClick={() => addEnum(index)}>新增</Button>
          </div>
        </>
      }
      {
        index > 0 &&
        <div className="del-btn" key={index} onClick={() => removeConfig(index)}>
          删除&nbsp;&nbsp;<Icon type="delete" />
        </div>
      }
    </div>
  ))

  const uploadButton = (type = '上传文档') => {
    return (<Button><Icon type="upload" />{type}</Button>)
  }

  // ------------------------------------------------------
  return (
    <Form {...formItemLayout}>
      <Form.Item label="支持方案">
        {getFieldDecorator("schemeType", {
          initialValue: editInfo.schemeType,
          rules: [{ required: true, message: "请选择支持方案" }]
        })(
          <Radio.Group onChange={(e) => setSchemeType(e.target.value)} disabled={radiosDisabled}>
            <Radio value={1}>免开发</Radio>
            <Radio value={2}>MCU方案</Radio>
            <Radio value={3}>Soc方案</Radio>
          </Radio.Group>
        )}
      </Form.Item>
      <Form.Item label="价格">
        {getFieldDecorator('price', {
          initialValue: editData.price ? editData.price.toString() : '',
          rules: [
            { required: true, message: '请输入价格', whitespace: true },
            { pattern: /^[0-9]+([.]{1}[0-9]{1,2})?$/, message: '最多为两位小数的正数（包含0）' }
          ],
        })(<Input placeholder="请输入价格" style={{ width: 405 }} />)}&nbsp;&nbsp;人民币/个
      </Form.Item>
      {/* 免开发方案 */}
      {
        schemeType === 1 &&
        <Form.Item
          label="可配置固件引脚示意图"
          extra="请上传尺寸为227*404px，格式为png的引脚示意图"
          wrapperCol={{ span: 13 }}>
          {getFieldDecorator("pinDiagram", {
            initialValue: editInfo.pinDiagram,
            rules: [{ required: false, message: "请上传可配置固件引脚示意图" }]
          })(
            <div>
              <Upload
                {...uploadConfigs}
                listType="picture"
                defaultFileList={pinDiagram || []}
                onPreview={() => handlePreview(true, pinDiagram)}
                beforeUpload={modulePictureBeforeUpload}
                onRemove={(file) => removePic(file, 'pinDiagram')}
                accept="image/png"
                onChange={(info) => handleChange(info, 'pinDiagram')}>
                {pinDiagram && pinDiagram.length >= 1 ? null : uploadButton('上传图片')}
              </Upload>
            </div>
          )}
        </Form.Item>
      }

      {/* MCU方案 */}
      {
        schemeType === 2 &&
        <>
          <Form.Item label="模组固件" extra="请上传格式为.zib压缩包，大小40M的文件">
            <Form.Item style={{ display: "inline-block", marginBottom: 0, width: 215 }} >
              {getFieldDecorator("burnFile", {
                initialValue: editInfo.burnFile,
                rules: [{ required: false, message: "请上传模组固件" }]
              })(
                <div>
                  <Upload
                    {...uploadConfigs}
                    beforeUpload={(file) => uploadDocumentLimit(file, '模组固件', 40)}
                    onChange={(info) => handleChange(info, 'burnFile')}
                    defaultFileList={burnFile || []}
                    onRemove={(file) => removePic(file, 'burnFile')}
                    accept=".bin">
                    {burnFile && burnFile.length >= 1 ? null : uploadButton()}
                  </Upload>
                </div>
              )}
            </Form.Item>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <Form.Item style={{ display: "inline-block", marginBottom: 0 }} >
              <div>
                版本号：
                {getFieldDecorator("burnFileVersion", {
                  initialValue: editInfo.burnFileVersion,
                  rules: [{ required: true, message: "请输入模组固件版本号" }]
                })(<Input style={{ width: 162 }} type="text" maxLength={10} placeholder="v1.1.1" />)}
              </div>
            </Form.Item>
          </Form.Item>
          <Form.Item label="模组固件名称">
            {getFieldDecorator('burnFileName', {
              initialValue: editInfo.burnFileName ? editInfo.burnFileName.split('.')[0] : '',
              rules: [{ required: false, message: '模组固件名称', whitespace: true }],
            })(<Input placeholder="模组固件名称" style={{ width: 460 }} />)}
          </Form.Item>
        </>
      }
      {/* Soc方案 */}
      {
        schemeType === 3 &&
        <>
          <Form.Item label="原厂SDK" extra="请上传格式为.zip源文件压缩包">
            <Form.Item style={{ display: "inline-block", marginBottom: 0, width: 215 }}>
              {getFieldDecorator("sourceCode", {
                initialValue: editInfo.sourceCode,
                rules: [{ required: false, message: "请上传原厂SDK" }]
              })(
                <div>
                  <Upload
                    {...uploadConfigs}
                    beforeUpload={(file) => uploadDocumentLimit(file, '原厂SDK', 512)}
                    onChange={(info) => handleChange(info, 'sourceCode')}
                    defaultFileList={sourceCode || []}
                    onRemove={(file) => removePic(file, 'sourceCode')}
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
                  initialValue: editInfo.sourceCodeVersion,
                  rules: [{ required: true, message: "请输入原厂SDK版本号" }]
                })(<Input style={{ width: 162 }} type="text" maxLength={10} placeholder="v1.1.1" />)}
              </div>
            </Form.Item>
          </Form.Item>
          <Form.Item label="clifeSDK" extra="请上传格式为.zip的clifeSDK">
            <Form.Item style={{ display: "inline-block", marginBottom: 0, width: 215 }}>
              {getFieldDecorator("libraryFile", {
                initialValue: editInfo.libraryFile,
                rules: [{ required: false, message: "请上传clifeSDK" }]
              })(
                <div>
                  <Upload
                    {...uploadConfigs}
                    beforeUpload={(file) => uploadDocumentLimit(file, 'clifeSDK', 40)}
                    onChange={(info) => handleChange(info, 'libraryFile')}
                    onRemove={(file) => removePic(file, 'libraryFile')}
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
                  initialValue: editInfo.libraryFileVersion,
                  rules: [{ required: true, message: "请输入clifeSDK版本号" }]
                })(<Input style={{ width: 162 }} type="text" maxLength={10} placeholder="v1.1.1" />)}
              </div>
            </Form.Item>
          </Form.Item>
        </>
      }
      {/* 共用—模组图片、参考电路图、说明文档   不写判断回显有问题,所以谨慎删除吧 */}
      {
        (schemeType === 1 || schemeType === 2 || schemeType === 3) &&
        <>
          <Form.Item label="模组图片" extra="请上传格式为.png，小于500k图片" wrapperCol={{ span: 13 }}>
            {getFieldDecorator("modulePicture", {
              initialValue: editData.modulePicture || '',
              rules: [{ required: false, message: "请上传一张图片" }]
            })(
              <div>
                <Upload
                  {...uploadConfigs}
                  listType="picture"
                  defaultFileList={modulePicture || []}
                  onPreview={() => handlePreview(true, modulePicture)}
                  beforeUpload={modulePictureBeforeUpload}
                  onRemove={(file) => removePic(file, 'modulePicture')}
                  accept="image/png"
                  onChange={(info) => handleChange(info, 'modulePicture')}>
                  {modulePicture && modulePicture.length >= 1 ? null : uploadButton('上传图片')}
                </Upload>
              </div>
            )}
          </Form.Item>
          <Form.Item
            label="参考电路图"
            extra="请上传格式为.png，小于500k图片"
            wrapperCol={{ span: 13 }}>
            {getFieldDecorator("referenceCircuitDiagram", {
              initialValue: editData.referenceCircuitDiagram || '',
              rules: [{ required: false, message: "请上传一张图片" }]
            })(
              <div>
                <Upload
                  {...uploadConfigs}
                  listType="picture"
                  defaultFileList={referenceCircuitDiagram || []}
                  onPreview={() => handlePreview(true, referenceCircuitDiagram)}
                  beforeUpload={modulePictureBeforeUpload}
                  onRemove={(file) => removePic(file, 'referenceCircuitDiagram')}
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
            extra="请上传格式为.zip压缩包，大小40M的文件"
            wrapperCol={{ span: 13 }}>
            {getFieldDecorator("readmePdf", {
              initialValue: editData.readmePdf || '',
            })(
              <div>
                <Upload
                  {...uploadConfigs}
                  defaultFileList={readmePdf || []}
                  beforeUpload={(file) => uploadDocumentLimit(file, 'PDF文件', 40)}
                  onRemove={(file) => removePic(file, 'readmePdf')}
                  accept=".zip"
                  onChange={(info) => handleChange(info, 'readmePdf')}>
                  {readmePdf && readmePdf.length >= 1 ? null : uploadButton()}
                </Upload>
              </div>
            )}
          </Form.Item>
        </>
      }
      {/* 免开发方案-固件配置模块 */}
      {
        schemeType === 1 &&
        <Form.Item label="可配置固件功能部分">
          {/* 创建DOM */}
          {firmwareFormHtml}
          <Form.Item>
            <Button type="primary" icon="plus" onClick={() => addConfig()}>新增</Button>
          </Form.Item>
        </Form.Item>
      }
      <Modal visible={previewVisible} footer={null}
        onCancel={() => setPreviewVisible(false)}>
        <img alt="example" style={{ width: "100%" }} src={showSrc} />
      </Modal>
    </Form>
  )
}

export default Form.create()(forwardRef(StepThird))
