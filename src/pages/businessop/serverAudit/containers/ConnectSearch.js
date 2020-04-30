import { connect } from "react-redux";
import { changeSearchData, getList } from "../store/action";
import Search from "../components/Search";

const mapStateToProps = (state, ownProps) => {
  const { serverTypeList, checkerList, isLoading } = state.get("serverChecker");
  return { serverTypeList, checkerList, isLoading };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeSearchData,
  getList: () => dispatch(getList())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
