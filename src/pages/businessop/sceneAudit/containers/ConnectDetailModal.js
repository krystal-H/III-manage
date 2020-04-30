import { connect } from "react-redux";
import { closeModal, checkForAPP } from "../store/action";
import DetailModal from "../components/DetailModal";

const mapStateToProps = (state, ownProps) => {
  const {
    showDetailModal,
    serverTypeMap,
    sceneType,
    detailData,
    isSaving
  } = state.get("sceneChecker");
  return { showDetailModal, serverTypeMap, sceneType, detailData, isSaving };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  closeModal: () => dispatch(closeModal()),
  checkForAPP: data => dispatch(checkForAPP(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailModal);
