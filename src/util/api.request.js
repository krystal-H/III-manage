import HttpRequest from "./axiosRequest";

export const baseUrl = "/v1/web";
const axios = new HttpRequest(baseUrl);
export const axiosNobaseurl  = new HttpRequest("");
export default axios;
