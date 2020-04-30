import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { init } from "../store/action";
import ConnectHead from "../containers/ConnectHead";
import ConnectInterfaceContent from "../containers/ConnectInterfaceContent";
import ConnectMessageContent from "../containers/ConnectMessageContent";

import "./index.less";

interface AppProps {
  init: Function;
}

class App extends Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
    props.init(); //初始化
  }
  render() {
    return (
      <Fragment>
        <ConnectHead />
        <div className="page-interval" />
        <ConnectInterfaceContent />
        <div className="page-interval" />
        <ConnectMessageContent />
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
