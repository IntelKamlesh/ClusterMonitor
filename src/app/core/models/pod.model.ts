export interface Pod {
  id: string;
  name: string;
  namespace: string;
  nodeName: string;
  phase: 'Pending' | 'Running' | 'Succeeded' | 'Failed' | 'Unknown';
  status: PodStatus;
  creationTimestamp: string;
  restartCount: number;
  ip: string;
  labels?: { [key: string]: string };
  annotations?: { [key: string]: string };
  containers: PodContainer[];
  conditions?: PodCondition[];
}

export interface PodStatus {
  phase: 'Pending' | 'Running' | 'Succeeded' | 'Failed' | 'Unknown';
  message?: string;
  reason?: string;
  startTime: string;
}

export interface PodContainer {
  name: string;
  image: string;
  ready: boolean;
  restartCount: number;
  state: {
    running?: {
      startedAt: string;
    };
    waiting?: {
      reason: string;
      message: string;
    };
    terminated?: {
      reason: string;
      message: string;
      exitCode: number;
      signal?: number;
      startedAt: string;
      finishedAt: string;
    };
  };
  lastState?: {
    running?: {
      startedAt: string;
    };
    waiting?: {
      reason: string;
      message: string;
    };
    terminated?: {
      reason: string;
      message: string;
      exitCode: number;
      signal?: number;
      startedAt: string;
      finishedAt: string;
    };
  };
}

export interface PodCondition {
  type: string;
  status: 'True' | 'False' | 'Unknown';
  lastProbeTime: string;
  lastTransitionTime: string;
  reason?: string;
  message?: string;
}
