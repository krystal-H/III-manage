import React, { Component } from "react";
import { Form, Button, message, Input } from "antd";

class Search extends Component {
  componentDidMount() {
    const {
      menuName,
      needResetSearchData,
      searchDataForAPP,
      setNeedResetSearchData,
      form
    } = this.props;
    if (needResetSearchData && menuName === "application") {
      const { applicationId = "", applicationName = "" } = searchDataForAPP;
      setNeedResetSearchData(false);
      form.setFieldsValue({
        applicationId,
        applicationName
      });
    }
  }

  onSearch = e => {
    e.preventDefault();
    const { form, changeSearchDataForAPP, getListForAPP } = this.props;
    let { applicationId, applicationName } = form.getFieldsValue();
    // 如果有值时错误的，则不进入搜索状态
    if (form.getFieldError("applicationId")) {
      // 这里限定了应用ID只能为数字
      message.warn("请根据提示完成选项");
      return;
    }
    applicationId = (applicationId || "").trim();
    applicationName = (applicationName || "").trim();
    changeSearchDataForAPP({ applicationId, applicationName, pageIndex: 1 }); // 变更搜索条件
    getListForAPP(); // 重新查询列表
  };
  clear = () => {
    this.props.form.setFieldsValue({
      applicationId: "",
      applicationName: ""
    });
  };
  render() {
    const { isLoadingForAPP, form } = this.props;
    const { getFieldDecorator } = form;
    const searching = !!isLoadingForAPP;
    return (
      <Form layout="inline" onSubmit={this.onSearch}>
        <Form.Item label="应用ID">
          {getFieldDecorator("applicationId", {
            rules: [{ pattern: /^\d*$/, message: "应用ID只能是数字!" }]
          })(
            <Input
              placeholder="请输入应用ID"
              maxLength={10}
              allowClear={true}
            />
          )}
        </Form.Item>
        <Form.Item label="应用名称">
          {getFieldDecorator("applicationName")(
            <Input
              placeholder="请输入应用名称"
              maxLength={20}
              allowClear={true}
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            icon="search"
            type="primary"
            htmlType="submit"
            loading={searching}
          >
            搜索
          </Button>
        </Form.Item>
        <Form.Item>
          <Button onClick={this.clear}>重置</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: "SearchAPPForm" })(Search);
