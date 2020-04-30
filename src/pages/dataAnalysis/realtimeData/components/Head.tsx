import React, { Component } from "react";
import { Card } from "antd";
import TopSearch from "../../comm/TopSearch";

interface HeadProps {
  isLoading: boolean;
  addSearchData: Function;
  getData: Function;
}

class Head extends Component<HeadProps> {
  onSearch = (data: object) => {
    const { addSearchData, getData } = this.props;
    addSearchData(data);
    getData();
  };
  public render(): JSX.Element {
    const { isLoading } = this.props;
    return (
      <>
        <Card className="page-card-small">
          <TopSearch
            loading={isLoading}
            onInit={this.onSearch}
            onSearch={this.onSearch}
          />
        </Card>
        <div className="page-interval" />
      </>
    );
  }
}

export default Head;
