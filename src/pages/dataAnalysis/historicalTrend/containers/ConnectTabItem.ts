import { connect } from "react-redux";
import { AppState, TabMap } from "../store/types";
import { tab, getData } from "../store/action";
import TabItem from "../components/Content/TabItem";

const mapStateToProps = (state: AppState) => {
  const { isLoading, isError } = state.get("dataAnalysis").historicalTrend;
  return { isLoading, isError };
};

const mapDispatchToProps = (dispatch: Function) => ({
  onTab: (tabName: TabMap) => dispatch(tab(tabName)),
  getData: (onlyCount?: boolean) => dispatch(getData(onlyCount))
});

export default connect(mapStateToProps, mapDispatchToProps)(TabItem);
