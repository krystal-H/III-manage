// 用来截断文本
export const hiddenLen = (s, n) => (s.length > n ? s.slice(0, n) + "..." : s);

// 用来计算时间先后顺序
export const getTN = d => {
  return +d.replace(/\D/g, "");
};

// 将数字转化成千分位
export const toThousands = d => {
  const arr = (d + "").split(".");
  return (
    arr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (arr[1] ? "." + arr[1] : "")
  );
};

// 将百分比数字转化成至多2位小数的百倍数字
export const toPercentNumber = d => Math.round(d * 10000) / 100;
