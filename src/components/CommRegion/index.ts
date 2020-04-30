import { connect } from "react-redux";
import {
  getProvinceList,
  getCityList
} from "../../pages/businessdata/visualization/store/action";
import CommRegion from "./CommRegion";
import { AppState } from "../../types";

const mapStateToProps = (state: AppState) => {
  const { provinceList, cityMap } = state.get("visualization");
  return { provinceList, cityMap };
};

const mapDispatchToProps = (dispatch: Function) => ({
  getProvinceList: () => dispatch(getProvinceList()),
  getCityList: (provinceId: number, cityMap: object) =>
    dispatch(getCityList(provinceId, cityMap))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommRegion);
