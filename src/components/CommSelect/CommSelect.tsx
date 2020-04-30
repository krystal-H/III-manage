import React, { PureComponent } from "react";
import { Select } from "antd";
import { selectItemProps } from "../../types";

interface CommSelectProps {
  list?: selectItemProps[];
  onlyList?: boolean;
  noTitle?: boolean;
  showSearch?: boolean;
  notFoundContent?: string;
  optionFilterProp?: string;
  dropdownMatchSelectWidth?: boolean;
  width?: number;
  style?: object;
  value?: number | string | number[] | string[];
  disabled?: boolean;
  onChange?: Function;
  [props: string]: any;
}

class CommSelect extends PureComponent<CommSelectProps> {
  normalOption: selectItemProps[] = [
    { id: "", value: "全部" + (this.props.normalOptionText || "") }
  ];
  getPopupContainer = (triggerNode: HTMLElement): HTMLElement => {
    return triggerNode.parentNode as HTMLElement;
  };
  handleChange = (value: string | number, option: any) => {
    const { onChange } = this.props;
    let name, obj;
    try {
      name = option.props.children;
      //下面将列表值传递给了事件触发器，有列表发生改变的风险！
      obj = option.props["data-data"];
    } catch (e) {
      name = option;
    }
    onChange && onChange(value, name, obj);
  };
  /**
   * 参数说明：
   *      *.normalOptionText ：  修改第一项的补充字符
   *      *.value        ：      受控组件！！！！！ 这个value必填！！！！！
   *      *.list         :       [{id:...,value:...},...]
   *      *.onlyList     :       是否仅用当前list
   *      *.noTitle      :       是否不需要title
   *      *.disabled     :       是否禁用
   *      *.width        :       下拉框的宽度设置
   *      *.style        :       下拉框的样式设置
   */
  render() {
    const {
      normalOptionText,
      list,
      onlyList,
      noTitle,
      showSearch,
      notFoundContent,
      optionFilterProp,
      dropdownMatchSelectWidth,
      disabled,
      width,
      style,
      onChange,
      value,
      ...others
    } = this.props;
    //如果不需要空字符串为底
    let lists = list && list.length > 0 ? list : [],
      sty = { width: "100%" },
      loading = lists.length === 0;
    lists = onlyList ? lists : this.normalOption.concat(lists);
    width && (sty = { ...sty, ...{ width: width + "px" } });
    style && (sty = { ...sty, ...style });
    return (
      <Select
        disabled={disabled || false}
        showSearch={showSearch !== false}
        getPopupContainer={this.getPopupContainer}
        dropdownMatchSelectWidth={dropdownMatchSelectWidth || false}
        style={sty}
        notFoundContent={notFoundContent || "未找到相应记录"}
        optionFilterProp={optionFilterProp || "children"}
        loading={loading}
        onChange={this.handleChange}
        value={value}
        {...others}
      >
        {lists.map(d => {
          const { id, value } = d;
          return (
            <Select.Option
              value={id}
              key={id}
              data-data={d}
              title={noTitle ? undefined : value}
            >
              {value}
            </Select.Option>
          );
        })}
      </Select>
    );
  }
}

export default CommSelect;
