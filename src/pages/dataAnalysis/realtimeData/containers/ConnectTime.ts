import { connect } from "react-redux";
import { AppState } from "../store/types";
// import { addSearchData, getData } from "../store/action";
import Time from "../components/Content/Time";

const mapStateToProps = (state: AppState) => {
  const { updateTime } = state.get("dataAnalysis").realtimeData;
  return { updateTime };
};

// const mapDispatchToProps = (dispatch: Function) => ({
//   addSearchData,
//   getData: () => dispatch(getData())
// });

export default connect(mapStateToProps)(Time);
