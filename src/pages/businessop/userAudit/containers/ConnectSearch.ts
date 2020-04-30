import { connect } from "react-redux";
import { AppState } from "../../../../types";
import { changeSearchData, getList } from "../store/action";
import Search from "../components/Search";

const mapStateToProps = (state: AppState) => {
  const { checkerList, isLoading } = state.get("userChecker");
  return { checkerList, isLoading };
};

const mapDispatchToProps = (dispatch: Function) => ({
  changeSearchData,
  getList: () => dispatch(getList())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
