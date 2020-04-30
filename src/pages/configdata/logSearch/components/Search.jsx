import React, { Component } from "react";
import { Form, Button, message, Select, Input, DatePicker } from "antd";
import moment from "moment";

const format = "YYYY-MM-DD HH:mm:ss";
const zero = moment("00:00:00", "HH:mm:ss");

class Search extends Component {
  sty = { width: "193px" };
  appDefault = { applicationId: "", applicationName: "所有应用" };
  disabledDate = current => {
    return current && current > moment().endOf("day");
  };
  // disabledDateTime = () => {
  //   return {
  //     disabledHours: () => range(0, 24).splice(4, 20),
  //     disabledMinutes: () => range(30, 60),
  //     disabledSeconds: () => [55, 56]
  //   };
  // };
  checkStart = (rule, value, callback) => {
    const endDate = this.props.form.getFieldValue("endDate");
    if (value && endDate && value > endDate.valueOf()) {
      // || value > moment().valueOf()
      callback("请选择正确的开始时间");
    }
    callback();
  };
  checkEnd = (rule, value, callback) => {
    const startDate = this.props.form.getFieldValue("startDate");
    if (value && startDate && value < startDate.valueOf()) {
      // || value > moment().valueOf()
      callback("请选择正确的结束时间");
    }
    callback();
  };
  onSearch = e => {
    e.preventDefault();
    const { form, changeSearchData, getList } = this.props;
    form
      .validateFields()
      .then(obj => {
        const { startDate, endDate } = obj;
        changeSearchData({
          ...obj,
          startDate: startDate ? startDate.format(format) : "",
          endDate: endDate ? endDate.format(format) : "",
          pageIndex: 1
        });
        getList(); // 重新查询列表
      })
      .catch(e => {
        message.warn("请根据提示完成选项");
      });
  };
  clear = () => {
    this.props.form.setFieldsValue({
      application_id: undefined,
      event_key: "",
      user_id: "",
      startDate: undefined,
      endDate: undefined
    });
  };
  render() {
    const { isLoading, allList, form } = this.props;
    const { getFieldDecorator } = form;
    const searching = !!isLoading;
    return (
      <Form layout="inline" onSubmit={this.onSearch}>
        <Form.Item label="关联应用">
          {getFieldDecorator("application_id", {
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
        <Form.Item label="eventKey">
          {getFieldDecorator(
            "event_key",
            {}
          )(
            <Input
              placeholder="请输入eventKey"
              maxLength={30}
              allowClear={true}
            />
          )}
        </Form.Item>
        <Form.Item label="用户">
          {getFieldDecorator("user_id")(
            <Input placeholder="请输入用户" allowClear={true} />
          )}
        </Form.Item>
        <Form.Item label="开始时间">
          {getFieldDecorator("startDate", {
            rules: [
              {
                validator: this.checkStart
              }
            ]
          })(
            <DatePicker
              showTime={{ defaultValue: zero }}
              placeholder="选择开始时间"
              disabledDate={this.disabledDate}
            />
          )}
        </Form.Item>
        <Form.Item label="结束时间">
          {getFieldDecorator("endDate", {
            rules: [
              {
                validator: this.checkEnd
              }
            ]
          })(
            <DatePicker
              showTime={{ defaultValue: zero }}
              placeholder="选择结束时间"
              disabledDate={this.disabledDate}
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

export default Form.create({ name: "SearchLogSearch" })(Search);
