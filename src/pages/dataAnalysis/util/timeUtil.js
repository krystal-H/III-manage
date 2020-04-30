import moment from "moment";

const format = "YYYY-MM-DD hh:mm:ss";
const yearFormat = "YYYY-MM-DD";
const monthFormat = "MM-DD";
const hoursFormat = "hh:mm:ss";
const nowYear = new Date().getFullYear();

const prevZero = d => (d < 10 ? "0" + d : d);

const tools = {
  toString: time => {
    return moment(time).format(format);
  },
  toYear: time => {
    return moment(time).format(yearFormat);
  },
  toHours: time => {
    return moment(time).format(hoursFormat);
  },
  secondToHours: _second => {
    const second = Math.round(_second);
    const hh = Math.floor(second / 3600),
      mm = Math.floor((second - hh * 3600) / 60),
      ss = second % 60;
    return prevZero(hh) + ":" + prevZero(mm) + ":" + prevZero(ss);
  },
  toLimitYear: _moment => {
    if (typeof _moment === "string") {
      return _moment.replace(new RegExp("^" + nowYear + "-"), "");
    }
    const time = moment.isMoment(_moment) ? _moment : moment(_moment);
    return time.format(time.year() === nowYear ? monthFormat : yearFormat);
  },
  toLimitDates: dates => {
    if (
      dates.length === undefined ||
      dates[0] === undefined ||
      typeof dates[0] !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(dates[0])
    )
      return dates;
    let temp = "" + nowYear,
      rst = [...dates];
    rst.forEach((d, i) => {
      const v = d.replace(new RegExp("^" + temp + "-"), "");
      if (v === d) {
        // if (i > 0) rst[i - 1] = dates[i - 1];
        temp = d.slice(0, 4);
      }
      rst[i] = v;
    });
    // rst.splice(-1, 1, dates.slice(-1)[0]); // 强制最后一位年份补齐
    return rst;
  }
};
export default tools;
