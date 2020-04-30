import { connect } from "react-redux";
// import { openAddModalForEvent } from "../store/action";
import ListForEvent from "../components/ListForEvent";

// const mapStateToProps = (state, ownProps) => {
//   const { showAddModalForEvent } = state.get("dataCollection");
//   return { showAddModalForEvent };
// };

const mapDispatchToProps = (dispatch, ownProps) => ({
  // openAddModalForEvent: () => dispatch(openAddModalForEvent())
});

export default connect(
  undefined,
  mapDispatchToProps
)(ListForEvent);
