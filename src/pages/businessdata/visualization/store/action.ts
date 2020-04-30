import { PROVINCELISTLOADED, CITYLISTLOADED } from "./actionNames";
import { _getProvinceList, _getCityList } from "./api";
import { actionProps, provinceItemProps, cityDataProps } from "./types";

let isProvinceListLoaded: boolean = false, // 是否加载省列表完成
  isProvinceListLoading: boolean = false; // 是否正在加载省列表

export const provinceListLoaded = (
  list: Array<provinceItemProps>
): actionProps => ({
  type: PROVINCELISTLOADED,
  list
});
export const getProvinceList = (): Function => {
  return (dispatch: Function) => {
    if (isProvinceListLoaded || isProvinceListLoading) {
      // 如果省列表在加载或者已经加载完成，则跳过本次加载省列表
      return;
    }
    isProvinceListLoading = true;
    _getProvinceList()
      .then(({ data: { data } }) => {
        isProvinceListLoaded = true;
        dispatch(provinceListLoaded(data));
      })
      .finally(() => {
        isProvinceListLoading = false;
      });
  };
};

export const cityListLoaded = ({ provinceId, list }: cityDataProps) => ({
  type: CITYLISTLOADED,
  provinceId,
  list
});
export const getCityList = (provinceId: number, cityMap: object) => {
  return (dispatch: Function) => {
    if (!cityMap || cityMap[provinceId] === undefined) {
      // 如果该省未查询过市列表，则进行查询
      _getCityList({ provinceId }).then(({ data: { data } }) => {
        dispatch(cityListLoaded({ provinceId, list: data }));
      });
    }
  };
};
