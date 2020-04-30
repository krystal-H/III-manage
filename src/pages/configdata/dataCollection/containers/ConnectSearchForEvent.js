import { connect } from "react-redux";
import {
  changeSearchDataForEvent,
  getListForEvent,
  setNeedResetSearchData
} from "../store/action";
import Search from "../components/ListForEvent/Search";

const mapStateToProps = (state, ownProps) => {
  const {
    isLoadingForEvent,
    allList,
    menuName,
    needResetSearchData,
    searchDataForEvent
  } = state.get("dataCollection");
  return {
    isLoadingForEvent,
    allList,
    menuName,
    needResetSearchData,
    searchDataForEvent
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeSearchDataForEvent,
  getListForEvent: () => dispatch(getListForEvent()),
  setNeedResetSearchData: bool => dispatch(setNeedResetSearchData(bool))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
