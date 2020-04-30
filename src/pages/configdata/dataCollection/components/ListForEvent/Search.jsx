import React, { Component } from "react";
import { Form, Button, message, Select, Input } from "antd";

class Search extends Component {
  types = [
    { id: "", value: "所有事件" },
    { id: "0", value: "私有事件" },
    { id: "1", value: "Web端" },
    { id: "2", value: "移动端" },
    { id: "3", value: "全局事件" }
  ];
  statusList = [
    { id: "", value: "所有状态" },
    { id: "1", value: "启用" },
    { id: "0", value: "禁用" }
  ];
  appDefault = { applicationId: "", applicationName: "所有应用" };
  sty = { width: "193px" };

  componentDidMount() {
    const {
      menuName,
      needResetSearchData,
      searchDataForEvent,
      setNeedResetSearchData,
      form
    } = this.props;
    if (needResetSearchData && menuName === "event") {
      const {
        eventKey = "",
        eventName = "",
        eventType = undefined,
        applicationId = undefined,
        status = undefined
      } = searchDataForEvent;
      setNeedResetSearchData(false);
      form.setFieldsValue({
        eventKey,
        eventName,
        eventType,
        applicationId,
        status
      });
    }
  }

  onSearch = e => {
    e.preventDefault();
    const { form, changeSearchDataForEvent, getListForEvent } = this.props;
    form
      .validateFields()
      .then(obj => {
        changeSearchDataForEvent({ ...obj, pageIndex: 1 });
        getListForEvent(); // 重新查询列表
      })
      .catch(e => {
        message.warn("请根据提示完成选项");
      });
  };
  clear = () => {
    this.props.form.setFieldsValue({
      eventKey: "",
      eventName: "",
      eventType: undefined,
      applicationId: undefined,
      status: undefined
    });
  };
  render() {
    const { isLoadingForEvent, allList, form } = this.props;
    const { getFieldDecorator } = form;
    const searching = !!isLoadingForEvent;
    return (
      <Form layout="inline" onSubmit={this.onSearch}>
        <Form.Item label="eventKey">
          {getFieldDecorator("eventKey", {
            // rules: [
            //   {
            //     pattern: /^[$]?[a-zA-Z_][\w_]*$/,
            //     message: "字母、数字、下划线（首字符不能为数字）"
            //   }
            // ]
          })(
            <Input
              name="eventKey"
              placeholder="请输入eventKey"
              maxLength={30}
              allowClear={true}
            />
          )}
        </Form.Item>
        <Form.Item label="事件名称">
          {getFieldDecorator("eventName")(
            <Input
              placeholder="请输入事件名称"
              maxLength={30}
              allowClear={true}
            />
          )}
        </Form.Item>
        <Form.Item label="事件类型">
          {getFieldDecorator("eventType", {
            initialValue: undefined
          })(
            <Select
              showSearch
              notFoundContent="未找到相应记录"
              optionFilterProp="children"
              placeholder="请选择事件类型"
              style={this.sty}
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
        <Form.Item label="关联应用">
          {getFieldDecorator("applicationId", {
            initialValue: undefined
          })(
            <Select
              showSearch
              notFoundContent="未找到相应记录"
              optionFilterProp="children"
              placeholder="请选择关联应用"
              style={this.sty}
            >
              {[this.appDefault]
                .concat(allList)
                .map(({ applicationId, applicationName }) => {
                  return (
                    <Select.Option value={applicationId} key={applicationId}>
                      {applicationId === ""
                        ? applicationName
                        : applicationId + "-" + applicationName}
                    </Select.Option>
                  );
                })}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="应用版本">
          {getFieldDecorator("appVersion")(
            <Input
              placeholder="请输入应用版本号"
              maxLength={30}
              allowClear={true}
            />
          )}
        </Form.Item>
        <Form.Item label="状态">
          {getFieldDecorator("status", {
            initialValue: undefined
          })(
            <Select placeholder="请选择状态" style={this.sty}>
              {this.statusList.map(({ id, value }) => {
                return (
                  <Select.Option value={id} key={id}>
                    {value}
                  </Select.Option>
                );
              })}
            </Select>
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
