import { connect } from "react-redux";
import { AppState } from "../store/types";
// import { tab } from "../store/action";
import Tabs from "../components/Content/Tabs";

const mapStateToProps = (state: AppState) => {
  const { tab, total } = state.get("dataAnalysis").realtimeData;
  return { tab, total };
};

// const mapDispatchToProps = (dispatch: Function) => ({
//   onTab: (tabName: TabMap) => dispatch(tab(tabName))
// });

export default connect(mapStateToProps)(Tabs);
