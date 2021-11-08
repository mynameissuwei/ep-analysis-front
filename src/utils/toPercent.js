const toPercent = point => {
  if (point === 0 || point === "NaN") {
    return 0 + "%";
  }
  var str = Number(point * 100).toFixed();
  str += "%";
  return str;
};

export const isNill = value => {
  if (value === "NaN" || value === "null" || value === "undefined") {
    return "无";
  }
  return value;
};

export default toPercent;
