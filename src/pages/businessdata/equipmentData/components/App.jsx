import React, { Component } from "react";
import { connect } from "react-redux";
import Head from "./Head";
import Content from "./Content";
import { init } from "../store/action";

import "./index.less";

class App extends Component {
  constructor(props) {
    super(props);
    props.init(); //初始化
  }
  render() {
    return (
      <>
        <Head />
        <Content />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  init: () => dispatch(init())
});

export default connect(undefined, mapDispatchToProps)(App);
