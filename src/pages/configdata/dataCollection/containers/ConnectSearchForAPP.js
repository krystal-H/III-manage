import { connect } from "react-redux";
import {
  changeSearchDataForAPP,
  getListForAPP,
  setNeedResetSearchData
} from "../store/action";
import Search from "../components/ListForAPP/Search";

const mapStateToProps = (state, ownProps) => {
  const {
    isLoadingForAPP,
    menuName,
    needResetSearchData,
    searchDataForAPP
  } = state.get("dataCollection");
  return { isLoadingForAPP, menuName, needResetSearchData, searchDataForAPP };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeSearchDataForAPP,
  getListForAPP: () => dispatch(getListForAPP()),
  setNeedResetSearchData: bool => dispatch(setNeedResetSearchData(bool))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
