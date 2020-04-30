import { connect } from "react-redux";
import { changeSearchData, getTabDataForServer } from "../store/action";
import InterfaceContent from "../components/InterfaceContent";
import { AppState } from "../../../../../types";

const mapStateToProps = (state: AppState) => {
  const { server } = state.get("visualization").serverAnalysis;
  return { server };
};

const mapDispatchToProps = (dispatch: Function) => ({
  getTabDataForServer: () => dispatch(getTabDataForServer()),
  changeSearchData
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InterfaceContent);
