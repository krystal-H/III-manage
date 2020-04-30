import { connect } from "react-redux";
import { closeAddModalForAPP, addApp } from "../store/action";
import AddModal from "../components/ListForAPP/AddModal";

const mapStateToProps = (state, ownProps) => {
  const {
    showAddModalForAPP,
    isAddingForAPP,
    openAppList,
    openMiniList,
    webAppList
  } = state.get("dataCollection");
  return {
    showAddModalForAPP,
    isAddingForAPP,
    openAppList,
    openMiniList,
    webAppList
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  closeAddModalForAPP: () => dispatch(closeAddModalForAPP()),
  addApp: data => dispatch(addApp(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddModal);
