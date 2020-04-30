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
    keepUsers: { isLoading: isLoading4 }
  } = state.get("dataAnalysis").realtimeData;
  return {
    isLoading: isLoading || isLoading1 || isLoading2 || isLoading3 || isLoading4
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  addSearchData,
  getData: (onlyCount?: boolean) => dispatch(getData(onlyCount))
});

export default connect(mapStateToProps, mapDispatchToProps)(Head);
