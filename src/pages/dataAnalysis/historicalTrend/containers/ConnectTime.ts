import { connect } from "react-redux";
import { AppState } from "../store/types";
import { changeTime } from "../store/action";
import Time from "../components/Content/Time";

const mapStateToProps = (state: AppState) => {
  const { start, end } = state.get("dataAnalysis").historicalTrend;
  return { start, end };
};

const mapDispatchToProps = (dispatch: Function) => ({
  changeTime: (start: any, end: any) => dispatch(changeTime(start, end))
});

export default connect(mapStateToProps, mapDispatchToProps)(Time);
