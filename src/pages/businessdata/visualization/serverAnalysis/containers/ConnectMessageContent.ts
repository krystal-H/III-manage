import { connect } from "react-redux";
import { changeSearchData, getTabDataForMessage } from "../store/action";
import MessageContent from "../components/MessageContent";
import { AppState } from "../../../../../types";

const mapStateToProps = (state: AppState) => {
  const { message } = state.get("visualization").serverAnalysis;
  return { message };
};

const mapDispatchToProps = (dispatch: Function) => ({
  getTabDataForMessage: () => dispatch(getTabDataForMessage()),
  changeSearchData
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageContent);
