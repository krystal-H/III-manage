import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Head from "./Head";
import ConnectContent from "../containers/ConnectContent";
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
        <Head />
        <ConnectContent />
      </Fragment>
    );
  }
}

// const mapStateToProps = (state: AppState) => {
//   const {
//     allAppList,
//     eventAnalysis: { isLoading }
//   } = state.get("dataAnalysis");
//   return {
//     allAppList
//   };
// };

const mapDispatchToProps = (dispatch: Function) => ({
  init: () => dispatch(init())
});

export default connect(undefined, mapDispatchToProps)(App);
