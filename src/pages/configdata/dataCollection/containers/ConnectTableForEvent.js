import { connect } from "react-redux";
import {
  disableEvent,
  deleteEvent,
  changeSearchDataForEvent,
  getListForEvent,
  openUpdateModalForEvent
} from "../store/action";
import Table from "../components/ListForEvent/Table";

const mapStateToProps = (state, ownProps) => {
  const { listForEvent, isLoadingForEvent, isErrorForEvent } = state.get(
    "dataCollection"
  );
  return { listForEvent, isLoadingForEvent, isErrorForEvent };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  disableEvent: data => dispatch(disableEvent(data)),
  deleteEvent: (data, isPageIndexPrev, pageIndex) =>
    dispatch(deleteEvent(data, isPageIndexPrev, pageIndex)),
  changeSearchDataForEvent,
  getListForEvent: () => dispatch(getListForEvent()),
  openUpdateModalForEvent: data => dispatch(openUpdateModalForEvent(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
