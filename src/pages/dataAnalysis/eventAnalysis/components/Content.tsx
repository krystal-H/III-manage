import React, { Component } from "react";
import { Card, Button } from "antd";
import Chart from "./Chart";

interface ContentProps {
  getData: Function;
  download: Function;
  isLoading: boolean;
  isError: boolean;
  dataObject: any;
  listObj: any;
}

class Content extends Component<ContentProps> {
  tryAgain = () => {
    this.props.getData();
  };
  download = () => {
    this.props.download();
  };
  public render(): JSX.Element | null {
    const { isLoading, isError, dataObject, listObj } = this.props;
    if (!isLoading && !isError && dataObject === null && listObj === null) {
      return null;
    }
    const { timeString = "" } = dataObject || {};
    const title = "趋势图（" + timeString + "）";
    let downloadBtn =
      !isLoading && !isError && listObj !== null ? (
        <Button
          icon="download"
          type="link"
          className="page-btn-link"
          onClick={this.download}
        >
          导出CSV
        </Button>
      ) : null;
    return (
      <Card
        className="page-card-small"
        type="inner"
        title={title}
        extra={downloadBtn}
      >
        <Chart
          tryAgain={this.tryAgain}
          isLoading={isLoading}
          isError={isError}
          listObj={listObj}
        />
      </Card>
    );
  }
}

export default Content;
