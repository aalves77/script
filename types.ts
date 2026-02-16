
export interface SensitivitySettings {
  general: number;
  redDot: number;
  scope2x: number;
  scope4x: number;
  sniper: number;
  lookFree: number;
}

export interface DeviceStats {
  ping: number;
  fps: number;
  cpuTemp: number;
  ramUsage: string;
}

export interface StrategyResponse {
  advice: string;
  recommendedConfig: string;
  dangerLevel: 'Low' | 'Medium' | 'High';
}
