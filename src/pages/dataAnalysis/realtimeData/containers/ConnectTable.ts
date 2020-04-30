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
    keepUsers
  } = state.get("dataAnalysis").realtimeData;
  return {
    isShowTableList,
    pageIndex,
    newUsers,
    activeUsers,
    startUsers,
    keepUsers
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  toggleTableList: () => dispatch(toggleTableList()),
  setPage: (pageIndex: number) => dispatch(setPage(pageIndex)),
  getList: (tab?: TabMap) => dispatch(getList(tab))
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
