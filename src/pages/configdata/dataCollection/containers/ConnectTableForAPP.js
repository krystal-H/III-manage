import { connect } from "react-redux";
import {
  refreshToken,
  deleteAPP,
  changeSearchDataForAPP,
  getListForAPP
} from "../store/action";
import Table from "../components/ListForAPP/Table";

const mapStateToProps = (state, ownProps) => {
  const { listForAPP, isLoadingForAPP, isErrorForAPP } = state.get(
    "dataCollection"
  );
  return { listForAPP, isLoadingForAPP, isErrorForAPP };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  refreshToken: data => dispatch(refreshToken(data)),
  deleteAPP: (data, isPageIndexPrev, pageIndex) =>
    dispatch(deleteAPP(data, isPageIndexPrev, pageIndex)),
  changeSearchDataForAPP,
  getListForAPP: () => dispatch(getListForAPP())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
