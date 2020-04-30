import { combineReducers } from "redux";
import { PROVINCELISTLOADED, CITYLISTLOADED } from "./actionNames";
import applicationAnalysisReducer from "../applicationAnalysis/store/reducer";
import serverAnalysisReducer from "../serverAnalysis/store/reducer";
import { selectItemProps } from "../../../../types";
import { actionProps, provinceItemProps, cityItemProps } from "./types";

const provinceList = (
  state = [],
  { type, list }: actionProps
): Array<selectItemProps> => {
  return type === PROVINCELISTLOADED
    ? list.map(
        ({ provinceId, provinceName }: provinceItemProps): selectItemProps => {
          return { id: provinceId, value: provinceName };
        }
      )
    : state;
};

const cityMap = (
  state = {},
  { type, provinceId, list }: actionProps
): object => {
  return type === CITYLISTLOADED
    ? {
        ...state,
        [provinceId + ""]: list.map(
          ({ cityId, cityName }: cityItemProps): selectItemProps => {
            return { id: cityId, value: cityName };
          }
        )
      }
    : state;
};

const timeList = (): Array<selectItemProps> => [
  { id: "1", value: "昨日" },
  { id: "7", value: "前七天" },
  { id: "30", value: "前三十天" }
];

const reducer = combineReducers({
  provinceList,
  cityMap,
  timeList,
  applicationAnalysis: applicationAnalysisReducer,
  serverAnalysis: serverAnalysisReducer
});

export default reducer;
