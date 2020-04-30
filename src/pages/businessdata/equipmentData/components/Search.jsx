import React, { Component } from "react";
import { Form, Button, message, Select, Input, DatePicker } from "antd";
import { defaultStartTime, defaultEndTime } from "../store/action";
import moment from "moment";

const format = "YYYY-MM-DD HH:mm:ss";
const zero = moment("00:00:00", "HH:mm:ss");
const maxInterval = 12 * 60 * 60 * 1000;

class Search extends Component {
  sty = { width: "193px" };
  disabledDate = current => {
    return current && current > moment().endOf("day");
  };
  checkStart = (rule, value, callback) => {
    const endTime = this.props.form.getFieldValue("endTime");
    if (value && endTime) {
      const end = endTime.valueOf();
      if (value > end) callback("开始时间必须小于结束时间");
      if (end - value.valueOf() > maxInterval)
        callback("开始时间到结束时间不能大于12小时!");
    }
    callback();
  };
  checkEnd = (rule, value, callback) => {
    const startTime = this.props.form.getFieldValue("startTime");
    if (value && startTime) {
      const start = startTime.valueOf();
      if (value < start) callback("结束时间必须大于开始时间");
      if (value.valueOf() - start > maxInterval)
        callback("开始时间到结束时间不能大于12小时!");
    }
    callback();
  };
  searchFun=()=>{
    const { form, changeSearchData, getList } = this.props;
    form
      .validateFields()
      .then(obj => {
        const { startTime, endTime } = obj;
        if (!!startTime !== !!endTime) {
          message.warn("请完善发布" + (!!startTime ? "结束时间" : "开始时间"));
          return;
        }
        changeSearchData({
          ...obj,
          startTime: startTime,
          endTime: endTime,
          pageIndex: 1
        });
        getList(); // 重新查询列表
      })
      .catch(e => {
        message.warn("请根据提示完成选项");
      });
  }
  onSearch = e => {
    e.preventDefault();
    this.searchFun();
  };
  clear = () => {
    this.props.form.setFieldsValue({
      fileName: "",
      startTime: defaultStartTime,
      endTime: defaultEndTime
    },this.searchFun);
  };
  render() {
    const { isLoading, form } = this.props;
    const { getFieldDecorator } = form;
    const searching = !!isLoading;
    return (
      <Form layout="inline" onSubmit={this.onSearch}>
        <Form.Item label="MAC">
          {getFieldDecorator("fileName", {
            rules: [
              {
                pattern: /^[0-9A-Z]{12}$/,
                message: "必须为12位大写字母或数字组成"
              }
            ]
          })(
            <Input
              placeholder="请输入MAC地址"
              maxLength={12}
              allowClear={true}
            />
          )}
        </Form.Item>
        <Form.Item label="发布开始时间">
          {getFieldDecorator("startTime", {
            initialValue: defaultStartTime,
            rules: [{ validator: this.checkStart }]
          })(
            <DatePicker
              showTime={{ defaultValue: zero }}
              placeholder="选择发布开始时间"
              disabledDate={this.disabledDate}
            />
          )}
        </Form.Item>
        <Form.Item label="发布结束时间">
          {getFieldDecorator("endTime", {
            initialValue: defaultEndTime,
            rules: [{ validator: this.checkEnd }]
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
            查询
          </Button>
        </Form.Item>
        <Form.Item>
          <Button onClick={this.clear}>重置</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: "equipmentDataSearch" })(Search);
