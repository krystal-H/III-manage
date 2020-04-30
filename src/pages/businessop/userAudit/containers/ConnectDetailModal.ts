import { connect } from "react-redux";
import { AppState } from "../../../../types";
import { closeModal, checkForUser } from "../store/action";
import DetailModal from "../components/DetailModal";

const mapStateToProps = (state: AppState) => {
  const { showDetailModal, detailData, isSaving } = state.get("userChecker");
  return { showDetailModal, detailData, isSaving };
};

const mapDispatchToProps = (dispatch: Function) => ({
  closeModal: () => dispatch(closeModal()),
  checkForUser: (data: object) => dispatch(checkForUser(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailModal);
