import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Head from "./Head";
import Content from "./Content";
import { init, getDetailAndOpenModal } from "../store/action";
import ConnectDetailModal from "../containers/ConnectDetailModal";
// import { JSTool } from "../../../../util/utils";

import "./index.less";

class App extends Component {
  constructor(props) {
    super(props);
    props.init(); //初始化
  }
  // componentDidMount() {
  //   const { id, productId, typeId } =
  //     JSTool.getHrefParams(this.props.location.search) || {};
  //   if (id && productId && typeId) {
  //     this.props.getDetailAndOpenModal({ id, productId, typeId });
  //   }
  // }
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
  init: () => dispatch(init()),
  getDetailAndOpenModal: d => dispatch(getDetailAndOpenModal(d))
});

export default connect(undefined, mapDispatchToProps)(App);
