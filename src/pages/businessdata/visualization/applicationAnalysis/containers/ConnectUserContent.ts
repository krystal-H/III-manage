import { connect } from "react-redux";
import { getTabDataForUser, changeSearchData } from "../store/action";
import UserContent from "../components/UserContent";
import { AppState } from "../../../../../types";

const mapStateToProps = (state: AppState) => {
  const { user } = state.get("visualization").applicationAnalysis;
  return { user };
};

const mapDispatchToProps = (dispatch: Function) => ({
  getTabDataForUser: () => dispatch(getTabDataForUser()),
  changeSearchData
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContent);
