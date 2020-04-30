import React, { Component } from "react";
import { Pagination, Input } from "antd";

class Pager extends Component {
  state = {
    index: ""
  };

  // 输入页码
  changeInput = e => {
    let val = e.target.value.replace(/[^\d]/g, "");
    const { totalPages } = this.props;
    if (val > totalPages) {
      val = totalPages;
    }
    this.setState({
      index: +val || ""
    });
  };

  // 页面跳转
  changePage = () => {
    const { loading, onChange } = this.props;
    if (typeof onChange !== "function" || loading) {
      return;
    }
    const { index } = this.state;
    if (index) {
      this.setState({ index: "" });
      this.onChange(index);
    } else {
      const { input } = this.refs;
      input && input.focus();
    }
  };

  // onChange
  onChange = val => {
    const { loading, onChange } = this.props;
    if (typeof onChange !== "function" || loading) {
      return;
    }
    this.props.onChange(val);
  };

  // 跳转首页
  toFirst = () => {
    const { loading, onChange } = this.props;
    if (typeof onChange !== "function" || loading) {
      return;
    }
    this.props.onChange(1);
  };

  // 跳转尾页
  toLast = () => {
    const { loading, onChange } = this.props;
    if (typeof onChange !== "function" || loading) {
      return;
    }
    const { totalPages } = this.props;
    this.onChange(totalPages || 1);
  };

  render() {
    const { totalRows, pageRows, pageIndex, totalPages } = this.props;
    const len = totalPages && totalPages > 100 ? (totalPages + "").length : 3;

    return (
      <div className="pager">
        <span className="total-data">
          <em>共</em>
          <b> {totalRows} </b>
          <em>条数据</em>
        </span>
        <a className="first" onClick={this.toFirst}>
          首页
        </a>
        <Pagination
          onChange={this.onChange}
          current={pageIndex}
          total={totalRows}
          pageSize={pageRows || 10}
        />
        <a className="last" onClick={this.toLast}>
          尾页
        </a>
        <span className="total">共 {totalPages} 页，到第 &nbsp;</span>
        <Input
          className="antd-input"
          ref="input"
          maxLength={len}
          style={{ width: len * 15 }}
          value={this.state.index}
          onChange={this.changeInput}
          onPressEnter={this.changePage}
        />
        <span className="total">&nbsp;页</span>
        <a className="sure" onClick={this.changePage}>
          确定
        </a>
      </div>
    );
  }
}

export default Pager;
