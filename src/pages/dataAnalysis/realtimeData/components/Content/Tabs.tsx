import React, { Component } from "react";
import { Row } from "antd";
import TabItem from "../../containers/ConnectTabItem";
import { TotalProps, TabMap } from "../../store/types";

interface TabsProps {
  tab: TabMap;
  total: TotalProps;
}

class Tabs extends Component<TabsProps> {
  public render(): JSX.Element {
    const {
      tab,
      total: { newUsers, activeUsers, startUsers, keepUsers }
    } = this.props;
    return (
      <Row gutter={16} className="page-tabs">
        <TabItem
          title={<span title="新增用户（今日累计）">新增用户（今日累计）</span>}
          tab={TabMap.NEWUSERS}
          value={newUsers}
          isActive={tab === TabMap.NEWUSERS}
        />
        <TabItem
          title={<span title="活跃用户（今日累计）">活跃用户（今日累计）</span>}
          tab={TabMap.ACTIVEUSERS}
          value={activeUsers}
          isActive={tab === TabMap.ACTIVEUSERS}
        />
        <TabItem
          title={<span title="启动次数（今日累计）">启动次数（今日累计）</span>}
          tab={TabMap.STARTUSERS}
          value={startUsers}
          isActive={tab === TabMap.STARTUSERS}
        />
        <TabItem
          title={
            <span title="次日留存（昨日新增用户）">
              次日留存（昨日新增用户）
            </span>
          }
          tab={TabMap.KEEPUSERS}
          value={keepUsers}
          isActive={tab === TabMap.KEEPUSERS}
        />
      </Row>
    );
  }
}

export default Tabs;
