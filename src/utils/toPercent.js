const toPercent = point => {
  if (point == 0) {
    return 0;
  }
  var str = Number(point * 100).toFixed();
  str += "%";
  return str;
};

export default toPercent;
