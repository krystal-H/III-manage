import React, { Component, Fragment } from "react";
import CommSelect from "../../../components/CommSelect";
import { Select, Tooltip } from "antd";
import { selectItemProps } from "../store/types";

interface EventChooseProps {
  eventList: selectItemProps[];
  propertyListMap: object;
  propertyMap: object;
  eventId: number | string;
  propertyId: number | string;
  propertiesValue: number[] | string[];
  onChange: Function;
  getPropertyList: Function;
}

interface EventChooseStateProps {
  keyList: string[];
}

class EventChoose extends Component<EventChooseProps, EventChooseStateProps> {
  selSty = { width: "258px", marginLeft: "6px" };
  state = {
    keyList: [] //该值用于字符串型属性的自定义枚举值输入
  };
  getPopupContainer = (n: HTMLElement): HTMLElement =>
    n.parentNode as HTMLElement;
  onChange = (d: any) => {
    const { propertyMap } = this.props;
    const { propertyName, propertyRemark } = propertyMap[d.propertyId] || {};
    this.props.onChange({
      ...d,
      propertyName,
      propertyRemark
    });
  };
  resetKeyList = () => {
    if (this.state.keyList.length !== 0) {
      this.setState({
        keyList: []
      });
    }
  };
  //修改事件
  changeEventId = (eventId: number | string) => {
    this.onChange({ eventId, propertyId: "", propertiesValue: [] });
    this.props.getPropertyList(eventId);
    this.resetKeyList();
  };
  //修改事件属性选择
  changePropertyId = (propertyId: number | string) => {
    const { eventId } = this.props;
    this.onChange({ eventId, propertyId, propertiesValue: [] });
    this.resetKeyList();
  };
  //修改事件属性列表值
  changePropArr = (list: string[] | number[]) => {
    const { eventId, propertyId } = this.props;
    this.onChange({ eventId, propertyId, propertiesValue: list });
  };
  filterKeys = (inputValue: any, option: any) => {
    return inputValue === option.props.children;
  };
  changeKeys = (list: string[]) => {
    //选值发生改变时
    const { eventId, propertyId } = this.props;
    this.onChange({ eventId, propertyId, propertiesValue: list });
    this.setState({
      keyList: [...list]
    });
  };
  onSearchKeys = (value: string, isNum: boolean) => {
    //文本框值变化时回调
    const { keyList } = this.state;
    const { propertiesValue } = this.props;
    const v = value.replace(/^(\s+)|(\s+)$/g, "").replace(/[,]/g, "");
    const mustDel = isNum && !/^-?\d+(\.\d*)?$/.test(v);
    const len1 = propertiesValue.length,
      len2 = keyList.length;
    let copy: string[] = [...keyList];
    if (len2 <= len1) {
      copy.push(v);
    } else {
      copy[len1] = v;
    }
    //如果检测到重复项或者该项为空
    if (copy.slice(0, -1).indexOf(v) > -1 || v === "" || mustDel) {
      copy.splice(-1, 1);
    }
    this.setState({ keyList: copy });
  };
  render() {
    const {
      eventList,
      propertyListMap,
      propertyMap,
      eventId,
      propertyId,
      propertiesValue
    } = this.props;
    const { keyList } = this.state;
    const propertyList = propertyListMap[eventId] || [];
    const { propertyType, propertyEnum } = propertyMap[propertyId] || {};
    let PCon = null,
      propList = [];
    //"0": "字符串","1": "枚举", "2": "布尔","3": "数值",
    if (propertyType === 0 || propertyType === 3) {
      //如果属性值为字符串型
      let warnStr =
        propertyType === 3 ? (
          <span>
            <br />
            只可以输入数字！！！
          </span>
        ) : null;
      PCon = (
        <Tooltip
          title={
            <span>
              按回车键入单个属性值！
              <br />
              注意：禁止英文逗号及开头末尾空格输入！包含该符号时无法保存选择该属性值。如果键入已有的属性值，也无法保存该属性值！
              {warnStr}
            </span>
          }
          trigger="focus"
          getPopupContainer={this.getPopupContainer}
        >
          <Select
            showSearch
            showArrow={false}
            getPopupContainer={this.getPopupContainer}
            style={this.selSty}
            placeholder="请输入事件属性值(可输入多个)"
            notFoundContent="未找到属性值"
            filterOption={this.filterKeys}
            optionFilterProp="children"
            onChange={this.changeKeys}
            onSearch={v => this.onSearchKeys(v, propertyType === 3)}
            open={propertiesValue.length < keyList.length}
            mode="multiple"
            maxTagCount={8}
            value={propertiesValue}
          >
            {keyList.map(d => {
              return (
                <Select.Option value={d} key={d}>
                  {d}
                </Select.Option>
              );
            })}
          </Select>
        </Tooltip>
      );
    } else if (propertyType === 1 || propertyType === 2) {
      propList = propertyEnum.split("|").map((d: string) => {
        return { id: d, value: d };
      });
      PCon = (
        <CommSelect
          style={this.selSty}
          list={propList}
          placeholder="请选择事件属性值(多选)"
          onlyList
          showSearch
          mode="multiple"
          onChange={this.changePropArr}
          value={propertiesValue}
        />
      );
    }
    return (
      <Fragment>
        <CommSelect
          width={200}
          list={eventList}
          placeholder="请选择行为事件"
          onlyList
          showSearch
          onChange={this.changeEventId}
          value={eventId}
        />
        {eventId !== undefined ? (
          <CommSelect
            width={200}
            className="page-ml"
            list={propertyList}
            placeholder="请选择事件属性"
            onlyList
            showSearch
            onChange={this.changePropertyId}
            value={propertyId}
          />
        ) : null}
        {PCon}
      </Fragment>
    );
  }
}
export default EventChoose;
