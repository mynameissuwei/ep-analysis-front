function deepClone(value) {
  var result;
  if (typeof value !== "object" || value === null) return value;
  else if (Array.isArray(value)) result = [];
  else if (typeof value === "object") result = {};
  for (var key in value) {
    result[key] = deepClone(value[key]);
  }
  return result;
}

export default deepClone;
