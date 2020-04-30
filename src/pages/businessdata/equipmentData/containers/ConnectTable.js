import { connect } from "react-redux";
import { changeSearchData, getList, download } from "../store/action";
import Table from "../components/Table";

const mapStateToProps = (state, ownProps) => {
  const { list, pager, isLoading, isError } = state.get("equipmentData");
  return { list, pager, isLoading, isError };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeSearchData,
  getList: () => dispatch(getList()),
  download
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
