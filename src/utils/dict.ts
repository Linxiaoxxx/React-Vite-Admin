/**
 * 风险管理项目字段映射
 */

export const deviceType = ["终端", "服务器", "未知"];

export const origin = ["手动添加", "自动添加"];

export const alarmOrigin = ["全流量", "API", "蜜罐"];

// 风险级别
export const riskLevel = ["低危", "中危", "高危", "紧急"];
// 对应风险级别的的颜色值
export const riskLevelColor = ["#05A14E", "#3491FA", "#F77234", "#F53F3F"];

export const alarmStatus = ["待处置", "已忽略", "已处置", "观察中"];
export const alarmStatusColor = ["orange", "purple", "green", "blue"];

// 协议类型
export const protocolType = ["tcp", "udp", "icmp", "unknown"];
