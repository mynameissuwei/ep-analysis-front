import request from "@/utils/request2";

export function fetchAlertList(params, data) {
  return request({
    url: "/api/ptsw/alerts",
    method: "post",
    params,
    data
  });
}

export function fetchAlertDevice() {
  return request({
    url: "/api/ptsw/alerts/devices",
    method: "get"
  });
}

export function fetchAlertFac() {
  return request({
    url: "/api/ptsw/alerts/factories",
    method: "get"
  });
}

export function fetchConservationsList(params, data) {
  return request({
    url: "/api/ptsw/conservations",
    method: "post",
    params,
    data
  });
}

export function fetchConservationsDevice() {
  return request({
    url: "/api/ptsw/conservations/devices",
    method: "get"
  });
}

export function fetchConservationsFac() {
  return request({
    url: "/api/ptsw/conservations/factories",
    method: "get"
  });
}

export function fetchInspectionsList(params, data) {
  return request({
    url: "/api/ptsw/inspections",
    method: "post",
    params,
    data
  });
}

export function fetchInspectionsOrderStatuses() {
  return request({
    url: "/api/ptsw/inspections/orderStatuses",
    method: "get"
  });
}

export function fetchInspectionsTeams() {
  return request({
    url: "/api/ptsw/inspections/teams",
    method: "get"
  });
}

export function fetchRepairsList(params, data) {
  return request({
    url: "/api/ptsw/repairs",
    method: "post",
    params,
    data
  });
}

export function fetchRepairsDevice() {
  return request({
    url: "/api/ptsw/repairs/devices",
    method: "get"
  });
}

export function fetchRepairsFac() {
  return request({
    url: "/api/ptsw/repairs/factories",
    method: "get"
  });
}
