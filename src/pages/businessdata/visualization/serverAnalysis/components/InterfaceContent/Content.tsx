import React, { Component } from "react";
import { Empty, Result, Button } from "antd";
import { serverDataObjProps } from "../../store/types";
import { toThousands } from "../../../../../dataAnalysis/util/tools";

interface ContentProps {
  isLoading: boolean;
  isError: boolean;
  title: string;
  list: serverDataObjProps;
  tryAgain: Function;
  isUseMB?: boolean;
}

class Content extends Component<ContentProps> {
  tryAgain = () => {
    this.props.tryAgain();
  };
  toMb = (num: number) => {
    return Math.max(+(num / 1024 / 1024).toFixed(4), 0.0001);
  };
  render() {
    const {
      list: { app, service },
      isUseMB,
      title,
      isLoading,
      isError
    } = this.props;
    let topTenList = app.slice(0, 10),
      topTenList2 = service.slice(0, 10),
      dist = 10 - topTenList.length,
      dist2 = 10 - topTenList2.length;
    if (dist > 0) {
      topTenList = topTenList.concat(
        new Array(dist).fill({ name: "", count: "" })
      );
    }
    if (dist2 > 0) {
      topTenList2 = topTenList2.concat(
        new Array(dist2).fill({ name: "", count: "" })
      );
    }
    // 如果是Byte单位，则需要转化成MB单位
    if (isUseMB) {
      topTenList = topTenList.map(d => ({
        ...d,
        count: d.count ? this.toMb(+d.count) : d.count
      }));
      topTenList2 = topTenList2.map(d => ({
        ...d,
        count: d.count ? this.toMb(+d.count) : d.count
      }));
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
    if (!isLoading && app.length === 0 && service.length === 0) {
      return (
        <div className="page-null-wrap">
          <Empty className="page-null-inner" />
        </div>
      );
    }

    return (
      <div className="page-analysis-con">
        <div className="page-analysis-con-mid">
          <div className="page-analysis-list">
            <div className="page-analysis-listItem">
              <div className="page-analysis-listItem-kbd">TOP10appid</div>
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
        <div className="page-analysis-con-mid">
          <div className="page-analysis-list">
            <div className="page-analysis-listItem">
              <div className="page-analysis-listItem-kbd">TOP10服务名称</div>
              <div className="page-analysis-listItem-kbd">{title}</div>
            </div>
            {topTenList2.map(({ name, count }, i) => (
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
      </div>
    );
  }
}

export default Content;
