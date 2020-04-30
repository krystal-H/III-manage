import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Breadcrumb } from "antd";
import { routes } from "../../../routes/routes";

let routerMaps = {
  "/home": "欢迎页"
};
const getRealPath = path => path.replace(/\/:.*$/g, "");
const setFunc = ({ name, path, routes }) => {
  routerMaps[getRealPath(path)] = name;
  try {
    if (routes && routes.length > 0) {
      routes.forEach(setFunc);
    }
  } catch (e) {}
};
routes.forEach(setFunc);

@withRouter
class Bread extends Component {
  constructor(props) {
    super(props);
    props.history.listen(this.listen);
  }
  canSetState = false; // 一开始不允许设置state
  state = {
    lists: []
  };
  componentDidMount() {
    this.canSetState = true;
    this.listen(this.props.history.location);
  }
  componentWillUnmount() {
    this.canSetState = false;
  }
  listen = ({ pathname }) => {
    // "/dataAnalysis/eventAnalysis"
    if (!this.canSetState) return;
    const rst = getRealPath(pathname).match(/\/[\d\w]+/g);
    let lists = [];
    if (rst && rst.length > 0) {
      const one = rst[0],
        two = one + rst[1],
        three = two + rst[2];
      if (one && routerMaps[one]) {
        lists.push(routerMaps[one]);
      }
      if (rst[1] && routerMaps[two]) {
        lists.push(routerMaps[two]);
      }
      if (rst[2] && routerMaps[three]) {
        lists.push(routerMaps[three]);
      }
    }
    this.setState({ lists });
  };
  render() {
    return (
      <Breadcrumb style={{ padding: "16px 0" }}>
        {this.state.lists.map((d, i) => (
          <Breadcrumb.Item key={i}>{d}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
    );
  }
}

export default Bread;
