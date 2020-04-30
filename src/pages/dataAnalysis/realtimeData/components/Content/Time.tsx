import React, { Component } from "react";
import { Popover, Icon } from "antd";

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
    label: "次日留存",
    content: "昨日新增用户，今日有启动过应用的数量。"
  }
];

interface TimeProps {
  updateTime: string;
}

class Time extends Component<TimeProps> {
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
  public render(): JSX.Element {
    const { updateTime } = this.props;
    return (
      <div>
        <span className="page-title">实时数据</span>
        <Popover arrowPointAtCenter content={this.content} placement="rightTop">
          <Icon className="page-ml" type="question-circle" />
        </Popover>
        {updateTime && (
          <span className="page-ml-large">
            {updateTime}
            <span className="page-int-1em page-blue">(更新时间)</span>
          </span>
        )}
      </div>
    );
  }
}

export default Time;
