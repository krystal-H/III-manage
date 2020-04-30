import React, { Component, Fragment } from "react";
import { Row, Col, Button, Statistic, Icon, ConfigProvider } from "antd";
import { toThousands } from "../../../../dataAnalysis/util/tools";

interface dataProps {
  day1Count?: number | string;
  day7Count?: number | string;
}

interface HeadItemProps {
  isLoading: boolean;
  isError: boolean;
  data: dataProps;
  tryAgain: Function;
}

class HeadItem extends Component<HeadItemProps> {
  smallSty = { padding: 0 };
  loadingSty = { fontSize: "16px", color: "#1890ff" };
  title = (
    <Fragment>
      <Icon type="clock-circle" theme="twoTone" />
      <span className="page-ml">昨日</span>
    </Fragment>
  );
  title2 = (
    <Fragment>
      <Icon type="database" theme="twoTone" />
      <span className="page-ml">前七天</span>
    </Fragment>
  );
  loadingCom = (<Icon type="sync" spin style={this.loadingSty} />);
  getValueNode = (
    value: string | number,
    isLoading: boolean,
    isError: boolean
  ) => {
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
    return isLoading ? null : toThousands(value);
  };
  tryAgain = () => {
    this.props.tryAgain();
  };
  render() {
    const { title, title2, loadingCom, getValueNode, props } = this;
    const {
      isLoading,
      isError,
      data: { day1Count, day7Count }
    } = props;

    return (
      <Row gutter={16}>
        <Col span={12}>
          <Statistic
            title={title}
            prefix={isLoading ? loadingCom : null}
            value={day1Count}
            formatter={value => getValueNode(value, isLoading, isError)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title={title2}
            value={day7Count}
            prefix={isLoading ? loadingCom : null}
            formatter={value => getValueNode(value, isLoading, isError)}
          />
        </Col>
      </Row>
    );
  }
}

export default HeadItem;
