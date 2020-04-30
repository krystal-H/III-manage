import React, { Component } from "react";
import CommECharts from "../../../../../../components/CommECharts";
import { Empty, Result, Button, Icon, Card, Statistic } from "antd";
import { listItemProps } from "../../store/types";
import { createBarOption } from "../../../util/createECharts";
import { toThousands } from "../../../../../dataAnalysis/util/tools";

interface ContentProps {
  isLoading: boolean;
  isError: boolean;
  title: string;
  list: listItemProps[];
  tryAgain: Function;
}

class Content extends Component<ContentProps> {
  loadingSty = { fontSize: "16px", color: "#1890ff" };
  loadingCom = (<Icon type="sync" spin style={this.loadingSty} />);
  tryAgain = () => {
    this.props.tryAgain();
  };
  render() {
    const { list, title, isLoading, isError } = this.props;
    let topTenList = list.slice(0, 10),
      dist = 10 - topTenList.length;
    if (dist > 0) {
      topTenList = topTenList.concat(
        new Array(dist).fill({ name: "", count: "" })
      );
    }
    if (isError) {
      return (
        <div className="page-null-wrap">
          <Result
            className="page-null-inner"
            status="error"
            title="查询失败"
            subTitle="请确认网络连接是否正常."
            extra={
              <Button type="primary" onClick={this.tryAgain}>
                重 试
              </Button>
            }
          />
        </div>
      );
    }
    if (title === "创建产品数") {
      return (
        <div className="page-analysis-con">
          <div className="page-analysis-con-left">
            <Card className="page-analysis-col">
              <Statistic
                title={title}
                prefix={isLoading ? this.loadingCom : null}
                value={topTenList[0] ? topTenList[0].count || 0 : 0}
                formatter={value => (isLoading ? null : value)}
              />
            </Card>
          </div>
          <div className="page-analysis-con-right"></div>
        </div>
      );
    }
    if (!isLoading && list.length === 0) {
      return (
        <div className="page-null-wrap">
          <Empty className="page-null-inner" />
        </div>
      );
    }
    return (
      <div className="page-analysis-con">
        <div className="page-analysis-con-left">
          <div className="page-analysis-list">
            <div className="page-analysis-listItem">
              <div className="page-analysis-listItem-kbd">TOP10产品名称</div>
              <div className="page-analysis-listItem-kbd">{title}</div>
            </div>
            {topTenList.map(({ name, count }, i) => (
              <div className="page-analysis-listItem" key={i}>
                <div className="page-analysis-listItem-kbd">
                  {isLoading ? <span className="page-loading" /> : name}
                </div>
                <div className="page-analysis-listItem-kbd">
                  {isLoading ? (
                    <span className="page-loading" />
                  ) : (
                    toThousands(count)
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="page-analysis-con-right">
          <CommECharts
            className="page-analysis-echarts"
            option={createBarOption(list)}
          />
        </div>
      </div>
    );
  }
}

export default Content;
