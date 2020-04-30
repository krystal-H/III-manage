import { connect } from "react-redux";
// import { openAddModalForAPP } from "../store/action";
import ListForAPP from "../components/ListForAPP";

// const mapStateToProps = (state, ownProps) => {
//   const { showAddModalForAPP } = state.get("dataCollection");
//   return { showAddModalForAPP };
// };

const mapDispatchToProps = (dispatch, ownProps) => ({
  // openAddModalForAPP: () => dispatch(openAddModalForAPP())
});

export default connect(
  undefined,
  mapDispatchToProps
)(ListForAPP);
