import { connect } from "react-redux";
import { AppState, TabMap } from "../store/types";
import { setPage, toggleTableList, getList } from "../store/action";
import Table from "../components/Content/Table";

const mapStateToProps = (state: AppState) => {
  const {
    isShowTableList,
    pageIndex,
    newUsers,
    activeUsers,
    startUsers,
    keepUsersForNew,
    keepUsersForActive,
    timeForPerPerson,
    crash
  } = state.get("dataAnalysis").historicalTrend;
  return {
    isShowTableList,
    pageIndex,
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
  toggleTableList: () => dispatch(toggleTableList()),
  setPage: (pageIndex: number) => dispatch(setPage(pageIndex)),
  getList: (tab?: TabMap) => dispatch(getList(tab))
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
