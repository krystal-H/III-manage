import React, { Component } from "react";
import {
  Form,
  Button,
  Input,
  Select,
  Upload,
  Icon,
  Modal,
  message,
  Checkbox,
  Radio,
  InputNumber
} from "antd";
import { connect } from "react-redux";
import { actionCreators } from "./store";
import "./FuncitonParamsForms.less";
import {
  ModuleSaveRequest,
  SaveFileUrlRequest
} from "../../../apis/moduleManager";
import { fileHost } from "../../../util/utils";
const { Option } = Select;

class FunctionParamsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: ""
    };
  }
  // 模组所属库初始化
  moduleTypeOption = data => {
    if (data && data.length > 0) {
      return data.map((item, index) => (
        <Option value={item.moduleId} key={item.moduleId}>
          {item.moduleId + " " + item.hetModuleTypeName}
        </Option>
      ));
    }
  };
  // 协议下拉初始化
  potocolOption = data => {
    if (data && data.length > 0) {
      return data.map((item, index) => (
        <Option value={item.supportProtocol} key={item.supportProtocol}>
          {item.supportProtocolName}
        </Option>
      ));
    }
  };
  // 绑定场景下拉初始化
  sceneOptions = data => {
    if (data && data.length > 0) {
      return data.map((item, index) => (
        <Option value={item.sceneTypeId} key={item.sceneTypeId}>
          {item.sceneTypeName}
        </Option>
      ));
    }
  };
  // 协议长度初始化
  dataLengthLimitOption = data => {
    if (data && data.length > 0) {
      return data.map((item, index) => (
        <Option value={item.dataLengthLimit} key={item.dataLengthLimit}>
          {item.dataLengthLimitName}
        </Option>
      ));
    }
  };
  // 切换上一步
  preClick = () => {
    this.props.changeCurrent();
  };
  // 源码模式校验
  sourceCodeBeforeUpload(file) {
    const isJpgOrPng =
      file.type === "application/zip" ||
      file.type === "application/x-zip-compressed";
    if (!isJpgOrPng) {
      message.error("只能上传zip文件");
    }
    const isLt2M = file.size / 1024 / 1024 <= 512;
    if (!isLt2M) {
      message.error("zip文件必须小于512M!");
    }
    const fileLength = file.name.length <= 50;
    if (!fileLength) {
      message.error("文件名称长度不超过50个字符");
    }
    return isJpgOrPng && isLt2M && fileLength;
  }
  // 库文件格式校验
  libraryFileBeforeUpload(file) {
    console.log("file,file.type", file, file.type);
    const isJpgOrPng =
      file.name.substr(file.name.lastIndexOf(".")).toLowerCase() === ".a";
    if (!isJpgOrPng) {
      message.error("只能上传.a库文件");
    }
    const isLt2M = file.size / 1024 / 1024 <= 512;
    if (!isLt2M) {
      message.error(".a库文件必须小于512M!");
    }
    const fileLength = file.name.length <= 50;
    if (!fileLength) {
      message.error("文件名称长度不超过50个字符");
    }
    return isJpgOrPng && isLt2M && fileLength;
  }
  // 烧录文件格式校验
  burnFileBeforeUpload(file) {
    console.log("file,file.type", file, file.type);
    const isJpgOrPng =
      file.type === "application/macbinary" ||
      file.type === "application/octet-stream";
    if (!isJpgOrPng) {
      message.error("只能上传烧录文件!");
    }
    const isLt2M = file.size / 1024 / 1024 <= 32;
    if (!isLt2M) {
      message.error(".bin文件必须小于32M!");
    }
    const fileLength = file.name.length <= 50;
    if (!fileLength) {
      message.error("文件名称长度不超过50个字符");
    }
    return isJpgOrPng && isLt2M && fileLength;
  }
  // 图片格式校验
  modulePictureBeforeUpload(file) {
    console.log("file,file.type", file, file.type);
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("只能上传JPG或者PNG格式");
    }
    const isLt2M = file.size / 1024 / 1024 <= 0.5;
    if (!isLt2M) {
      message.error("图片必须小于500KB!");
    }
    const fileLength = file.name.length <= 50;
    if (!fileLength) {
      message.error("文件名称长度不超过50个字符");
    }
    return isJpgOrPng && isLt2M && fileLength;
  }
  // pdf格式校验
  referenceCircuitDiagramBeforeUpload(file) {
    console.log("file,file.type", file, file.type);
    const isJpgOrPng = file.type === "application/pdf";
    if (!isJpgOrPng) {
      message.error("只能上传PDF文件");
    }
    const isLt2M = file.size / 1024 / 1024 <= 2;
    if (!isLt2M) {
      message.error("PDF must smaller than 2M!");
    }
    const fileLength = file.name.length <= 50;
    if (!fileLength) {
      message.error("文件名称长度不超过50个字符");
    }
    return isJpgOrPng && isLt2M && fileLength;
  }

  // 图片预览
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };
  getBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };
  handleCancelPreview = () => {
    this.setState({
      previewVisible: false
    });
  };
  // 提交事件
  handleSubmit = () => {
    const { moduleInfo } = this.props;
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return;
      // console.log("fieldsValue =====", fieldsValue)
      let submit = {
        moduleTypeList: fieldsValue.moduleTypeList,
        appModuleId: fieldsValue.appModuleId,
        networkTypeList: fieldsValue.networkTypeList,
        supportProtocolType: fieldsValue.supportProtocolType,
        communicateSpeed: fieldsValue.communicateSpeed,
        bindSceneType: fieldsValue.bindSceneType,
        supportFileTransfer: fieldsValue.supportFileTransfer,
        supportSocProject: fieldsValue.supportSocProject,
        burnFileVersion: fieldsValue.burnFileVersion,
        libraryFileVersion: fieldsValue.libraryFileVersion,
        sourceCodeVersion: fieldsValue.sourceCodeVersion,
        moduleId: moduleInfo.moduleId,
        dataLengthLimit: fieldsValue.dataLengthLimit,
        stepIndex: 2,
        sizeWidth: moduleInfo.sizeWidth,
        sizeHeight: moduleInfo.sizeHeight,
        sizeThickness: moduleInfo.sizeThickness,
        applyScope: moduleInfo.applyScope,
        originalModuleTypeName: moduleInfo.originalModuleTypeName,
        hetModuleTypeName: moduleInfo.hetModuleTypeName,
        moduleBrandId: moduleInfo.moduleBrandId

        // 改为单个文件上传，单个保存到后台,所以才将下面注释了
        // sourceCode: moduleInfo.sourceCode,
        // sourceCodeName: moduleInfo.sourceCodeName,
        // libraryFile: moduleInfo.libraryFile,
        // libraryFileName: moduleInfo.libraryFileName,
        // burnFile: moduleInfo.burnFile,
        // burnFileName: moduleInfo.burnFileName,
        // modulePicture: moduleInfo.modulePicture,
        // modulePictureName: moduleInfo.modulePictureName,
        // referenceCircuitDiagram: moduleInfo.referenceCircuitDiagram,
        // referenceCircuitDiagramName: moduleInfo.referenceCircuitDiagramName,
        // readmePdf: moduleInfo.readmePdf,
        // readmePdfName: moduleInfo.readmePdfName,
      };

      ModuleSaveRequest(submit).then(response => {
        let { data } = response;
        if (data.code === 0) {
          message.success(`提交成功`, 2, () => this.props.goBack());
        }
      });
    });
  };
  // 多选框改变
  checkboxOnChange = checkedValues => {
    this.props.getAllModuleTypeList(checkedValues);
    this.props.form.resetFields("appModuleId");
  };
  // 上传文件修改
  handleChange = (type, info) => {
    console.log(type, info.file, info.file.status, info.fileList);
    const { file, fileList } = info;
    if (file.status === "done") {
      let file = fileList[0];
      // 给最外层添加一个url ,不然upload组件不会点击下载
      file.url = file.response.data.url;
      let arr = [];
      arr.push(file);
      this.props.changeCurApi(type, arr);
      this.saveFileUrl(type, info.file);
    } else if (file.status === "error") {
      message.error(`${info.file.name} 上传失败`);
      info.fileList.length = 0;
      this.props.changeCurApi(type, info.fileList);
    } else if (file.status === "removed") {
      this.props.changeCurApi(type, info.fileList);
    } else if (info.file.status === undefined) {
      info.fileList.length = 0;
      this.props.changeCurApi(type, info.fileList);
    }
  };
  // 单个资源文件上传
  saveFileUrl = (type, file) => {
    const { moduleInfo } = this.props;
    const { historyObj } = moduleInfo;
    // console.log("moduleInfo.historyObj ===", moduleInfo.historyObj);
    let params = {
      moduleId: moduleInfo.moduleId,
      columnName: type,
      historyFileUrl: historyObj[type],
      fileUrl: file.response.data.url,
      fileName: file.name
    };

    SaveFileUrlRequest(params).then(res => {
      let code = res.data.code;
      if (code === 0) {
        console.log("文件保存成功");
      }
    });
  };
  getFile = (fileName, obj) => {
    let arr = [];
    let url = obj[fileName];
    if (url !== undefined) {
      let name = fileName + "Name";
      let file = {
        url: url,
        status: "done",
        name: obj[name],
        uid: 0 + name
      };
      arr.push(file);
      console.log("render file :", file);
    }
    return arr;
  };
  render() {
    const props = {
      action: fileHost,
      className: "upload-list-inline",
      data: file => ({
        appId: 31438,
        domainType: 4 // 不加密，公开
      })
    };
    const formItemLayout = {
      labelCol: { xs: { span: 24 }, sm: { span: 8 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 9 } }
    };
    const BtnformItemLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    };
    const { getFieldDecorator } = this.props.form;

    const uploadButton = (
      <Button>
        <Icon type="upload" /> 上传文档
      </Button>
    );

    const {
      moduleInfo,
      communicationMethodList,
      dataLengthLimitList,
      networkMethodList,
      protocolList,
      bindSceneList,
      moduleTypeItems
    } = this.props;
    return (
      <div className="first-content">
        <Form {...formItemLayout} className="data-label-form">
          <Form.Item label="通信方式">
            {getFieldDecorator("moduleTypeList", {
              rules: [{ required: true, message: "请选择通信方式" }]
            })(
              <Checkbox.Group onChange={this.checkboxOnChange}>
                {communicationMethodList && communicationMethodList.length ? communicationMethodList.map(item => (
                  <Checkbox value={item.moduleType} key={item.moduleType}>
                    {item.moduleTypeName}
                  </Checkbox>
                )) : null}
              </Checkbox.Group>
            )}
          </Form.Item>

          <Form.Item label="模组所属库">
            {getFieldDecorator("appModuleId", {
              rules: [{ required: true, message: "请您选择模组所属库" }]
            })(
              <Select placeholder="请选择模组所属库">
                {this.moduleTypeOption(moduleTypeItems)}
              </Select>
            )}
          </Form.Item>

          <Form.Item label="配网方式">
            {getFieldDecorator("networkTypeList", {
              rules: [{ required: true, message: "请选择配网方式" }]
            })(
              <Checkbox.Group>
                {networkMethodList && networkMethodList.length ? networkMethodList.map(item => (
                  <Checkbox value={item.networkType} key={item.networkType}>
                    {item.networkTypeName}
                  </Checkbox>
                )) : null}
              </Checkbox.Group>
            )}
          </Form.Item>

          <Form.Item label="支持协议">
            {getFieldDecorator("supportProtocolType", {
              rules: [{ required: true, message: "请选择支持协议" }]
            })(
              <Select placeholder="请选择支持协议">
                {this.potocolOption(protocolList)}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="通信速率">
            {getFieldDecorator("communicateSpeed", {
              rules: [{ required: true, message: "请输入通信速率" }]
            })(
              <InputNumber
                placeholder="请输入通信速率"
                style={{ width: "100%" }}
                maxLength={6}
              />
            )}
          </Form.Item>
          <Form.Item label="数据长度上限">
            {getFieldDecorator("dataLengthLimit", {
              rules: [{ required: true, message: "请输入通信速率" }]
            })(
              <Select placeholder="请选择数据长度上限">
                {this.dataLengthLimitOption(dataLengthLimitList)}
              </Select>
            )}
          </Form.Item>

          <Form.Item label="绑定场景">
            {getFieldDecorator("bindSceneType", {
              rules: [{ required: true, message: "请选择绑定场景" }]
            })(
              <Select placeholder="请选择绑定场景">
                {this.sceneOptions(bindSceneList)}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="支持文件传输">
            {getFieldDecorator("supportFileTransfer", {
              rules: [{ required: true, message: "请输入模组型号" }]
            })(
              <Radio.Group>
                <Radio value={1}>是</Radio>
                <Radio value={0}>否</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="支持SOC方案">
            {getFieldDecorator("supportSocProject", {
              rules: [{ required: true, message: "请输入模组型号" }]
            })(
              <Radio.Group>
                <Radio value={1}>是</Radio>
                <Radio value={0}>否</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item
            label="模组文件"
            // className="moduleSize"
            style={{ marginBottom: 0 }}
          ></Form.Item>
          {moduleInfo.supportSocProject === 1 ? (
            <Form.Item label="源码" extra="（请上传格式为.zip源文件压缩包）">
              <Form.Item style={{ display: "inline-block", marginBottom: 0 }}>
                {getFieldDecorator("sourceCode", {
                  rules: [{ required: false, message: "请上传源码" }]
                })(
                  <div>
                    <Upload
                      {...props}
                      beforeUpload={this.sourceCodeBeforeUpload}
                      onChange={this.handleChange.bind(this, "sourceCode")}
                      defaultFileList={moduleInfo.sourceCode || []}
                      accept=".zip "
                    >
                      {moduleInfo.sourceCode && moduleInfo.sourceCode.length >= 1 ? null : uploadButton}
                    </Upload>
                  </div>
                )}
              </Form.Item>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <Form.Item style={{ display: "inline-block", marginBottom: 0 }}>
                <div>
                  版本号：
                  {getFieldDecorator("sourceCodeVersion", {
                    rules: [{ required: false, message: "请输入源码版本号" }]
                  })(<Input style={{ width: 162 }} type="text" maxLength={10} placeholder="v1.1.1"/>)}
                </div>
              </Form.Item>
            </Form.Item>
          ) : null}
          {moduleInfo.supportSocProject === 1 ? (
            <Form.Item label="库文件" extra="（请上传格式为.a的库文件）">
              <Form.Item style={{ display: "inline-block", marginBottom: 0 }}>
                {getFieldDecorator("libraryFile", {
                  rules: [{ required: false, message: "请上传库文件" }]
                })(
                  <div>
                    <Upload
                      {...props}
                      beforeUpload={this.libraryFileBeforeUpload}
                      onChange={this.handleChange.bind(this, "libraryFile")}
                      defaultFileList={moduleInfo.libraryFile || []}
                      accept=".a"
                    >
                      {moduleInfo.libraryFile && moduleInfo.libraryFile.length >= 1 ? null : uploadButton}
                    </Upload>
                  </div>
                )}
              </Form.Item>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <Form.Item style={{ display: "inline-block", marginBottom: 0 }}>
                <div>
                  版本号：
                  {getFieldDecorator("libraryFileVersion", {
                    initialValue: moduleInfo.libraryFileVersion,
                    rules: [{ required: false, message: "请输入库文件版本号" }]
                  })(<Input style={{ width: 162 }} type="text" maxLength={10} placeholder="v1.1.1" />)}
                </div>
              </Form.Item>
            </Form.Item>
          ) : null}
          <Form.Item label="烧录文件" extra="（请上传格式为.bin的烧录件）">
            <Form.Item style={{ display: "inline-block", marginBottom: 0 }}>
              {getFieldDecorator("burnFile", {
                rules: [{ required: false, message: "请上传烧录文件" }]
              })(
                <div>
                  <Upload
                    {...props}
                    beforeUpload={this.burnFileBeforeUpload}
                    onChange={this.handleChange.bind(this, "burnFile")}
                    defaultFileList={moduleInfo.burnFile || []}
                    accept=".bin"
                  >
                    {moduleInfo.burnFile && moduleInfo.burnFile.length >= 1 ? null : uploadButton}
                  </Upload>
                </div>
              )}
            </Form.Item>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <Form.Item style={{ display: "inline-block", marginBottom: 0 }}>
              <div>
                版本号：
                {getFieldDecorator("burnFileVersion", {
                  initialValue: moduleInfo.burnFileVersion,
                  rules: [{ required: false, message: "请输入烧录文件版本号" }]
                })(<Input style={{ width: 162 }} type="text" maxLength={10} placeholder="v1.1.1"/>)}
              </div>
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="模组图片"
            extra="（请上传格式为.png，小于500k图片）"
          >
            {getFieldDecorator("modulePicture", {
              rules: [{ required: false, message: "请上传一张图片" }]
            })(
              <div>
                <Upload
                  {...props}
                  listType="picture"
                  defaultFileList={moduleInfo.modulePicture || []}
                  onPreview={this.handlePreview}
                  beforeUpload={this.modulePictureBeforeUpload}
                  accept="image/png"
                  onChange={this.handleChange.bind(this, "modulePicture")}
                >
                  {moduleInfo.modulePicture && moduleInfo.modulePicture.length >= 1 ? null : (
                    <Button>
                      <Icon type="upload" /> 上传图片
                    </Button>
                  )}
                </Upload>
                <Modal
                  visible={this.state.previewVisible}
                  footer={null}
                  onCancel={this.handleCancelPreview}
                >
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={this.state.previewImage}
                  />
                </Modal>
              </div>
            )}
          </Form.Item>
          <Form.Item
            label="参考电路"
            extra="（请上传格式为.png，小于500k图片）"
          >
            {getFieldDecorator("referenceCircuitDiagram", {
              rules: [{ required: false, message: "请上传一张图片" }]
            })(
              <div>
                <Upload
                  {...props}
                  listType="picture"
                  defaultFileList={moduleInfo.referenceCircuitDiagram || []}
                  onPreview={this.handlePreview}
                  beforeUpload={this.modulePictureBeforeUpload}
                  accept="image/png"
                  onChange={this.handleChange.bind(
                    this,
                    "referenceCircuitDiagram"
                  )}
                >
                  {moduleInfo.referenceCircuitDiagram && moduleInfo.referenceCircuitDiagram.length >= 1 ? null : (
                    <Button>
                      <Icon type="upload" /> 上传图片
                    </Button>
                  )}
                </Upload>
                <Modal
                  visible={this.state.previewVisible}
                  footer={null}
                  onCancel={this.handleCancelPreview}
                >
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={this.state.previewImage}
                  />
                </Modal>
              </div>
            )}
          </Form.Item>
          <Form.Item
            label="说明文档"
            extra="（请上传格式为.pdf，大小2M说明文件)"
          >
            {getFieldDecorator("readmePdf", {
              rules: [{ required: false, message: "请上传文档" }]
            })(
              <div>
                <Upload
                  {...props}
                  defaultFileList={moduleInfo.readmePdf || []}
                  beforeUpload={this.referenceCircuitDiagramBeforeUpload}
                  accept=".pdf"
                  onChange={this.handleChange.bind(this, "readmePdf")}
                >
                  {moduleInfo.readmePdf && moduleInfo.readmePdf.length >= 1 ? null : uploadButton}
                </Upload>
              </div>
            )}
          </Form.Item>

          <Form.Item {...BtnformItemLayout} style={{ textAlign: "center" }}>
            <Button className="functionParmsForms_Next" onClick={this.preClick}>
              上一步
            </Button>
            <Button type="primary" onClick={this.handleSubmit}>
              提&nbsp;&nbsp;交
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    communicationMethodList: state
      .getIn(["moduleManager", "communicationMethodList"])
      .toJS(),
    networkMethodList: state
      .getIn(["moduleManager", "networkMethodList"])
      .toJS(),
    protocolList: state.getIn(["moduleManager", "protocolList"]).toJS(),
    moduleTypeItems: state.getIn(["moduleManager", "moduleTypeItems"]).toJS(),
    bindSceneList: state.getIn(["moduleManager", "bindSceneList"]).toJS(),
    moduleInfo: state.getIn(["moduleManager", "moduleInfo"]).toJS(),
    dataLengthLimitList: state
      .getIn(["moduleManager", "dataLengthLimitList"])
      .toJS()
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllModuleTypeList(params) {
      const action = actionCreators.getAllModuleTypeList(params);
      dispatch(action);
    },

    socRadioChangeAction(params) {
      const action = actionCreators.socRadioChangeAction(params);
      dispatch(action);
    },

    changeCurApi(key, value) {
      const action = actionCreators.changeCurApi(key, value);
      dispatch(action);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  Form.create({
    name: "FunctionParamsForm",
    onFieldsChange(props, changedFields) {
      // console.log('changedFields', changedFields);
      // 防止redux里面的数据被清除，防止没有改表单触发
      if (JSON.stringify(changedFields) === "{}") {
        return;
      }

      // 防止点击下一步的时候，不校验表单
      let arr = Object.keys(changedFields);
      if (arr.length > 1) {
        return;
      }

      let key = Object.keys(changedFields)[0];

      if (
        key === "sourceCode" ||
        key === "libraryFile" ||
        key === "burnFile" ||
        key === "modulePicture" ||
        key === "referenceCircuitDiagram" ||
        key === "readmePdf"
      ) {
        return;
      }

      let value = Object.values(changedFields)[0];
      props.changeCurApi(key, value.value);
    },
    mapPropsToFields(props) {
      const { moduleInfo } = props;
      let moduleInfoMap = {};
      Object.keys(moduleInfo).map(key => {
        moduleInfoMap[key] = Form.createFormField({
          value: typeof moduleInfo[key] !== "undefined" && 
              moduleInfo[key] !== null ? moduleInfo[key] : undefined
        });
      })

      console.log("props--", moduleInfoMap);
      return moduleInfoMap;
    }
  })(FunctionParamsForm)
);
