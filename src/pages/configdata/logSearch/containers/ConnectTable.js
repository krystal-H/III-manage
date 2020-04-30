import { connect } from "react-redux";
import { changeSearchData, getList, openModal } from "../store/action";
import Table from "../components/Table";

const mapStateToProps = (state, ownProps) => {
  const {
    allListMap,
    logSearch: { list, pager, isLoading, isError }
  } = state.get("dataCollection");
  return { allListMap, list, pager, isLoading, isError };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeSearchData,
  getList: () => dispatch(getList()),
  openModal: data => dispatch(openModal(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
