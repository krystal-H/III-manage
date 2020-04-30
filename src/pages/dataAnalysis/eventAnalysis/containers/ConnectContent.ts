import { connect } from "react-redux";
import { AppState } from "../store/types";
import { getData, download } from "../store/action";
import Content from "../components/Content";

const mapStateToProps = (state: AppState) => {
  const {
    allAppList,
    eventListMap, // 事件列表映射
    eventMap, // 事件映射
    propertyListMap, // 属性列表映射
    propertyMap, // 属性映射
    timeList,
    statsTypeList,
    eventAnalysis: { isLoading, isError, dataObject, listObj }
  } = state.get("dataAnalysis");
  return {
    allAppList,
    eventListMap, // 事件列表映射
    eventMap, // 事件映射
    propertyListMap, // 属性列表映射
    propertyMap, // 属性映射
    statsTypeList,
    timeList,
    isLoading,
    isError,
    dataObject,
    listObj
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  getData: () => dispatch(getData()),
  download
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);
