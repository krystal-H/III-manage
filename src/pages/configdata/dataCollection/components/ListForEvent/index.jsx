import React, { Component, Fragment } from "react";
import { Button, Icon } from "antd";
import ConnectSearchForEvent from "../../containers/ConnectSearchForEvent";
import ConnectTableForEvent from "../../containers/ConnectTableForEvent";
import ConnectAddModalForEvent from "../../containers/ConnectAddModalForEvent";

class ListForEvent extends Component {
  // openAddModal = () => {
  //   this.props.openAddModalForEvent();
  // };
  render() {
    return (
      <Fragment>
        {/* <Button type="primary" onClick={this.openAddModal}>
          <Icon type="plus" />
          新建事件
        </Button>
        <div className="page-interval" /> */}
        <ConnectSearchForEvent />
        <div className="page-interval" />
        <ConnectTableForEvent />

        <ConnectAddModalForEvent />
      </Fragment>
    );
  }
}

export default ListForEvent;
