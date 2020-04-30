import { connect } from "react-redux";
import {
  changeSearchData,
  getList,
  getDetailAndOpenModal
} from "../store/action";
import Table from "../components/Table";

const mapStateToProps = (state, ownProps) => {
  const {
    serverTypeMap,
    checkerMap,
    list,
    pager,
    isLoading,
    isError
  } = state.get("sceneChecker");
  return { serverTypeMap, checkerMap, list, pager, isLoading, isError };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeSearchData,
  getList: () => dispatch(getList()),
  getDetailAndOpenModal: data => dispatch(getDetailAndOpenModal(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
