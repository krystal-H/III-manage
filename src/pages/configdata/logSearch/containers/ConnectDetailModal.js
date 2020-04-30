import { connect } from "react-redux";
import { closeModal } from "../store/action";
import DetailModal from "../components/DetailModal";

const mapStateToProps = (state, ownProps) => {
  const {
    allListMap,
    logSearch: { showDetailModal, detailData }
  } = state.get("dataCollection");
  return { allListMap, showDetailModal, detailData };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  closeModal: () => dispatch(closeModal())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailModal);
