import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Head from "./Head";
import Content from "./Content";
import { init } from "../store/action";
import ConnectDetailModal from "../containers/ConnectDetailModal";

import "./index.less";

class App extends Component {
  constructor(props) {
    super(props);
    props.init(); //初始化
  }
  render() {
    return (
      <Fragment>
        <Head />
        <Content />

        <ConnectDetailModal />
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
