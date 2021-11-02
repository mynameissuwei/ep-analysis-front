import request from "@/utils/request-foundation";

export function getEfficiencyData(data) {
  return request({
    url: "/interMsg/list",
    method: "post",
    data
  });
}
