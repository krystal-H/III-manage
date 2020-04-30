import React, { Component, Fragment } from "react";
import { Card, Menu, Button, Icon } from "antd";

class Head extends Component {
  onSelect = e => {
    const { isLoadListForEvent, getListForEvent } = this.props;
    this.props.switchMenu(e.key);
    if (!isLoadListForEvent && e.key === "event") {
      getListForEvent();
    }
  };
  openAddModal = () => {
    const { openAddModalForAPP, openAddModalForEvent, menuName } = this.props;
    if (menuName === "application") {
      openAddModalForAPP();
    } else {
      openAddModalForEvent();
    }
  };
  render() {
    const { menuList, menuName } = this.props;
    return (
      <Fragment>
        <Card>
          <h2 className="page-title">数据采集管理</h2>
          <Menu
            onSelect={this.onSelect}
            selectedKeys={[menuName]}
            mode="horizontal"
          >
            {menuList.map(({ key, value }) => {
              return <Menu.Item key={key}>{value}</Menu.Item>;
            })}
          </Menu>
          <Button
            className="page-menu-addBtn"
            type="primary"
            onClick={this.openAddModal}
          >
            <Icon type="plus" />
            {menuName === "application" ? "新建应用" : "新建事件"}
          </Button>
        </Card>
        <div className="page-interval" />
      </Fragment>
    );
  }
}

export default Head;
