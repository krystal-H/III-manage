import { connect } from "react-redux";
import { closeAddModalForEvent, addEvent, updateEvent } from "../store/action";
import AddModal from "../components/ListForEvent/AddModal";

const mapStateToProps = (state, ownProps) => {
  const {
    showAddModalForEvent,
    isSavingForEvent,
    allList,
    isUpdatingForEvent,
    detailData
  } = state.get("dataCollection");
  return {
    showAddModalForEvent,
    isSavingForEvent,
    allList,
    isUpdatingForEvent,
    detailData
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  closeAddModalForEvent: () => dispatch(closeAddModalForEvent()),
  addEvent: data => dispatch(addEvent(data)),
  updateEvent: data => dispatch(updateEvent(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddModal);
