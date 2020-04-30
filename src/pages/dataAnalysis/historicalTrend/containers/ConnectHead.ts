import { connect } from "react-redux";
import { AppState } from "../store/types";
import { addSearchData, getData } from "../store/action";
import Head from "../components/Head";

const mapStateToProps = (state: AppState) => {
  const {
    isLoading,
    newUsers: { isLoading: isLoading1 },
    activeUsers: { isLoading: isLoading2 },
    startUsers: { isLoading: isLoading3 },
    keepUsersForNew: { isLoading: isLoading4 },
    keepUsersForActive: { isLoading: isLoading5 },
    timeForPerPerson: { isLoading: isLoading6 },
    crash: { isLoading: isLoading7 }
  } = state.get("dataAnalysis").historicalTrend;
  return {
    isLoading:
      isLoading ||
      isLoading1 ||
      isLoading2 ||
      isLoading3 ||
      isLoading4 ||
      isLoading5 ||
      isLoading6 ||
      isLoading7
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  addSearchData,
  getData: (onlyCount?: boolean) => dispatch(getData(onlyCount))
});

export default connect(mapStateToProps, mapDispatchToProps)(Head);
