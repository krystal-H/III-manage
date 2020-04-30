import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import ConnectHead from "../containers/ConnectHead";
import ConnectContent from "../containers/ConnectContent";
import { init } from "../store/action";

import "./index.less";

class App extends Component {
  constructor(props) {
    super(props);
    props.init(); //初始化
  }
  render() {
    return (
      <Fragment>
        <ConnectHead />
        <ConnectContent />
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  init: () => dispatch(init())
});

export default connect(
  undefined,
  mapDispatchToProps
)(App);
