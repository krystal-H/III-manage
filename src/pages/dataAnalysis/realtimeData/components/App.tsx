import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import ConnectHead from "../containers/ConnectHead";
import Content from "./Content";
// import { AppState } from "../store/types";
import { init } from "../store/action";

import "../../css/index.less";

interface AppProps {
  init: Function;
}

class App extends Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
    props.init();
  }
  render(): JSX.Element {
    return (
      <Fragment>
        <ConnectHead />
        <Content />
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch: Function) => ({
  init: () => dispatch(init())
});

export default connect(undefined, mapDispatchToProps)(App);
