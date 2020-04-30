import React, { Component } from "react";
import { Row, Col } from "antd";
import TabItem from "../../containers/ConnectTabItem";
import { TabMap, TabTextMap, TotalProps } from "../../store/types";
import timeUtil from "../../../util/timeUtil";
import { toPercentNumber } from "../../../util/tools";

interface TabsProps {
  tab: TabMap;
  total: TotalProps;
}

class Tabs extends Component<TabsProps> {
  public render(): JSX.Element {
    const {
      tab,
      total: {
        userTotal,
        newUsers,
        activeUsers,
        startUsers,
        keepUsersForNew,
        keepUsersForActive,
        timeForPerPerson,
        crash
      }
    } = this.props;
    return (
      <Row gutter={16}>
        <Col span={18}>
          <Row gutter={16} className="page-tabs">
            <TabItem
              title={
                <span title={TabTextMap.NEWUSERS as string}>
                  {TabTextMap.NEWUSERS}
                </span>
              }
              tab={TabMap.NEWUSERS}
              value={newUsers}
              isActive={tab === TabMap.NEWUSERS}
            />
            <TabItem
              title={
                <span title={TabTextMap.ACTIVEUSERS as string}>
                  {TabTextMap.ACTIVEUSERS}
                </span>
              }
              tab={TabMap.ACTIVEUSERS}
              value={activeUsers}
              isActive={tab === TabMap.ACTIVEUSERS}
            />
            <TabItem
              title={
                <span title={TabTextMap.STARTUSERS as string}>
                  {TabTextMap.STARTUSERS}
                </span>
              }
              tab={TabMap.STARTUSERS}
              value={startUsers}
              isActive={tab === TabMap.STARTUSERS}
            />
            <TabItem
              title={
                <span title={TabTextMap.KEEPUSERSFORNEW as string}>
                  {TabTextMap.KEEPUSERSFORNEW}
                </span>
              }
              tab={TabMap.KEEPUSERSFORNEW}
              value={
                keepUsersForNew !== undefined
                  ? toPercentNumber(keepUsersForNew) + "%"
                  : undefined
              }
              switchValue={false}
              isActive={tab === TabMap.KEEPUSERSFORNEW}
            />
          </Row>
          <Row gutter={16} className="page-tabs page-tabs-nopt">
            <TabItem
              title={
                <span title={TabTextMap.KEEPUSERSFORACTIVE as string}>
                  {TabTextMap.KEEPUSERSFORACTIVE}
                </span>
              }
              tab={TabMap.KEEPUSERSFORACTIVE}
              value={
                keepUsersForActive !== undefined
                  ? toPercentNumber(keepUsersForActive) + "%"
                  : undefined
              }
              switchValue={false}
              isActive={tab === TabMap.KEEPUSERSFORACTIVE}
            />
            <TabItem
              title={
                <span title={TabTextMap.TIMEFORPERPERSON as string}>
                  {TabTextMap.TIMEFORPERPERSON}
                </span>
              }
              tab={TabMap.TIMEFORPERPERSON}
              value={
                timeForPerPerson !== undefined
                  ? timeUtil.secondToHours(timeForPerPerson)
                  : undefined
              }
              switchValue={false}
              isActive={tab === TabMap.TIMEFORPERPERSON}
            />
            <TabItem
              title={
                <span title={TabTextMap.CRASH as string}>
                  {TabTextMap.CRASH}
                </span>
              }
              tab={TabMap.CRASH}
              value={crash}
              isActive={tab === TabMap.CRASH}
            />
          </Row>
        </Col>
        <Col span={6} className="page-tabs-right">
          <Row gutter={16} className="page-tabs">
            <TabItem
              span={24}
              title={
                <span title={TabTextMap.TOTALUSER as string}>
                  {TabTextMap.TOTALUSER}：
                </span>
              }
              value={userTotal}
              noOnTap={true}
            />
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Tabs;
