import axios from "../../../../util/api.request";
import { _Download } from "../../store/api";

/* 获取数据 */
export const _getData = (data: object) => {
  let url = "collection/eventAnalysis/getEventindicators?";
  for (let i in data) {
    if (i === "moreData") {
      url += data[i] + "&";
    } else {
      url += i + "=" + data[i] + "&";
    }
  }
  url = url.replace(/&$/, "");
  return axios.Post(url, {}, { isModalError: true });
};

/* 下载文件 */
export const _download = (paramsStr: string) => {
  _Download("/collection/eventAnalysis/downLoadCSVData?", paramsStr);
};
