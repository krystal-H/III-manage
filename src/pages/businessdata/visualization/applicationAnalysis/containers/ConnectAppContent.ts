import { connect } from "react-redux";
import { getTabDataForApplication, changeSearchData } from "../store/action";
import AppContent from "../components/AppContent";
import { AppState } from "../../../../../types";

const mapStateToProps = (state: AppState) => {
  const { application } = state.get("visualization").applicationAnalysis;
  return { application };
};

const mapDispatchToProps = (dispatch: Function) => ({
  getTabDataForApplication: () => dispatch(getTabDataForApplication()),
  changeSearchData
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContent);
