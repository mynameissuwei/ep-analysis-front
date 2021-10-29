import request from "@/utils/request2";

export function fetchBar(params) {
  return request({
    url: "/designAnalysis/taskDistribution",
    method: "get",
    params
  });
}
