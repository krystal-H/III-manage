import timeUtil from "./timeUtil";
import { message } from "antd";

const colors = [
  "#1890FF",
  "#2fc25b",
  "#ef7b0a",
  "#ffb637",
  "#8ed824",
  "#3ab752",
  "#21dfeb",
  "#2493f1",
  "#4a59f1",
  "#c167ef",
  "#ee53a7",
  "#d82b2b",
  "#bcddff"
];
const circleHtmlString =
  "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" +
  colors[0] +
  ";'></span>";

const xs = new Array(24).fill(0).map((d, i) => i);
const getTitle = tit => ({
  text: tit,
  textStyle: {
    color: "#666",
    fontStyle: "normal",
    fontWeight: "bold",
    fontFamily: "sans-serif",
    fontSize: 14,
    lineHeight: "14px"
  },
  left: 0,
  top: 0
});
const grid = { top: 40, bottom: 50, right: 30, left: 80 };

const getMaxWidth = xs => {
  const wrap = document.createElement("div");
  wrap.style =
    "position:absolute;left:-10000px;top:-10000px;font-size:12px;font-style:normal;font-family:sans-serif;";
  const list = xs.map((d, i) => {
    const e = document.createElement("span");
    e.innerHTML = d;
    wrap.append(e);
    return e;
  });
  document.body.append(wrap);
  let width = 0;
  list.forEach(d => {
    const x = d.offsetWidth;
    if (x > width) {
      width = x;
    }
  });
  document.body.removeChild(wrap);
  return width + 20;
};

export const createLineBarEvent = [
  {
    eventName: "legendselectchanged",
    handler: function(rst) {
      // name: "df",  selected: { asdf: true, df: false, f: true }
      const { name, selected } = rst;
      if (selected[name]) {
        //勾选！！
        let num = 0;
        for (let i in selected) {
          selected[i] && num++;
        }
        if (num > 8) {
          message.warn("最多只显示8条曲线！");
          setTimeout(() => {
            this.dispatchAction({
              type: "legendUnSelect",
              name
            });
          }, 0);
        }
      }
    }
  }
];

// 实时数据专用ECharts - option配置函数
export function createLineOptionForToday(list) {
  if (!list || list.length === 0) return null;
  let option = {
    title: getTitle("0~23小时，每小时的分时段区间数据："),
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "line" },
      formatter: function(params) {
        const { dataIndex, value = "暂无" } = params[0];
        const title =
          dataIndex === 0
            ? "23~0点累计数："
            : dataIndex - 1 + "~" + dataIndex + "点累计数：";
        return (
          "<div style='width:120px;'>" +
          title +
          "<br /><div style='text-align:center;'>" +
          value +
          "</div></div>"
        );
      }
    },
    color: colors,
    grid,
    legend: { show: true, data: ["今日"], bottom: 0 },
    toolbox: { show: false },
    xAxis: [
      {
        type: "category",
        boundaryGap: true,
        axisTick: {
          alignWithLabel: true,
          lineStyle: {
            width: 2
          }
        },
        axisLine: {
          lineStyle: {
            width: 2,
            symbol: "arrow",
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#3398DB" // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#3398DB" // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          }
        },
        data: xs
      }
    ],
    yAxis: {
      type: "value",
      scale: true,
      min: 0,
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: { opacity: 0 }
      },
      splitLine: {
        lineStyle: {
          type: "dotted"
        }
      }
    },
    series: [
      {
        name: "今日",
        type: "line",
        data: list
      }
    ]
  };
  return option;
}

// 折线图ECharts - option基本配置函数
export function createLineOption(list, name, isKeepPercent, isTime) {
  if (!list || list.length === 0) return null;
  const xs = timeUtil.toLimitDates(list.map(d => d.name));
  const data = list.map(d => d.count);
  let option = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "line" }
    },
    color: colors,
    grid,
    legend: { show: true, data: [name], bottom: 0 },
    toolbox: { show: false },
    xAxis: [
      {
        type: "category",
        boundaryGap: true,
        axisTick: { alignWithLabel: true },
        data: xs
      }
    ],
    yAxis: {
      type: "value",
      scale: true,
      min: 0,
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: { opacity: 0 }
      },
      splitLine: {
        lineStyle: {
          type: "dotted"
        }
      }
    },
    series: [
      {
        type: "line",
        name,
        data
      }
    ]
  };
  if (!isKeepPercent) {
    option.title = getTitle("所选择时间段各天的数据：");
    if (isTime) {
      option.yAxis.axisLabel = {
        formatter: v => {
          return timeUtil.secondToHours(v);
        }
      };
      option.grid.left = 80;
      option.tooltip.formatter = params => {
        const { seriesName, name, value } = params[0];
        return (
          name +
          " <br />" +
          circleHtmlString +
          seriesName +
          "： " +
          timeUtil.secondToHours(value)
        );
      };
    } else {
      option.yAxis.axisLabel = { formatter: null };
      option.tooltip.formatter = null;
    }
  } else {
    option.yAxis.axisLabel = { formatter: "{value} %" };
    option.tooltip.formatter = "{a} <br />" + circleHtmlString + "{b}：   {c}%";
  }
  return option;
}

// 柱状图ECharts - option基本配置函数
export function createBarOption(list, name, isY = false) {
  if (!list || list.length === 0) return null;
  const xs = timeUtil.toLimitDates(list.map(d => d.name));
  const data = list.map(d => d.count);
  let xAxis = [
    {
      type: "category",
      boundaryGap: true,
      axisTick: { alignWithLabel: true },
      data: xs
    }
  ];
  let yAxis = {
    type: "value",
    scale: true,
    min: 0,
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: { opacity: 0 }
    },
    splitLine: {
      lineStyle: {
        type: "dotted"
      }
    }
  };
  let option = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "line" },
      formatter: "{a} <br />" + circleHtmlString + "{b}：   {c}"
    },
    color: colors,
    grid: { ...grid },
    legend: { show: true, data: [name], bottom: 0 },
    toolbox: { show: false },
    series: [
      {
        type: "bar",
        name,
        barMaxWidth: 24,
        data
      }
    ]
  };
  option.xAxis = isY ? yAxis : xAxis;
  option.yAxis = isY ? xAxis : yAxis;
  if (isY) {
    // 如果是Y轴类目
    option.grid.left = getMaxWidth(xs);
    option.series[0].barMaxWidth = 18;
    // 如果是Y轴类目
    // option.yAxis.axisLabel = {
    //   formatter: function(value) {
    //     return value.replace(/(.{1})/g, "$1~"); // 隔4个汉字换一行？
    //   }
    // };
  }
  return option;
}

// 从运营平台数据分析移植过来的
export function createLineBarOption(obj, usePercent) {
  if (obj === null) return null;
  const { type, x, legend, bar, line } = obj;
  let option = {
    tooltip: { trigger: "axis", axisPointer: { type: "cross" } },
    color: colors,
    grid: { top: 40, bottom: 80 },
    legend: {
      data: legend,
      selected: {},
      bottom: "5%"
    },
    toolbox: { show: false },
    xAxis: [
      {
        type: "category",
        boundaryGap: true,
        // axisLabel: { interval: 0 },
        data: timeUtil.toLimitDates(x)
      }
    ],
    yAxis: { type: "value", scale: true, min: 0 },
    series: []
  };
  //若使用百分比策略
  if (usePercent) {
    option.yAxis.name = "%";
    option.tooltip.formatter = function(param) {
      const { name, seriesName, value } = param[0];
      return (
        name +
        " <br />" +
        circleHtmlString +
        seriesName +
        "：" +
        (value === null || value === undefined ? "数据丢失" : value + "%")
      );
    };
  }
  if (type === "line") {
    let maxL = 0,
      l;
    for (let i = 0, len = legend.length; i < len; i++) {
      maxL = line[i].length > maxL ? line[i].length : maxL;
      option.series.push({
        name: legend[i],
        type: "line",
        data: line[i]
      });
      option.legend.selected[legend[i]] = i < 8;
    }

    //计算是否需要区域选择功能块
    maxL = maxL - 1; //9
    l = maxL - 14 >= 0 ? maxL - 14 : 0;
    if (maxL > 14) {
      option.grid.bottom = 120;
      option.legend.bottom = 50;
      option.dataZoom = [
        {
          type: "slider",
          show: true,
          bottom: 0,
          startValue: l,
          endValue: maxL
        },
        {
          type: "inside",
          disabled: false,
          startValue: l,
          endValue: maxL
        }
      ];
    } else {
      option.grid.bottom = 80;
      option.legend.bottom = "5%";
      option.dataZoom = [
        {
          type: "slider",
          show: false,
          bottom: 0,
          startValue: 0,
          endValue: maxL
        },
        {
          type: "inside",
          disabled: true,
          startValue: 0,
          endValue: maxL
        }
      ];
    }
  } else if (type === "bar") {
    for (let i = 0, len = legend.length; i < len; i++) {
      option.series.push({
        name: legend[i],
        type: "bar",
        barMaxWidth: 24,
        // barMinHeight: 15,
        data: bar[i]
      });
    }
  }
  return option;
}
