import { get, patch, post, put } from "..";
export interface PageQuery {
  offset: number;
  limit: number;
  q?: string;
}
/**
 * 资产威胁告警
 */
export interface AssetListQuery extends PageQuery {
  start?: string;
  end?: string;
  gid?: string | number | undefined;
  ids?: number[];
}

export function getAlarmAsset(data: AssetListQuery) {
  return get("/ctrl/alarm/asset", data);
}

export function alarmAssetStatics(aid: string) {
  return get(`/ctrl/alarm/asset/stats/${aid}`);
}

export function exportAlarmAsset(
  data: Omit<AssetListQuery, "offset" | "limit">
) {
  return post("/ctrl/alarm/export/asset", data);
}

/**
 * 应用弱点告警
 */
export interface WeakListQuery extends Omit<PageQuery, "q"> {
  start?: string;
  end?: string;
  level?: number;
  api?: string;
  ids?: number[];
}

export function getAlarmWeak(data: WeakListQuery) {
  return get("/ctrl/alarm/weak", data);
}

export function exportAlarmWeak(data: Omit<WeakListQuery, "limit" | "offset">) {
  return post("/ctrl/alarm/export/weak", data);
}

// wid单个处置 ids批量处置
export function dealWeak(
  data: { status: number | undefined; remark?: string; ids?: number[] },
  wid?: number
) {
  return put(`/ctrl/alarm/weak${wid ? `/${wid}` : ""}`, data);
}

/**
 * 攻击威胁告警
 */
export interface AttackListQuery {
  offset: number;
  limit: number;
  start?: string;
  end?: string;
  sip?: string;
  dip?: string;
  dport?: number;
  name?: string;
  protocol?: string;
  log?: string;
  level?: number;
  origin?: number;
  ids?: number[];
}
export function getAlarmAttack(data: AttackListQuery) {
  return get("/ctrl/alarm/attacks", data);
}

export function getAttackDetail(id: number) {
  return get(`/ctrl/alarm/attacks/${id}`);
}

export function exportAttack(data: Omit<AttackListQuery, "offset" | "limit">) {
  return post("/ctrl/alarm/export/attack", data);
}

// wid单个处置 ids批量处置
export function dealAttack(
  data: { status: number | undefined; remark?: string; ids?: number[] },
  aid?: number
) {
  return patch(`/ctrl/alarm/attacks${aid ? `/${aid}` : ""}`, data);
}
