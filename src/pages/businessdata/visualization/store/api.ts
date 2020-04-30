import axios from "../../../../util/api.request";

/* 查询省列表 */
export const _getProvinceList = () => {
  return axios.Post("env/provincialCascade/province", { parentId: 1 });
};

/* 查询市列表 */
export const _getCityList = (data: object) => {
  return axios.Post("env/provincialCascade/city", data);
};
