import { connect } from "react-redux";
import { AppState } from "../../../../types";
import {
  changeSearchData,
  getList,
  getDetailAndOpenModal
} from "../store/action";
import Table from "../components/Table";

const mapStateToProps = (state: AppState) => {
  const { checkerMap, list, pager, isLoading, isError } = state.get(
    "userChecker"
  );
  return { checkerMap, list, pager, isLoading, isError };
};

const mapDispatchToProps = (dispatch: Function) => ({
  changeSearchData,
  getList: () => dispatch(getList()),
  getDetailAndOpenModal: (data: object) => dispatch(getDetailAndOpenModal(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
