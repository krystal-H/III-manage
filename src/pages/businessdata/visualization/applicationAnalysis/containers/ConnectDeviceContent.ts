import { connect } from "react-redux";
import { getTabDataForDevice, changeSearchData } from "../store/action";
import DeviceContent from "../components/DeviceContent";
import { AppState } from "../../../../../types";

const mapStateToProps = (state: AppState) => {
  const { device } = state.get("visualization").applicationAnalysis;
  return { device };
};

const mapDispatchToProps = (dispatch: Function) => ({
  getTabDataForDevice: () => dispatch(getTabDataForDevice()),
  changeSearchData
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceContent);
