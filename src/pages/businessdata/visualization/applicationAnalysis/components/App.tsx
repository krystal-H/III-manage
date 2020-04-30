import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { init } from "../store/action";
import ConnectHead from "../containers/ConnectHead";
import ConnectUserContent from "../containers/ConnectUserContent";
import ConnectAppContent from "../containers/ConnectAppContent";
import ConnectDeviceContent from "../containers/ConnectDeviceContent";

import "./index.less";

interface AppProps {
  init: Function;
}

class App extends Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
    props.init(); //初始化
  }
  hSty = { height: "36px" };
  render() {
    return (
      <Fragment>
        <ConnectHead />
        <div className="page-interval" style={this.hSty} />
        <ConnectUserContent />
        <div className="page-interval" />
        <ConnectAppContent />
        <div className="page-interval" />
        <ConnectDeviceContent />
        <div className="page-interval" />
      </Fragment>
    );
  }
}

// const mapStateToProps = (state, ownProps) => {
//   const { provinceList, isLoadingProvince } = state.get("visualization");
//   return { provinceList, isLoadingProvince };
// };

const mapDispatchToProps = (dispatch: Function) => ({
  init: () => dispatch(init())
});

export default connect(
  undefined,
  mapDispatchToProps
)(App);
