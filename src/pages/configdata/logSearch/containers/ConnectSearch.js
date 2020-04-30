import { connect } from "react-redux";
import { changeSearchData, getList } from "../store/action";
import Search from "../components/Search";

const mapStateToProps = (state, ownProps) => {
  const {
    allList,
    logSearch: { isLoading }
  } = state.get("dataCollection");
  return { allList, isLoading };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeSearchData,
  getList: () => dispatch(getList())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
