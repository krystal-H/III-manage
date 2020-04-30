import React, { Component, Fragment } from "react";
import { Button, Icon } from "antd";
import ConnectSearchForAPP from "../../containers/ConnectSearchForAPP";
import ConnectTableForAPP from "../../containers/ConnectTableForAPP";
import ConnectAddModalForAPP from "../../containers/ConnectAddModalForAPP";

class ListForAPP extends Component {
  // openAddModal = () => {
  //   this.props.openAddModalForAPP();
  // };
  render() {
    return (
      <Fragment>
        {/* <Button type="primary" onClick={this.openAddModal}>
          <Icon type="plus" />
          新建应用
        </Button>
        <div className="page-interval" /> */}
        <ConnectSearchForAPP />
        <div className="page-interval" />
        <ConnectTableForAPP />

        <ConnectAddModalForAPP />
      </Fragment>
    );
  }
}

export default ListForAPP;
