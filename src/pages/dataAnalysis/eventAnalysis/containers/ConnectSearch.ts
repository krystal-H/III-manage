import { connect } from "react-redux";
import { AppState } from "../store/types";
import { changeSearchData, getData, setSearchData } from "../store/action";
import { getEventList, getPropertyList } from "../../store/action";
import Search from "../components/Search";

const mapStateToProps = (state: AppState) => {
  const {
    allAppList,
    allAppMap,
    eventListMap, // 事件列表映射
    eventMap, // 事件映射
    propertyListMap, // 属性列表映射
    propertyMap, // 属性映射
    timeList,
    timeMap,
    timeListMap,
    statsTypeList,
    statsTypeMap,
    eventAnalysis: { isLoading }
  } = state.get("dataAnalysis");
  return {
    allAppList,
    allAppMap,
    eventListMap, // 事件列表映射
    eventMap, // 事件映射
    propertyListMap, // 属性列表映射
    propertyMap, // 属性映射
    isLoading,
    timeList,
    timeMap,
    timeListMap,
    statsTypeList,
    statsTypeMap
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  changeSearchData,
  setSearchData: (data: object) => dispatch(setSearchData(data)),
  getData: () => dispatch(getData()),
  getEventList: (applicationId: string | number) =>
    dispatch(getEventList(applicationId)),
  getPropertyList: (eventId: string | number) =>
    dispatch(getPropertyList(eventId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
