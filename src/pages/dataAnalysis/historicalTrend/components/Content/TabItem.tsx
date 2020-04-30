import React, { Component } from "react";
import { Col, Card, Button, Icon, Statistic, ConfigProvider } from "antd";
import { TabMap } from "../../store/types";
import { toThousands } from "../../../util/tools";
import { nullTag } from "../../../store/params";

interface TabItemProps {
  onTab: Function;
  getData: Function;
  isLoading: boolean;
  isError: boolean;
  title: string | React.ReactNode;
  value: number | string | undefined;
  switchValue?: boolean;
  tab?: TabMap;
  noOnTap?: boolean; // 是否没有点击切换功能
  isActive?: boolean;
  span?: number;
}

class TabItem extends Component<TabItemProps> {
  smallSty = { padding: 0 };
  loadingSty = { fontSize: "16px", color: "#1890ff" };
  loadingCom = (<Icon type="sync" spin style={this.loadingSty} />);
  getValueNode = (
    value: string | number,
    isLoading: boolean,
    isError: boolean
  ) => {
    const { switchValue = true } = this.props;
    if (isError) {
      return (
        <ConfigProvider autoInsertSpaceInButton={false}>
          <Button
            type="link"
            onClick={this.tryAgain}
            size="small"
            style={this.smallSty}
          >
            重试
          </Button>
        </ConfigProvider>
      );
    }
    return isLoading
      ? null
      : value === nullTag
      ? nullTag
      : switchValue
      ? toThousands(value)
      : value;
  };
  tab = () => {
    const { tab, onTab, noOnTap = false, isActive } = this.props;
    if (noOnTap === true || isActive) return;
    onTab(tab);
  };
  tryAgain = (e: React.MouseEvent) => {
    e.stopPropagation();
    this.props.getData(true);
  };
  public render(): JSX.Element {
    const { loadingCom, getValueNode, props } = this;
    const {
      span,
      isLoading,
      isError,
      title,
      value = nullTag,
      isActive,
      noOnTap = false
    } = props;
    const cardCls =
      !noOnTap && isActive
        ? "page-card-small page-card-avtive"
        : "page-card-small";
    const iconSty = isActive ? { color: "#1890ff" } : { color: "#e8e8e8" };
    return (
      <Col span={span || 6}>
        <Card className={cardCls} onClick={this.tab}>
          <Statistic
            title={title}
            prefix={isLoading ? loadingCom : null}
            value={value}
            formatter={value => getValueNode(value, isLoading, isError)}
          />
          {!noOnTap ? (
            <Icon
              type="check-square"
              className="page-tabs-active"
              style={iconSty}
            />
          ) : null}
        </Card>
      </Col>
    );
  }
}

export default TabItem;
