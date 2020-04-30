import React, { Component } from "react";
import { Form, Button, message, Select, Input } from "antd";

class Search extends Component {
  sty = { width: "193px" };
  checkProductId = (rule, value, callback) => {
    if (value === undefined || /^\d*?$/.test(value)) {
      callback();
      return;
    }
    callback("产品ID仅为数字!");
  };
  onSearch = e => {
    e.preventDefault();
    const { form, changeSearchData, getList } = this.props;
    form
      .validateFields()
      .then(obj => {
        changeSearchData({ ...obj, pageIndex: 1 });
        getList(); // 重新查询列表
      })
      .catch(e => {
        message.warn("请根据提示完成选项");
      });
  };
  clear = () => {
    this.props.form.setFieldsValue({
      // types: undefined,
      productId: "",
      // productName: "",
      // email: "",
      statu: undefined
    });
  };
  render() {
    const { serverTypeList, checkerList, isLoading, form } = this.props;
    const { getFieldDecorator } = form;
    const searching = !!isLoading;
    return (
      <Form layout="inline" onSubmit={this.onSearch}>
        {/* <Form.Item label="服务类型">
          {getFieldDecorator("types", {
            initialValue: undefined
          })(
            <Select placeholder="请选择服务类型" style={this.sty}>
              {serverTypeList.map(({ id, value }) => {
                return (
                  <Select.Option value={id} key={id}>
                    {value}
                  </Select.Option>
                );
              })}
            </Select>
          )}
        </Form.Item> */}
        <Form.Item label="产品ID">
          {getFieldDecorator("productId", {
            rules: [{ validator: this.checkProductId }]
          })(
            <Input
              placeholder="请输入产品ID"
              maxLength={30}
              allowClear={true}
            />
          )}
        </Form.Item>
        {/* <Form.Item label="产品名称">
          {getFieldDecorator("productName", {})(
            <Input
              placeholder="请输入产品名称"
              maxLength={30}
              allowClear={true}
            />
          )}
        </Form.Item> */}
        {/* <Form.Item label="提交用户">
          {getFieldDecorator("email", {})(
            <Input placeholder="请输入email" maxLength={30} allowClear={true} />
          )}
        </Form.Item> */}
        <Form.Item label="审核状态">
          {getFieldDecorator("statu", {
            initialValue: undefined
          })(
            <Select placeholder="请选择审核状态" style={this.sty}>
              {checkerList.map(({ id, value }) => {
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

export default Form.create({ name: "SearchServerAudit" })(Search);
