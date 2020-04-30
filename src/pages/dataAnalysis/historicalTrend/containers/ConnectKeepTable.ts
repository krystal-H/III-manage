import { connect } from "react-redux";
import { AppState, KeepTabMap } from "../store/types";
import { keepTab, keepSetPage } from "../store/action";
import KeepTable from "../components/Content/KeepTable";

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
  keepTab: (tab: KeepTabMap) => dispatch(keepTab(tab)),
  keepSetPage: (pageIndex: number) => dispatch(keepSetPage(pageIndex))
});

export default connect(mapStateToProps, mapDispatchToProps)(KeepTable);
