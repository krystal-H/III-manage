import React, { Component } from "react";
import { Input, Button, Select, message } from "antd";

class TrComForAddModal extends Component {
  types = [
    { id: "0", value: "字符串" },
    { id: "1", value: "枚举" },
    { id: "2", value: "布尔" },
    { id: "3", value: "数值" }
  ];
  getPopupContainer = triggerNode => {
    return triggerNode.parentNode;
  };
  setVal = e => {
    const { data, onChange, index } = this.props;
    let { ...obj } = data;
    let ele = e.target,
      name = ele.name,
      val = ele.value.replace(/^(\s+)|(\s+)$/g, "");
    if (name === "propertyEnum") {
      obj.propertyEnum = val
        .replace(/[,]/g, "")
        .split("|")
        .map(d => {
          return d.replace(/^(\s+)|(\s+)$/g, "");
        })
        .join("|");
    } else {
      if (name === "propertyName") {
        val = val.replace(/[^\w_]/g, "").replace(/^\d+/, "");
      }
      obj[name] = val;
    }
    onChange(index, obj);
  };
  changeType = val => {
    const { data, onChange, index } = this.props;
    let { ...obj } = data;
    obj.propertyType = parseInt(val);
    obj.propertyEnum = val === "2" ? "是|否" : "";
    onChange(index, obj);
  };
  onDel = () => {
    const { index, onDel } = this.props;
    onDel(index);
  };
  render() {
    const {
      propertyName,
      propertyRemark,
      propertyType,
      propertyEnum
    } = this.props.data;
    return (
      <tr>
        <td>属性名：</td>
        <td>
          <Input
            className="page-short"
            placeholder="字母数字下划线"
            maxLength={20}
            name="propertyName"
            value={propertyName}
            onChange={this.setVal}
          />
        </td>
        <td>备注：</td>
        <td>
          <Input
            className="page-shorter"
            placeholder="属性备注"
            maxLength={20}
            name="propertyRemark"
            value={propertyRemark}
            onChange={this.setVal}
          />
        </td>
        <td>类型：</td>
        <td>
          <Select
            className="page-shorter"
            getPopupContainer={this.getPopupContainer}
            value={propertyType + ""}
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
        </td>
        <td>
          {propertyType === 1 ? (
            <Input
              placeholder="请定义枚举值,以'|'分隔"
              maxLength={100}
              name="propertyEnum"
              value={propertyEnum}
              onChange={this.setVal}
            />
          ) : null}
        </td>
        <td>
          <Button
            icon="delete"
            type="danger"
            shape="circle"
            size="small"
            title="删除该行事件属性"
            onClick={this.onDel}
          ></Button>
        </td>
      </tr>
    );
  }
}

export default TrComForAddModal;
