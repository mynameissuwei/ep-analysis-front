import request from "@/utils/request";

export function fetchBar(params) {
  return request({
    url: "/designAnalysis/taskDistribution",
    method: "get",
    params
  });
}
