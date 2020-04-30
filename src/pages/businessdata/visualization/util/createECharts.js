const colors = [
  "#1890FF",
  "#4da7fd",
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

export function createBarOption(list) {
  if (!list || list.length === 0) return null;
  const len = list.length;
  const lastIndex = len - 1;
  const minLen = Math.min(10, len);
  const endValue = Math.min(9, lastIndex);
  let option = {
    tooltip: { trigger: "axis", axisPointer: { type: "cross" } },
    color: colors,
    grid: { top: 40, bottom: 60, right: 20 },
    legend: { show: false },
    toolbox: { show: false },
    xAxis: [
      {
        type: "category",
        boundaryGap: true,
        // axisLabel: { interval: 0 },
        data: list.map(d => d.name)
      }
    ],
    yAxis: { type: "value", scale: true, min: 0 },
    dataZoom: [
      {
        type: "slider",
        show: true,
        bottom: 0,
        minSpan: minLen,
        maxSpan: minLen,
        zoomLock: true,
        startValue: 0,
        endValue
      },
      {
        type: "inside",
        minSpan: minLen,
        maxSpan: minLen,
        zoomOnMouseWheel: false,
        startValue: 0,
        endValue
      }
    ],
    series: [
      {
        name: "",
        type: "bar",
        barMaxWidth: 24,
        // barMinHeight: 15,
        data: list.map(d => d.count)
      }
    ]
  };
  return option;
}
