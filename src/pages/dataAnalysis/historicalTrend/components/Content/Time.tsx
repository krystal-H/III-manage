import React, { Component } from "react";
import { Popover, Icon, DatePicker, Button, ConfigProvider } from "antd";

import locale from "antd/lib/date-picker/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

const format = "YYYY-MM-DD";
const maxDay = moment().subtract(61, "days");
const defaultStartDay = moment().subtract(30, "days");
const defaultEndDay = moment().subtract(1, "days");
const yesterday = defaultEndDay;
const week = moment().subtract(7, "days");
const month = defaultStartDay;

const isOkForEnd = (end: any) =>
  end.format(format) === defaultEndDay.format(format);
const isOkForYesterday = (start: any) =>
  start.format(format) === yesterday.format(format);
const isOkForWeek = (start: any) =>
  start.format(format) === week.format(format);
const isOkForMonth = (start: any) =>
  start.format(format) === month.format(format);

const instruction = [
  {
    label: "新增用户",
    content:
      "安装并首次启动应用的唯一设备，统计当日同一设备多次卸载安装，仅计算一次。"
  },
  {
    label: "活跃用户",
    content: "启动过一次应用的设备，当日同一设备多次启动，仅计算一次。"
  },
  {
    label: "启动次数",
    content:
      "打开应用为一次启动，完全退出或者退到系统后台超过30秒（Android，IOS不限制30s退到后台既算）再次进入应用为一次新的启动。"
  },
  {
    label: "新增用户次日留存",
    content: "昨日新增用户，今日有启动过应用的数量。"
  },
  {
    label: "活跃用户次日留存",
    content: "昨日新增用户，今日有启动过应用的数量占比。"
  },
  {
    label: "人均使用时长",
    content: "每日使用应用的时长合计/使用应用的用户（去重IMEI）。"
  },
  {
    label: "崩溃数",
    content: "每日应用发生错误的次数。"
  },
  {
    label: "累计用户数",
    content: "截止到查询日期，应用总计新增用户数量，历史至今（去重）。"
  },
  {
    label: "前7日",
    content: "昨日为起始日，往前统计7天的数据。"
  },
  {
    label: "前30日：",
    content: "昨日为起始日，往前统计30天的数据。"
  }
];

interface TimeProps {
  start: any;
  end: any;
  changeTime: Function;
}

class Time extends Component<TimeProps> {
  selSty: React.CSSProperties = { width: "266px", boxSizing: "border-box" };
  text: [string, string] = ["筛选开始时间", "筛选结束时间"];
  content = (
    <div className="page-card-qa">
      {instruction.map(({ label, content }, i) => (
        <p key={i}>
          <b>{label}：</b>
          {content}
        </p>
      ))}
    </div>
  );
  disabledTime = (now: any) => {
    const val = now.valueOf();
    return val < maxDay.valueOf() || val > defaultEndDay.valueOf();
  };
  changeTime = (days: [any, any]) => {
    this.props.changeTime(days[0], days[1]);
  };
  setDay = () => {
    this.props.changeTime(yesterday, defaultEndDay);
  };
  setWeek = () => {
    this.props.changeTime(week, defaultEndDay);
  };
  setMonth = () => {
    this.props.changeTime(month, defaultEndDay);
  };
  public render(): JSX.Element {
    const { start, end } = this.props;
    const _isOkForEnd = isOkForEnd(end),
      _isOkForYesterday = _isOkForEnd && isOkForYesterday(start),
      _isOkForWeek = _isOkForEnd && isOkForWeek(start),
      _isOkForMonth = _isOkForEnd && isOkForMonth(start);
    return (
      <div>
        <span className="page-title">历史趋势</span>
        <Popover arrowPointAtCenter content={this.content} placement="rightTop">
          <Icon className="page-ml" type="question-circle" />
        </Popover>
        <span className="page-ml-large">
          <DatePicker.RangePicker
            locale={locale}
            format={format}
            style={this.selSty}
            allowClear={false}
            placeholder={this.text}
            disabledDate={this.disabledTime}
            onChange={this.changeTime}
            value={[start, end]}
          />
        </span>
        <ConfigProvider autoInsertSpaceInButton={false}>
          <Button
            type="link"
            className={
              "page-link-small" + (_isOkForYesterday ? " selected" : "")
            }
            onClick={this.setDay}
          >
            昨日
          </Button>
        </ConfigProvider>
        <Button
          type="link"
          className={"page-link-small" + (_isOkForWeek ? " selected" : "")}
          onClick={this.setWeek}
        >
          前七日
        </Button>
        <Button
          type="link"
          className={"page-link-small" + (_isOkForMonth ? " selected" : "")}
          onClick={this.setMonth}
        >
          前三十日
        </Button>
      </div>
    );
  }
}

export default Time;
