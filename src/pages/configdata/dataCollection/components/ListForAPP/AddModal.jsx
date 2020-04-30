import React, { Component } from "react";
import { Modal, Form, Input, Select, message } from "antd";

class AddModal extends Component {
  formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 6 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
  };
  types = [
    { id: "0", value: "Web端" },
    { id: "1", value: "移动端" },
    { id: "2", value: "第三方Web应用" },
    { id: "3", value: "小程序" }
  ];
  getPopupContainer = triggerNode => {
    return triggerNode.parentNode;
  };
  closeModal = () => {
    this.props.closeAddModalForAPP();
  };
  submit = () => {
    const { form, addApp } = this.props;
    form
      .validateFields()
      .then(({ applicationName, applicationType, sessionKey, appId }) => {
        addApp({
          applicationName,
          applicationType: parseInt(applicationType, 10),
          sessionKey: sessionKey || null,
          refStatus: 1,
          appId: parseInt(appId, 10) || ""
        });
      })
      .catch(e => {
        message.warn("请根据提示完成选项");
      });
  };
  checkSpace = e => {
    let dom = e.target,
      name = dom.name,
      val = dom.value,
      _val = val.replace(/^(\s+)|(\s+)$/g, "");
    if (name === "sessionKey") {
      _val = _val.replace(/[^\w_]/g, "").replace(/^\d+/, "");
    }
    return _val;
  };
  changeType = () => {
    // 只要切换了类型值，就把appId重置
    this.props.form.setFieldsValue({
      appId: undefined,
      sessionKey: ""
    });
  };
  render() {
    const {
      showAddModalForAPP,
      isAddingForAPP,
      openAppList,
      openMiniList,
      webAppList,
      form
    } = this.props;
    const { getFieldDecorator, getFieldsValue } = form;
    const { applicationType } = getFieldsValue();
    const isRequireForSessionKey =
        applicationType === undefined || applicationType === "0", // 只有web端应用SessionKey才是必填的
      isRequireForAppId = applicationType !== "3", // 非小程序关联应用必填
      isWebAppList = isRequireForSessionKey || applicationType === "2"; // web端应用或第三方web端应用关联的应用都是webAppList
    const appList = isWebAppList
      ? webAppList
      : applicationType === "1"
      ? openAppList
      : openMiniList; // 应用列表
    return (
      <Modal
        title="新建应用"
        visible={showAddModalForAPP}
        maskClosable={false}
        okButtonProps={{ loading: isAddingForAPP }}
        onOk={this.submit}
        onCancel={this.closeModal}
        destroyOnClose={true}
      >
        <Form {...this.formItemLayout}>
          <Form.Item label="应用名称">
            {getFieldDecorator("applicationName", {
              getValueFromEvent: this.checkSpace,
              rules: [{ required: true, message: "请输入应用名称" }]
            })(
              <Input
                placeholder="请输入应用名称"
                maxLength={30}
                name="applicationName"
              />
            )}
          </Form.Item>
          <Form.Item label="应用类型">
            {getFieldDecorator("applicationType", {
              initialValue: this.types[0].id,
              rules: [{ required: true }]
            })(
              <Select
                showSearch
                getPopupContainer={this.getPopupContainer}
                notFoundContent="未找到相应记录"
                optionFilterProp="children"
                onChange={this.changeType}
              >
                {this.types.map(({ id, value }) => {
                  return (
                    <Select.Option value={id} key={id}>
                      {value}
                    </Select.Option>
                  );
                })}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="SessionKey">
            {getFieldDecorator("sessionKey", {
              getValueFromEvent: this.checkSpace,
              rules: [
                {
                  required: isRequireForSessionKey,
                  min: 2,
                  message: "至少两位：字母、数字、下划线（首字符不能为数字）"
                }
              ]
            })(
              <Input
                disabled={!isRequireForSessionKey}
                placeholder="请输入SessionKey(字母、数字、下划线)"
                maxLength={29}
                name="sessionKey"
              />
            )}
          </Form.Item>
          <Form.Item label="选择关联应用">
            {getFieldDecorator("appId", {
              initialValue: undefined,
              rules: [
                {
                  required: isRequireForAppId,
                  message: "请选择关联应用"
                }
              ]
            })(
              <Select
                showSearch
                // disabled={!isRequireForAppId}
                getPopupContainer={this.getPopupContainer}
                notFoundContent="未找到符合的应用"
                placeholder="输入应用名或应用ID查找"
                optionFilterProp="children"
              >
                {appList.map(({ appId, appName }) => {
                  return (
                    <Select.Option value={appId} key={appId}>
                      {appId + "-" + appName}
                    </Select.Option>
                  );
                })}
              </Select>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "AddModalForApp" })(AddModal);
