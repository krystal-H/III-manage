import asyncComponent from "../../lazy";

const CommECharts = asyncComponent(() =>
  import(/* webpackChunkName: "echarts" */ "./CommECharts")
);
export default CommECharts;
