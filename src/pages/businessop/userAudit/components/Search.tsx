import React, { Component } from "react";
import { formType } from "../../../../types";
import { Form, Button, message, Select, Input } from "antd";
import { checkerListItemPorps } from "../store/types";

interface SearchProps {
  form: formType;
  changeSearchData: (data: object) => void;
  getList: () => void;
  checkerList: Array<checkerListItemPorps>;
  isLoading: boolean;
}

class Search extends Component<SearchProps> {
  sty = { width: "193px" };
  onSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { form, changeSearchData, getList } = this.props;
    form
      .validateFields()
      .then((obj: object) => {
        changeSearchData({ ...obj, pageIndex: 1 });
        getList(); // 重新查询列表
      })
      .catch(() => {
        message.warn("请根据提示完成选项");
      });
  };
  clear = () => {
    this.props.form.setFieldsValue({
      productName: "",
      statu: undefined
    });
  };
  render(): JSX.Element {
    const { checkerList, isLoading, form } = this.props;
    const { getFieldDecorator } = form;
    const searching = !!isLoading;
    return (
      <Form layout="inline" onSubmit={this.onSearch}>
        <Form.Item label="提交用户">
          {getFieldDecorator(
            "productName",
            {}
          )(
            <Input placeholder="请输入用户" maxLength={30} allowClear={true} />
          )}
        </Form.Item>
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
            type="primary"
            icon="search"
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

export default Form.create({ name: "SearchUserAudit" })(Search);
