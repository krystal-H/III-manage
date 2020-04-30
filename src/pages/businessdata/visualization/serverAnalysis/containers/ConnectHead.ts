import { connect } from "react-redux";
import { getHeadData } from "../store/action";
import Head from "../components/Head";
import { AppState } from "../../../../../types";

const mapStateToProps = (state: AppState) => {
  const { headData } = state.get("visualization").serverAnalysis;
  return { headData };
};

const mapDispatchToProps = (dispatch: Function) => ({
  getHeadData: () => dispatch(getHeadData())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Head);
