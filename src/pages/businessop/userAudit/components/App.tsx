import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Head from "./Head";
import { Card } from "antd";
import ConnectTable from "../containers/ConnectTable";
import { init, getDetailAndOpenModal } from "../store/action";
import ConnectDetailModal from "../containers/ConnectDetailModal";
import { JSTool } from "../../../../util/utils";

import "./index.less";

interface AppProps {
  init: Function;
  location: any;
  getDetailAndOpenModal: Function;
}
interface paramProps {
  id: any;
  [props: string]: any;
}

class App extends Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
    props.init(); //初始化
  }
  componentDidMount() {
    const { id = null } =
      (JSTool.getHrefParams(this.props.location.search) as paramProps) || {};
    if (id) {
      this.props.getDetailAndOpenModal({ id });
    }
  }
  render(): JSX.Element {
    return (
      <Fragment>
        <Head />
        <Card>
          <ConnectTable />
        </Card>

        <ConnectDetailModal />
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch: Function): object => ({
  init: () => dispatch(init()),
  getDetailAndOpenModal: (d: object) => dispatch(getDetailAndOpenModal(d))
});

export default connect(undefined, mapDispatchToProps)(App);
