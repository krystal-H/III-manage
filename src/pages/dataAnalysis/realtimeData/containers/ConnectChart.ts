import { connect } from "react-redux";
import { AppState, TabMap } from "../store/types";
import { getList } from "../store/action";
import Chart from "../components/Content/Chart";

const mapStateToProps = (state: AppState) => {
  const { tab, newUsers, activeUsers, startUsers, keepUsers } = state.get(
    "dataAnalysis"
  ).realtimeData;
  return { tab, newUsers, activeUsers, startUsers, keepUsers };
};

const mapDispatchToProps = (dispatch: Function) => ({
  getList: (tab?: TabMap) => dispatch(getList(tab))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
