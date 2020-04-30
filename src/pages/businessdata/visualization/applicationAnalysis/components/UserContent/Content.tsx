import React, { Component } from "react";
import CommECharts from "../../../../../../components/CommECharts";
import { Empty, Result, Button } from "antd";
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
              <div className="page-analysis-listItem-kbd">TOP10web站点名称</div>
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
