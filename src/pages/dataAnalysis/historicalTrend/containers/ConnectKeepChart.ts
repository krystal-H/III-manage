import { connect } from "react-redux";
import { AppState, KeepChartTabMap, TabMap } from "../store/types";
import { keepChartTab, getList } from "../store/action";
import KeepChart from "../components/Content/KeepChart";

const mapStateToProps = (state: AppState) => {
  const { tab, keepDetailForNew, keepDetailForActive } = state.get(
    "dataAnalysis"
  ).historicalTrend;
  return {
    tab,
    keepDetailForNew,
    keepDetailForActive
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  getList: (tab?: TabMap) => dispatch(getList(tab)),
  keepChartTab: (tab: KeepChartTabMap) => dispatch(keepChartTab(tab))
});

export default connect(mapStateToProps, mapDispatchToProps)(KeepChart);
