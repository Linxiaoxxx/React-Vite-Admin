import { get } from "..";

export interface TimeQuery {
  start?: string;
  end?: string;
}

// 热点事件
export function getStatsHot(data: TimeQuery) {
  return get("/ctrl/stats/hot", data);
}

// 源ip top5
export function getSipTop(data: TimeQuery) {
  return get("/ctrl/stats/sip", data);
}

// 威胁趋势分析
export function getStatsTrend() {
  return get("/ctrl/stats/trend");
}

// 风险api应用top
export function getStatsApi(data: TimeQuery) {
  return get("/ctrl/stats/api", data);
}

// 攻击总数统计
export function getStatsTotal(data: TimeQuery) {
  return get("/ctrl/stats/total", data);
}

// 目的ip top5
export function getStatsDip(data: TimeQuery) {
  return get("/ctrl/stats/dip", data);
}

// 资产风险等级分析
export function getStatsLevel(data: TimeQuery) {
  return get("/ctrl/stats/asset_level", data);
}

// 实时告警
export function getStatsReal() {
  return get("/ctrl/stats/real");
}

// 网络拓补图
export function getStatsNet(data: TimeQuery) {
  return get("/ctrl/stats/net", data);
}
