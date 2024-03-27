import { get, post, put, remove } from "@/request";

// ------------ 资产列表管理 ------------
export interface AssetQuery {
  q?: string;
  offset: number;
  limit: number;
  gid?: string | number;
  ids?: number[];
  filters?: string;
}

export function getAssetList(data: Omit<AssetQuery, "ids" | "filter_ids">) {
  return get("/ctrl/asset/", data);
}

export function deleteAssets(aid: string) {
  return remove(`/ctrl/asset/${aid}`);
}

export function batchDeleteAssets(ids: number[]) {
  return remove("/ctrl/asset/", { ids });
}

export interface AssetParams {
  name: string;
  vest?: string;
  domain?: string;
  mac?: string;
  os?: string;
  ip: string;
  device_type: string;
  remark?: string;
  gid?: string;
}

export function addEditAsset(data: AssetParams, aid?: string) {
  return aid ? put(`/ctrl/asset/${aid}`, data) : post("/ctrl/asset/", data);
}

export function exportAsset(data: Pick<AssetQuery, "gid" | "q" | "ids">) {
  return post("/ctrl/asset/export/asset", data);
}

export function getAssetTemplate() {
  return get("/ctrl/asset/template", {}, { responseType: "blob" });
}

// ------------ 资产组管理 ------------
export interface AssetGroupQuery {
  q?: string;
  offset: number;
  limit: number;
  start?: string;
  end?: string;
  ids?: number[];
}

export function getAssetGroup(data?: Omit<AssetGroupQuery, "ids">) {
  return get("/ctrl/asset/grp", data);
}

export function deleteAGroup(gid: string) {
  return remove(`/ctrl/asset/grp/${gid}`);
}

export function batchDeleteAGroup(ids: number[]) {
  return remove("/ctrl/asset/grp", { ids });
}

export interface AGroupParams {
  name: string;
  manager?: string;
  segment?: string;
  ids: number[];
}

export function exportAGroup(data: Omit<AssetGroupQuery, "offset" | "limit">) {
  return post("/ctrl/asset/export/grp", data);
}

export function addEditGroup(data: AGroupParams, gid?: string) {
  return gid
    ? put(`/ctrl/asset/grp/${gid}`, data)
    : post("/ctrl/asset/grp", data);
}
