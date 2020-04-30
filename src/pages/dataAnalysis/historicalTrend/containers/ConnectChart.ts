import { connect } from "react-redux";
import { AppState, TabMap } from "../store/types";
import { getList } from "../store/action";
import Chart from "../components/Content/Chart";

const mapStateToProps = (state: AppState) => {
  const {
    tab,
    newUsers,
    activeUsers,
    startUsers,
    keepUsersForNew,
    keepUsersForActive,
    timeForPerPerson,
    crash
  } = state.get("dataAnalysis").historicalTrend;
  return {
    tab,
    newUsers,
    activeUsers,
    startUsers,
    keepUsersForNew,
    keepUsersForActive,
    timeForPerPerson,
    crash
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  getList: (tab?: TabMap) => dispatch(getList(tab))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
